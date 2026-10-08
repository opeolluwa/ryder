<script setup lang="ts">
import Basic from "../../examples/primitives/InputBasic.vue";
</script>

# Input

Form input field built on Nuxt UI with label, hint, error handling, and optional password toggle.

```vue
<script setup lang="ts">
import RyderInput from "@opeolluwa/ryder/components/primitives/Input.vue"
import { ref } from "vue";

const email = ref("");
</script>

<template>
  <RyderInput v-model="email" name="email" label="Email" />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/primitives/InputBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `label` | `string` | `undefined` | Field label. |
| `name` | `string` | `undefined` | Field name for form validation. |
| `icon` | `string` | `undefined` | Leading icon name. |
| `placeholder` | `string` | `undefined` | Placeholder text. |
| `hint` | `string` | `undefined` | Hint text below field. |
| `disabled` | `boolean` | `false` | Disable the input. |
| `type` | `string` | `"text"` | Input type (e.g., `text`, `password`, `email`). |
| `enablePasswordToggle` | `boolean` | `true` | Show password visibility toggle when `type` is `password`. |
| `trailingIcon` | `string` | `undefined` | Trailing icon name. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Input size. |
| `inputClass` | `string` | `undefined` | Additional classes for input base. |
| `labelClass` | `string` | `undefined` | Additional classes for label. |

## Emits

None declared — model updates and native events fall through.

## Slots

None.

## Notes

- Uses `v-model` with `defineModel<string>()`.
- For password inputs, toggles visibility with internal `ref`.
- Adjusts placeholder size based on `size` prop.
