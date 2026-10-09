<script setup lang="ts">
import Basic from "../../examples/primitives/SelectBasic.vue";
import Case from "../../examples/primitives/SelectCase.vue";
</script>

# Select

Dropdown select built on Nuxt UI's `USelectMenu` with form field wrapper, v-model support, and optional creatable mode.

```vue
<script setup lang="ts">
import RyderSelect from "@opeolluwa/ryder/components/primitives/Select.vue"
import { ref } from "vue";

const items = ref(["apple", "banana"]);
const value = ref("");
</script>

<template>
  <RyderSelect v-model="value" :items="items" label="Fruit" />
</template>
```

## Examples

### Basic

<Demo>

<Basic />

</Demo>

<<< @/examples/primitives/SelectBasic.vue

### Creatable

Allows typing new values not in items; emits `@create` so parent can append.

<Demo>

<Case />

</Demo>

<<< @/examples/primitives/SelectCase.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `label` | `string` | `undefined` | Field label. |
| `icon` | `string` | `undefined` | Leading icon name. |
| `className` | `string` | `undefined` | Additional classes for select. |
| `name` | `string` | `undefined` | Field name for form validation. |
| `trailingIcon` | `string` | `undefined` | Trailing icon name. |
| `placeholder` | `string` | `undefined` | Placeholder text. |
| `hint` | `string` | `undefined` | Hint text below field. |
| `avatar` | `string` | `undefined` | Avatar image src passed to USelectMenu. |
| `disabled` | `boolean` | `false` | Disable the select. |
| `preserveCase` | `boolean` | `false` | Preserve case instead of lowercasing. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Select size. |
| `items` | `string[] \| { label: string; value: string }[]` | `undefined` | Required: list of options. |
| `labelClass` | `string` | `undefined` | Additional classes for label. |
| `creatable` | `boolean` | `false` | Allow creating new items; emits `create` event. |

## Emits

| Event | Payload | When |
| ---- | ----- | ------- |
| `create` | `[term: string]` | When a new item is created in creatable mode. |

## Slots

None.

## Notes

- Uses `v-model` with `defineModel<string>()`.
- Adjusts placeholder text size based on `size` prop (matches `Input`).
- When `creatable` is true, the typed term is emitted via `@create` — parent must append to `items` for it to remain selectable (see examples).
- `value-key="value"` is set; items can be strings or objects with label/value.
