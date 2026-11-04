# Layouts

The module registers seven layouts by name:

`RyderDefault`, `RyderAuth`, `RyderShell`, `RyderSettings`, `RyderSplitLayout`,
`RyderCenteredLayout`, `RyderComplaint`.

## Layouts are app-side adapters

None of the layouts import app code (`~/data`, stores, queries) — data arrives
through props and slots, so the shared SFCs stay clean. The app keeps its own
layout name and file; that file becomes a thin adapter around the shared
component, and `layout: "dashboard"` in pages stays exactly as it is.

`RootLayout`/page meta also supports `layout: { name, props }` on newer Nuxt
builds for static props.

```vue
<!-- app/layouts/dashboard.vue -->
<script setup lang="ts">
import RyderShell from "@opeolluwa/ryder/layouts/RyderShell.vue"
import { navItems } from "~/data/navigation"

const user = useUserInformationStore()
</script>

<template>
  <RyderShell
    :nav-items="navItems"
    :user="{ name: user.fullName, avatar: { src: user.avatar } }"
    @logout="user.logout"
  >
    <slot />
  </RyderShell>
</template>
```

## RyderShell

The full application chrome: dashboard sidebar, header search, breadcrumbs,
notifications bell, user dropdown and mobile navigation.

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `navItems` | `any[]` | `[]` | Sidebar menu for `UNavigationMenu`; the app computes it. |
| `user` | `ShellUser` | `{}` | Header identity: `name` and `avatar` (`src`, `text`, `alt`, `icon`). |
| `notificationsUnreadCount` | `number` | `0` | Unread badge on the default bell. |
| `rootPath` | `string` | `"/"` | Back-button fallback when history is empty. |
| `profilePath` | `string` | `"/settings/profile"` | Dropdown "Profile" target. |
| `settingsPath` | `string` | `"/settings"` | Dropdown "Settings" target. |
| `avatarPath` | `string` | `"/settings/profile"` | Mobile avatar tap target. |
| `searchPath` | `string` | `"/search"` | Search submit target (`` `${searchPath}?q=` ``). |
| `notificationsPath` | `string` | `"/notifications"` | Notifications bell target. |
| `contentClass` | `string` | `""` | Extra classes on the page content wrapper (e.g. `pb-28` for a tab bar). |
| `fixedHeight` | `boolean` | `false` | Stops the shell's `main` from scrolling so in-page panes own scrolling. |
| `showSearch` | `boolean` | `true` | Show the header search input. |

### Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `logout` | `[]` | Sign-out requested from the sidebar footer or user dropdown. |

### Slots

| Slot | Content |
| ---- | ------- |
| `default` | Page content. |
| `sidebar-brand` | Brand block at the top of the sidebar. |
| `mobile-nav` | Replaces the default mobile navigation. |
| `notifications` | Replaces the default bell. |
| `actions` | Extra header actions beside search. |
| `bottom` | Content after the page wrapper. |
| `offline` | Replaces the default offline banner. |

Any slot matching a navigation item name is forwarded to `UNavigationMenu`, so
an app can add a cart badge or custom item content.

Shell extras: breadcrumbs derived from the route (with `hideBreadcrumb`, `back`,
`backTo`, `breadcrumb.title` meta), `⌘F`-focused search via `searchPath?q=`, an
offline banner on a real disconnect (`useOnline`), and a sign-out footer.

## RyderSettings

Settings shell with a sidebar rail and a content card.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `tabs` | `SettingsTab[]` | `[]` | Tab list supplied by the app. |
| `basePath` | `string` | `"/settings"` | Path whose default tab is active when nothing deeper matches. |
| `defaultTabKey` | `string` | `"profile"` | Tab shown at `basePath` itself. |
| `wrapperLayout` | `string` | `"dashboard"` | Shell layout wrapped around the settings panes. |
| `heading` | `string` | `"Settings"` | Eyebrow above the tab list. |

Slots: `default` (the active settings page). The active tab is derived from the
route with `settingsTabForPath`.

## RyderAuth

Split or centered auth screen.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `variant` | `"split" \| "centered"` | `"split"` | Split image/form or full-bleed image with a floating card. |
| `src` | `string` | `"/bg.jpg"` | Background image. |
| `fallbackSrc` | `string` | `"/bg.jpg"` | Used when the primary image fails to load. |

