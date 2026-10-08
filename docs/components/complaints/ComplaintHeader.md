<script setup lang="ts">
import Basic from "../../examples/complaints/ComplaintHeaderBasic.vue";
</script>

# ComplaintHeader

The top bar of the conversation pane: subject, status pill, received date, the
complainer's identity, the related order, and — for staff — a status menu that
only offers moves the API would accept. [ComplaintPreview](./ComplaintPreview)
embeds it, but it is usable on its own.

```vue
<script setup lang="ts">
import { ref } from "vue"
import RyderComplaintHeader from "@opeolluwa/ryder/components/complaints/ComplaintHeader.vue"
import type { ComplaintWritableStatus } from "@opeolluwa/ryder/types"

const status = ref<ComplaintWritableStatus | null>(null)
</script>

<template>
  <RyderComplaintHeader :row="row" @set-status="status = $event" />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/complaints/ComplaintHeaderBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `row` | `ComplaintRow` | — | The complaint (plus customer/order) to head. |
| `statusMenu` | `boolean` | `true` | Offer the "update status" dropdown. Off for the customer-facing app. |
| `showCustomer` | `boolean` | `true` | Show the complainer's avatar, name and email. The customer-facing app hides it. |

## Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `setStatus` | `[status: ComplaintWritableStatus]` | A menu item was picked. Legal transitions only: `in_progress`, `resolved` or `closed` — never `open`. |

## Slots

None.

## Notes

- The menu is built from `complaintStatusTransitions`, so it lists only
  forward moves from the current status: `open` → in progress/resolved/closed,
  `in_progress` → resolved/closed, and **no items at all** for
  `resolved`/`closed` — the dropdown trigger is hidden even with
  `statusMenu` on.
- The status pill treats `null` as `open` (`resolveStatus`), stays amber while
  the complaint is resolvable and turns emerald once resolved or closed.
- Uses `useIsMobile()` (`max-width: 1023px`, Tailwind's `lg` boundary): the
  customer/order meta row collapses on mobile unless `row.order` exists.
- `row.customer?.email` and `row.order` are both optional — the header renders
  whichever parts are present.
