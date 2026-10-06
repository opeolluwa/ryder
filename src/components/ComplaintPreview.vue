<script setup lang="ts">
import EmptyState from "./EmptyState.vue";
import ComplaintHeader from "./ComplaintHeader.vue";
import ComplaintThread from "./ComplaintThread.vue";
import type {
  ComplaintReply,
  ComplaintRow,
  ComplaintWritableStatus,
  ThreadParty,
} from "../types/complaints";

withDefaults(
  defineProps<{
    row: ComplaintRow | null;
    replies: ComplaintReply[];
    loadingReplies?: boolean;
    self: ThreadParty;
    counterpart: ThreadParty;
    sending?: boolean;
    sentCount?: number;
    /** Passed to the header: whether the status menu is on offer. */
    statusMenu?: boolean;
    /** Passed to the header: whether the complainer's identity is shown. */
    showCustomer?: boolean;
  }>(),
  {
    loadingReplies: false,
    sending: false,
    sentCount: 0,
    statusMenu: true,
    showCustomer: true,
  },
);

const emit = defineEmits<{
  setStatus: [status: ComplaintWritableStatus];
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
      description="Choose a complaint to view its details and reply."
    />

    <template v-else>
      <ComplaintHeader
        :row="row"
        :status-menu="statusMenu"
        :show-customer="showCustomer"
        @set-status="emit('setStatus', $event)"
      />

      <ComplaintThread
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