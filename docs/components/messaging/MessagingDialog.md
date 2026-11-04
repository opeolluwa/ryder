---
title: MessagingDialog
description: Attribute-forwarding alias for MessagingCreateDialog.
outline: deep
---

<script setup lang="ts">
import Basic from "../../examples/messaging/MessagingDialogBasic.vue";
</script>

# MessagingDialog

A thin alias for [MessagingCreateDialog](./MessagingCreateDialog). It sets
`inheritAttrs: false` and forwards every attribute, prop, event and
`v-model:open` binding through `v-bind="$attrs"`.

## Usage

```vue
<script setup lang="ts">
import { ref } from "vue"
import RyderMessagingDialog from "@opeolluwa/ryder/components/messaging/MessagingDialog.vue"
</script>

<template>
  <RyderMessagingDialog v-model:open="open" :loading="loading" @submit="onSubmit" />
</template>
```

## Examples

### Basic

The same dialog, opened through the alias.

<Demo>

<Basic />

</Demo>

<<< @/examples/messaging/MessagingDialogBasic.vue

## API Reference

`MessagingDialog` declares no props, emits, slots or exposed methods of its
own. It forwards everything to `MessagingCreateDialog`, so use that page for
the full API:

### Props

Same as [MessagingCreateDialog props](./MessagingCreateDialog#props), including
`v-model:open`.

### Emits

Same as [MessagingCreateDialog emits](./MessagingCreateDialog#emits).

### Slots

None.

### Expose

Not forwarded. If you need `reset()`, use `MessagingCreateDialog` directly or
hold a template ref on the inner form.

## Notes

- `inheritAttrs: false` prevents duplicate class/style attributes on the
  wrapper; `$attrs` is bound to the inner dialog.
- Use this only when a stable alias name is convenient. Otherwise import
  `MessagingCreateDialog`.
