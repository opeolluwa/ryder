<script setup lang="ts">
import Basic from "../../examples/primitives/ButtonBasic.vue";
import Form from "../../examples/primitives/ButtonForm.vue";
</script>

# Button

Thin wrapper over Nuxt UI's `UButton` that locks in ryder's defaults
(`type="button"`, `variant="solid"`, `color="primary"`, `size="sm"`) plus a
full-width `py-3` hit area. Single root, so attrs/classes fall through to
`UButton`.

```vue
<script setup lang="ts">
import RyderButton from "@opeolluwa/ryder/components/primitives/Button.vue"
</script>

<template>
  <RyderButton @click="save">Save</RyderButton>
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/primitives/ButtonBasic.vue

The `type` prop makes it a real submit button inside forms; `icon` (and any
other `UButton` prop) falls through:

<Demo>

<Form />

</Demo>

<<< @/examples/primitives/ButtonForm.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `type` | `"reset" \| "button" \| "submit" \| undefined` | `"button"` | Native button type; use `"submit"` inside forms. |
| `variant` | `"ghost" \| "solid" \| "outline" \| "soft" \| "subtle"` | `"solid"` | Visual weight. |
| `color` | `"primary" \| "error" \| "secondary" \| "success" \| "info" \| "warning" \| "neutral"` | `"primary"` | Semantic colour. |
| `loading` | `boolean` | `false` | Shows a spinner and forces `disabled`. |
| `disabled` | `boolean` | `false` | Disables the button. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"sm"` | Control height. |
| `error` | `boolean` | `false` | Declared but currently unused (no template reference). |

## Emits

None declared — `click` and native events fall through to `UButton`.

## Slots

| Slot | Props | Content |
| ---- | ----- | ------- |
| `default` | — | Button label / inner content. |

## Notes

- Loading state disables the control: `:disabled="disabled || loading"`.
- Styling hooks: `:ui="{ base: 'py-3 text-center justify-center' }"` is applied
  internally, so extra classes merge onto the root.
