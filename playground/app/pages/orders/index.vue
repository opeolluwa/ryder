<script setup lang="ts">
import RyderOrderList from "@opeolluwa/ryder/components/orders/OrderList.vue";
import RyderOrderPreview from "@opeolluwa/ryder/components/orders/OrderPreview.vue";
import {
  ORDER_TABS,
  emptyStateForTab,
  orderMatchesTab,
  type OrdersInboxTab,
  useOrdersDemo,
} from "~/data/order-fixtures";

definePageMeta({
  layout: "dashboard",
  breadcrumb: { title: "Orders" },
});

const { rows, mutating, reset } = useOrdersDemo();

const activeTab = ref<OrdersInboxTab>("all");
const search = ref("");
const loading = ref(false);

const conflictedCount = computed(
  () => rows.value.filter((order) => order.status === "conflicted").length,
);

/** Tab partition first, then an in-page search over the loaded rows. */
const visibleRows = computed(() => {
  const needle = search.value.trim().toLowerCase();

  return rows.value.filter((order) => {
    if (!orderMatchesTab(order, activeTab.value)) return false;
    if (!needle) return true;

    const haystack = [
      order.identifier,
      order.paymentReference,
      order.customerIdentifier,
      ...order.items.map((item) => item.product.name),
    ];

    return haystack.some(
      (value) => typeof value === "string" && value.toLowerCase().includes(needle),
    );
  });
});

const empty = computed(() => {
  if (search.value.trim()) {
    return {
      title: "No orders match",
      description: "Try a different tab or clear the search.",
    };
  }

  return emptyStateForTab(activeTab.value);
});

function selectOrder(identifier: string) {
  navigateTo(`/orders/${identifier}`);
}

function resetDemo() {
  reset();
  activeTab.value = "all";
  search.value = "";
}
</script>

<template>
  <div class="space-y-6">
    <p
      v-if="conflictedCount > 0"
      class="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-500/10 dark:text-amber-300"
    >
      <UIcon name="heroicons:exclamation-triangle" class="size-3.5 shrink-0" />
      {{ conflictedCount }} order{{ conflictedCount === 1 ? "" : "s" }} has a
      payment that does not match the order total and needs reconciling.
    </p>

    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <UInput
        v-model="search"
        icon="i-lucide-search"
        placeholder="Search orders"
        aria-label="Search loaded orders"
        class="hidden sm:block sm:w-72"
      />

      <div class="flex items-center gap-2">
        <RyderButton
          variant="soft"
          size="xs"
          :loading="mutating"
          :disabled="mutating"
          @click="resetDemo"
        >
          Reset statuses
        </RyderButton>

        <RyderButton
          variant="ghost"
          size="xs"
          @click="loading = !loading"
        >
          {{ loading ? "Stop loading" : "Simulate loading" }}
        </RyderButton>
      </div>
    </div>

    <div class="flex flex-col gap-4 lg:h-[calc(100dvh-11rem)] lg:min-h-[480px] lg:flex-row lg:gap-6">
      <RyderOrderList
        :rows="visibleRows"
        :loading="loading"
        :tabs="ORDER_TABS"
        :active-tab="activeTab"
        :selected-id="null"
        :empty="empty"
        @update:active-tab="activeTab = $event as OrdersInboxTab"
        @select="selectOrder"
      />

      <div class="hidden lg:flex lg:h-full lg:min-w-0 lg:flex-1">
        <RyderOrderPreview :order="null" :loading="false" />
      </div>
    </div>
  </div>
</template>