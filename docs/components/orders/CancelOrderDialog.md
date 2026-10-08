<script setup lang="ts">
import Basic from "../../examples/orders/CancelOrderDialogBasic.vue";
</script>

# CancelOrderDialog

Confirmation dialog for cancelling an order, built on the shared
[Dialog](/components/feedback/Dialog) and [Button](/components/primitives/Button).
Before it is confirmed it states the cancellation's impact — lines, units,
payment and delivery — so nobody has to open the order to find out what is
about to be called off.

```vue
<script setup lang="ts">
import RyderCancelOrderDialog from "@opeolluwa/ryder/components/orders/CancelOrderDialog.vue"
</script>

<template>
  <RyderCancelOrderDialog
    v-model:open="open"
    :order="order"
    :loading="cancelling"
    @confirm="cancelOrder"
  />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/orders/CancelOrderDialogBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `v-model:open` | `boolean` | `false` | Dialog visibility (`defineModel`). |
| `order` | `Order \| null` | — | Order being cancelled; also renders the header row and the impact list. |
| `loading` | `boolean` | — | Disables the confirm button and shows its spinner while the request runs. |
| `formatMoney` | `(amount: string \| number, currency: string) => string` | `formatPrice` | Formatter for the order total shown in the header row. |

## Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `confirm` | `[identifier: string]` | "Cancel order" was clicked and `order` is set; payload is `order.identifier`. |

## Slots

None.

## Notes

- The impact list is derived from the order: `<n> lines`, `<n> units`, plus
  "a recorded payment, which will need refunding separately" when
  `paymentReference` is set and "a delivery address that may already be in
  transit" when `delivery` is set.
- The total sums every line's `amount × quantity` and formats it with
  `formatMoney`; an order without items shows `—`.
- Confirm is `disabled` while `loading` or when `order` is `null`, and
  `confirm` is never emitted for a null order.
- Title, description and both buttons ("Keep order" closes, "Cancel order"
  confirms) are fixed — the dialog is not configurable beyond the props above.
- Closing resets only `open`; whatever the parent does with the emitted
  identifier is up to it.
