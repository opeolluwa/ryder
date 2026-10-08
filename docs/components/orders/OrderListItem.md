<script setup lang="ts">
import Basic from "../../examples/orders/OrderListItemBasic.vue";
</script>

# OrderListItem

One tappable order row: product name, status badge, unit/item counts, headline
total, payment reference and a truncated identifier. It is the row
[OrderList](./OrderList) renders, and can be used standalone.

```vue
<script setup lang="ts">
import RyderOrderListItem from "@opeolluwa/ryder/components/orders/OrderListItem.vue"
</script>

<template>
  <RyderOrderListItem
    :order="order"
    :selected="selectedId === order.identifier"
    @select="openOrder"
  />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/orders/OrderListItemBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `order` | `Order` | — | The row's order. |
| `selected` | `boolean` | — | Tints the row and sets `aria-current="true"`. |
| `labels` | `Partial<Record<OrderStatus, string>>` | `() => ({})` | Status label overrides for the embedded badge. |

## Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `select` | `[identifier: string]` | The row was clicked; payload is `order.identifier`. |

## Slots

None.

## Notes

- The root is a real `<button type="button">`, so the whole row is clickable
  and keyboard focusable; click → `$emit('select', order.identifier)`.
- The leading dot is the attention marker: solid primary for `pending` and
  `conflicted` (`aria-label="Needs attention"`), a hollow ring otherwise
  (`aria-label="Settled"`).
- Title is `order.items[0].product.name`, falling back to
  `Order #<identifier>` when the order has no lines.
- Counts come from `orderItemCount` (total units) and the item-line count;
  the headline total is the first entry of `totalsByCurrency` formatted with
  `formatPrice`.
- The date is `formatListDate(createdAt)` — time for today, `14 Jan` otherwise;
  identifiers longer than 14 characters are shortened to 10 + `…`.
