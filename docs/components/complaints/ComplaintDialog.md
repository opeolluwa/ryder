# ComplaintDialog

A naming alias for [ComplaintCreateDialog](./ComplaintCreateDialog): an
11-line wrapper that sets `inheritAttrs: false` and re-binds everything with
`v-bind="$attrs"`.

```vue
<script setup lang="ts">
import ComplaintCreateDialog from "./ComplaintCreateDialog.vue";

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <ComplaintCreateDialog v-bind="$attrs" />
</template>
```

There is no live demo on this page — it would be the
[ComplaintCreateDialog demo](./ComplaintCreateDialog#examples) verbatim.

## Examples

Minimal usage; every prop and event behaves exactly as on
[ComplaintCreateDialog](./ComplaintCreateDialog):

```vue
<script setup lang="ts">
import { ref } from "vue"
import RyderComplaintDialog from "@opeolluwa/ryder/components/complaints/ComplaintDialog.vue"
import type { CreateComplaintPayload } from "@opeolluwa/ryder/types"

const open = ref(false)
const loading = ref(false)

function onSubmit(payload: CreateComplaintPayload) {
  // POST the payload, then flip `loading` back off and close.
}
</script>

<template>
  <RyderComplaintDialog
    v-model:open="open"
    :loading="loading"
    :orders="orders"
    @submit="onSubmit"
    @cancel="open = false"
  />
</template>
```

## Props

None of its own — inherited entirely through `$attrs`. See the
[ComplaintCreateDialog props table](./ComplaintCreateDialog#props): `open`
(`v-model`), `loading` (required), `orders`, `ordersLoading`,
`orderStatusLabel`, `orderItemCount`.

## Emits

None declared — `update:open`, `submit` and `cancel` pass through `$attrs`.
See [ComplaintCreateDialog emits](./ComplaintCreateDialog#emits).

## Slots

None. The template has no slot outlet (and none is forwarded); the wrapped
dialog declares none either.

## Notes

- `inheritAttrs: false` makes the re-binding explicit so `$attrs` is applied
  exactly once, to the wrapped dialog.
- `v-model:open` works through `$attrs` because Vue compiles it to the
  `open` prop + `update:open` listener, which fall through like any other.
- Template refs on this alias do not reach the inner dialog's exposed
  `reset()` — `v-bind="$attrs"` forwards props and listeners only. Reach for
  [ComplaintCreateDialog](./ComplaintCreateDialog) directly when you need the
  imperative API.
- Inherits [ComplaintForm's known render bug](./ComplaintForm#notes)
  through the wrapped chain.
