<script setup lang="ts">
import Basic from "../../examples/complaints/ComplaintFormBasic.vue";
</script>

# ComplaintForm

The "raise a complaint" form: subject, optional related order and a
description, validated with valibot before emitting a
`CreateComplaintPayload`. It owns its own state and exposes `reset()` /
`submit()` for parents that drive it from outside (as
[ComplaintCreateDialog](./ComplaintCreateDialog) does).

```vue
<script setup lang="ts">
import { ref } from "vue"
import RyderComplaintForm from "@opeolluwa/ryder/components/complaints/ComplaintForm.vue"
import type { CreateComplaintPayload } from "@opeolluwa/ryder/types"

const loading = ref(false)

function onSubmit(payload: CreateComplaintPayload) {
  // POST the payload, then flip `loading` back off.
}
</script>

<template>
  <RyderComplaintForm
    :loading="loading"
    :orders="orders"
    @submit="onSubmit"
    @cancel="close"
  />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/complaints/ComplaintFormBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `loading` | `boolean` | — | Submit button spinner and `disabled` while the POST is in flight. |
| `showActions` | `boolean` | `true` | Renders the Cancel / Submit footer. `false` when a host (the dialog) supplies its own actions. |
| `orders` | `Array<{ identifier: string; status?: string; itemsCount?: number }>` | `[]` | Options for the "Related order" select. |
| `ordersLoading` | `boolean` | `false` | Disables the select while the orders fetch is in flight. |
| `orderStatusLabel` | `(status: any) => string` | `(status) => String(status ?? "")` | Formats an order's status inside the option label. |
| `orderItemCount` | `(order: any) => number` | `() => 0` | Supplies the item count inside the option label. |

## Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `submit` | `[payload: CreateComplaintPayload]` | Validation passed: `{ subject, description, orderIdentifier? }`. An empty order maps to `undefined`. |
| `cancel` | `[]` | The Cancel button was clicked. |

## Slots

None.

## Notes

- **Fixed `props` binding.** The `withDefaults(defineProps<…>(), …)` result
  used to be unbound while the `orderItems` computed read `props.orders`,
  `props.orderItemCount` and `props.orderStatusLabel`, which threw
  `ReferenceError: props is not defined` on first render. The result is now
  assigned (`const props = withDefaults(defineProps<…>(), { … })`), matching
  the rest of the kit.
- Validation (valibot, on `UForm`): `subject` trimmed, required, max 255
  (the hint shows the counter); `description` trimmed and required;
  `orderIdentifier` optional.
- Option labels read `#<first 8 chars> · <n> items · <status>` — the label
  pieces come from `orderItemCount` and `orderStatusLabel`, which is why both
  are props.
- The dialog embeds it with `show-actions: false` and drives it through the
  exposed API: `reset()` clears the three fields, `submit()` calls
  `uform.submit()` so validation still runs.
