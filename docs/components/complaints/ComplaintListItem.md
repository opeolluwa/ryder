<script setup lang="ts">
import Basic from "../../examples/complaints/ComplaintListItemBasic.vue";
</script>

# ComplaintListItem

One selectable row in the complaints inbox: status dot, headline, timestamp,
description excerpt and an optional reply badge. It is a native `<button>`, so
selection is keyboard-accessible out of the box; [ComplaintList](./ComplaintList)
renders these for you, but it stands alone too.

```vue
<script setup lang="ts">
import RyderComplaintListItem from "@opeolluwa/ryder/components/complaints/ComplaintListItem.vue"
</script>

<template>
  <RyderComplaintListItem
    :row="row"
    :selected="row.complaint.identifier === selectedId"
    :reply-count="2"
    @select="selectedId = $event"
  />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/complaints/ComplaintListItemBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `row` | `ComplaintRow` | — | The complaint plus its customer/order projection. |
| `selected` | `boolean` | — | Highlights the row and sets `aria-current="true"`. |
| `replyCount` | `number` | — | Chat-bubble badge; `0` hides it. |
| `viewed` | `boolean` | `true` | Whether the complainer has been seen: `false` swaps the headline from `font-medium` to `font-semibold`. |
| `showCustomer` | `boolean` | `true` | Headline is the customer name with the subject on the second line; `false` promotes the subject to the headline. |

## Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `select` | `[identifier: string]` | The row was clicked; payload is `row.complaint.identifier`. |

## Slots

None.

## Notes

- The status dot encodes attention, not the literal status: `isResolvable`
  (`open` / `in_progress`) → solid `bg-primary-500`; `resolved` / `closed` →
  transparent with a ring. Its `aria-label` reads "Open" or "Resolved".
- The headline label comes from `complaintCustomerLabel`, which falls back to
  the customer's email, then "Unknown customer".
- Timestamps render as `HH:MM` for today and `5 Sep` for older complaints.
- The `selected` styles are class-driven (`border-primary-200 bg-primary-50/50`
  and friends), so an unselected row keeps the neutral border.
