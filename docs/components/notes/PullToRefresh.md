<script setup lang="ts">
import Basic from "../../examples/notes/PullToRefreshBasic.vue";
</script>

# PullToRefresh

Touch pull-to-refresh gesture for a scrollable area: pulling from the top shows
a konsta preloader, and releasing past the threshold emits `refresh`.

```vue
<script setup lang="ts">
import RyderPullToRefresh from "@opeolluwa/ryder/components/notes/PullToRefresh.vue"
</script>

<template>
  <div class="h-64 overflow-y-auto">
    <RyderPullToRefresh :threshold="64" @refresh="load">
      <!-- scrollable content -->
    </RyderPullToRefresh>
  </div>
</template>
```

## Examples

Touch-only — this demo does nothing with a mouse:

<Demo>

<Basic />

</Demo>

<<< @/examples/notes/PullToRefreshBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `threshold` | `number` | `64` | Pull distance, in pixels, that triggers a refresh. Read **once** at setup — changing it later has no effect. |

## Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `refresh` | `[]` | The gesture completed; run your reload here. |

## Slots

| Slot | Props | Content |
| ---- | ----- | ------- |
| `default` | — | The scrollable content, placed inside the pull container. |

## Notes

- Touch-only: `touchstart` / `touchmove` / `touchend` listeners (all passive)
  are attached to the container; mouse and trackpad drags do nothing.
- The gesture only starts when the container itself is at `scrollTop === 0`,
  and the live distance is `delta × 0.5`, capped at `threshold × 1.5`.
- Put it in a fixed-height `overflow-y-auto` box (as in the example) so there
  is a scroll area to pull against.
- The indicator is konsta's `kPreloader`: `w-5 h-5` while pulling, `w-6 h-6`
  once it is refreshing and the distance has reached 64px — that size check is
  hardcoded to 64, not to `threshold`.
- The composable (`usePullToRefresh`) resets the distance in a `finally`, so a
  failed refresh cannot leave the bar stuck.
- `refresh` is emitted from an internal handler that only awaits the emit
  itself, so the preloader hides as soon as it returns — your handler does not
  hold the spinner open.
