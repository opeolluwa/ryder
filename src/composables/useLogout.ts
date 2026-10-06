import { useLogin, type UseLoginOptions } from "./useLogin";

/**
 * The console contract: returns the logout function rather than awaiting it,
 * so the caller decides when the (possibly slow) teardown runs. The client's
 * old `await useLogout()` call sites become `await useLogout(opts)()` at
 * migration.
 */
export function useLogout(options: UseLoginOptions): () => Promise<void> {
  const { logout } = useLogin(options);

  return logout;
}

export default useLogout;
