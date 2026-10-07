<script setup lang="ts">
import RyderComplaintList from "@opeolluwa/ryder/components/ComplaintList.vue";
import RyderComplaintPreview from "@opeolluwa/ryder/components/ComplaintPreview.vue";
import type {
  ComplaintRow,
  ComplaintsInboxTab,
} from "@opeolluwa/ryder/types";
import {
  useComplaintEmailDemo,
  complaintRow,
  counterpartParty,
  staffParty,
} from "~/data/complaint-fixtures";

const { thread, sendsAreLoading, sendCount, sendReply } = useComplaintEmailDemo();

const fixture = complaintRow();

const activeTab = ref<ComplaintsInboxTab>("all");
const selected = ref(fixture.complaint.identifier);

const rows: ComplaintRow[] = [0, 1, 2].map((index) =>
  index === 0
    ? fixture
    : {
        ...fixture,
        complaint: {
          ...fixture.complaint,
          identifier: `CMP-000${index + 1}`,
          subject: `Complaint ${index + 1}`,
          orderIdentifier: null,
        },
      },
);

const tabCount = computed(() => ({
  all: rows.length,
  open: rows.length,
  resolved: 0,
}));

const showCustomer = ref(false);
const loading = ref(false);

definePageMeta({ layout: "dashboard" });
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-lg font-semibold">Ryder complaint UI</h1>

    <div class="flex min-h-[480px] flex-col gap-6 lg:h-[calc(100dvh-11rem)] lg:flex-row">
      <RyderComplaintList
        :rows="rows"
        :loading="loading"
        :inbox-empty="false"
        :active-tab="activeTab"
        :tab-count="tabCount"
        :reply-counts="{ 'CMP-0001': thread.length }"
        :selected-id="selected"
        :show-customer="showCustomer"
        @update:active-tab="activeTab = $event"
        @select="selected = $event"
      />

      <RyderComplaintPreview
        :row="rows.find((r) => r.complaint.identifier === selected) ?? null"
        :replies="thread"
        :loading-replies="false"
        :self="staffParty"
        :counterpart="counterpartParty()"
        :sending="sendsAreLoading"
        :sent-count="sendCount"
        :status-menu="false"
        :show-customer="showCustomer"
        @send="sendReply"
      />
    </div>

    <button
      type="button"
      class="rounded-lg border px-3 py-1.5 text-xs"
      @click="showCustomer = !showCustomer"
    >
      Toggle customer identity
    </button>
  </div>
</template>