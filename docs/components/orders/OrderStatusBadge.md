<script setup lang="ts">
import Basic from "../../examples/orders/OrderStatusBadgeBasic.vue";
</script>

# OrderStatusBadge

Small uppercase pill for an order's status, coloured by what the status means
rather than by its name. A single `<span>` driven by the shared status utils.

```vue
<script setup lang="ts">
import RyderOrderStatusBadge from "@opeolluwa/ryder/components/orders/OrderStatusBadge.vue"
</script>

<template>
  <RyderOrderStatusBadge :status="order.status" />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/orders/OrderStatusBadgeBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `status` | `OrderStatus \| null` | — | Status to badge; `null` resolves to `pending`. |
| `labels` | `Partial<Record<OrderStatus, string>>` | — | Per-status label overrides; statuses omitted keep the canonical label. |

## Emits

None.

## Slots

None.

## Notes

- Colours come from `orderStatusBadgeClass`: `pending` grey, `paid` primary,
  `fulfilled` green, `cancelled` red, `conflicted` amber — money-not-yet and
  money-in-dispute can never look alike.
- Text comes from `orderStatusLabel(status, labels)`, which resolves `null` to
  `pending` and only replaces the statuses the consumer overrides.
- The component is ~22 lines with no state; `labels` has no default in
  `defineProps`, so pass `undefined` to keep the canonical wording.
- The same `labels` map is accepted by [OrderList](./OrderList),
  [OrderListItem](./OrderListItem) and [OrderPreview](./OrderPreview), so one
  override cascades through the whole order UI.
