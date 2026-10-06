# Changelog

All notable changes to **@weangel/shared**.

## [1.0.0] - 2026-10-06

First release. Every duplicated plugin, layout, component, composable and util
from [weangel-client] and [backoffice-console], merged into one package
(console's version wins divergences; client-only features become props/slots).

- **Module**: `src/module.mjs` registers `Shared*` components and the
  `SharedDefault`/`SharedAuth`/`SharedShell`/`SharedSettings` layouts, and
  transpile the package source. Layouts are registered through re-export
  templates so their relative imports resolve from `src/`, not from `.nuxt/`.
- **Components** (12): `Button`, `Input`, `Select`, `EmptyState`, `PageHeader`,
  `Fab`, `Logo`, `PageLoader`, `CreateDialog`, `Dialog`, `BottomSheet`,
  `SideNav` — each app-aware through props/slots; no `~/` imports.
- **Layouts** (4):
  - `SharedShell` — console's `dashboard` layout (sidebar, search ⌘F, breadcrumbs
    via `useBreadcrumbItems`, offline banner, avatar menu) with the client's
    chrome (`cart-trailing` badge, bottom nav, custom bell) as slots.
  - `SharedSettings` — the settings tab rail, tabs supplied by the app.
  - `SharedAuth` — `split` (console) and `centered` (client) variants.
  - `SharedDefault` — the bare app shells as slots.
- **Composables** (7): `useAuth`, `useLogin`, `useLogout`, `useVerifyOtp`
  (options-based; no Pinia imports; `AuthSession` injection contract),
  `useMobileNav`, `useIsMobile`, `usePlatform`.
- **Utils** (6 + barrel): `apiError`, `date`, `image`, `number`, `formatPrice`,
  `settingsTabs`.
- **Plugin**: `createApiPlugin()` factory — the console's default behaviour
  (timeout 27500, bearer attach, live refresh, `ApiError` rejections with
  status, reachability hooks, guarded 401 teardown), client divergences as
  options; exports `NETWORK_REQUEST_TIMEOUT`, `UPLOADS_TIMEOUT`,
  `UPLOAD_LIMIT_SIZE`, `AUTH_ENTRY_ENDPOINTS`.
- **Playground**: a Nuxt 4 app mounting every layout and component; `lint` +
  `build:playground` wired into GitHub Actions.

Not shared (app-local, stay put): `queryKeys`, `queryStaleTimes`,
`queryPlaceholder`, `orderStatus`, `complaintCustomer`, client `graphql.ts`,
console `auth.ts`.

[weangel-client]: https://github.com/opeolluwa/weangel
[backoffice-console]: https://github.com/opeolluwa/backoffice-console