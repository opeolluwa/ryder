<script setup lang="ts">
import Basic from "../../examples/primitives/CardBasic.vue";
</script>

# Card

Simple container for grouping content with optional title, header, and trailing slots.

```vue
<script setup lang="ts">
import RyderCard from "@opeolluwa/ryder/components/primitives/Card.vue"
</script>

<template>
  <RyderCard title="Title">
    Content here
  </RyderCard>
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/primitives/CardBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `title` | `string` | `undefined` | Optional card title displayed in header. |

## Emits

None.

## Slots

| Slot | Props | Content |
| ---- | ----- | ------- |
| `header` | — | Overrides default header (title area). |
| `trailing` | — | Content placed on right side of header. |
| `default` | — | Main card content. |

## Notes

- Header is only rendered if `title` or `header`/`trailing` slots are present.
- Uses Tailwind classes for borders, background and dark mode.
