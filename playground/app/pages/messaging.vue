<script setup lang="ts">
import RyderMessagingList from "@opeolluwa/ryder/components/messaging/MessagingList.vue";
import RyderMessagingPreview from "@opeolluwa/ryder/components/messaging/MessagingPreview.vue";
import type {
  ConversationRow,
  MessagingInboxTab,
} from "@opeolluwa/ryder/types";
import {
  useMessagingDemo,
  conversationRow,
  counterpartParty,
  staffParty,
} from "~/data/messaging-fixtures";

const { thread, sendsAreLoading, sendCount, sendReply } = useMessagingDemo();

const fixture = conversationRow();

const activeTab = ref<MessagingInboxTab>("all");
const selected = ref(fixture.conversation.identifier);

const rows: ConversationRow[] = [0, 1, 2].map((index) =>
  index === 0
    ? fixture
    : {
        ...fixture,
        conversation: {
          ...fixture.conversation,
          identifier: `MSG-000${index + 1}`,
          subject: `Conversation ${index + 1}`,
          orderIdentifier: null,
        },
      },
);

const tabCount = computed(() => ({
  all: rows.length,
  open: rows.length,
  resolved: 0,
}));

const showParticipant = ref(true);
const loading = ref(false);

definePageMeta({ layout: "dashboard" });
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-lg font-semibold">Ryder messaging UI</h1>

    <div class="flex min-h-[480px] flex-col gap-6 lg:h-[calc(100dvh-11rem)] lg:flex-row">
      <RyderMessagingList
        :rows="rows"
        :loading="loading"
        :inbox-empty="false"
        :active-tab="activeTab"
        :tab-count="tabCount"
        :reply-counts="{ 'MSG-0001': thread.length }"
        :selected-id="selected"
        :show-participant="showParticipant"
        @update:active-tab="activeTab = $event"
        @select="selected = $event"
      />

      <RyderMessagingPreview
        :row="rows.find((r) => r.conversation.identifier === selected) ?? null"
        :replies="thread"
        :loading-replies="false"
        :self="staffParty"
        :counterpart="counterpartParty()"
        :sending="sendsAreLoading"
        :sent-count="sendCount"
        :status-menu="false"
        :show-participant="showParticipant"
        @send="sendReply"
      />
    </div>

    <button
      type="button"
      class="rounded-lg border px-3 py-1.5 text-xs"
      @click="showParticipant = !showParticipant"
    >
      Toggle participant identity
    </button>
  </div>
</template>
