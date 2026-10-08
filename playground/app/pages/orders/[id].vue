<script setup lang="ts">
import RyderOrderList from "@opeolluwa/ryder/components/orders/OrderList.vue";
import RyderOrderPreview from "@opeolluwa/ryder/components/orders/OrderPreview.vue";
import RyderCancelOrderDialog from "@opeolluwa/ryder/components/orders/CancelOrderDialog.vue";
import type { Order } from "@opeolluwa/ryder/types";
import { canTransitionOrder } from "@opeolluwa/ryder/utils";
import {
  ORDER_TABS,
  emptyStateForTab,
  orderMatchesTab,
  type OrdersInboxTab,
  useOrdersDemo,
} from "~/data/order-fixtures";

definePageMeta({
  layout: "dashboard",
  back: true,
  breadcrumb: { ariaLabel: "Orders", title: "Orders" },
});

const route = useRoute();

const { rows, mutating, changeStatus } = useOrdersDemo();

const identifier = computed(() => String(route.params.id ?? ""));

const order = computed(
  () => rows.value.find((item) => item.identifier === identifier.value) ?? null,
);

const activeTab = ref<OrdersInboxTab>("all");

/** The inbox rail shows every order in the active tab, with the current one selected. */
const railRows = computed(() =>
  rows.value.filter((item) => orderMatchesTab(item, activeTab.value)),
);

const empty = computed(() => emptyStateForTab(activeTab.value));

const cancelOpen = ref(false);

function selectOrder(identifier: string) {
  navigateTo(`/orders/${identifier}`);
}

function onConfirmCancel(identifier: string) {
  cancelOpen.value = false;
  void changeStatus(identifier, "cancelled");
}

function onMarkFulfilled(item: Order) {
  void changeStatus(item.identifier, "fulfilled");
}
</script>

<template>
  <div class="flex flex-col gap-4 lg:h-[calc(100dvh-11rem)] lg:min-h-[480px] lg:flex-row lg:gap-6">
    <div v-if="!order" class="flex flex-1 flex-col items-center justify-center">
      <RyderEmptyState
        class="w-full"
        icon="heroicons:question-mark-circle"
        title="Order not found"
        description="This order may have been deleted."
        action-label="Back to orders"
        @action="navigateTo('/orders')"
      />
    </div>

    <template v-else>
      <div
        class="flex h-[calc(100dvh-7rem)] min-h-[320px] flex-col sm:h-[calc(100dvh-10rem)] lg:hidden"
      >
        <RyderOrderPreview :order="order" :loading="false">
          <template #actions="{ order: target }">
            <div
              class="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4 dark:border-white/5"
            >
              <RyderButton
                v-if="canTransitionOrder(target.status, 'fulfilled')"
                color="success"
                variant="soft"
                size="sm"
                :loading="mutating"
                :disabled="mutating"
                @click="onMarkFulfilled(target)"
              >
                Mark fulfilled
              </RyderButton>

              <RyderButton
                v-if="canTransitionOrder(target.status, 'cancelled')"
                color="error"
                variant="ghost"
                size="sm"
                :loading="mutating"
                :disabled="mutating"
                @click="cancelOpen = true"
              >
                Cancel order
              </RyderButton>

              <p
                v-if="
                  !canTransitionOrder(target.status, 'fulfilled') &&
                    !canTransitionOrder(target.status, 'cancelled')
                "
                class="text-xs text-gray-400 dark:text-white/30"
              >
                This order is terminal — it cannot move anywhere else.
              </p>
            </div>
          </template>
        </RyderOrderPreview>
      </div>

      <div class="hidden lg:flex lg:h-full lg:min-w-0 lg:flex-1 lg:flex-row lg:gap-6">
        <RyderOrderList
          :rows="railRows"
          :loading="false"
          :tabs="ORDER_TABS"
          :active-tab="activeTab"
          :selected-id="identifier"
          :empty="empty"
          @update:active-tab="activeTab = $event as OrdersInboxTab"
          @select="selectOrder"
        />

        <RyderOrderPreview :order="order" :loading="false">
          <template #actions="{ order: target }">
            <div
              class="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4 dark:border-white/5"
            >
              <RyderButton
                v-if="canTransitionOrder(target.status, 'fulfilled')"
                color="success"
                variant="soft"
                size="sm"
                :loading="mutating"
                :disabled="mutating"
                @click="onMarkFulfilled(target)"
              >
                Mark fulfilled
              </RyderButton>

              <RyderButton
                v-if="canTransitionOrder(target.status, 'cancelled')"
                color="error"
                variant="ghost"
                size="sm"
                :loading="mutating"
                :disabled="mutating"
                @click="cancelOpen = true"
              >
                Cancel order
              </RyderButton>

              <p
                v-if="
                  !canTransitionOrder(target.status, 'fulfilled') &&
                    !canTransitionOrder(target.status, 'cancelled')
                "
                class="text-xs text-gray-400 dark:text-white/30"
              >
                This order is terminal — it cannot move anywhere else.
              </p>
            </div>
          </template>
        </RyderOrderPreview>
      </div>
    </template>

    <RyderCancelOrderDialog
      v-model:open="cancelOpen"
      :order="order"
      :loading="mutating"
      @confirm="onConfirmCancel"
    />
  </div>
</template>