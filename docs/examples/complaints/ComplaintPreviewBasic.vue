<script setup lang="ts">
import { ref } from "vue";
import ComplaintPreview from "../../../src/components/complaints/ComplaintPreview.vue";
import {
  counterpart,
  replies as seed,
  row,
  self,
} from "./fixtures";
import type {
  ComplaintReply,
  ComplaintRow,
  ComplaintWritableStatus,
} from "../../../src/types/complaints";

const selected = ref<ComplaintRow | null>({ ...row });
const thread = ref<ComplaintReply[]>([...seed]);
const sending = ref(false);
const sentCount = ref(0);
const lastSend = ref("—");
const lastStatus = ref<ComplaintWritableStatus | null>(null);

async function onSend(body: string) {
  lastSend.value = body;
  sending.value = true;

  await new Promise((resolve) => setTimeout(resolve, 400));

  thread.value = [
    ...thread.value,
    {
      identifier: `RPL-${Date.now()}`,
      complaintIdentifier: selected.value?.complaint.identifier ?? row.complaint.identifier,
      body,
      senderEmail: self.email ?? "support@ryder.example",
      createdAt: new Date().toISOString(),
      updatedAt: null,
    },
  ];

  sending.value = false;
  sentCount.value += 1;
}

function onSetStatus(status: ComplaintWritableStatus) {
  lastStatus.value = status;

  if (selected.value) {
    selected.value = {
      ...selected.value,
      complaint: { ...selected.value.complaint, status },
    };
  }
}
</script>

<template>
  <div>
    <div class="flex h-[32rem]">
      <ComplaintPreview
        :row="selected"
        :replies="thread"
        :self="self"
        :counterpart="counterpart"
        :sending="sending"
        :sent-count="sentCount"
        @send="onSend"
        @set-status="onSetStatus"
      />
    </div>

    <div class="mt-3 flex flex-wrap items-center gap-3">
      <button
        type="button"
        class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs dark:border-white/10"
        @click="selected = { ...row }"
      >
        Select complaint
      </button>
      <button
        type="button"
        class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs dark:border-white/10"
        @click="selected = null"
      >
        Clear selection
      </button>
      <span class="text-xs text-gray-500 dark:text-white/40">
        Last send: {{ lastSend }} — last setStatus: {{ lastStatus ?? "—" }}
      </span>
    </div>
  </div>
</template>
