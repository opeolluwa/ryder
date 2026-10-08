<script setup lang="ts">
import Basic from "../../examples/complaints/ComplaintCreateDialogBasic.vue";
</script>

# ComplaintCreateDialog

A modal "New complaint" dialog: [CreateDialog](/components/feedback/CreateDialog)
provides the chrome, [ComplaintForm](./ComplaintForm) the body, and the
dialog's footer drives the form's validation. Open it with `v-model:open` and
listen for `submit` with the validated payload.

```vue
<script setup lang="ts">
import { ref } from "vue"
import RyderComplaintCreateDialog from "@opeolluwa/ryder/components/complaints/ComplaintCreateDialog.vue"
import type { CreateComplaintPayload } from "@opeolluwa/ryder/types"

const open = ref(false)
const loading = ref(false)

function onSubmit(payload: CreateComplaintPayload) {
  // POST the payload, then flip `loading` back off and close.
}
</script>

<template>
  <RyderComplaintCreateDialog
    v-model:open="open"
    :loading="loading"
    :orders="orders"
    @submit="onSubmit"
    @cancel="open = false"
  />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/complaints/ComplaintCreateDialogBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `v-model:open` | `boolean` | `false` | Dialog visibility (`defineModel`). |
| `loading` | `boolean` | — | Disables the dialog's Submit button and the form's submit (the inner form gets `show-actions: false`, so only the footer shows). |
| `orders` | `Array<{ identifier: string; status?: string; itemsCount?: number }>` | — | Forwarded to the form; its `[]` default applies when omitted. |
| `ordersLoading` | `boolean` | — | Disables the order select while orders load. |
| `orderStatusLabel` | `(status: any) => string` | — | Option-label status formatter; the form's default applies when omitted. |
| `orderItemCount` | `(order: any) => number` | — | Option-label item counter; the form's default applies when omitted. |

## Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `update:open` | `[value: boolean]` | The `v-model` write — fires on every `open` change. |
| `submit` | `[payload: CreateComplaintPayload]` | The form validated; payload relayed from [ComplaintForm](./ComplaintForm). |
| `cancel` | `[]` | Cancel clicked: the dialog closes, the form resets, then this fires. |

## Slots

None. The dialog's title, description and footer labels are fixed
(`New complaint` / `Tell us what went wrong…` / `Submit complaint`).

## Notes

- Wiring: the footer's Submit calls the inner form's `submit()`, which runs
  valibot validation first — a `submit` emit means the payload is already
  clean. Cancel closes (`open = false`), calls the form's `reset()` so the
  next open starts blank, then re-emits `cancel`.
- Exposes `reset()` for hosts that want to clear the form without closing
  (e.g. after a failed POST).
- The inner form renders with `show-actions: false`, so Cancel/Submit live
  only in the dialog footer — there is no duplicated button row.
- Inherits every validation rule and quirk of
  [ComplaintForm](/components/complaints/ComplaintForm) — the form is the
  same component with `show-actions: false`.
- Rendered through [Dialog](/components/feedback/Dialog), so below `lg` it
  becomes a bottom sheet; `UModal` on desktop.
