# Changelog

All notable changes to **@opeolluwa/ryder**.

## [1.2.0] - 2026-10-07

De-branded the package: docs, doc-comments and demo data no longer reference
the original apps. Behaviour is unchanged.

- **Metadata**: `package.json` description is generic; `Logo` default `alt` is
  `logo`.
- **README**: rewritten as a standalone kit guide — original-app links, the
  two-app migration playbook and app-specific prose removed; install URLs use
  `github:opeolluwa/ryder`.
- **Source doc-comments**: provenance comparisons ("the console's default",
  "the client used …") rewritten as neutral behaviour docs across 18 files.
- **Playground**: fixture emails use `example.com`; default API base is
  `http://localhost:4000`.

## [1.1.0] - 2026-10-07

Breaking rename of the package and its `Shared*` brand.

- **Package**: `@weangel/shared` → `@opeolluwa/ryder`. Consumer dependency
  keys, `modules`, `build.transpile` and every import specifier change to
  `"@opeolluwa/ryder": "github:opeolluwa/ryder#v1.1.0"`.
- **Module**: `meta.name` → `@opeolluwa/ryder`; `configKey` `shared` → `ryder`
  (no app sets either key today, so `nuxt.config` needs no change).
- **Component prefix**: `Shared*` → `Ryder*` (`<SharedButton>` →
  `<RyderButton>`); file names under `src/components/` are unchanged.
- **Layouts**: `SharedDefault`/`SharedAuth`/`SharedShell`/`SharedSettings` →
  `RyderDefault`/`RyderAuth`/`RyderShell`/`RyderSettings`, including the files
  under `src/layouts/` and the paths apps import.
- **Unchanged**: composables, utils, `createApiPlugin`, exports and the
  component set.

## [1.0.0] - 2026-10-06

First release. Every duplicated plugin, layout, component, composable and util
merged into one package (the hardened version wins divergences; the rest
survive as optional props/slots).

- **Module**: `src/module.mjs` registers `Shared*` components and the
  `SharedDefault`/`SharedAuth`/`SharedShell`/`SharedSettings` layouts, and
  transpile the package source. Layouts are registered through re-export
  templates so their relative imports resolve from `src/`, not from `.nuxt/`.
- **Components** (12): `Button`, `Input`, `Select`, `EmptyState`, `PageHeader`,
  `Fab`, `Logo`, `PageLoader`, `CreateDialog`, `Dialog`, `BottomSheet`,
  `SideNav` — each app-aware through props/slots; no `~/` imports.
- **Layouts** (4):
  - `SharedShell` — dashboard chrome (sidebar, search ⌘F, breadcrumbs via
    `useBreadcrumbItems`, offline banner, avatar menu) with app-specific
    chrome (badge, bottom nav, custom bell) as slots.
  - `SharedSettings` — the settings tab rail, tabs supplied by the app.
  - `SharedAuth` — `split` and `centered` variants.
  - `SharedDefault` — the bare app shells as slots.
- **Composables** (7): `useAuth`, `useLogin`, `useLogout`, `useVerifyOtp`
  (options-based; no Pinia imports; `AuthSession` injection contract),
  `useMobileNav`, `useIsMobile`, `usePlatform`.
- **Utils** (6 + barrel): `apiError`, `date`, `image`, `number`, `formatPrice`,
  `settingsTabs`.
- **Plugin**: `createApiPlugin()` factory — hardened defaults (timeout 27500,
  bearer attach, live refresh, `ApiError` rejections with status, reachability
  hooks, guarded 401 teardown), app divergences as options; exports
  `NETWORK_REQUEST_TIMEOUT`, `UPLOADS_TIMEOUT`, `UPLOAD_LIMIT_SIZE`,
  `AUTH_ENTRY_ENDPOINTS`.
- **Playground**: a Nuxt 4 app mounting every layout and component; `lint` +
  `build:playground` wired into GitHub Actions.

Stays app-local (never shared): `queryKeys`, `queryStaleTimes`,
`queryPlaceholder`, `orderStatus`, app `graphql.ts` and app `auth.ts`.
