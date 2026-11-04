<script setup lang="ts">
import { computed, ref } from "vue";
import MessagingList from "../../../src/components/messaging/MessagingList.vue";
import { messagingMatchesTab } from "../../../src/utils/messagingStatus";
import { replyCounts, rows } from "./fixtures";
import type { MessagingInboxTab } from "../../../src/types/messaging";

const activeTab = ref<MessagingInboxTab>("all");
const selectedId = ref<string | null>(rows[0]?.conversation.identifier ?? null);

const visibleRows = computed(() =>
  rows.filter((item) =>
    messagingMatchesTab(activeTab.value, item.conversation.status),
  ),
);

const tabCount = computed(() => ({
  all: rows.length,
  open: rows.filter((item) =>
    messagingMatchesTab("open", item.conversation.status),
  ).length,
  resolved: rows.filter((item) =>
    messagingMatchesTab("resolved", item.conversation.status),
  ).length,
}));
</script>

<template>
  <div>
    <div class="h-[28rem]">
      <MessagingList
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
