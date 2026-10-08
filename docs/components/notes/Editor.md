<script setup lang="ts">
import Basic from "../../examples/notes/EditorBasic.vue";
</script>

# Editor

Rich-text notes editor (domternal) with headings, lists, tables, links, code,
equations, emoji and images. The HTML lives in a `v-model` string; legacy
Markdown notes are converted to HTML on load and every update is sanitised.

```vue
<script setup lang="ts">
import RyderEditor from "@opeolluwa/ryder/components/notes/Editor.vue"
import RyderEditorToolBar from "@opeolluwa/ryder/components/notes/EditorToolBar.vue"
</script>

<template>
  <RyderEditor v-model="content" :upload-image="uploadImage">
    <template #toolbar>
      <RyderEditorToolBar :upload-image="uploadImage" />
    </template>
  </RyderEditor>
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/notes/EditorBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `uploadImage` | `(file: File) => Promise<string>` | — | Uploads a picked image and resolves to its public URL; falls back to `POST /api/upload`. |

## Emits

None — the HTML document is exchanged through `v-model` (`string`).

## Slots

| Slot | Props | Content |
| ---- | ----- | ------- |
| `toolbar` | — | Must wrap [EditorToolBar](./EditorToolBar): the toolbar resolves its editor through `useCurrentEditor()`, which only exists inside `<Domternal>`. |

## Notes

- `v-model` holds the document as HTML. Updates are written with
  `DOMPurify.sanitize(editor.getHTML())`.
- Values that are not HTML are treated as legacy Markdown (old notes were
  saved with UEditor's `content-type="markdown"`) and run through `marked` on
  load; raw Markdown pasted as plain text is converted the same way and parsed
  into the schema.
- Dark mode comes from `useColorMode()` (imported from `#imports`) and drives
  the `dm-theme-dark` class plus the `--dm-*` CSS variables on the root.
- Heavy dependencies are loaded with the component: `@domternal/*`
  (core, extensions, theme, pm), `katex` + its CSS, `marked`, `lowlight`,
  `dompurify`.
- Exposes the live editor instance as `editor` (a `shallowRef`, `null` before
  create and after destroy) via `defineExpose`.
- Extensions include StarterKit, headings 1–6, tables, details, slash command,
  block handles, keyboard reorder, emoji, KaTeX math, lowlight code blocks and
  image upload through the `uploadImage` prop.
