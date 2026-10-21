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
    openingFromSelf?: boolean;
    /** Render a back affordance in the header (mobile detail views). */
    showBack?: boolean;
  }>(),
  {
    loadingReplies: false,
    sending: false,
    sentCount: 0,
    statusMenu: true,
    showParticipant: true,
    openingFromSelf: false,
    showBack: false,
  },
);

const emit = defineEmits<{
  setStatus: [status: MessagingWritableStatus];
  send: [body: string];
  back: [];
}>();
</script>

<template>
  <div
    class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white p-0! dark:bg-gray-950 lg:rounded-xl lg:border lg:border-gray-200 dark:lg:border-gray-400/20"
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
        :opening-from-self="openingFromSelf"
        :show-back="showBack"
        @set-status="emit('setStatus', $event)"
        @back="emit('back')"
      />

      <MessagingThread
        :row="row"
        :replies="replies"
        :loading-replies="loadingReplies"
        :self="self"
        :counterpart="counterpart"
        :sending="sending"
        :sent-count="sentCount"
        :opening-from-self="openingFromSelf"
        @send="emit('send', $event)"
      />
    </template>
  </div>
</template>
