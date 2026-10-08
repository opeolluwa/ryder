<script setup lang="ts">
import Basic from "../../examples/navigation/FabBasic.vue";
</script>

# Fab

Floating action button — konsta's `kFab` in ryder colours, fixed to the
bottom-right of the viewport and hidden at `lg` and up (the desktop shell has
its own chrome).

```vue
<script setup lang="ts">
import RyderFab from "@opeolluwa/ryder/components/navigation/Fab.vue"
</script>

<template>
  <RyderFab icon="heroicons:plus" @click="create" />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/navigation/FabBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `icon` | `string \| undefined` | `"heroicons:plus"` | Icon rendered inside the button (ignored when the default slot is used). |

## Emits

| Event | Payload | When |
| ----- | ------- | ---- |
| `click` | `event: MouseEvent` | The button was tapped. |

## Slots

| Slot | Props | Content |
| ---- | ----- | ------- |
| `default` | — | Replaces the icon entirely. |

## Notes

- Position/visibility: `fixed bottom-6 right-7 z-10 lg:hidden` — viewport-level,
  so it floats over whatever you are viewing until you resize past 1024px.
- Konsta dependency (`kFab`); the konsta theme CSS must be loaded.
- `aria-label="Add"` is hardcoded in the component, so screen readers always
  announce "Add" regardless of the icon.