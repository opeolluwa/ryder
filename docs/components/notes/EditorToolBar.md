<script setup lang="ts">
import Basic from "../../examples/notes/EditorBasic.vue";
</script>

# EditorToolBar

The formatting bar for [Editor](./Editor): undo/redo, text style, marks, lists,
alignment, link, colour, emoji, image, table, divider, equations and collapsible
sections, plus contextual table operations.

```vue
<script setup lang="ts">
import RyderEditor from "@opeolluwa/ryder/components/notes/Editor.vue"
import RyderEditorToolBar from "@opeolluwa/ryder/components/notes/EditorToolBar.vue"
</script>

<template>
  <RyderEditor v-model="content">
    <template #toolbar>
      <RyderEditorToolBar :upload-image="uploadImage" />
    </template>
  </RyderEditor>
</template>
```

::: warning
`EditorToolBar` must be rendered inside `<Domternal>` — that is, in Editor's
`toolbar` slot. It resolves its editor with `useCurrentEditor()`; outside a
`<Domternal>` there is no editor, and **every button silently no-ops**.
:::

## Examples

The live bar (inside an Editor, which is where it belongs):

<Demo>

<Basic />

</Demo>

<<< @/examples/notes/EditorBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `uploadImage` | `(file: File) => Promise<string>` | — | Uploads a picked image and resolves to its public URL; falls back to `POST /api/upload`. This is the only prop. |

## Emits

None.

## Slots

None.

## Notes

- Editor state is read with `useEditorState()` from `@domternal/vue`, so active
  toggles (bold, italic, heading level, lists, alignment, link, colour, undo /
  redo availability) track the selection automatically.
- Buttons use `@mousedown.prevent` so pressing one does not steal the document
  selection before the command runs.
- The table toolbar (insert/delete rows and columns, header row, delete table)
  only appears when the selection is inside a table.
- The root renders inside [ToolBarWrapper](./ToolBarWrapper) — a fixed bottom
  bar — so give the editor `pb-24` breathing room underneath it.
- The image button opens a hidden `<input type="file" accept="image/*">`;
  the resolved URL is inserted with `setImage({ src })`.
