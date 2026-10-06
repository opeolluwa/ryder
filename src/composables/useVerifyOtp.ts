import { useNuxtApp, useRouter } from "#imports";
import type { AxiosInstance } from "axios";
import { getApiErrorMessage } from "../utils/apiError";
import type { AuthSession } from "./authSession";

export type OtpVariant = "two-factor" | "account-confirmation" | "forgotten-password";

/**
 * How long a user has to wait before we offer them another code. The api
 * rate limits these routes well below this, so the wait is purely to spare
 * the user from an email they have not had a chance to read yet.
 */
export const OTP_RESEND_COOLDOWN_SECONDS = 60;

interface VerifyOtpResult {
  success: boolean;
  error?: string;
}

export interface UseVerifyOtpOptions {
  session: AuthSession;
  /** Resolve the POST path for `verifyOtp()`. Default: console's `` `/verify-otp?variant=${variant}` ``. */
  verifyEndpoint?: (variant?: OtpVariant) => string;
  /** Resolve the POST path for `requestOtp()`. Default: console's `` `/request-otp?variant=${variant}` ``. */
  requestEndpoint?: (variant?: OtpVariant) => string;
  /** Console: `userStore.initialize(accessToken)` after a two-factor exchange. */
  hydrate?: (accessToken: string) => Promise<void> | void;
  /**
   * Navigate after a successful verification. Default (console): two-factor
   * lands on `twoFactorHomePath`, every other variant on
   * `"/auth/set-password"`. Return `undefined` to stay on the page.
   */
  afterVerifyRedirect?: (
    variant?: OtpVariant,
    redirect?: unknown,
  ) => Promise<string | undefined> | string | undefined;
  /** Post-two-factor destination. Default: `"/"`. */
  twoFactorHomePath?: string;
}

export function useVerifyOtp(options: UseVerifyOtpOptions) {
  const { session } = options;
  const { $api: api } = useNuxtApp() as { $api: AxiosInstance };
  const router = useRouter();

  function defaultVerifyEndpoint(variant?: OtpVariant): string {
    return `/verify-otp?variant=${variant}`;
  }

  function defaultRequestEndpoint(variant?: OtpVariant): string {
    return `/request-otp?variant=${variant}`;
  }

  /**
   * `redirect` is the destination the customer was headed for before the reset
   * flow started. It is threaded through the OTP step so setting a new password
   * ends at the page they meant rather than at the default. The console ignores
   * it (its default target has no query state); the client threads it through
   * `afterVerifyRedirect`.
   */
  async function verifyOtp(
    otp: string,
    variant?: OtpVariant,
    jwt?: string,
    redirect?: unknown,
  ): Promise<VerifyOtpResult> {
    try {
      const endpoint = (options.verifyEndpoint ?? defaultVerifyEndpoint)(variant);

      const { data: respData } = await api.post(
        endpoint,
        { otp: otp.trim() },
        { headers: { Authorization: `Bearer ${jwt}` } },
      );

      if (variant === "two-factor") {
        const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } = respData;

        await session.persistTokens({ accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry });

        if (accessToken) {
          await options.hydrate?.(accessToken);
        }

        session.clearTransientToken?.();
      }

      const target = options.afterVerifyRedirect
        ? await options.afterVerifyRedirect(variant, redirect)
        : variant === "two-factor"
          ? (options.twoFactorHomePath ?? "/")
          : "/auth/set-password";

      if (target !== undefined) {
        await router.push(target);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: getApiErrorMessage(error, "Verification failed"),
      };
    }
  }

  async function requestOtp(variant?: OtpVariant, jwt?: string): Promise<VerifyOtpResult> {
    try {
      const endpoint = (options.requestEndpoint ?? defaultRequestEndpoint)(variant);

      await api.post(endpoint, null, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: getApiErrorMessage(error, "Failed to resend OTP"),
      };
    }
  }

  return {
    verifyOtp,
    requestOtp,
  };
}
