<script setup lang="ts">
import UTabs from "@nuxt/ui/components/Tabs.vue";
import type { TabsItem } from "@nuxt/ui";
import EmptyState from "../feedback/EmptyState.vue";
import PageLoader from "../feedback/PageLoader.vue";
import MessagingListItem from "./MessagingListItem.vue";
import {
  MESSAGING_INBOX_TABS,
  type ConversationRow,
  type MessagingInboxTab,
} from "../../types/messaging";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    rows: ConversationRow[];
    loading: boolean;
    inboxEmpty: boolean;
    activeTab: MessagingInboxTab;
    tabCount: Record<MessagingInboxTab, number>;
    replyCounts: Record<string, number>;
    selectedId: string | null;
    tabs?: MessagingInboxTab[];
    showParticipant?: boolean;
    /**
     * Renders a call-to-action on the fully-empty inbox. Omitted leaves the
     * empty state as plain text, which is what read-only inboxes want.
     */
    emptyActionLabel?: string;
  }>(),
  {
    tabs: () => [...MESSAGING_INBOX_TABS],
    showParticipant: true,
    emptyActionLabel: undefined,
  },
);

const emit = defineEmits<{
  "update:activeTab": [value: MessagingInboxTab];
  select: [identifier: string];
  emptyAction: [];
}>();

const tabItems = computed<TabsItem[]>(() =>
  props.tabs.map((tab) => ({
    value: tab,
    label: tab,
    disabled: props.loading,
  })),
);

function onTabChange(value: string | number) {
  emit("update:activeTab", value as MessagingInboxTab);
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
        title="No conversations yet"
        description="Conversations will appear here."
        :action-label="emptyActionLabel"
        @action="emit('emptyAction')"
      />

      <EmptyState
        v-else-if="rows.length === 0"
        class="h-[60vh] lg:h-full"
        icon="heroicons:adjustments-horizontal"
        title="No conversations in this tab"
        description="Try selecting a different tab."
      />

      <div v-else class="flex flex-col gap-2 px-4 py-4 lg:gap-0 lg:p-0">
        <MessagingListItem
          v-for="row in rows"
          :key="row.conversation.identifier"
          :row="row"
          :selected="selectedId === row.conversation.identifier"
          :reply-count="replyCounts[row.conversation.identifier] ?? 0"
          :show-participant="showParticipant"
          @select="$emit('select', $event)"
        />
      </div>
    </div>
  </div>
</template>
