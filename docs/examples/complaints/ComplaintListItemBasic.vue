<script setup lang="ts">
import { ref } from "vue";
import ComplaintListItem from "../../../src/components/complaints/ComplaintListItem.vue";
import { replyCounts, rows } from "./fixtures";

const selectedId = ref<string>(rows[0].complaint.identifier);
</script>

<template>
  <div
    class="flex w-full max-w-sm flex-col gap-2 rounded-xl border border-gray-100 bg-white p-2 lg:gap-0 lg:border-0 lg:p-0 dark:border-white/5 dark:bg-gray-950"
  >
    <ComplaintListItem
      v-for="item in rows"
      :key="item.complaint.identifier"
      :row="item"
      :selected="selectedId === item.complaint.identifier"
      :reply-count="replyCounts[item.complaint.identifier] ?? 0"
      @select="selectedId = $event"
    />
  </div>
</template>
