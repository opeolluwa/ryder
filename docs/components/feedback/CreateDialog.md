<script setup lang="ts">
import Basic from "../../examples/feedback/CreateDialogBasic.vue";
</script>

# CreateDialog

A form-style wrapper around `Dialog`: the default slot becomes the modal body
and the footer is pre-built as Cancel / Submit buttons, so creating a record is
a one-liner. Like `Dialog`, it renders a Nuxt UI modal on desktop and collapses
into a konsta bottom sheet below 1024px.

```vue
<script setup lang="ts">
import RyderCreateDialog from "@opeolluwa/ryder/components/feedback/CreateDialog.vue"
</script>

<template>
  <RyderCreateDialog v-model:open="open" title="Create thing" @submit="open = false">
    <p>Form fields go in the body.</p>
  </RyderCreateDialog>
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/feedback/CreateDialogBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `title` | `string` | — | Required; the dialog/sheet heading. |
| `description` | `string \| undefined` | `undefined` | Subtext under the heading. |
| `loading` | `boolean \| undefined` | `undefined` | Falsy by default; truthy shows a spinner on Submit and disables both footer buttons. |
| `submitDisabled` | `boolean \| undefined` | `undefined` | Falsy by default; truthy disables only Submit (e.g. until the form validates). |
| `submitLabel` | `string` | `"Submit"` | Submit-button label. |
| `cancelLabel` | `string` | `"Cancel"` | Cancel-button label. |

## Emits

| Event | Payload | When |
| ----- | ------- | ---- |
| `submit` | — | Submit was tapped. The dialog stays open — the app closes it. |
| `cancel` | — | The footer's Cancel button was tapped; the dialog also closes itself. |

## Slots

| Slot | Props | Content |
| ---- | ----- | ------- |
| `default` | — | Form body, rendered into the dialog's `body` slot. |
| `footer` | — | Replaces the built-in Cancel/Submit row (full width, right-aligned is up to you). |

## Notes

- Wraps `Dialog`, so it inherits the responsive modal → bottom-sheet behaviour.
- `Dialog`'s own props (`size`, `scrollable`, `dismissible`, `closeIcon`) are
  **not** forwarded — CreateDialog only exposes the submit-form surface.
- A backdrop tap closes the overlay but is not emitted here: `Dialog` forwards
  `leave`/`after:leave` on desktop and `cancel` on mobile, and CreateDialog
  forwards neither. Only the footer's own Cancel emits `cancel`.
- Like `BottomSheet`, Submit emits without closing; the footer's Cancel closes.