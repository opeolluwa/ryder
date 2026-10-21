<script setup lang="ts">
import Basic from "../../examples/primitives/PasswordInputBasic.vue";
</script>

# PasswordInput

Password field with a built-in visibility toggle. Separate from Input so regular inputs never carry toggle logic.

```vue
<script setup lang="ts">
import RyderPasswordInput from "@opeolluwa/ryder/components/primitives/PasswordInput.vue"
import { ref } from "vue";

const password = ref("");
</script>

<template>
  <RyderPasswordInput v-model="password" name="password" label="Password" />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/primitives/PasswordInputBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `label` | `string` | `undefined` | Field label. |
| `name` | `string` | `undefined` | Field name for form validation. |
| `icon` | `string` | `undefined` | Leading icon name. |
| `placeholder` | `string` | `undefined` | Placeholder text. |
| `hint` | `string` | `undefined` | Hint text below field. |
| `disabled` | `boolean` | `false` | Disable the input. |
| `enablePasswordToggle` | `boolean` | `true` | Show password visibility toggle. |
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
- Toggles visibility with internal `ref`.
- Placeholder uses `placeholder:text-xs`, matching `Input` and `Textarea`.
