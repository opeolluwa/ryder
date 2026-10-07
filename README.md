# @opeolluwa/ryder

> Renamed from `@weangel/shared` in v1.1.0 — same package,
> new scope/name, and every `Shared*` component/layout is now `Ryder*`.

Shared Nuxt 4 UI kit: components, layouts, composables, utils and a `$api`
plugin extracted from duplicated app code and published as one package.
Consumer apps keep their own thin adapters; the kit never imports app code.

## Layout

| Path                | Contents                                          |
| ------------------- | ------------------------------------------------- |
| `src/module.mjs`    | Nuxt module: registers `Ryder*` components + layouts |
| `src/components/`   | `Button Input Select EmptyState PageHeader Fab Logo PageLoader CreateDialog Dialog BottomSheet SideNav ComplaintList ComplaintListItem ComplaintHeader ComplaintThread ComplaintPreview` |
| `src/layouts/`      | `RyderDefault RyderAuth RyderShell RyderSettings` |
| `src/composables/`  | `useAuth useLogin useLogout useVerifyOtp useMobileNav useIsMobile usePlatform` + the `AuthSession` contract |
| `src/utils/`        | `apiError date image number formatPrice settingsTabs complaintStatus complaintCustomer` |
| `src/plugins/api.ts`| `createApiPlugin()` — the shared `$api` axios plugin factory |
| `playground/`       | A Nuxt 4 app that mounts every layout and renders every component |

## Usage in an app

Install the git dependency and add the module:

```jsonc
// package.json
"dependencies": {
  "@opeolluwa/ryder": "github:opeolluwa/ryder#v1.2.0"
}
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@opeolluwa/ryder"],
  build: { transpile: ["@opeolluwa/ryder"] },
})
```

The consuming app provides the peer runtime: `@nuxt/ui`, `@vueuse/core`,
`axios`, `konsta`, `nuxt-seo-utils`, `valibot`, `vue`, `nuxt`.

### Private-install auth

If the repo is private, a bare `github:` npm install needs credentials. Use the
GitHub CLI once per machine:

```sh
gh auth login
gh auth setup-git
```

`setup-git` wires git-over-HTTPS auth so npm's git installs resolve. The git SHA
is recorded in the consumer's `package-lock.json`; the annotated `vX.Y.Z` tag
picks the release (see below).

### Components and layouts

The module adds every component under the prefix `Ryder`:
`<RyderButton>`, `<RyderInput>`, `<RyderSelect>`, `<RyderEmptyState>`,
`<RyderPageHeader>`, `<RyderFab>`, `<RyderLogo>`, `<RyderPageLoader>`,
`<RyderCreateDialog>`, `<RyderDialog>`, `<RyderBottomSheet>`,
`<RyderSideNav>`, `<RyderComplaintList>`, `<RyderComplaintListItem>`,
`<RyderComplaintHeader>`, `<RyderComplaintThread>`, `<RyderComplaintPreview>`.

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
through props/slots, so the shared SFCs stay clean. The app keeps its own
layout name and file, and the file becomes a thin adapter around the shared
component; `layout: "dashboard"` etc. in pages stays exactly as it is.

`RootLayout`/page meta also supports
[`layout: { name, props }`](https://nuxt.com) on newer Nuxt builds for *static*
props.

- **`RyderShell`**: app chrome as slots — props `navItems`, `user`,
  `notificationsUnreadCount`, `rootPath`, `profilePath`, `settingsPath`,
  `avatarPath`, `searchPath`, `contentClass`; emits `logout`; slots
  `sidebar-brand`, `mobile-nav`, `notifications`, `actions`, `bottom`,
  `offline`, plus any navigation-item slot (e.g. a cart badge) forwarded to
  `UNavigationMenu`.
- **`RyderSettings`**: props `tabs` (a `SettingsTab[]`), `basePath`,
  `defaultTabKey`, `wrapperLayout`, `heading`.
- **`RyderAuth`**: props `variant: "split" | "centered"`, `src`,
  `fallbackSrc`; slots `side` (frosted card), `header`, `hero`, `footer`.
- **`RyderDefault`**: the bare shells, slots `header`, `footer`, `bottom`,
  props `wrapperClass`, `mainClass`.

### Composables & utils are explicit imports

The module does **not** auto-import shared composables/utils — that would hide
the dependency and collide with app-local helpers of the same name. Import
them explicitly:

```ts
import { useLogin, type AuthSession } from "@opeolluwa/ryder/composables"
import { ApiError, getApiErrorMessage } from "@opeolluwa/ryder/utils"
import { createApiPlugin } from "@opeolluwa/ryder/plugins/api"
```

`createApiPlugin` ships hardened defaults (refresh-on-expiry, status-carrying
`ApiError` rejections, reachability hooks, guarded 401 session teardown) and
takes app-specific hooks as options (`timeout`, `isTokenValid`, `refreshToken`,
`getToken`, `onSessionExpired`, `onReachable`, `onUnreachable`, `wrapErrors`).
It also exports `NETWORK_REQUEST_TIMEOUT`, `UPLOADS_TIMEOUT`,
`UPLOAD_LIMIT_SIZE` and `AUTH_ENTRY_ENDPOINTS`.

## Development

```sh
npm install
npm run dev            # Nuxt dev on the playground
npm run build:playground
npm run lint
```

## Release flow

Semver git tags; consumers pin tags by exact SHA.

1. Bump `version` in `package.json` and summarize under `CHANGELOG.md`.
2. Create the release: `gh release create v1.2.0` (this also tags `main` when
   run from a lightweight tag flow, or tag first, then release).
3. Let GitHub Actions pass (`lint` + `build:playground`).
4. In each consumer, bump
   `"@opeolluwa/ryder": "github:opeolluwa/ryder#vX.Y.Z"` and `npm install` to
   record the new SHA.

```sh
git tag -a v1.0.0 -m "v1.0.0"
git push origin main --follow-tags
gh release create v1.0.0 --generate-notes --title "v1.0.0"
```
