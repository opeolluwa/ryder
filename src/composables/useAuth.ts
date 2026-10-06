import type { AuthSession } from "./authSession";

export interface UseAuthOptions {
  session: AuthSession;
  /**
   * Rehydrate app state derived from the token (the console loads the user
   * profile here). Runs only when a valid token already exists.
   */
  hydrate?: (accessToken: string) => Promise<void> | void;
}

export function useAuth(options: UseAuthOptions) {
  const { session } = options;

  async function restoreSession(): Promise<boolean> {
    if (!session.isAccessTokenValid()) {
      return false;
    }

    try {
      await options.hydrate?.(session.accessToken);
      return true;
    } catch {
      await session.clear();
      return false;
    }
  }

  function isAuthenticated(): boolean {
    return session.isAccessTokenValid();
  }

  function getToken(): string {
    return session.accessToken;
  }

  return {
    restoreSession,
    isAuthenticated,
    getToken,
  };
}
