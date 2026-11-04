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

### Auth

All auth composables take an `AuthSession` adapter (see below), so the package
never imports app stores.

| Composable | Returns / notes |
| ---------- | --------------- |
| `useAuth({ session, hydrate })` | `restoreSession`, `isAuthenticated`, `getToken`; rehydrates only when a valid token already exists. |
| `useLogin(options)` | `login`, `logout`, `isAuthenticated`, `getToken`. Handles the two-factor detour, open-redirect hardening, `hydrate` and `onLoggedOut`. |
| `useLogout(options)` | Returns the logout function itself, not a promise: `await useLogout(opts)()`. |
| `useVerifyOtp(options)` | `verifyOtp(otp, variant?, jwt?, redirect?)` and `requestOtp(variant?, jwt?)` for `two-factor`, `account-confirmation` and `forgotten-password`. Exports `OTP_RESEND_COOLDOWN_SECONDS`. |
| `useAuthSession` / `AuthSession` | The adapter contract below. |

### UI and platform

| Composable | Returns / notes |
| ---------- | --------------- |
| `useMobileNav()` | Shared `useState`-backed `isOpen`, `open`, `close`, `toggle` for the shell sidebar. |
| `useIsMobile()` | VueUse `useMediaQuery("(max-width: 1023px)")`, the `lg` boundary the shell switches on. |
| `usePlatform()` | `platformName`, `isIos`, `isAndroid`, `isMobile`, `isDesktop`, `isWeb`, `framework7Theme` (Konsta). |
| `usePullToRefresh({ onRefresh, threshold? })` | `container` (bind with `ref`), `isRefreshing`, `pullDistance`; attaches touch listeners on mount and removes them on unmount. Default threshold `64`. |
| `useVisualViewportHeight()` | `height` and a `style` object that sets `height` + `--app-viewport-height`; tracks `window.visualViewport` so mobile composers stay above the keyboard. `undefined` style before mount. |

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

| Module | Exports |
| ------ | ------- |
| `apiError` | `ApiError`, `getApiErrorMessage`, `getApiErrorStatus`, `isBackendUnreachable`, `BACKEND_UNREACHABLE_MESSAGE` |
| `date` | `parseApiDate`, `formatListDate`, `formatDateTime` |
| `image` | `MAX_IMAGE_SIZE_BYTES`, `IMAGE_SIZE_ERROR`, `isImageTooLarge` |
| `number` | `toNumber` |
| `formatPrice` | `formatPrice` |
| `settingsTabs` | `SettingsTab`, `settingsTabForPath` |
| `search` | `normalize`, `escapeHtml`, `truncate`, `highlight` |
| `complaintStatus` | `resolveStatus`, `formatStatus`, `complaintIsOpen`, `complaintIsResolved`, `isResolvable`, `complaintStatusTransitions`, `canTransitionComplaint`, `complaintMatchesTab`, `complaintStatusColor`, `COMPLAINT_STATUS_TRANSITIONS` |
| `complaintCustomer` | `initials`, `complaintCustomerName`, `complaintCustomerLabel`, `complaintCustomerAvatar` |
| `orders` | `orderItemCount`, `totalsByCurrency`, `deliveryLines` |
| `orderStatus` | `ORDER_STATUSES`, `ORDER_STATUS_LABELS`, `resolveOrderStatus`, `canTransitionOrder`, `orderStatusBadgeClass`, `orderStatusLabel`, `ORDER_STATUS_TRANSITIONS` |
| `messagingStatus` | `MESSAGING_STATUS_TRANSITIONS`, `resolveMessagingStatus`, `formatMessagingStatus`, `messagingIsOpen`, `messagingIsResolved`, `isMessagingResolvable`, `messagingStatusTransitions`, `canTransitionMessaging`, `messagingMatchesTab`, `messagingStatusColor` |
| `messagingParticipant` | `participantInitials`, `participantName`, `participantLabel`, `participantAvatar` |

### Messaging status

The messaging components share one status model. `open`/`in_progress` count as
open; `resolved`/`closed` count as resolved. Transitions are:

```ts
MESSAGING_STATUS_TRANSITIONS = {
  open: ["in_progress", "resolved", "closed"],
  in_progress: ["resolved", "closed"],
  resolved: [],
  closed: [],
}
```

Colours: open → `warning`, in_progress → `primary`, resolved → `success`,
closed → `neutral`. Use `messagingMatchesTab(tab, status)` for inbox filtering
and `messagingStatusTransitions(status)` to build a status menu.

### Messaging participants

`participantName(participant)` falls back to email and then `"Unknown"`;
`participantInitials(firstName, lastName)` returns up to two uppercase letters
or `"?"`; `participantAvatar(row)` returns `{ src?, alt, text }` ready for
`UAvatar`.

## Types

From `@opeolluwa/ryder/types`:

| Domain | Main types |
| ------ | ---------- |
| Complaint | `Complaint`, `ComplaintReply`, `ComplaintRow`, `ComplaintCustomer`, `ComplaintStatus`, `ComplaintWritableStatus`, `ComplaintsInboxTab`, `CreateComplaintPayload`, `COMPLAINT_STATUSES`, `COMPLAINTS_INBOX_TABS` |
| Order | `Order`, `OrderItem`, `OrderDelivery`, `OrderProduct`, `OrderPrice`, `OrderStatus`, `OrderListTab`, `ORDER_STATUSES` |
| Messaging | `Conversation`, `ConversationReply`, `ConversationParticipant`, `ConversationRow`, `ConversationOrder`, `MessagingStatus`, `MessagingWritableStatus`, `MessagingInboxTab`, `ThreadParty`, `CreateConversationPayload`, `MESSAGING_STATUSES`, `MESSAGING_INBOX_TABS` |
| Notifications | `NotificationItem`, `isNotificationUnread` |
| Notes | `UploadImage` |
| Search | `SearchResultItem`, `SearchSection` |

The status enums are `snake_case` on the wire — match them exactly, then format
for display with the status helpers.

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
