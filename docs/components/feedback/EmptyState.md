<script setup lang="ts">
import Basic from "../../examples/feedback/EmptyStateBasic.vue";
import Compact from "../../examples/feedback/EmptyStateCompact.vue";
</script>

# EmptyState

A compact "nothing found" placeholder with an optional action button. Useful
for empty lists/tabs (with `compact`) and full-page "no results" states.

```vue
<script setup lang="ts">
import RyderEmptyState from "@opeolluwa/ryder/components/feedback/EmptyState.vue"
</script>

<template>
  <RyderEmptyState
    title="Nothing matched"
    description="Adjust the filters and try again."
    action-label="Clear filters"
    @action="clear"
  />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/feedback/EmptyStateBasic.vue

`compact` reduces the height from `h-[60vh]` to `h-56` (use inside a panel):

<Demo>

<Compact />

</Demo>

<<< @/examples/feedback/EmptyStateCompact.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `title` | `string` | — | Required; heading text. |
| `description` | `string` | — | Required; explanatory text. |
| `icon` | `string` | `"heroicons:users"` | Icon name rendered by Nuxt UI's `UIcon`. |
| `actionLabel` | `string \| undefined` | `undefined` | When present, a `RyderButton` appears and emits `action`. |
| `compact` | `boolean` | `false` | If `true`, `h-56`; else `h-[60vh]`. |
| `ui` | `{ root?: string; title?: string; description?: string; iconWrapper?: string; icon?: string; actionLabel?: string }` | `{}` | Class-concat map merged onto each element of the block. |

## Emits

| Event | Payload | When |
| ----- | ------- | ---- |
| `action` | — | The action button was tapped. |

## Slots

None.

## Notes

- `title` and `description` are required — rendering a label-less empty state
  would be confusing for screen readers.
- The `ui` prop is a concatenation, not an override: a class that collides with
  the internal classes resolves by stylesheet order, so use the `!` modifier to
  win. Within `ui`, `icon` is the glyph and `iconWrapper` the tinted square
  behind it — usually restyled together, and the square carries the tint.