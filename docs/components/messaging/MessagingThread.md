---
title: MessagingThread
description: Scrollable message thread with avatars and a composer for replies.
outline: deep
---

<script setup lang="ts">
import Basic from "../../examples/messaging/MessagingThreadBasic.vue";
</script>

# MessagingThread

The scrollable conversation body and reply composer. It renders the opening
message plus every reply through Nuxt UI's `UChatMessages`, keeping the
viewer's messages on one side and the counterparty's on the other.

## Usage

```vue
<script setup lang="ts">
import RyderMessagingThread from "@opeolluwa/ryder/components/messaging/MessagingThread.vue"
</script>

<template>
  <div class="flex h-[32rem]">
    <RyderMessagingThread
      :row="row"
      :replies="replies"
      :self="self"
      :counterpart="counterpart"
      :sending="sending"
      :sent-count="sentCount"
      @send="sendReply"
    />
  </div>
</template>
```

## Examples

### Basic

Sending a reply locally: the composer clears when `sentCount` changes, and the
thread scrolls to the newest message.

<Demo>

<Basic />

</Demo>

<<< @/examples/messaging/MessagingThreadBasic.vue

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `row` | `ConversationRow` | — | The conversation whose opening message is rendered first. |
| `replies` | `ConversationReply[]` | — | Replies after the opening message. |
| `loadingReplies` | `boolean` | `false` | Replaces the message list with `PageLoader`. |
| `self` | `ThreadParty` | — | The viewer: name, email, avatar source/text. |
| `counterpart` | `ThreadParty` | — | The other party in the conversation. |
| `sending` | `boolean` | `false` | Disables the composer and shows its loading state. |
| `sentCount` | `number` | `0` | Increment after a successful send to clear the composer and scroll. |
| `isSelfMessage` | `(senderEmail: string) => boolean` | email match against `self.email` | Custom rule for deciding which side a reply belongs on. |
| `openingFromSelf` | `boolean` | `false` | Places the opening message on the viewer's side. |

### Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `send` | `[body: string]` | The composer submitted trimmed, non-empty text. |

### Slots

None.

### Expose

None.

## Theme

Uses `UChatMessages` with subtle assistant bubbles and solid user bubbles.
`UChatPrompt` owns the composer; the footer respects
`env(safe-area-inset-bottom)` on mobile.

## Accessibility

- The composer is a real form field; Enter submits, and the send control is
  disabled while the body is empty or a send is in flight.
- Loading replies announces the page loader instead of rendering an empty
  thread.
- The send button carries the Nuxt UI submit semantics rather than a bare icon
  click.

## Notes

- The composer uses `maxrows="6"` and autofocuses on desktop only.
- Replies are matched to a side by `isSelfMessage`, falling back to a
  case-insensitive comparison with `self.email`.
- The opening message is not a reply: it is rendered from
  `row.conversation.description` and shifted to the viewer's side by
  `openingFromSelf`.
- The parent owns sending, persistence and `sentCount`.

## Related

- [MessagingPreview](./MessagingPreview)
- [MessagingHeader](./MessagingHeader)
