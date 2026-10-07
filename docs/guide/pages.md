# Search page

`@opeolluwa/ryder/pages/Search.vue` renders grouped search results. The app
keeps its queries and passes the rows in; the page only presents them.

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

Props: `sections`, `loading`, `query` (defaults to the route's `?q=`),
`noQueryMessage`, `emptyIcon`, `emptyTitle`, `emptyDescription`,
`emptyActionLabel`.

Emits `back` — wire it to override the default back navigation.

## Types

- `SearchResultItem` — one row: `title`, optional `subtitle`/`badge`, and a
  `to` route the row navigates to.
- `SearchSection` — a grouped block: `key`, `title`, `count`, `items[]`, and an
  optional `viewAllTo`. `count` is shown beside the heading and may differ from
  `items.length` when a section is capped for display.

## Matching helpers

`@opeolluwa/ryder/utils` ships the search text helpers so every consumer
matches and emphasises the same way:

- `normalize(text)` — lower-cased, trimmed; `null`/`undefined` collapse to `""`.
- `escapeHtml(text)` — safe interpolation into `v-html`.
- `truncate(text, max = 120)` — clip with an ellipsis.
- `highlight(text, query)` — HTML with every `query` match wrapped in `<mark>`;
  escapes first so user text can never become markup.