---
title: MessagingPreview
description: Conversation detail pane combining the header, thread and empty state.
outline: deep
---

<script setup lang="ts">
import Basic from "../../examples/messaging/MessagingPreviewBasic.vue";
</script>

# MessagingPreview

The right-hand conversation pane: header, thread and composer, or a "No
conversation selected" empty state. It is presentational — selection, sending
and status changes are emitted upward.

## Usage

```vue
<script setup lang="ts">
import RyderMessagingPreview from "@opeolluwa/ryder/components/messaging/MessagingPreview.vue"
</script>

<template>
  <RyderMessagingPreview
    :row="selected"
    :replies="replies"
    :self="self"
    :counterpart="counterpart"
    @set-status="updateStatus"
    @send="sendReply"
    @back="goBack"
  />
</template>
```

## Examples

### Inbox split view

The list selects a conversation; the preview renders it. Sending appends a
local reply, status changes update the selected row, and clearing the
selection shows the empty state.

<Demo>

<Basic />

</Demo>

<<< @/examples/messaging/MessagingPreviewBasic.vue

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `row` | `ConversationRow \| null` | — | Selected conversation; `null` renders the empty state. |
| `replies` | `ConversationReply[]` | — | Replies for the selected conversation. |
| `loadingReplies` | `boolean` | `false` | Forwarded to the thread. |
| `self` | `ThreadParty` | — | The viewer. |
| `counterpart` | `ThreadParty` | — | The other party. |
| `sending` | `boolean` | `false` | Forwarded to the thread composer. |
| `sentCount` | `number` | `0` | Forwarded to the thread composer. |
| `statusMenu` | `boolean` | `true` | Forwarded to the header. |
| `showParticipant` | `boolean` | `true` | Forwarded to the header and thread. |
| `openingFromSelf` | `boolean` | `false` | Forwarded to the header and thread. |
| `showBack` | `boolean` | `false` | Forwarded to the header. |

### Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `setStatus` | `[status: MessagingWritableStatus]` | Forwarded from the header. |
| `send` | `[body: string]` | Forwarded from the thread composer. |
| `back` | `[]` | Forwarded from the header. |

### Slots

None.

### Expose

None.

## Theme

Adds the desktop card frame (`lg:rounded-xl`, border) while remaining
full-bleed on mobile. The empty state fills the pane height.

## Accessibility

- The empty state is a labelled `EmptyState`, not blank whitespace.
- All interactive controls live in the header/thread and keep their own
  labels.

## Notes

- `showParticipant` is passed to both the header and thread; the thread uses
  it for the counterparty avatar.
- `sentCount` is the signal to clear the composer — emit `send`, then
  increment it after persistence.
- Give the parent a bounded height; the preview is built around `min-h-0` and
  internal scrolling.

## Related

- [MessagingList](./MessagingList)
- [MessagingHeader](./MessagingHeader)
- [MessagingThread](./MessagingThread)
