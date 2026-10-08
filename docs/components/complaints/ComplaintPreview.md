<script setup lang="ts">
import Basic from "../../examples/complaints/ComplaintPreviewBasic.vue";
</script>

# ComplaintPreview

The right-hand pane of the inbox: [ComplaintHeader](./ComplaintHeader) over
[ComplaintThread](./ComplaintThread), or an empty state when nothing is
selected. It is a relay — it renders the two children and forwards their
`setStatus` / `send` events untouched.

```vue
<script setup lang="ts">
import RyderComplaintPreview from "@opeolluwa/ryder/components/complaints/ComplaintPreview.vue"
</script>

<template>
  <RyderComplaintPreview
    :row="selectedRow"
    :replies="replies"
    :self="staff"
    :counterpart="customer"
    :sending="sending"
    :sent-count="sentCount"
    @set-status="setStatus"
    @send="sendReply"
  />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/complaints/ComplaintPreviewBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `row` | `ComplaintRow \| null` | — | The selected complaint. `null` renders the empty state instead of header + thread. |
| `replies` | `ComplaintReply[]` | — | Thread messages, passed straight to the thread. |
| `loadingReplies` | `boolean` | `false` | Loader while the thread is fetching. |
| `self` | `ThreadParty` | — | The replier's side of the conversation. |
| `counterpart` | `ThreadParty` | — | The other side. |
| `sending` | `boolean` | `false` | A reply POST is in flight. |
| `sentCount` | `number` | `0` | Bumped by the parent on each successful send; clears the composer. |
| `statusMenu` | `boolean` | `true` | Forwarded to the header: offer the status menu. |
| `showCustomer` | `boolean` | `true` | Forwarded to the header: show the complainer's identity. |

## Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `setStatus` | `[status: ComplaintWritableStatus]` | Relayed unchanged from the header's status menu. |
| `send` | `[body: string]` | Relayed unchanged from the thread composer. |

## Slots

None.

## Notes

- `row === null` swaps the whole pane for `EmptyState` ("No conversation
  selected") — the header and thread are not rendered at all, so no
  thread state is mounted for a deselected complaint.
- No data fetching happens here: `replies`, `sending` and `sentCount` belong
  to the parent, exactly as in the playground's `complaints.vue` page, which
  pairs this with [ComplaintList](./ComplaintList).
- Because `statusMenu` / `showCustomer` only reach the header, a customer
  build turns both off in one place and the thread is unaffected.
