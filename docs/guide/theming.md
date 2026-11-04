# Theming

Ryder has no theme config of its own. It is a set of plain SFCs, so it inherits
whatever Nuxt UI + Tailwind v4 theme the host app defines. That keeps the
package components, the host's components and any app-local components on one
palette.

## Requirements

- Tailwind CSS v4, once, in the app's stylesheet.
- Nuxt UI (the module installs `@nuxt/ui` when it is absent).
- A `primary` colour and an `onyx` dark palette.

The components use Nuxt UI semantic colours (`primary`, `success`, `warning`,
`error`, `neutral`) and `onyx-*` for dark surfaces, plus standard Tailwind
utilities. Defining `--color-primary-*` and `--color-onyx-*` is enough for the
default look.

## Theme file

Put this in the app's CSS entry (for example `app/assets/css/main.css`):

```css
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  --font-sans: "Lato", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Poppins", ui-sans-serif, system-ui, sans-serif;

  --color-primary: oklch(66.928% 0.14749 161.18);
  --color-primary-50: oklch(89.797% 0.13463 168.42);
  --color-primary-100: oklch(88.75% 0.14857 167.43);
  --color-primary-200: oklch(87.036% 0.17158 164.58);
  --color-primary-300: oklch(86.059% 0.18836 161.41);
  --color-primary-400: oklch(77.693% 0.17164 161.11);
  --color-primary-500: oklch(66.928% 0.14749 161.18);
  --color-primary-600: oklch(51.285% 0.11091 162.13);
  --color-primary-700: oklch(34.294% 0.07192 163.42);
  --color-primary-800: oklch(14.757% 0.02506 175.02);
  --color-primary-900: oklch(0% 0 none);
  --color-primary-950: oklch(0% 0 none);

  --color-onyx-50: #e0e6f2;
  --color-onyx-100: #b8c4e0;
  --color-onyx-200: #8a9dc6;
  --color-onyx-300: #5e7aab;
  --color-onyx-400: #375990;
  --color-onyx-500: #0d1220;
  --color-onyx-600: #0a0f1c;
  --color-onyx-700: #070b14;
  --color-onyx-800: #04070d;
  --color-onyx-900: #020407;
  --color-onyx-950: #010203;
}
```

These are the exact tokens the docs site uses; they are a starting point, not a
required brand. Swap the OKLCH values for your own scale and keep the numbering.

If the app already themes a different token name, map it:

```css
@theme {
  --color-primary-500: var(--color-brand-500);
  --color-primary-600: var(--color-brand-600);
  /* … */
}
```

## Module setup

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

The module installs `@nuxt/ui`, `@nuxtjs/color-mode` (`classSuffix: ""`),
`@vueuse/nuxt` and `nuxt-seo-utils` only when the app has not registered them
already. It also adds the package's `src/` directory as a Tailwind `@source`, so
the components' utility classes survive content scanning.

## Dark mode

Dark mode is class-based (`.dark` on `<html>`), matching `@nuxtjs/color-mode`
with `classSuffix: ""`. The components only use dark variants on surfaces and
text; no app-level theme state is required beyond the standard Nuxt UI colour
mode button.

If the app overrides `classSuffix`, align it with Tailwind's `dark` variant:

```css
@variant dark (&:is(.dark, .dark *));
```

## Overriding a component

Every component accepts `class` and passes it through to its root (or the
relevant Nuxt UI control). Prefer this for one-off layout adjustments; use the
theme tokens for palette changes.

```vue
<RyderButton class="w-full" label="Continue" />
```

For a structural change, copy the SFC from `src/components` into the app and
adjust it there — do not fork the palette just to move a border.

## Konsta

`konsta` is an optional peer: install it only if you use `BottomNav` or
`PullToRefresh`, the two components that import `konsta/vue` directly. Other
components use Nuxt UI + Konsta-free markup. Apps that use it should import its
theme CSS once:

```css
@import "konsta/vue/theme.css";
```

## Verifying

```sh
npm run docs:build
npm run typecheck
```

If colours are missing in a consuming app, check in this order:

1. `@import "tailwindcss"` and `@import "@nuxt/ui"` are both in the app CSS.
2. `--color-primary-*` and `--color-onyx-*` are inside `@theme`.
3. The CSS entry is listed in `nuxt.config.ts` `css`.
4. The app did not register `@nuxt/ui` twice with conflicting options.
