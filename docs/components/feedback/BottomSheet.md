<script setup lang="ts">
import Basic from "../../examples/feedback/BottomSheetBasic.vue";
</script>

# BottomSheet

Konsta-based sheet that slides up from the bottom of the viewport for short,
mobile-first confirmations (archive, filter, pick). It teleports to `<body>`, so
no ancestor `transform`/`filter`/`overflow` can trap it.

```vue
<script setup lang="ts">
import RyderBottomSheet from "@opeolluwa/ryder/components/feedback/BottomSheet.vue"
</script>

<template>
  <RyderBottomSheet v-model:open="open" title="Archive order" @submit="open = false">
    <p>Sheet body.</p>
  </RyderBottomSheet>
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/feedback/BottomSheetBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `title` | `string` | — | Required; the sheet's heading, rendered next to the close button. |
| `description` | `string \| undefined` | `undefined` | Subtext under the heading (hidden when empty). |
| `loading` | `boolean \| undefined` | `undefined` | Falsy by default; truthy shows a spinner on submit and disables the close and footer buttons. |
| `submitDisabled` | `boolean \| undefined` | `undefined` | Falsy by default; truthy disables only the default submit button (e.g. until a form is valid). |
| `dismissible` | `boolean` | `true` | When `false`, the close button is hidden and backdrop taps are ignored. |
| `submitLabel` | `string \| undefined` | `undefined` | Falls back to `"Submit"` in the template when unset. |
| `cancelLabel` | `string \| undefined` | `undefined` | Falls back to `"Cancel"` in the template when unset. |

## Emits

| Event | Payload | When |
| ----- | ------- | ---- |
| `submit` | — | The built-in submit button was tapped. The sheet stays open — the app closes it. A custom `footer` slot never triggers it. |
| `cancel` | — | Close button, backdrop tap (when `dismissible`), or the built-in cancel button was tapped. The sheet also closes itself. |
| `leave` | — | `open` flipped to `false`; the close transition starts. |
| `after:leave` | — | 400 ms after `leave` — mirrors konsta's `duration-400`, so `Teleport`ed content can unmount at the right time. |

## Slots

| Slot | Props | Content |
| ---- | ----- | ------- |
| `default` | — | Scrollable body between the header and the footer (`max-h-[85dvh]`). |
| `footer` | — | Replaces the built-in cancel/submit row entirely. |

## Notes

- Konsta dependency (`kSheet`) plus Nuxt UI's `UButton` for the close button;
  the konsta theme CSS (`konsta/vue/theme.css`) must be loaded in the app.
- The built-in submit button emits `submit` and does **not** close the sheet —
  the app owns closing. Cancel does both.
- Body area handles the safe-area: `padding-bottom: env(safe-area-inset-bottom)`.
- The 400 ms mirror of konsta's transition exists so `after:leave` lands at the
  right moment — the same contract Nuxt UI overlays use.