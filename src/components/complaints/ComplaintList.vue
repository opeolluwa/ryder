<script setup lang="ts">
import UTabs from "@nuxt/ui/components/Tabs.vue";
import type { TabsItem } from "@nuxt/ui";
import EmptyState from "../feedback/EmptyState.vue";
import PageLoader from "../feedback/PageLoader.vue";
import ComplaintListItem from "./ComplaintListItem.vue";
import {
  COMPLAINTS_INBOX_TABS,
  type ComplaintRow,
  type ComplaintsInboxTab,
} from "../../types/complaints";

const props = withDefaults(
  defineProps<{
    rows: ComplaintRow[];
    loading: boolean;
    inboxEmpty: boolean;
    activeTab: ComplaintsInboxTab;
    tabCount: Record<ComplaintsInboxTab, number>;
    replyCounts: Record<string, number>;
    selectedId: string | null;
    /**
     * The tabs to show, or an empty array for no tab bar at all. An inbox
     * view partitions the whole list; a customer's own short history may not
     * want the filter.
     */
    tabs?: ComplaintsInboxTab[];
    /** Passed through to each list item, for the no-customer variant. */
    showCustomer?: boolean;
  }>(),
  {
    tabs: () => [...COMPLAINTS_INBOX_TABS],
    showCustomer: true,
  },
);

const emit = defineEmits<{
  "update:activeTab": [value: ComplaintsInboxTab];
  select: [identifier: string];
}>();

const tabItems = computed<TabsItem[]>(() =>
  props.tabs.map((tab) => ({
    value: tab,
    label: tab,
    disabled: props.loading,
  })),
);

function onTabChange(value: string | number) {
  emit("update:activeTab", value as ComplaintsInboxTab);
}
</script>

<template>
  <div
    class="flex w-full flex-col overflow-hidden lg:h-full lg:w-80 lg:shrink-0 lg:rounded-xl lg:border lg:border-gray-100 lg:bg-white lg:dark:border-white/5 lg:dark:bg-gray-950"
  >
    <div
      v-if="tabs.length > 0 && !inboxEmpty"
      class="border-b border-gray-100 px-4 pb-3 pt-4 dark:border-white/5"
    >
      <UTabs
        :items="tabItems"
        :model-value="activeTab"
        :ui="{ label: 'capitalize' }"
        size="sm"
        :content="false"
        @update:model-value="onTabChange"
      />
    </div>

    <div class="lg:flex-1 lg:overflow-y-auto">
      <PageLoader v-if="loading" />

      <EmptyState
        v-else-if="inboxEmpty"
        class="h-[60vh] lg:h-full"
        icon="heroicons:inbox"
        title="No complaints yet"
        description="Complaints raised will appear here."
      />

      <EmptyState
        v-else-if="rows.length === 0"
        class="h-[60vh] lg:h-full"
        icon="heroicons:adjustments-horizontal"
        title="No complaints in this tab"
        description="Try selecting a different tab."
      />

      <div v-else class="flex flex-col gap-2 px-4 py-4 lg:gap-0 lg:p-0">
        <ComplaintListItem
          v-for="row in rows"
          :key="row.complaint.identifier"
          :row="row"
          :selected="selectedId === row.complaint.identifier"
          :reply-count="replyCounts[row.complaint.identifier] ?? 0"
          :show-customer="showCustomer"
          @select="$emit('select', $event)"
        />
      </div>
    </div>
  </div>
</template>