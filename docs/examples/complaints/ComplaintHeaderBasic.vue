<script setup lang="ts">
import { ref } from "vue";
import ComplaintHeader from "../../../src/components/complaints/ComplaintHeader.vue";
import { row } from "./fixtures";
import type {
  ComplaintRow,
  ComplaintWritableStatus,
} from "../../../src/types/complaints";

// The demo owns the row, so a status pick re-renders the pill and the menu:
// resolved/closed complaints get no transitions left to offer.
const currentRow = ref<ComplaintRow>({ ...row });
const lastStatus = ref<ComplaintWritableStatus | null>(null);

function onSetStatus(status: ComplaintWritableStatus) {
  lastStatus.value = status;
  currentRow.value = {
    ...currentRow.value,
    complaint: { ...currentRow.value.complaint, status },
  };
}
</script>

<template>
  <div>
    <div
      class="rounded-xl border border-gray-100 bg-white dark:border-white/5 dark:bg-gray-950"
    >
      <ComplaintHeader :row="currentRow" @set-status="onSetStatus" />
    </div>

    <p class="mt-3 text-xs text-gray-500 dark:text-white/40">
      Last setStatus: {{ lastStatus ?? "—" }}
    </p>
  </div>
</template>
