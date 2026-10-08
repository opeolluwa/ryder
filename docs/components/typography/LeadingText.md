<script setup lang="ts">
import Basic from "../../examples/typography/TypographyBasic.vue";
</script>

# LeadingText

The kit's primary heading: a capitalized `<h1>` with responsive sizing — used
by `AuthHeader`, page sections and anywhere a title should read as a title
without any heading-level plumbing.

```vue
<script setup lang="ts">
import RyderLeadingText from "@opeolluwa/ryder/components/typography/LeadingText.vue"
</script>

<template>
  <RyderLeadingText>order #1042 is on the way</RyderLeadingText>
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
| `default` | — | Heading text. |

## Notes

- Always renders an `<h1>` with `first-letter:capitalize`, `text-2xl lg:text-3xl`
  and `font-semibold`. If the surrounding page already has an `h1`, nest this
  where your heading order allows (or use it once per page).