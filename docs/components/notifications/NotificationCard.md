---
title: NotificationCard
description: Notification row with unread state, relative time, read/unread and dismiss actions.
outline: deep
---

<script setup lang="ts">
import Basic from "../../examples/notifications/NotificationCardBasic.vue";
import States from "../../examples/notifications/NotificationCardStates.vue";
</script>

# NotificationCard

A single notification: title, body, relative timestamp and an unread dot.
Clicking an unread card emits `read`; a read card can be marked unread or
dismissed with the inline buttons.

## Usage

```vue
<script setup lang="ts">
import RyderNotificationCard from "@opeolluwa/ryder/components/notifications/NotificationCard.vue"
import type { NotificationItem } from "@opeolluwa/ryder/types"
</script>

<template>
  <RyderNotificationCard
    :notification="notification"
    @read="markRead"
    @unread="markUnread"
    @dismiss="dismiss"
  />
</template>
```

## Examples

### Basic

A live list where reading, marking unread and dismissing update the parent's
array.

<Demo>

<Basic />

</Demo>

<<< @/examples/notifications/NotificationCardBasic.vue

### Read and unread states

The same card rendered with `readAt: null` and with a real `readAt`.

<Demo>

<States />

</Demo>

<<< @/examples/notifications/NotificationCardStates.vue

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `notification` | `NotificationItem` | — | Notification to render. |

### Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `read` | `[identifier: string]` | An unread card was clicked or activated with Enter. |
| `unread` | `[identifier: string]` | The mark-unread control was clicked (read cards only). |
| `dismiss` | `[identifier: string]` | The dismiss control was clicked. |

### Slots

None.

### Expose

None.

## Theme

The unread dot uses `bg-primary-500`; unread titles use full-contrast text,
read titles dim. The card picks up `dark:bg-onyx-700` and the primary border on
hover.

## Accessibility

- The card is `role="button"` only while unread; `tabindex` is `0` for unread
  and `-1` for read.
- Enter activates the read action on unread cards.
- The unread dot is labelled "Unread".
- The inline mark-unread and dismiss buttons have their own `aria-label`s and
  stop click propagation.

## Notes

- Unread is defined as `readAt === null` by `isNotificationUnread`.
- The relative time uses VueUse `useTimeAgo` with `max: "7d"`.
- Clicking a read card does nothing; use the inline unread button to restore
  it.
- The parent owns persistence and list removal.

## Related

- [Notification types](/guide/composables-utils#notifications)
