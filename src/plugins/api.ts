import type { AxiosInstance } from "axios";
import axios from "axios";
import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import {
  ApiError,
  getApiErrorMessage,
  getApiErrorStatus,
  isBackendUnreachable,
} from "../utils/apiError";

export const NETWORK_REQUEST_TIMEOUT = 27500;
export const UPLOADS_TIMEOUT = 300000;
export const UPLOAD_LIMIT_SIZE = 1024 * 1024 * 25;

/**
 * Endpoints whose own failures must not be read as "session expired".
 *
 * Both legitimately answer 401 when the credentials or refresh token are wrong,
 * and treating that as a dead session would wipe state and bounce the user away
 * from the very screen where they are trying to sign in.
 */
export const AUTH_ENTRY_ENDPOINTS = new Set([
  "/login",
  "/refresh-token",
  "/logout",
]);

export interface CreateApiPluginOptions {
  /** Defaults to `runtimeConfig.public.apiBaseUrl`. */
  baseURL?: string;
  /** Defaults to 27500ms (the console's); the client used 3500ms. */
  timeout?: number;
  headers?: Record<string, string>;
  /**
   * Checked before every non-refresh request; when it returns `false` and
   * `refreshToken` is set, the refresh runs first. Omit to never refresh
   * (the client had its refresh commented out).
   */
  isTokenValid?: () => boolean;
  /** Runs the token refresh against the live instance (the refresh endpoint itself). */
  refreshToken?: (api: AxiosInstance) => Promise<void> | void;
  /** Read per request; returned value becomes the `Authorization` bearer. */
  getToken?: () => string | null | undefined;
  /** Defaults to `/refresh-token`. */
  refreshEndpoint?: string;
  /** Defaults to `AUTH_ENTRY_ENDPOINTS`. */
  authEntryEndpoints?: ReadonlySet<string>;
  /**
   * Called when the API answers 401 on a non auth-entry endpoint. The app owns
   * the once-only guard, store resets and redirect (the console's `endSession`).
   */
  onSessionExpired?: () => void;
  /** Any successful response means the backend answered — the console's `markReachable`. */
  onReachable?: () => void;
  /** A transport failure means it did not — `markUnreachable`. */
  onUnreachable?: () => void;
  /**
   * Reject failures as `ApiError` carrying the HTTP status (the console) instead
   * of the raw axios error (the client). The client can flip this during
   * migration if its callers still read `error.response` directly.
   * @default true
   */
  wrapErrors?: boolean;
}

/**
 * Builds the `$api` axios plugin both apps shared before `@opeolluwa/ryder`.
 *
 * The console's behaviour is the default — refresh on expiry, status-carrying
 * `ApiError` rejections, reachability hooks and the guarded session teardown —
 * because it is the hardened one. The client's divergences are options, not a
 * second copy of the interceptor chain.
 */
export function createApiPlugin(options: CreateApiPluginOptions = {}) {
  const refreshEndpoint = options.refreshEndpoint ?? "/refresh-token";
  const authEntryEndpoints = options.authEntryEndpoints ?? AUTH_ENTRY_ENDPOINTS;
  const wrapErrors = options.wrapErrors ?? true;

  return defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const baseURL =
      options.baseURL ??
      String((config.public.apiBaseUrl as string | undefined) ?? "");

    const api = axios.create({
      baseURL,
      headers: {
        Accept: "application/json",
        ...options.headers,
      },
      timeout: options.timeout ?? NETWORK_REQUEST_TIMEOUT,
    });

    api.interceptors.request.use(
      async (request) => {
        // Never attempt a refresh while calling the refresh endpoint.
        if (
          options.refreshToken &&
          options.isTokenValid &&
          request.url !== refreshEndpoint
        ) {
          if (!options.isTokenValid()) {
            await options.refreshToken(api);
          }
        }

        const token = options.getToken?.();

        if (token && !request.headers.Authorization) {
          request.headers.Authorization = `Bearer ${token}`;
        }

        return request;
      },
      (error) => Promise.reject(error),
    );

    api.interceptors.response.use(
      (response) => {
        options.onReachable?.();

        return response;
      },
      (error) => {
        // A transport failure means the API is not answering, so surface it
        // via the hook instead of leaving each caller to decode "Network Error".
        if (isBackendUnreachable(error)) {
          options.onUnreachable?.();
        }

        const status = getApiErrorStatus(error);

        if (
          status === 401 &&
          options.onSessionExpired &&
          !authEntryEndpoints.has(String(error?.config?.url))
        ) {
          options.onSessionExpired();
        }

        if (!wrapErrors) {
          return Promise.reject(error);
        }

        // The status is carried on the rejection rather than dropped, so a caller
        // can tell an expired session from a server fault. See `ApiError`.
        const message = getApiErrorMessage(error, "Unknown error");

        return Promise.reject(new ApiError(message, status));
      },
    );

    return {
      provide: {
        api,
      },
    };
  });
}
