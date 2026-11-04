---
title: MessagingListItem
description: One conversation row with participant, subject, preview, status dot and reply count.
outline: deep
---

<script setup lang="ts">
import Basic from "../../examples/messaging/MessagingListItemBasic.vue";
</script>

# MessagingListItem

One conversation row: participant name (or subject), preview text, a relative
date, a status dot and an optional reply badge. The root is a `<button>`, so
the whole row is one keyboard-reachable target.

## Usage

```vue
<script setup lang="ts">
import RyderMessagingListItem from "@opeolluwa/ryder/components/messaging/MessagingListItem.vue"
</script>

<template>
  <RyderMessagingListItem
    :row="row"
    :selected="selectedId === row.conversation.identifier"
    :reply-count="3"
    :viewed="true"
    @select="selectedId = $event"
  />
</template>
```

## Examples

### Basic

Selecting a row, toggling `viewed`, and showing counts from the shared fixture.

<Demo>

<Basic />

</Demo>

<<< @/examples/messaging/MessagingListItemBasic.vue

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `row` | `ConversationRow` | — | Conversation, participant and optional order. |
| `selected` | `boolean` | — | Highlights the row and sets `aria-current="true"`. |
| `replyCount` | `number` | — | Reply badge; values `<= 0` render no badge. |
| `viewed` | `boolean` | `true` | Unviewed rows use a heavier headline weight. |
| `showParticipant` | `boolean` | `true` | Headline by participant and subject as the second line; `false` uses the subject as the headline. |

### Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `select` | `[identifier: string]` | The row was clicked. |

### Slots

None.

### Expose

None.

## Theme

Desktop rows are borderless and flush inside [MessagingList](./MessagingList);
mobile rows are standalone cards. Active, selected and dark-mode styles are
built in.

## Accessibility

- Root is a `<button type="button">`, so Enter/Space work without extra
  handlers.
- `aria-current` marks the selected row.
- The status dot carries an `aria-label` of `Open` or `Resolved`.

## Notes

- `viewed` is a display hint only; the component does not persist read state.
- Dates use the time for today and `day month` for older conversations.
- The status dot is primary when the conversation is open/resolvable (see
  `isMessagingResolvable`) and outlined otherwise.

## Related

- [MessagingList](./MessagingList)
- [MessagingHeader](./MessagingHeader)
