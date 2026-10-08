<script setup lang="ts">
import Basic from "../../examples/primitives/LogoBasic.vue";
</script>

# Logo

Brand logo link that shows light/dark variants. Built with NuxtLink and img elements.

```vue
<script setup lang="ts">
import RyderLogo from "@opeolluwa/ryder/components/primitives/Logo.vue"
</script>

<template>
  <RyderLogo to="/" />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/primitives/LogoBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `src` | `string` | `"/extended-logo-white.png"` | Light-mode logo image. |
| `srcDark` | `string` | `"/extended-logo-green.png"` | Dark-mode logo image. |
| `alt` | `string` | `"logo"` | Image alt text. |
| `to` | `string` | `"/"` | Destination URL for NuxtLink. |

## Emits

None.

## Slots

None.

## Notes

- Hidden in dark mode via `dark:hidden` on light image; shown in dark via `dark:block`.
- Defaults point to images that may not exist in docs; demo uses inline SVG data URIs as fallback.
