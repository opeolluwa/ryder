<script setup lang="ts">
import { ref } from "vue";
import MessagingThread from "../../../src/components/messaging/MessagingThread.vue";
import {
  counterpart,
  replies as seed,
  row,
  self,
} from "./fixtures";
import type { ConversationReply } from "../../../src/types/messaging";

const thread = ref<ConversationReply[]>([...seed]);
const sending = ref(false);
const sentCount = ref(0);
const lastSend = ref("—");

async function onSend(body: string) {
  lastSend.value = body;
  sending.value = true;

  await new Promise((resolve) => setTimeout(resolve, 400));

  thread.value = [
    ...thread.value,
    {
      identifier: `MSG-${Date.now()}`,
      conversationIdentifier: row.conversation.identifier,
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
    <div class="flex h-[30rem] overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
      <MessagingThread
        :row="row"
        :replies="thread"
        :self="self"
        :counterpart="counterpart"
        :sending="sending"
        :sent-count="sentCount"
        @send="onSend"
      />
    </div>

    <p class="mt-3 text-xs text-gray-500 dark:text-white/40">
      Last send: {{ lastSend }}
    </p>
  </div>
</template>
