# @opeolluwa/ryder

Shared Nuxt 4 UI kit: components, layouts, composables, utils and a `$api`
plugin extracted from duplicated app code and published as one package.
Consumer apps keep their own thin adapters; the kit never imports app code.

## Quick start

```jsonc
// package.json
"dependencies": {
  "@opeolluwa/ryder": "github:opeolluwa/ryder#v1.3.0"
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

## Docs

Guides live in the [docs site](./docs/guide/getting-started.md) —
components, layouts, the search page, composables/utils and the release flow.

## Contributing

```sh
npm install
npm run dev            # Nuxt dev on the playground
npm run lint
npm run typecheck
```

A `Justfile` wraps the same commands (`just dev`, `just lint`, ...). See the
[contributing guide](./docs/guide/development.md) for the release flow.