<script setup lang="ts">
import { ref } from "vue";
import ComplaintThread from "../../../src/components/complaints/ComplaintThread.vue";
import { counterpart, replies as seed, row, self } from "./fixtures";
import type { ComplaintReply } from "../../../src/types/complaints";

const thread = ref<ComplaintReply[]>([...seed]);
const sending = ref(false);
const sentCount = ref(0);
const lastSend = ref("—");

// The parent owns the reply POST: append, then bump `sentCount` so the
// component clears its composer.
async function onSend(body: string) {
  lastSend.value = body;
  sending.value = true;

  await new Promise((resolve) => setTimeout(resolve, 400));

  thread.value = [
    ...thread.value,
    {
      identifier: `RPL-${Date.now()}`,
      complaintIdentifier: row.complaint.identifier,
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
    <div
      class="flex h-[28rem] flex-col overflow-hidden rounded-xl border border-gray-100 bg-white dark:border-white/5 dark:bg-gray-950"
    >
      <ComplaintThread
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