Slots:

| Slot | Used by | Content |
| ---- | ------- | ------- |
| `default` | both | The form/card body. |
| `side` | `split` | Frosted card over the image panel. |
| `header` | `centered` | Top brand/help bar. |
| `hero` | `centered` | Copy over the background image. |
| `footer` | both | Fine print below the card. |

The split variant adds router back/forward buttons over the image panel.

## RyderDefault

The bare shell: a plain `<main>` with app chrome supplied as slots.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `wrapperClass` | `string` | `""` | Classes on the outer wrapper. |
| `mainClass` | `string` | `""` | Classes on `<main>` (e.g. padding under a fixed header). |

Slots: `header`, `default`, `footer`, `bottom`.

## RyderSplitLayout

A standalone split screen: a 5-column grid from `lg` up, with the image panel on
the left and a scrollable content column on the right. Below `lg` the image is
hidden and only the content column renders.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `src` | `string` | `"/bg.jpg"` | Background image. |
| `fallbackSrc` | `string` | `"/bg.jpg"` | Used when the primary image fails. |
| `showNav` | `boolean` | `false` | Show back/forward buttons over the image panel. |

Slots:

| Slot | Content |
| ---- | ------- |
| `default` | Right-hand content column. |
| `frost` | Frosted card over the image; only rendered when provided. |
| `footer` | Fine print under the content. |

It is a standalone extraction of the console's split auth layout, without the
hardcoded quotes widget.

## RyderCenteredLayout

A centered card over a full-bleed background image.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `bg` | `string` | `"/bg.jpg"` | Background image. |
| `fallbackBg` | `string` | `"/bg.jpg"` | Used when the primary image fails. |

Slots:

| Slot | Content |
| ---- | ------- |
| `header` | Top bar (desktop only). |
| `hero` | Left-panel copy (desktop only). |
| `default` | The centered card. |
| `footer` | Caption under the card. |

## RyderComplaint

A message-thread shell: the full `RyderShell` from `lg` up, and minimal mobile
chrome below it.

The split exists because a thread page owns its own scroll regions (the message
list, the composer), so the mobile branch is a non-scrolling host that hands a
definite height to the slot; a scrolling `main` would fight the page's inner
`overflow-y-auto` panes. Its mobile height comes from
`useVisualViewportHeight`, so it also shrinks when the keyboard opens and keeps
the composer visible.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `navItems` | `any[]` | `[]` | Forwarded to `RyderShell`. |
| `user` | `ShellUser` | `{}` | Forwarded to `RyderShell`. |
| `notificationsUnreadCount` | `number` | `0` | Forwarded to `RyderShell`. |
| `rootPath` | `string` | `"/"` | Shell back-button fallback. |
| `profilePath` | `string` | `"/settings/profile"` | Dropdown "Profile" target. |
| `settingsPath` | `string` | `"/settings"` | Dropdown "Settings" target. |
| `avatarPath` | `string` | `"/settings/profile"` | Mobile avatar target. |
| `searchPath` | `string` | `"/search"` | Search submit target. |
| `notificationsPath` | `string` | `"/notifications"` | Notifications target. |
| `contentClass` | `string` | `"!p-0 h-[calc(100dvh-4rem)]"` | Classes on the shell content wrapper; defaults to a full-height thread area. |
| `fixedHeight` | `boolean` | `true` | Stops the shell's `main` from scrolling. |
| `mobileTitle` | `string` | `""` | Title in the minimal mobile header. |
| `fallbackPath` | `string` | `"/"` | Mobile back target when history and `backTo` meta are absent. |
| `showSearch` | `boolean` | `true` | Forwarded to `RyderShell`. |

### Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `logout` | `[]` | Forwarded from the desktop shell. |

### Slots

| Slot | Content |
| ---- | ------- |
| `default` | Thread page content (desktop shell and mobile host). |
| `sidebar-brand` | Forwarded to the desktop shell. |

Mobile back shows only when `route.meta.back === true`; it then calls
`router.back()` when history exists, otherwise `route.meta.backTo` or
`fallbackPath`. Without `meta.back`, the button always goes to `fallbackPath`.

## Verification

Run the docs build after changing a layout or its docs:

```sh
npm run docs:build
npm run typecheck
```
