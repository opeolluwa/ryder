<script setup lang="ts">
import { ref } from "vue";
import MessagingHeader from "../../../src/components/messaging/MessagingHeader.vue";
import { row } from "./fixtures";
import type {
  ConversationRow,
  MessagingWritableStatus,
} from "../../../src/types/messaging";

const current = ref<ConversationRow>({
  ...row,
  conversation: { ...row.conversation },
});
const openingFromSelf = ref(false);
const showBack = ref(false);
const lastStatus = ref<MessagingWritableStatus | null>(null);
const backCount = ref(0);

function onSetStatus(status: MessagingWritableStatus) {
  lastStatus.value = status;
  current.value = {
    ...current.value,
    conversation: { ...current.value.conversation, status },
  };
}
</script>

<template>
  <div class="space-y-4">
    <div class="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
      <MessagingHeader
        :row="current"
        :opening-from-self="openingFromSelf"
        :show-back="showBack"
        @set-status="onSetStatus"
        @back="backCount += 1"
      />
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <button
        type="button"
        class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs dark:border-white/10"
        @click="openingFromSelf = !openingFromSelf"
      >
        Toggle sent / received
      </button>

      <button
        type="button"
        class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs dark:border-white/10"
        @click="showBack = !showBack"
      >
        Toggle back button
      </button>

      <span class="text-xs text-gray-500 dark:text-white/40">
        Last status: {{ lastStatus ?? "—" }} — back events: {{ backCount }}
      </span>
    </div>
  </div>
</template>
