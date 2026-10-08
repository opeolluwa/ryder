<script setup lang="ts">
import { computed, ref } from "vue";
import ComplaintList from "../../../src/components/complaints/ComplaintList.vue";
import { complaintMatchesTab } from "../../../src/utils/complaintStatus";
import { replyCounts, rows } from "./fixtures";
import type { ComplaintsInboxTab } from "../../../src/types/complaints";

const activeTab = ref<ComplaintsInboxTab>("all");
const selectedId = ref<string | null>(rows[0].complaint.identifier);

// The component renders `rows` verbatim — filtering to the active tab is the
// parent's job, here with the shared tab matcher.
const visibleRows = computed(() =>
  rows.filter((item) =>
    complaintMatchesTab(activeTab.value, item.complaint.status),
  ),
);

const tabCount = computed(() => ({
  all: rows.length,
  open: rows.filter((item) =>
    complaintMatchesTab("open", item.complaint.status),
  ).length,
  resolved: rows.filter((item) =>
    complaintMatchesTab("resolved", item.complaint.status),
  ).length,
}));
</script>

<template>
  <div>
    <div class="h-[28rem]">
      <ComplaintList
        :rows="visibleRows"
        :loading="false"
        :inbox-empty="false"
        :active-tab="activeTab"
        :tab-count="tabCount"
        :reply-counts="replyCounts"
        :selected-id="selectedId"
        @update:active-tab="activeTab = $event"
        @select="selectedId = $event"
      />
    </div>

    <p class="mt-3 text-xs text-gray-500 dark:text-white/40">
      Active tab: {{ activeTab }} — selected: {{ selectedId ?? "none" }}
    </p>
  </div>
</template>
