<script setup lang="ts">
import Basic from "../../examples/feedback/DialogBasic.vue";
import Scrollable from "../../examples/feedback/DialogScrollable.vue";
</script>

# Dialog

A dialog built on Nuxt UI's `UModal`, so one component serves desktop and
mobile.

```vue
<script setup lang="ts">
import RyderDialog from "@opeolluwa/ryder/components/feedback/Dialog.vue"
</script>

<template>
  <RyderDialog v-model:open="open" title="Delete draft?" @after:leave="onClosed">
    <template #body>
      <p>The body slot works in the modal.</p>
    </template>
  </RyderDialog>
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/feedback/DialogBasic.vue

With `scrollable` the header and footer stay pinned while the body scrolls,
and the `header`/`footer` slots show their `close` prop:

<Demo>

<Scrollable />

</Demo>

<<< @/examples/feedback/DialogScrollable.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `title` | `string \| undefined` | `undefined` | Heading. |
| `description` | `string \| undefined` | `undefined` | Subtext under the heading. |
| `closeIcon` | `string \| undefined` | `"heroicons:x-mark"` | Close-button icon. |
| `dismissible` | `boolean` | `true` | Backdrop/close allowed; `false` emits `close:prevent` instead. |
| `scrollable` | `boolean \| undefined` | `undefined` | Pin the modal header/footer while the body scrolls. No local default — `undefined` falls through to `UModal`, whose own default is `false`. |
| `size` | `string \| undefined` | `undefined` | Maps to a max width: `sm`→`max-w-sm`, `md`→`max-w-md`, `lg`→`max-w-lg`, `xl`→`max-w-2xl`. Other values add no width class. |

## Emits

| Event | Payload | When |
| ----- | ------- | ---- |
| `leave` | — | The overlay begins closing. |
| `after:leave` | — | The close transition finished. |
| `close:prevent` | — | A close was blocked because `dismissible` is `false`. |

## Slots

| Slot | Props | Content |
| ---- | ----- | ------- |
| `header` | `{ close }` | Heading area. `close` closes the modal. |
| `body` | `{ close }` | Main content. |
| `footer` | `{ close }` | Footer bar. |

## Notes

- `size` exists because `UModal` has no `size` prop; the map above is applied as
  a `max-w-*` class on the modal content.
- Nuxt UI `UModal` is the only runtime dep.