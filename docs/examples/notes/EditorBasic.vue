<script setup lang="ts">
import { ref } from "vue";
import Editor from "../../../src/components/notes/Editor.vue";
import EditorToolBar from "../../../src/components/notes/EditorToolBar.vue";

const content = ref(
  "<h1>Ryder notes</h1><p>Start typing — <strong>bold</strong>, lists, tables, links and equations all work.</p>",
);
</script>

<template>
  <div class="rounded-xl border border-gray-200 pb-24 dark:border-white/10">
    <Editor v-model="content">
      <template #toolbar>
        <EditorToolBar />
      </template>
    </Editor>
  </div>

  <details class="mt-3 text-xs text-gray-500 dark:text-white/50">
    <summary class="cursor-pointer">Model value (HTML)</summary>
    <pre
      class="mt-2 overflow-x-auto rounded-lg bg-gray-50 p-3 dark:bg-white/5"
    >{{ content }}</pre>
  </details>
</template>
