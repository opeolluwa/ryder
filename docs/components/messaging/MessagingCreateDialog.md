---
title: MessagingCreateDialog
description: Modal wrapper around MessagingForm for starting a new conversation.
outline: deep
---

<script setup lang="ts">
import Basic from "../../examples/messaging/MessagingCreateDialogBasic.vue";
</script>

# MessagingCreateDialog

A modal around [MessagingForm](./MessagingForm) for starting a new
conversation. It owns the dialog title, description, Cancel/Submit footer and
form reset; the parent supplies loading state and handles the payload.

## Usage

```vue
<script setup lang="ts">
import { ref } from "vue"
import RyderMessagingCreateDialog from "@opeolluwa/ryder/components/messaging/MessagingCreateDialog.vue"
import type { CreateConversationPayload } from "@opeolluwa/ryder/types"

const open = ref(false)
</script>

<template>
  <RyderMessagingCreateDialog
    v-model:open="open"
    :loading="loading"
    :orders="orders"
    @submit="createConversation"
    @cancel="onCancel"
  />
</template>
```

## Examples

### Basic

Opening the dialog, submitting a payload and closing on success.

<Demo>

<Basic />

</Demo>

<<< @/examples/messaging/MessagingCreateDialogBasic.vue

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `open` | `boolean` | `false` | Dialog visibility (`v-model:open`). |
| `loading` | `boolean` | — | Disables submit and shows its loading state. |
| `orders` | `Array<{ identifier: string; status?: string; itemsCount?: number }>` | `undefined` | Forwarded to the form's order select. |
| `ordersLoading` | `boolean` | `undefined` | Forwarded to the form. |
| `orderStatusLabel` | `(status: any) => string` | `undefined` | Forwarded to the form. |
| `orderItemCount` | `(order: any) => number` | `undefined` | Forwarded to the form. |

### Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `submit` | `[payload: CreateConversationPayload]` | The form validated and submitted. |
| `cancel` | `[]` | Cancel was clicked. The dialog also closes itself. |

### Slots

None.

### Expose

| Method | Description |
| ------ | ----------- |
| `reset()` | Clears the inner form. |

## Theme

Wraps [CreateDialog](/components/feedback/CreateDialog), so it uses the same
modal surface, backdrop, size and footer treatment as the rest of the kit.

## Accessibility

- `CreateDialog` supplies the focus trap, escape/backdrop close and labelled
  title/description.
- Cancel is explicit; closing by backdrop or Escape emits the same close path
  but does not submit.

## Notes

- Title is fixed to "New conversation"; description is fixed to the support
  copy.
- The form is rendered with `show-actions=false`; the dialog footer owns the
  buttons.
- On cancel the component closes itself and resets the form before emitting
  `cancel`.

## Related

- [MessagingForm](./MessagingForm)
- [MessagingDialog](./MessagingDialog)
