<script setup lang="ts">
import Basic from "../../examples/primitives/TextareaBasic.vue";
</script>

# Textarea

Multi-line text input built on Nuxt UI's `UTextarea` with form field wrapper.

```vue
<script setup lang="ts">
import RyderTextarea from "@opeolluwa/ryder/components/primitives/Textarea.vue"
import { ref } from "vue";

const message = ref("");
</script>

<template>
  <RyderTextarea v-model="message" name="message" label="Message" />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/primitives/TextareaBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `label` | `string` | `undefined` | Field label. |
| `name` | `string` | `undefined` | Field name for form validation. |
| `placeholder` | `string` | `undefined` | Placeholder text. |
| `hint` | `string` | `undefined` | Hint text below field. |
| `disabled` | `boolean` | `false` | Disable the textarea. |
| `rows` | `number` | `undefined` | Number of rows. |
| `labelClass` | `string` | `undefined` | Additional classes for label. |

## Emits

None declared — model updates fall through.

## Slots

None.

## Notes

- Uses `v-model` with `defineModel<string>()`.
- Error styling applied via UFormField slot context.
