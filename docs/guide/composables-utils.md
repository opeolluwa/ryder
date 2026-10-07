# Composables, utils & types

## Explicit imports

The module does **not** auto-import shared composables/utils — that would hide
the dependency and collide with app-local helpers of the same name. Import
them explicitly:

```ts
import { useLogin, type AuthSession } from "@opeolluwa/ryder/composables"
import { ApiError, getApiErrorMessage } from "@opeolluwa/ryder/utils"
import { createApiPlugin } from "@opeolluwa/ryder/plugins/api"
```

Type-only exports come from `@opeolluwa/ryder/types`.

## Composables

All auth composables take an `AuthSession` adapter (see below), so the package
never imports app stores.

- `useAuth({ session, hydrate })` — `restoreSession`, `isAuthenticated`,
  `getToken`; rehydrates app state only when a valid token already exists.
- `useLogin(options)` — `login`, `logout`, `isAuthenticated`, `getToken`. Runs
  the two-factor detour when the API asks for it, hardens the post-login
  redirect against open redirects, and lets you hook `hydrate`/`onLoggedOut`.
- `useLogout(options)` — returns the logout function itself rather than
  awaiting it: `await useLogout(opts)()`.
- `useVerifyOtp(options)` — `verifyOtp(otp, variant?, jwt?, redirect?)` and
  `requestOtp(variant?, jwt?)` for the `two-factor`, `account-confirmation` and
  `forgotten-password` variants; exports `OTP_RESEND_COOLDOWN_SECONDS`.
- `useMobileNav()` — a shared `useState`-backed open/close/toggle for the shell
  sidebar.
- `useIsMobile()` — VueUse `useMediaQuery("(max-width: 1023px)")`, the `lg`
  breakpoint boundary the shell chrome switches on.
- `usePlatform()` — UA-derived `isIos`/`isAndroid`/`isMobile`/`isDesktop`/
  `isWeb` plus the `framework7Theme` used by Konsta components.

## AuthSession contract

`AuthSession` is the slice of an app's auth state the auth composables need —
token persistence and user hydration stay in each app's Pinia stores. Implement
it once over `useTokenStore()` (plus `useUserInformationStore()` for `clear()`)
in a thin local wrapper:

```ts
export interface AuthSession {
  readonly accessToken: string
  isAccessTokenValid(): boolean
  persistTokens(tokens: TokenPair): void | Promise<void>
  clear(): void | Promise<void>
  persistTransientToken?(token: string): void
  clearTransientToken?(): void
}
```

## Utils

Available from `@opeolluwa/ryder/utils`:

| Module            | Exports |
| ----------------- | ------- |
| `apiError`        | `ApiError`, `getApiErrorMessage`, `getApiErrorStatus`, `isBackendUnreachable`, `BACKEND_UNREACHABLE_MESSAGE` |
| `date`            | `parseApiDate`, `formatListDate`, `formatDateTime` |
| `image`           | `MAX_IMAGE_SIZE_BYTES`, `IMAGE_SIZE_ERROR`, `isImageTooLarge` |
| `number`          | `toNumber` |
| `formatPrice`     | `formatPrice` |
| `settingsTabs`    | `SettingsTab`, `settingsTabForPath` |
| `search`          | `normalize`, `escapeHtml`, `truncate`, `highlight` |
| `complaintStatus` | `resolveStatus`, `formatStatus`, `complaintIsOpen`, `complaintIsResolved`, `isResolvable`, `complaintStatusTransitions`, `canTransitionComplaint`, `complaintMatchesTab`, `complaintStatusColor`, `COMPLAINT_STATUS_TRANSITIONS` |
| `complaintCustomer`| `initials`, `complaintCustomerName`, `complaintCustomerLabel`, `complaintCustomerAvatar` |
| `orders`          | `orderItemCount`, `totalsByCurrency`, `deliveryLines` |
| `orderStatus`     | `ORDER_STATUSES`, `ORDER_STATUS_LABELS`, `resolveOrderStatus`, `canTransitionOrder`, `orderStatusBadgeClass`, `orderStatusLabel`, `ORDER_STATUS_TRANSITIONS` |

## Types

From `@opeolluwa/ryder/types`: complaint (`Complaint`, `ComplaintReply`,
`ComplaintRow`, `ComplaintCustomer`, `ComplaintStatus`, `COMPLAINT_STATUSES`, …),
order (`Order`, `OrderItem`, `OrderStatus`, `ORDER_STATUSES`, …) and search
(`SearchSection`, `SearchResultItem`) shapes, mirroring the backend's OpenAPI
document.

## API plugin

`createApiPlugin` builds the app's `$api` axios plugin with hardened defaults
(see `src/plugins/api.ts`) and takes app-specific hooks as options:

```ts
createApiPlugin({
  baseURL,                // defaults to runtimeConfig.public.apiBaseUrl
  timeout,                // defaults to 27500
  headers,
  isTokenValid,           // pre-request check; skip the refresh when truthy
  refreshToken: (api) => utils.getNewToken(),
  getToken,               // returned value becomes the Authorization bearer
  refreshEndpoint,        // defaults to /refresh-token
  authEntryEndpoints,     // endpoints whose 401 must not read as "expired"
  onSessionExpired,       // app owns the once-only guard, reset and redirect
  onReachable,
  onUnreachable,          // transport failure hook
  wrapErrors,             // reject as ApiError carrying the status (default true)
})
```

It exports `NETWORK_REQUEST_TIMEOUT`, `UPLOADS_TIMEOUT`, `UPLOAD_LIMIT_SIZE`
and `AUTH_ENTRY_ENDPOINTS`.