<script setup lang="ts">
import Basic from "../../examples/feedback/DialogBasic.vue";
import Scrollable from "../../examples/feedback/DialogScrollable.vue";
</script>

# Dialog

A responsive dialog: at and above 1024px it renders Nuxt UI's `UModal`; below
that it swaps to a konsta-based `BottomSheet` with a drag handle, so one
component serves desktop and mobile.

```vue
<script setup lang="ts">
import RyderDialog from "@opeolluwa/ryder/components/feedback/Dialog.vue"
</script>

<template>
  <RyderDialog v-model:open="open" title="Delete draft?" @after:leave="onClosed">
    <template #body>
      <p>The body slot works on both branches.</p>
    </template>
  </RyderDialog>
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/feedback/DialogBasic.vue

With `scrollable` the header and footer stay pinned while the body scrolls
(desktop only), and the `header`/`footer` slots show their `close` prop:

<Demo>

<Scrollable />

</Demo>

<<< @/examples/feedback/DialogScrollable.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `title` | `string \| undefined` | `undefined` | Heading. The mobile sheet requires it (rendered with the drag handle and close button). |
| `description` | `string \| undefined` | `undefined` | Subtext under the heading. |
| `closeIcon` | `string \| undefined` | `"heroicons:x-mark"` | Close-button icon (desktop `UModal` only). |
| `dismissible` | `boolean` | `true` | Backdrop/close allowed; `false` emits `close:prevent` instead (desktop). |
| `scrollable` | `boolean \| undefined` | `undefined` | Pin the modal header/footer while the body scrolls. No local default — `undefined` falls through to `UModal`, whose own default is `false`. Desktop only. |
| `size` | `string \| undefined` | `undefined` | Maps to a max width: `sm`→`max-w-sm`, `md`→`max-w-md`, `lg`→`max-w-lg`, `xl`→`max-w-2xl`. Other values add no width class. |

## Emits

| Event | Payload | When |
| ----- | ------- | ---- |
| `cancel` | — | Mobile **sheet** branch only: its close button, backdrop, or Cancel. The desktop modal emits `leave` instead. |
| `leave` | — | The overlay begins closing (both branches). |
| `after:leave` | — | The close transition finished (both branches; the sheet fires it 400 ms after `leave`). |
| `close:prevent` | — | A close was blocked because `dismissible` is `false` — desktop `UModal` only. |

## Slots

| Slot | Props | Content |
| ---- | ----- | ------- |
| `header` | `{ close }` | Desktop only — the sheet branch draws its own header from `title`/`description`. `close` closes the modal. |
| `body` | `{ close }` | Main content. `close` is bound on desktop only; the sheet branch forwards the slot without props. |
| `footer` | `{ close }` | Footer bar. Same desktop-only `close` caveat as `body`. |

## Notes

- The branch is decided by `useIsMobile()` — VueUse `useMediaQuery("(max-width: 1023px)")` — the same `lg` boundary the shell chrome switches on.
- The switch is deferred to `onMounted` (`ready`), so SSR and the first client
  render agree and there is no hydration mismatch.
- `size` exists because `UModal` has no `size` prop; the map above is applied as
  a `max-w-*` class on the modal content.
- `title`/`description` are always shown on mobile (sheet header), so drop the
  `header` slot there; `closeIcon`, `scrollable` and `size` likewise only mean
  anything above 1024px.
- Konsta (via `BottomSheet`) and Nuxt UI `UModal` are the runtime deps; the
  konsta theme CSS must be loaded.