<script setup lang="ts">
import Basic from "../../examples/orders/OrderListBasic.vue";
</script>

# OrderList

Master list of orders: an optional status tab bar with count badges above a
scrollable column of [OrderListItem](./OrderListItem) rows. Loading, empty and
selection states are all driven by props, so the parent keeps the data.

```vue
<script setup lang="ts">
import RyderOrderList from "@opeolluwa/ryder/components/orders/OrderList.vue"
</script>

<template>
  <RyderOrderList
    :rows="rows"
    :loading="loading"
    :tabs="tabs"
    :active-tab="activeTab"
    :tab-count="tabCount"
    :selected-id="selectedId"
    @update:active-tab="activeTab = $event"
    @select="openOrder"
  />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/orders/OrderListBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `rows` | `Order[]` | — | Rows for the **active** tab; filter them before passing them in. |
| `loading` | `boolean` | — | Shows a `PageLoader` and disables every tab. |
| `tabs` | `OrderListTab[]` | — | Tab bar (`{ value, label }[]`); an empty array hides the bar entirely. |
| `activeTab` | `string` | — | Currently selected tab `value`. |
| `tabCount` | `Record<string, number>` | — | Count badge per tab `value`; missing keys render `0`. |
| `selectedId` | `string \| null` | — | Identifier of the highlighted row. |
| `labels` | `Partial<Record<OrderStatus, string>>` | `() => ({})` | Status label overrides, forwarded to each row's badge. |
| `empty` | `{ title: string, description: string }` | `{ title: "No orders here", description: "" }` | Copy for the `EmptyState` shown when `rows` is empty. |

## Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `update:activeTab` | `[value: string]` | A tab was picked — bind it back with `v-model:activeTab`. |
| `select` | `[identifier: string]` | A row was clicked; the identifier is `order.identifier`. |

## Slots

None.

## Notes

- A row of count badges sits under the tab bar in `tabs` order (numbers only,
  no labels), each reading `tabCount[tab.value] ?? 0` — a tab with no entry
  shows `0`.
- Tab items are `disabled` while `loading` is true, and the tab bar itself only
  renders when `tabs.length > 0`.
- Three mutually exclusive bodies: `PageLoader` while loading, `EmptyState`
  (icon `heroicons:shopping-bag`, `empty` copy) when `rows.length === 0`, then
  the row list.
- Row highlight is `selectedId === order.identifier`, also exposed as
  `aria-current="true"` on the selected `OrderListItem`.
- Domain types come from `@opeolluwa/ryder/types`
  (`Order`, `OrderListTab`, `OrderStatus`).
