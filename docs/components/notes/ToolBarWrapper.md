<script setup lang="ts">
import Basic from "../../examples/notes/ToolBarWrapperBasic.vue";
</script>

# ToolBarWrapper

The fixed bottom bar that hosts a toolbar: full width, safe-area padded, and
lifted by the `--kb-inset` CSS variable when the on-screen keyboard is up.

```vue
<script setup lang="ts">
import RyderToolBarWrapper from "@opeolluwa/ryder/components/notes/ToolBarWrapper.vue"
</script>

<template>
  <RyderToolBarWrapper>
    <button type="button">One</button>
    <button type="button">Two</button>
  </RyderToolBarWrapper>
</template>
```

## Examples

Normally only used inside [EditorToolBar](./EditorToolBar), which wraps its
buttons in it — the standalone demo below pins the bar inside the box:

<Demo>

<Basic />

</Demo>

<<< @/examples/notes/ToolBarWrapperBasic.vue

## Props

None.

## Emits

None.

## Slots

| Slot | Props | Content |
| ---- | ----- | ------- |
| `default` | — | The bar's contents (buttons, separators, popovers). |

## Notes

- `position: fixed; inset-inline: 0; z-index: 50`, `h-16`, with a top border
  and white/`gray-900` background — a `<nav>` element.
- `bottom: var(--kb-inset, 0px)` — set `--kb-inset` on an ancestor when the
  keyboard opens to lift the bar above it; it defaults to `0px`.
- Bottom padding uses `max(0.625rem, env(safe-area-inset-bottom))` so the bar
  clears the home indicator on notched phones.
- It has no props or emits of its own: everything is the default slot plus
  those two CSS inputs.
- Because it is fixed, its demo (and the editor's) needs bottom padding so the
  content underneath is not covered — the playground uses `pb-24`.
