# Getting started

`@opeolluwa/ryder` is a shared Nuxt 4 UI kit: components, layouts, composables,
utils and a `$api` plugin extracted from duplicated app code and published as
one package. Consumer apps keep their own thin adapters; the kit never imports
app code.

## Install

Install the git dependency and add the module:

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

## Private-install auth

If the repo is private, a bare `github:` npm install needs credentials. Use the
GitHub CLI once per machine:

```sh
gh auth login
gh auth setup-git
```

`setup-git` wires git-over-HTTPS auth so npm's git installs resolve. The git SHA
is recorded in the consumer's `package-lock.json`; the annotated `vX.Y.Z` tag
picks the release (see [Contributing](/guide/development)).