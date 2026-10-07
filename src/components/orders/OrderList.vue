<script setup lang="ts">
import { computed } from "vue";
import UTabs from "@nuxt/ui/components/Tabs.vue";
import type { TabsItem } from "@nuxt/ui";
import EmptyState from "../feedback/EmptyState.vue";
import PageLoader from "../feedback/PageLoader.vue";
import OrderListItem from "./OrderListItem.vue";
import type { Order, OrderListTab, OrderStatus } from "../../types/orders";

const props = withDefaults(
  defineProps<{
    rows: Order[];
    loading: boolean;
    tabs: OrderListTab[];
    activeTab: string;
    tabCount: Record<string, number>;
    selectedId: string | null;
    labels?: Partial<Record<OrderStatus, string>>;
    /** Shown when the active tab has no rows. */
    empty?: { title: string; description: string };
  }>(),
  {
    labels: () => ({}),
    empty: () => ({ title: "No orders here", description: "" }),
  },
);

const emit = defineEmits<{
  "update:activeTab": [value: string];
  select: [identifier: string];
}>();

const tabItems = computed<TabsItem[]>(() =>
  props.tabs.map((tab) => ({
    value: tab.value,
    label: tab.label,
    disabled: props.loading,
  })),
);

function onTabChange(value: string | number) {
  emit("update:activeTab", value as string);
}
</script>

<template>
  <div
    class="flex w-full flex-col overflow-hidden lg:h-full lg:w-80 lg:shrink-0 lg:rounded-xl lg:border lg:border-gray-100 lg:bg-white lg:dark:border-white/5 lg:dark:bg-gray-950"
  >
    <div
      v-if="tabs.length > 0"
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

      <div class="mt-2 flex gap-1.5">
        <span
          v-for="tab in tabs"
          :key="tab.value"
          class="flex h-4.5 min-w-4.5 shrink-0 items-center justify-center rounded-full bg-gray-100 px-1 text-[10px] font-bold leading-none text-gray-600 dark:bg-white/5 dark:text-gray-300"
        >
          {{ tabCount[tab.value] ?? 0 }}
        </span>
      </div>
    </div>

    <div class="lg:flex-1 lg:overflow-y-auto">
      <PageLoader v-if="loading" />

      <EmptyState
        v-else-if="rows.length === 0"
        class="h-[60vh] lg:h-full"
        icon="heroicons:shopping-bag"
        :title="empty.title"
        :description="empty.description"
      />

      <div v-else class="flex flex-col gap-2 px-4 py-4 lg:gap-0 lg:p-0">
        <OrderListItem
          v-for="order in rows"
          :key="order.identifier"
          :order="order"
          :selected="selectedId === order.identifier"
          :labels="labels"
          @select="$emit('select', $event)"
        />
      </div>
    </div>
  </div>
</template>