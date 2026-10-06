import { useNuxtApp, useRoute, useRouter } from "#imports";
import type { AxiosInstance } from "axios";
import { getApiErrorMessage } from "../utils/apiError";
import type { AuthSession } from "./authSession";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  error?: string;
  twoFactorRequired?: boolean;
}

export interface UseLoginOptions {
  session: AuthSession;
  /** POST path for `login()`. Default: the console's `"/login"`. */
  loginEndpoint?: string;
  /** POST path for `logout()`. Default: `"/logout"`. Pass `null` to skip the call. */
  logoutEndpoint?: string | null;
  /** Where a completed logout lands. Default: `"/auth/login"`. */
  loginPath?: string;
  /** Where the two-factor detour starts. Default: `"/auth/verify-otp?variant=two-factor"`. */
  twoFactorPath?: string;
  /**
   * Load app state derived from the fresh token (console: `userStore.initialize`,
   * client: `customerStore.fetchProfile`). Runs before the post-login redirect.
   */
  hydrate?: (accessToken: string) => Promise<void> | void;
  /** Extra teardown on logout (console: `queryClient.clear()`). Runs after `session.clear()`. */
  onLoggedOut?: () => Promise<void> | void;
  /**
   * Where a successful login navigates. Receives `route.query.redirect`.
   * Default: the console's open-redirect-hardened rule — same-origin paths go
   * through, everything else lands on `/`.
   */
  redirectAfterLogin?: (queryRedirect: unknown) => Promise<string | undefined> | string | undefined;
}

function defaultRedirect(queryRedirect: unknown): string {
  return typeof queryRedirect === "string" &&
    queryRedirect.startsWith("/") &&
    !queryRedirect.startsWith("//")
    ? queryRedirect
    : "/";
}

export function useLogin(options: UseLoginOptions) {
  const { session } = options;
  const { $api: api } = useNuxtApp() as { $api: AxiosInstance };
  const router = useRouter();
  const route = useRoute();

  async function login(credentials: LoginCredentials): Promise<LoginResult> {
    try {
      const { data: respData } = await api.post(options.loginEndpoint ?? "/login", credentials);

      if (respData.twoFactorEnabled === true) {
        session.persistTransientToken?.(respData.token);
        await router.push(options.twoFactorPath ?? "/auth/verify-otp?variant=two-factor");
        return { success: true, twoFactorRequired: true };
      }

      const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } = respData;

      await session.persistTokens({ accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry });

      if (accessToken) {
        await options.hydrate?.(accessToken);
      }

      const target = options.redirectAfterLogin
        ? await options.redirectAfterLogin(route.query.redirect)
        : defaultRedirect(route.query.redirect);

      if (target !== undefined) {
        await router.push(target);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: getApiErrorMessage(error, "Login failed"),
      };
    }
  }

  async function logout(): Promise<void> {
    const endpoint = options.logoutEndpoint === undefined ? "/logout" : options.logoutEndpoint;

    if (endpoint) {
      try {
        await api.post(endpoint);
      } catch {
        // Proceed with local logout even if the API call fails
      }
    }

    await session.clear();
    await options.onLoggedOut?.();
    await router.push(options.loginPath ?? "/auth/login");
  }

  function isAuthenticated(): boolean {
    return Boolean(session.isAccessTokenValid());
  }

  function getToken(): string {
    return session.accessToken;
  }

  return {
    login,
    logout,
    isAuthenticated,
    getToken,
  };
}
