# Getting started

`@opeolluwa/ryder` is a shared Nuxt 4 UI kit: components, layouts, composables,
utils and a `$api` plugin extracted from duplicated app code and published as
one package. Consumer apps keep their own thin adapters; the kit never imports
app code.

## Requirements

- Nuxt `>= 4.1.0`
- Vue `3.5+`
- Tailwind CSS v4
- The peer dependencies you actually use: `@nuxt/ui`, `@vueuse/core`, `axios`,
  `konsta` (only for `BottomNav`/`PullToRefresh`), `valibot`, and the
  `@domternal/*` editor packages (only for `Editor`).

## Install

```sh
npm install github:opeolluwa/ryder#v1.6.11
```

Or pin it in `package.json`:

```jsonc
"dependencies": {
  "@opeolluwa/ryder": "github:opeolluwa/ryder#v1.6.11"
}
```

Consumers pin tags by exact SHA in the lockfile.

## Register the module

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@opeolluwa/ryder"],
  css: ["~/assets/css/main.css"],
  ryder: {
    components: true,
    layouts: true,
    prefix: "Ryder",
  },
})
```

The module:

- installs `@nuxt/ui`, `@nuxtjs/color-mode`, `@vueuse/nuxt` and
  `nuxt-seo-utils` only when the app has not registered them;
- registers the components under the `Ryder` prefix (`RyderButton`,
  `RyderMessagingList`, …);
- registers the seven layouts;
- transpiles the package and adds its source to Tailwind's content scan.

You do not need to repeat `build.transpile` for the package. Keep your own
entry if you already have one.

## Add the theme

Nuxt UI + Tailwind v4 need one stylesheet. At minimum:

```css
/* app/assets/css/main.css */
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  --color-primary-500: oklch(66.928% 0.14749 161.18);
  --color-primary-600: oklch(51.285% 0.11091 162.13);
  --color-onyx-700: #070b14;
  /* … */
}
```

See [Theming](/guide/theming) for the full palette and the dark-mode setup.

## Use a component

```vue
<script setup lang="ts">
const value = ref("")
</script>

<template>
  <RyderButton label="Continue" @click="value = 'saved'" />
</template>
```

## Use a layout

The app keeps its own layout name and file; the file is a thin adapter around
the shared layout, so existing `layout: "dashboard"` declarations keep working.

```vue
<!-- app/layouts/dashboard.vue -->
<script setup lang="ts">
import RyderShell from "@opeolluwa/ryder/layouts/RyderShell.vue"
import { navItems } from "~/data/navigation"
</script>

<template>
  <RyderShell :nav-items="navItems">
    <slot />
  </RyderShell>
</template>
```

See [Layouts](/guide/layouts) for props, emits and slots.

## Use the API plugin

```ts
// app/plugins/api.ts
import { createApiPlugin } from "@opeolluwa/ryder/plugins/api"

export default createApiPlugin()
```

`createApiPlugin` already returns a Nuxt plugin. Pass app hooks such as
`getToken`, `refreshToken` and `onSessionExpired` as options; see
[API plugin](/guide/composables-utils#api-plugin).

## What stays in the app

The package never imports app code. Each app keeps:

- its layout adapters and `~/data` navigation;
- Pinia stores and query clients;
- the `AuthSession` adapter over its token/user stores;
- page-level composition and redirects.

That boundary is what lets one package serve the console and the storefront
without either app's routes leaking into the other.

## Verify

```sh
npm run dev
npm run typecheck
```

Check one page with a shell layout and one with a shared form before shipping a
version bump.
