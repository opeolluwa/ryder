<script setup lang="ts">
import { computed, ref } from "vue";
import MessagingList from "../../../src/components/messaging/MessagingList.vue";
import MessagingPreview from "../../../src/components/messaging/MessagingPreview.vue";
import { messagingMatchesTab } from "../../../src/utils/messagingStatus";
import {
  counterpart,
  replies as seed,
  replyCounts,
  rows as seedRows,
  self,
} from "./fixtures";
import type {
  ConversationReply,
  ConversationRow,
  MessagingInboxTab,
  MessagingWritableStatus,
} from "../../../src/types/messaging";

const items = ref<ConversationRow[]>(seedRows.map((item) => ({ ...item })));
const activeTab = ref<MessagingInboxTab>("all");
const selectedId = ref<string | null>(items.value[0]?.conversation.identifier ?? null);
const thread = ref<ConversationReply[]>([...seed]);
const sending = ref(false);
const sentCount = ref(0);
const backCount = ref(0);

const visibleRows = computed(() =>
  items.value.filter((item) =>
    messagingMatchesTab(activeTab.value, item.conversation.status),
  ),
);

const selected = computed(
  () =>
    items.value.find(
      (item) => item.conversation.identifier === selectedId.value,
    ) ?? null,
);

const tabCount = computed(() => ({
  all: items.value.length,
  open: items.value.filter((item) =>
    messagingMatchesTab("open", item.conversation.status),
  ).length,
  resolved: items.value.filter((item) =>
    messagingMatchesTab("resolved", item.conversation.status),
  ).length,
}));

function onSetStatus(status: MessagingWritableStatus) {
  items.value = items.value.map((item) =>
    item.conversation.identifier === selectedId.value
      ? {
          ...item,
          conversation: { ...item.conversation, status },
        }
      : item,
  );
}

async function onSend(body: string) {
  sending.value = true;

  await new Promise((resolve) => setTimeout(resolve, 400));

  thread.value = [
    ...thread.value,
    {
      identifier: `MSG-${Date.now()}`,
      conversationIdentifier: selectedId.value ?? "unknown",
      body,
      senderEmail: self.email ?? "support@ryder.example",
      createdAt: new Date().toISOString(),
      updatedAt: null,
    },
  ];

  sending.value = false;
  sentCount.value += 1;
}
</script>

<template>
  <div>
    <div class="flex h-[34rem] gap-3">
      <div class="hidden h-full shrink-0 lg:block">
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

      <div class="flex min-w-0 flex-1">
        <MessagingPreview
          :row="selected"
          :replies="thread"
          :self="self"
          :counterpart="counterpart"
          :sending="sending"
          :sent-count="sentCount"
          show-back
          @set-status="onSetStatus"
          @send="onSend"
          @back="backCount += 1"
        />
      </div>
    </div>

    <div class="mt-3 flex flex-wrap items-center gap-3">
      <button
        type="button"
        class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs dark:border-white/10"
        @click="selectedId = items[0]?.conversation.identifier ?? null"
      >
        Select first conversation
      </button>

      <button
        type="button"
        class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs dark:border-white/10"
        @click="selectedId = null"
      >
        Clear selection
      </button>

      <span class="text-xs text-gray-500 dark:text-white/40">
        Back events: {{ backCount }}
      </span>
    </div>
  </div>
</template>
