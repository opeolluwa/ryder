<script setup lang="ts">
import EmptyState from "../feedback/EmptyState.vue";
import MessagingHeader from "./MessagingHeader.vue";
import MessagingThread from "./MessagingThread.vue";
import type {
  ConversationReply,
  ConversationRow,
  MessagingWritableStatus,
  ThreadParty,
} from "../../types/messaging";

withDefaults(
  defineProps<{
    row: ConversationRow | null;
    replies: ConversationReply[];
    loadingReplies?: boolean;
    self: ThreadParty;
    counterpart: ThreadParty;
    sending?: boolean;
    sentCount?: number;
    statusMenu?: boolean;
    showParticipant?: boolean;
  }>(),
  {
    loadingReplies: false,
    sending: false,
    sentCount: 0,
    statusMenu: true,
    showParticipant: true,
  },
);

const emit = defineEmits<{
  setStatus: [status: MessagingWritableStatus];
  send: [body: string];
}>();
</script>

<template>
  <div
    class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-0! dark:border-gray-400/20 dark:bg-gray-950"
  >
    <EmptyState
      v-if="!row"
      class="lg:h-full"
      icon="i-heroicons-chat-bubble-left-right"
      title="No conversation selected"
      description="Choose a conversation to view its details and reply."
    />

    <template v-else>
      <MessagingHeader
        :row="row"
        :status-menu="statusMenu"
        :show-participant="showParticipant"
        @set-status="emit('setStatus', $event)"
      />

      <MessagingThread
        :row="row"
        :replies="replies"
        :loading-replies="loadingReplies"
        :self="self"
        :counterpart="counterpart"
        :sending="sending"
        :sent-count="sentCount"
        @send="emit('send', $event)"
      />
    </template>
  </div>
</template>
