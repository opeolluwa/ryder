/**
 * The token set every backend returns alongside a session (login and
 * two-factor verification share the same shape). Field names match the API
 * response one for one so a caller can spread `respData` straight in.
 */
export interface TokenPair {
  accessToken: string;
  refreshToken?: string | null;
  accessTokenExpiry?: string | number | null;
  refreshTokenExpiry?: string | number | null;
}

/**
 * The slice of an app's auth state the shared composables need.
 *
 * Token persistence and user hydration live in each app's Pinia stores, which
 * a shared package must not import — so the app injects this adapter from its
 * thin local wrapper. Implement it once over `useTokenStore()` (plus
 * `useUserInformationStore()` for `clear()`) and every shared auth composable
 * behaves exactly like the console's originals.
 */
export interface AuthSession {
  /** The current access token (empty/invalid when signed out). */
  readonly accessToken: string;
  /** Whether the access token exists and has not expired. */
  isAccessTokenValid(): boolean;
  /** Persist a fresh token pair (called after login / two-factor verification). */
  persistTokens(tokens: TokenPair): void | Promise<void>;
  /** Drop the whole session — tokens and anything derived from them. */
  clear(): void | Promise<void>;
  /** The single-purpose token the two-factor flow logs in with. */
  persistTransientToken?(token: string): void;
  /** Consumed once the transient token has been exchanged. */
  clearTransientToken?(): void;
}
