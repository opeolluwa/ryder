# Layouts

Layouts are registered by name: `RyderDefault`, `RyderAuth`, `RyderShell`,
`RyderSettings`, `RyderSplitLayout`.

## Layouts are app-side adapters

None of the layouts import app code (`~/data`, stores, queries) — data comes in
through props/slots, so the shared SFCs stay clean. The app keeps its own
layout name and file, and the file becomes a thin adapter around the shared
component; `layout: "dashboard"` etc. in pages stays exactly as it is.

`RootLayout`/page meta also supports
[`layout: { name, props }`](https://nuxt.com) on newer Nuxt builds for *static*
props.

## RyderShell

App chrome as slots. Props `navItems`, `user`, `notificationsUnreadCount`,
`rootPath`, `profilePath`, `settingsPath`, `avatarPath`, `searchPath`,
`contentClass`; emits `logout`; slots `sidebar-brand`, `mobile-nav`,
`notifications`, `actions`, `bottom`, `offline`, plus any navigation-item slot
(e.g. a cart badge) forwarded to `UNavigationMenu`.

Shell extras: breadcrumbs derived from the route (with a `hideBreadcrumb` /
`back` / `backTo` / `breadcrumb.title` meta contract), `⌘F`-focused search via
`searchPath?q=`, an offline banner on a real disconnect, and a sign-out footer.

## RyderSettings

Props `tabs` (a `SettingsTab[]`), `basePath`, `defaultTabKey`,
`wrapperLayout`, `heading`. The sidebar rail and the content area render
through `RyderCard`; the rail keeps its compact look via class overrides. The
active tab is derived from the route with `settingsTabForPath`.

## RyderAuth

Props `variant: "split" | "centered"`, `src`, `fallbackSrc`; slots `side`
(frosted card), `header`, `hero`, `footer`. `split` is a 5-column grid with the
image panel and router back/forward buttons; `centered` is a full-bleed image
behind a floating card.

## RyderDefault

The bare shell: props `wrapperClass`, `mainClass`; slots `header`, `footer`,
`bottom`. The app passes its own padding/background through the class props.

## RyderSplitLayout

A standalone split screen: a fixed 5-column grid, image panel on the left
(frosted card in the `side` slot) and a scrollable content column on the right —
side-by-side at every width. Props `src`,
`fallbackSrc`, `showNav` (back/forward buttons over the image panel, default
`true`); slots `side`, `footer`. It is a standalone extraction of the console's split auth
layout, without the hardcoded quotes widget.