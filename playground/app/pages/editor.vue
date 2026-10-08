<script setup lang="ts">
import { ref } from "vue";

definePageMeta({ layout: "dashboard" });

const content = ref(
  "<h1>Ryder notes</h1><p>Start typing — <strong>bold</strong>, lists, tables, links and equations all work.</p>",
);

const refreshed = ref(0);

async function onRefresh() {
  await new Promise((resolve) => setTimeout(resolve, 800));
  refreshed.value += 1;
}
</script>

<template>
  <div class="space-y-10">
    <RyderPageHeader
      title="Notes editor"
      subtitle="RyderEditor + RyderEditorToolBar, wired through the editor's toolbar slot."
    />

    <section class="space-y-3">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-white/70">
        Editor
      </h3>

      <div class="rounded-xl border border-gray-200 pb-24 dark:border-white/10">
        <RyderEditor v-model="content">
          <template #toolbar>
            <RyderEditorToolBar />
          </template>
        </RyderEditor>
      </div>

      <details class="text-xs text-gray-500 dark:text-white/50">
        <summary class="cursor-pointer">Model value (HTML)</summary>
        <pre class="mt-2 overflow-x-auto rounded-lg bg-gray-50 p-3 dark:bg-white/5">{{
          content
        }}</pre>
      </details>
    </section>

    <section class="space-y-3">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-white/70">
        Pull to refresh
      </h3>

      <p class="text-xs text-gray-500 dark:text-white/50">
        Touch-only. Refreshed {{ refreshed }} time(s).
      </p>

      <div class="h-40 overflow-y-auto rounded-xl border border-gray-200 dark:border-white/10">
        <RyderPullToRefresh @refresh="onRefresh">
          <p class="p-4 text-sm text-gray-600 dark:text-white/60">
            Pull down from the top of this box.
          </p>
        </RyderPullToRefresh>
      </div>
    </section>
  </div>
</template>
