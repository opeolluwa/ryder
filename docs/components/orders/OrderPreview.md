<script setup lang="ts">
import Basic from "../../examples/orders/OrderPreviewBasic.vue";
</script>

# OrderPreview

Detail pane for the order selected in an [OrderList](./OrderList): status,
placement time, line items with per-currency totals, the delivery block, and an
`actions` slot for whatever the console needs to do next.

```vue
<script setup lang="ts">
import RyderOrderPreview from "@opeolluwa/ryder/components/orders/OrderPreview.vue"
</script>

<template>
  <RyderOrderPreview :order="selected" :loading="loading">
    <template #actions="{ order }">
      <button type="button" @click="fulfill(order)">Mark fulfilled</button>
    </template>
  </RyderOrderPreview>
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/orders/OrderPreviewBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `order` | `Order \| null` | — | The order to render; `null` shows the "No order selected" `EmptyState`. |
| `loading` | `boolean` | `false` | Shows a `PageLoader` while the first order is still being fetched. |
| `labels` | `Partial<Record<OrderStatus, string>>` | `() => ({})` | Status label overrides for the header badge. |
| `formatMoney` | `(amount: string \| number, currency: string) => string` | `formatPrice` | Money formatter used for line, unit and total figures. |

## Emits

None.

## Slots

| Slot | Props | Content |
| ---- | ----- | ------- |
| `actions` | `{ order: Order }` | Rendered last, after the delivery section — primary row actions (fulfil, cancel, print). Only rendered when `order` is set. |

## Notes

- Body precedence: `PageLoader` when `loading && !order`, otherwise
  `EmptyState` (`heroicons:shopping-bag`, "No order selected") when `order` is
  `null`, otherwise the full preview.
- Header: [OrderStatusBadge](./OrderStatusBadge), `formatDateTime(createdAt)`
  and the payment reference (`Ref …`) when present.
- Items: each line shows `formatMoney(price) each × quantity` and a line total
  of `amount × quantity`; the footer sums per currency with `totalsByCurrency`
  (one row per currency, never a mixed total).
- Delivery: `recipientName`, `recipientPhone` and `deliveryLines(...)` address
  lines, plus `deliveryNotes`; with no delivery it says so instead of hiding
  the section.
- `formatMoney` is applied everywhere money appears, so a consumer can swap
  `₦18,500` for another locale or precision without touching the markup.
