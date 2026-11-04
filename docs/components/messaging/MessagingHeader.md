---
title: MessagingHeader
description: Conversation title bar with participant, order, status pill, back action and status menu.
outline: deep
---

<script setup lang="ts">
import Basic from "../../examples/messaging/MessagingHeaderBasic.vue";
</script>

# MessagingHeader

The conversation title bar: subject, status pill, sent/received timestamp,
optional participant and order summary, plus an optional status menu and back
button. On mobile the header can act as the whole title bar for a detail route.

## Usage

```vue
<script setup lang="ts">
import RyderMessagingHeader from "@opeolluwa/ryder/components/messaging/MessagingHeader.vue"
import type { MessagingWritableStatus } from "@opeolluwa/ryder/types"
</script>

<template>
  <RyderMessagingHeader
    :row="row"
    :opening-from-self="false"
    show-back
    @set-status="handleStatus"
    @back="goBack"
  />
</template>
```

## Examples

### Basic

Status transitions, the sent/received label and the mobile back affordance.

<Demo>

<Basic />

</Demo>

<<< @/examples/messaging/MessagingHeaderBasic.vue

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `row` | `ConversationRow` | — | Conversation, participant and optional order. |
| `statusMenu` | `boolean` | `true` | Shows the status dropdown when a transition is available. |
| `showParticipant` | `boolean` | `true` | Shows the participant block (desktop) when a participant exists. |
| `openingFromSelf` | `boolean` | `false` | Reads "Sent" instead of "Received" on the opening message. |
| `showBack` | `boolean` | `false` | Renders a back button before the subject (`lg:hidden`). |

### Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `setStatus` | `[status: MessagingWritableStatus]` | A status menu item was chosen. |
| `back` | `[]` | The back button was clicked. |

### Slots

None.

### Expose

None.

## Theme

The status pill is amber for open/in-progress and emerald for resolved/closed.
The participant/order strip uses a soft gray panel, collapsing on mobile and
showing the participant only from `lg` up.

## Accessibility

- The status menu button has `aria-label="Update status"`.
- The back button has `aria-label="Go back"` and only appears below `lg`.
- Status is conveyed by both colour and text (`Open`, `In progress`,
  `Resolved`, `Closed`).

## Notes

- Menu items come from `messagingStatusTransitions`, so resolved/closed
  conversations show no menu.
- `row.order` is shown by identifier when present.
- The opening timestamp uses a long, human-readable date; the thread uses
  shorter timestamps per message.

## Related

- [MessagingPreview](./MessagingPreview)
- [MessagingThread](./MessagingThread)
