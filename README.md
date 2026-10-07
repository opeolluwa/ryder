# @opeolluwa/ryder

> Renamed from `@weangel/shared` in v1.1.0 — same package,
> new scope/name, and every `Shared*` component/layout is now `Ryder*`.

Ryder Nuxt 4 code for [weangel](https://github.com/opeolluwa/weangel) (the customer
client) and [backoffice-console](https://github.com/opeolluwa/backoffice-console)
(the admin console).

Everything in `src/` that the two apps had independently — components, layouts,
composables, utils and the `$api` plugin — merged into one package. The
**console's copy wins every divergence**; non-conflicting client features survive
as optional props/slots.

## Layout

| Path                | Contents                                          |
| ------------------- | ------------------------------------------------- |
| `src/module.mjs`    | Nuxt module: registers `Ryder*` components + layouts |
| `src/components/`   | `Button Input Select EmptyState PageHeader Fab Logo PageLoader CreateDialog Dialog BottomSheet SideNav` |
| `src/layouts/`      | `RyderDefault RyderAuth RyderShell RyderSettings` |
| `src/composables/`  | `useAuth useLogin useLogout useVerifyOtp useMobileNav useIsMobile usePlatform` + the `AuthSession` contract |
| `src/utils/`        | `apiError date image number formatPrice settingsTabs` |
| `src/plugins/api.ts`| `createApiPlugin()` — the shared `$api` axios plugin factory |
| `playground/`       | A Nuxt 4 app that mounts every layout and renders every component |

## Usage in an app

Install the git dependency and add the module:

```jsonc
// package.json
"dependencies": {
  "@opeolluwa/ryder": "github:opeolluwa/weangel-ui#v1.1.0"
}
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@opeolluwa/ryder"],
  build: { transpile: ["@opeolluwa/ryder"] },
})
```

Both apps already depend on the peer runtime: `@nuxt/ui`, `@vueuse/core`,
`axios`, `konsta`, `nuxt-seo-utils`, `valibot`, `vue`, `nuxt`.

### Private-install auth

The repos are private, so a bare `github:`npm install needs credentials. Use the
GitHub CLI once per machine:

```sh
gh auth login
gh auth setup-git
```

`setup-git` wires git-over-HTTPS auth so npm's git installs resolve. The git SHA
is recorded in each app's `package-lock.json`; the annotated `vX.Y.Z` tag picks
the release (see below).

### Components and layouts

The module adds every component under the prefix `Ryder`:
`<RyderButton>`, `<RyderInput>`, `<RyderSelect>`, `<RyderEmptyState>`,
`<RyderPageHeader>`, `<RyderFab>`, `<RyderLogo>`, `<RyderPageLoader>`,
`<RyderCreateDialog>`, `<RyderDialog>`, `<RyderBottomSheet>`,
`<RyderSideNav>`.

Layouts are registered by name: `RyderDefault`, `RyderAuth`, `RyderShell`,
`RyderSettings`.

**Gotcha — layouts vs. auto-imports:** Nuxt auto-imports the `Ryder*`
components into **pages and app components, but not into app layout files**
(`app/layouts/*.vue`). A layout that renders a shared component must import it
explicitly:

```vue
<script setup lang="ts">
import RyderShell from "@opeolluwa/ryder/layouts/RyderShell.vue"
import RyderSideNav from "@opeolluwa/ryder/components/SideNav.vue"
</script>
```

### Layouts are app-side adapters

None of the layouts import app code (`~/data`, stores, queries) — data comes in
through props/slots, so the shared SFCs stay clean. Each app keeps its own
layout name and file, and the file becomes a thin adapter around the shared
component; `layout: "dashboard"` etc. in pages stays exactly as it is.

`RootLayout`/page meta also supports
[`layout: { name, props }`](https://nuxt.com) on newer Nuxt builds for *static*
props.

- **`RyderShell`** (console `dashboard` layout, with the client's chrome as
  slots): props `navItems`, `user`, `notificationsUnreadCount`, `rootPath`,
  `profilePath`, `settingsPath`, `avatarPath`, `searchPath`, `contentClass`;
  emits `logout`; slots `sidebar-brand`, `mobile-nav`, `notifications`,
  `actions`, `bottom`, `offline`, plus any navigation-item slot (e.g. the
  client's `cart-trailing` badge) forwarded to `UNavigationMenu`.
- **`RyderSettings`**: props `tabs` (a `SettingsTab[]`), `basePath`,
  `defaultTabKey`, `wrapperLayout`, `heading`.
- **`RyderAuth`**: props `variant: "split" | "centered"`, `src`,
  `fallbackSrc`; slots `side` (frosted card), `header`, `hero`, `footer`.
- **`RyderDefault`**: the bare shells, slots `header`, `footer`, `bottom`,
  props `wrapperClass`, `mainClass`.

### Composables & utils are explicit imports

The module does **not** auto-import shared composables/utils — that would
collide with the app-local copies that still exist during the migration. Import
them explicitly:

```ts
import { useLogin, type AuthSession } from "@opeolluwa/ryder/composables"
import { ApiError, getApiErrorMessage } from "@opeolluwa/ryder/utils"
import { createApiPlugin } from "@opeolluwa/ryder/plugins/api"
```

`createApiPlugin` bakes in the console's hardened behaviour (refresh-on-expiry,
status-carrying `ApiError` rejections, reachability hooks, guarded 401 session
teardown) and takes the client's quirks as options (`timeout`, `isTokenValid`,
`refreshToken`, `getToken`, `onSessionExpired`, `onReachable`,
`onUnreachable`, `wrapErrors`). It also exports `NETWORK_REQUEST_TIMEOUT`,
`UPLOADS_TIMEOUT`, `UPLOAD_LIMIT_SIZE` and `AUTH_ENTRY_ENDPOINTS`.

## Migration playbook (per duplicate)

Each app keeps its own copy until the shared one is swapped in, so nothing is
deleted in one go. The order in which merges already landed reflects "console
wins, client features survive as slots".

1. **Bump** the pinned `#vX.Y.Z` (or install the tag a release was cut from).
2. **One duplicate at a time.** Delete an app-local file only after the shared
   version renders in that app.
3. For a **component**: alias the old name to the shared one —
   `import AppButton from "@opeolluwa/ryder/components/Button.vue"` — then delete
   the local file in a later pass.
4. For a **layout**: keep the app's layout file and name; replace its body with
   the shared component bound to app data (see "Layouts are app-side adapters").
   Keep `definePageMeta({ layout })` untouched.
5. For the **plugin**: `export default createApiPlugin(/* app hooks */)`.
   Callers that read `error.response` directly need `wrapErrors: false` until
   they switch to `error instanceof ApiError`.
6. For a **composable**: renaming imports is enough; the app's store/query-layer
   glue stays where it is until a later wave.

Stay client-only (still app-local, in both apps): `queryKeys`, `queryStaleTimes`,
`queryPlaceholder`, `orderStatus`, `complaintCustomer`, the client's
`graphql.ts` and the console's `auth.ts`.

## Development

```sh
npm install
npm run dev            # Nuxt dev on the playground
npm run build:playground
npm run lint
```

## Release flow

Private GitHub repo, semver git tags, consumers pin tags by exact SHA.

1. Bump `version` in `package.json` and summarize under `CHANGELOG.md`.
2. Create the release: `gh release create v1.2.0` (this also tags `main` when
   run from a lightweight tag flow, or tag first, then release).
3. Let GitHub Actions pass (`lint` + `build:playground`).
4. In each app, bump `"@opeolluwa/ryder": "github:opeolluwa/weangel-ui#vX.Y.Z"`
   and `npm install` to record the new SHA.

```sh
git tag -a v1.0.0 -m "v1.0.0"
git push origin main --follow-tags
gh release create v1.0.0 --generate-notes --title "v1.0.0"
```