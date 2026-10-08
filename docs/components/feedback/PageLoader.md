<script setup lang="ts">
import Basic from "../../examples/feedback/PageLoaderBasic.vue";
</script>

# PageLoader

A centered, CSS-only spinner for the first paint of a route (or any blocking
load). No state, no props — drop it in and remove it when the data arrives.

```vue
<script setup lang="ts">
import RyderPageLoader from "@opeolluwa/ryder/components/feedback/PageLoader.vue"
</script>

<template>
  <RyderPageLoader />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/feedback/PageLoaderBasic.vue

## Props

None.

## Emits

None.

## Slots

None.

## Notes

- The spinner is `h-[70vh]` and centers itself; the ring is painted with
  `var(--color-primary)`, so it follows your theme's primary colour (and dark
  mode) automatically.
- The root accepts class fall-through — the playground renders it as
  `<RyderPageLoader class="h-16" />` to keep it small in a page section.
  Remember conflicting height utilities resolve by stylesheet order, not class
  order, so prefer an override that does not collide.
- Pure CSS (scoped `<style>`); no Nuxt or icon dependencies.