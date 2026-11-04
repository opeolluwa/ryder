---
title: ComplaintCreateForm
description: A naming alias for ComplaintForm that forwards every prop and listener through $attrs.
outline: deep
---

<script setup lang="ts">
import Basic from "../../examples/complaints/ComplaintCreateFormBasic.vue";
</script>

# ComplaintCreateForm

A naming alias for [ComplaintForm](./ComplaintForm): an 11-line wrapper that
sets `inheritAttrs: false` and re-binds everything with `v-bind="$attrs"`. Use
it where the semantic name reads better ("this surface creates a complaint")
while keeping one source of truth for the form itself.

## Usage

```vue
<script setup lang="ts">
import { ref } from "vue"
import RyderComplaintCreateForm from "@opeolluwa/ryder/components/complaints/ComplaintCreateForm.vue"
import type { CreateComplaintPayload } from "@opeolluwa/ryder/types"

const loading = ref(false)

function onSubmit(payload: CreateComplaintPayload) {
  // POST the payload, then flip `loading` back off.
}
</script>

<template>
  <RyderComplaintCreateForm
    :loading="loading"
    :orders="orders"
    @submit="onSubmit"
    @cancel="close"
  />
</template>
```

## Examples

### Basic

Every prop and event behaves exactly as on
[ComplaintForm](./ComplaintForm).

<Demo>

<Basic />

</Demo>

<<< @/examples/complaints/ComplaintCreateFormBasic.vue

## API Reference

### Props

None of its own — inherited entirely through `$attrs`. See the
[ComplaintForm props table](./ComplaintForm#props): `loading` (required),
`showActions`, `orders`, `ordersLoading`, `orderStatusLabel`, `orderItemCount`.

### Emits

None declared — `submit` and `cancel` pass through `$attrs` to the wrapped
form. See [ComplaintForm emits](./ComplaintForm#emits).

### Slots

None. The template has no slot outlet, so slot content would be dropped — the
wrapped form declares none either.

### Expose

None. The wrapped form's `reset()` / `submit()` are not re-exposed.

## Notes

- `inheritAttrs: false` is what makes the re-binding explicit — without it,
  Vue would apply `$attrs` to the single root *and* the `v-bind` would
  duplicate them.
- Does **not** re-expose the wrapped form's `reset()` / `submit()` —
  `v-bind="$attrs"` forwards props and listeners only, and a template ref on
  this alias never reaches the inner form's API. Reach for
  [ComplaintForm](./ComplaintForm) directly when you need to drive it
  imperatively (the dialog does).
- Inherits [ComplaintForm's known render bug](./ComplaintForm#notes) — this
  alias neither fixes nor worsens it.

## Related

- [ComplaintForm](./ComplaintForm)
- [ComplaintDialog](./ComplaintDialog)
