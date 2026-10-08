<script setup lang="ts">
import Basic from "../../examples/typography/TypographyBasic.vue";
</script>

# SubText

The muted supporting line: a plain `<p>` with a soft grey colour and a
comfortable `leading-6`. Pair it with `LeadingText` for title + description
blocks (see `AuthHeader`).

```vue
<script setup lang="ts">
import RyderSubText from "@opeolluwa/ryder/components/typography/SubText.vue"
</script>

<template>
  <RyderSubText>Due before 5 pm today.</RyderSubText>
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/typography/TypographyBasic.vue

## Props

None.

## Emits

None.

## Slots

| Slot | Props | Content |
| ---- | ----- | ------- |
| `default` | — | Paragraph text. |

## Notes

- Renders `text-gray-500 leading-6` — it stays a normal `<p>`, so block content
  (lists, links) can go inside the slot without extra markup.