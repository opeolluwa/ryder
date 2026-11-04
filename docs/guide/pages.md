# Search page

`@opeolluwa/ryder/pages/Search.vue` renders grouped search results. The app
keeps its queries and passes the rows in; the page only presents them.

## Usage

```vue
<script setup lang="ts">
import SearchPage from "@opeolluwa/ryder/pages/Search.vue"
import type { SearchSection } from "@opeolluwa/ryder/types"

const sections = computed<SearchSection[]>(() => /* filter your cached rows */ [])
</script>

<template>
  <SearchPage :sections="sections" :loading="loading" @back="goBack" />
</template>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `sections` | `SearchSection[]` | `[]` | Grouped matches built by the app. |
| `loading` | `boolean` | `false` | Shows `PageLoader` while the first pass runs. |
| `query` | `string \| undefined` | route `?q=` | Term to match and highlight. |
| `noQueryMessage` | `string` | "Use the search bar above…" | Shown before a term is entered. |
| `emptyIcon` | `string` | `"heroicons:magnifying-glass"` | Empty-state icon. |
| `emptyTitle` | `string` | `"No result found"` | Empty-state title. |
| `emptyDescription` | `string` | `"Try a different search term."` | Empty-state description. |
| `emptyActionLabel` | `string` | `"Go back"` | Empty-state action label; omit to hide the action. |

## Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `back` | `[]` | The empty-state action was clicked. |

## Behavior

- No `query` (and no `?q=`): renders `noQueryMessage` and does not show a
  loader or empty state.
- `loading`: renders `PageLoader` before the empty/result branches.
- No sections: renders `EmptyState` with the configurable copy and action.
- Results: one section card per group, with an optional "View all" button when
  `viewAllTo` is set.

The page only calls `@back` when the host did **not** wire one: with a listener,
the host owns navigation; without one, it calls `router.back()` when there is
history and otherwise `navigateTo("/")`.

## Types

### `SearchResultItem`

| Field | Type | Description |
| ----- | ---- | ----------- |
| `title` | `string` | Row title; highlighted against the query. |
| `subtitle` | `string?` | Secondary line. |
| `badge` | `string?` | Optional trailing badge. |
| `to` | `string` | Route the row navigates to. |

### `SearchSection`

| Field | Type | Description |
| ----- | ---- | ----------- |
| `key` | `string` | Stable section key. |
| `title` | `string` | Section heading. |
| `count` | `number` | Shown beside the heading; may differ from `items.length` when capped. |
| `items` | `SearchResultItem[]` | Rows. |
| `viewAllTo` | `string?` | Optional "View all" target. |

## Matching helpers

`@opeolluwa/ryder/utils` ships the search text helpers so every consumer
matches and emphasises the same way:

- `normalize(text)` — lower-cased, trimmed; `null`/`undefined` collapse to `""`.
- `escapeHtml(text)` — safe interpolation into `v-html`.
- `truncate(text, max = 120)` — clip with an ellipsis.
- `highlight(text, query)` — HTML with every `query` match wrapped in `<mark>`;
  escapes first so user text can never become markup.

```ts
import { highlight, normalize, truncate } from "@opeolluwa/ryder/utils"

const matches = rows.filter((row) =>
  normalize(row.title).includes(normalize(term)),
)

const title = highlight(row.title, term)
```
