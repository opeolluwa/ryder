---
title: MessagingForm
description: Validated new-conversation form with subject, related order and description.
outline: deep
---

<script setup lang="ts">
import Basic from "../../examples/messaging/MessagingFormBasic.vue";
</script>

# MessagingForm

A validated new-conversation form: subject, optional related order and the
opening message. Validation uses Valibot, so submit only fires with trimmed,
non-empty fields.

## Usage

```vue
<script setup lang="ts">
import RyderMessagingForm from "@opeolluwa/ryder/components/messaging/MessagingForm.vue"
import type { CreateConversationPayload } from "@opeolluwa/ryder/types"
</script>

<template>
  <RyderMessagingForm
    :loading="loading"
    :orders="orders"
    :order-status-label="orderStatusLabel"
    :order-item-count="orderItemCount"
    @submit="createConversation"
    @cancel="close"
  />
</template>
```

## Examples

### Basic

Submission, cancellation and the order-picker label helpers. The exposed
`reset()` and `submit()` methods are also shown in the
[MessagingCreateDialog](./MessagingCreateDialog) page.

<Demo>

<Basic />

</Demo>

<<< @/examples/messaging/MessagingFormBasic.vue

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `loading` | `boolean` | — | Disables submit and shows its loading state. |
| `showActions` | `boolean` | `true` | Renders the Cancel/Submit footer. |
| `orders` | `Array<{ identifier: string; status?: string; itemsCount?: number }>` | `[]` | Options for the optional related order. |
| `ordersLoading` | `boolean` | `false` | Disables the order select while options load. |
| `orderStatusLabel` | `(status: any) => string` | `String(status ?? "")` | Formats the status inside an order option. |
| `orderItemCount` | `(order: any) => number` | `() => 0` | Formats the item count inside an order option. |

### Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `submit` | `[payload: CreateConversationPayload]` | Valid form submitted. |
| `cancel` | `[]` | Cancel was clicked (only rendered when `showActions` is true). |

### Slots

None.

### Expose

| Method | Description |
| ------ | ----------- |
| `reset()` | Clears subject, description and related order. |
| `submit()` | Programmatically submits the inner `UForm`, running validation. |

## Theme

Uses the shared `RyderInput`, `RyderSelect`, `RyderTextarea` and `RyderButton`
primitives, so it inherits their sizing, dark-mode and label styling.

## Accessibility

- Every field has a visible label and the subject shows a live character
  count.
- Validation messages are rendered by `UForm` next to the field.
- The optional order hint explains the attachment before submission.

## Notes

- Subject is required and capped at **255 characters**.
- Description is required; surrounding whitespace is trimmed.
- `orderIdentifier` is optional and only included when selected.
- The order option label is `#<short id> · <n> items · <status>`.
- The form keeps its own `reactive` state; call `reset()` when reusing it.

## Related

- [MessagingCreateDialog](./MessagingCreateDialog)
- [MessagingDialog](./MessagingDialog)
