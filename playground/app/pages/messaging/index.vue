<script setup lang="ts">
import RyderMessagingList from "@opeolluwa/ryder/components/messaging/MessagingList.vue";
import RyderMessagingPreview from "@opeolluwa/ryder/components/messaging/MessagingPreview.vue";
import type { MessagingInboxTab } from "@opeolluwa/ryder/types";
import { messagingMatchesTab } from "@opeolluwa/ryder/utils";
import {
  counterpartParty,
  staffParty,
  useMessagingDemo,
} from "~/data/messaging-fixtures";

definePageMeta({
  layout: "dashboard",
  breadcrumb: { title: "Messaging" },
});

const { rows, threads } = useMessagingDemo();

const activeTab = ref<MessagingInboxTab>("all");

const visibleRows = computed(() =>
  rows.value.filter((row) =>
    messagingMatchesTab(activeTab.value, row.conversation.status),
  ),
);

const tabCount = computed<Record<MessagingInboxTab, number>>(() => ({
  all: rows.value.length,
  open: rows.value.filter((row) =>
    messagingMatchesTab("open", row.conversation.status),
  ).length,
  resolved: rows.value.filter((row) =>
    messagingMatchesTab("resolved", row.conversation.status),
  ).length,
}));

const replyCounts = computed(() => {
  const counts: Record<string, number> = {};

  for (const [identifier, replies] of Object.entries(threads.value)) {
    counts[identifier] = replies.length;
  }

  return counts;
});

function selectConversation(identifier: string) {
  navigateTo(`/messaging/${identifier}`);
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 lg:h-[calc(100dvh-11rem)] lg:min-h-[480px] lg:flex-row lg:gap-6">
      <RyderMessagingList
        :rows="visibleRows"
        :loading="false"
        :inbox-empty="false"
        :active-tab="activeTab"
        :tab-count="tabCount"
        :reply-counts="replyCounts"
        :selected-id="null"
        @update:active-tab="activeTab = $event"
        @select="selectConversation"
      />

      <div class="hidden lg:flex lg:h-full lg:min-w-0 lg:flex-1">
        <RyderMessagingPreview
          :row="null"
          :replies="[]"
          :loading-replies="false"
          :self="staffParty"
          :counterpart="counterpartParty()"
          :sending="false"
          :sent-count="0"
          :status-menu="false"
        />
      </div>
    </div>
  </div>
</template>