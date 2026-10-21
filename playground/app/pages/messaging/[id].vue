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
  back: true,
  breadcrumb: { ariaLabel: "Messaging", title: "Messaging" },
});

const route = useRoute();

const { rows, threads, sendsAreLoading, sentCount, sendReply } =
  useMessagingDemo();

const identifier = computed(() => String(route.params.id ?? ""));

const row = computed(
  () =>
    rows.value.find((item) => item.conversation.identifier === identifier.value) ??
    null,
);

const replies = computed(() => threads.value[identifier.value] ?? []);

const activeTab = ref<MessagingInboxTab>("all");

/** The inbox rail shows every conversation in the active tab, with the current one selected. */
const railRows = computed(() =>
  rows.value.filter((item) =>
    messagingMatchesTab(activeTab.value, item.conversation.status),
  ),
);

const tabCount = computed<Record<MessagingInboxTab, number>>(() => ({
  all: rows.value.length,
  open: rows.value.filter((item) =>
    messagingMatchesTab("open", item.conversation.status),
  ).length,
  resolved: rows.value.filter((item) =>
    messagingMatchesTab("resolved", item.conversation.status),
  ).length,
}));

const replyCounts = computed(() => {
  const counts: Record<string, number> = {};

  for (const [threadIdentifier, replies] of Object.entries(threads.value)) {
    counts[threadIdentifier] = replies.length;
  }

  return counts;
});

const showParticipant = ref(true);

function selectConversation(identifier: string) {
  navigateTo(`/messaging/${identifier}`);
}

function onSend(body: string) {
  void sendReply(identifier.value, body);
}
</script>

<template>
  <div class="flex flex-col gap-4 lg:h-[calc(100dvh-11rem)] lg:min-h-[480px] lg:flex-row lg:gap-6">
    <div v-if="!row" class="flex flex-1 flex-col items-center justify-center">
      <RyderEmptyState
        class="w-full"
        icon="heroicons:question-mark-circle"
        title="Conversation not found"
        description="This conversation may have been deleted."
        action-label="Back to messaging"
        @action="navigateTo('/messaging')"
      />
    </div>

    <template v-else>
      <div
        class="flex h-[calc(100dvh-7rem)] min-h-[320px] flex-col sm:h-[calc(100dvh-10rem)] lg:hidden"
      >
        <RyderMessagingPreview
          :row="row"
          :replies="replies"
          :loading-replies="false"
          :self="staffParty"
          :counterpart="counterpartParty()"
          :sending="sendsAreLoading"
          :sent-count="sentCount"
          :status-menu="false"
          :show-participant="showParticipant"
          @send="onSend"
        />
      </div>

      <div class="hidden lg:flex lg:h-full lg:min-w-0 lg:flex-1 lg:flex-row lg:gap-6">
        <RyderMessagingList
          :rows="railRows"
          :loading="false"
          :inbox-empty="false"
          :active-tab="activeTab"
          :tab-count="tabCount"
          :reply-counts="replyCounts"
          :selected-id="identifier"
          :show-participant="showParticipant"
          @update:active-tab="activeTab = $event"
          @select="selectConversation"
        />

        <RyderMessagingPreview
          :row="row"
          :replies="replies"
          :loading-replies="false"
          :self="staffParty"
          :counterpart="counterpartParty()"
          :sending="sendsAreLoading"
          :sent-count="sentCount"
          :status-menu="false"
          :show-participant="showParticipant"
          @send="onSend"
        />
      </div>
    </template>
  </div>
</template>