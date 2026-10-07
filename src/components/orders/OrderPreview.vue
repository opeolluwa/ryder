<script setup lang="ts">
import { computed } from "vue";
import UIcon from "@nuxt/ui/components/Icon.vue";
import EmptyState from "../feedback/EmptyState.vue";
import PageLoader from "../feedback/PageLoader.vue";
import OrderStatusBadge from "./OrderStatusBadge.vue";
import { formatDateTime } from "../../utils/date";
import { formatPrice } from "../../utils/formatPrice";
import {
  deliveryLines,
  orderItemCount,
  totalsByCurrency,
} from "../../utils/orders";
import type { Order, OrderStatus } from "../../types/orders";

const props = withDefaults(
  defineProps<{
    order: Order | null;
    loading?: boolean;
    labels?: Partial<Record<OrderStatus, string>>;
    /** Money formatter; defaults to ryder's `formatPrice`. */
    formatMoney?: (amount: string | number, currency: string) => string;
  }>(),
  {
    loading: false,
    labels: () => ({}),
    formatMoney: formatPrice,
  },
);

const money = computed(() => props.formatMoney);

const lineTotals = computed(() =>
  props.order ? totalsByCurrency(props.order) : [],
);

const itemCount = computed(() =>
  props.order ? orderItemCount(props.order) : 0,
);

const delivery = computed(() => props.order?.delivery ?? null);

const lines = computed(() => deliveryLines(delivery.value));

function lineTotal(item: Order["items"][number]) {
  return money.value(
    (Number(item.price.amount) || 0) * item.quantity,
    item.price.currency,
  );
}
</script>

<template>
  <div
    class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-0! dark:border-gray-400/20 dark:bg-gray-950"
  >
    <PageLoader v-if="loading && !order" />

    <EmptyState
      v-else-if="!order"
      class="lg:h-full"
      icon="heroicons:shopping-bag"
      title="No order selected"
      description="Choose an order to view its items and delivery."
    />

    <template v-else>
      <div class="flex flex-col gap-6 p-5">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <OrderStatusBadge :status="order.status" :labels="labels" />

          <dl class="text-right text-xs text-gray-400 dark:text-white/30">
            <div>
              <dt class="sr-only">Placed</dt>
              <dd>{{ formatDateTime(order.createdAt) }}</dd>
            </div>

            <div v-if="order.paymentReference" class="mt-0.5">
              <dt class="sr-only">Payment reference</dt>
              <dd class="font-mono">Ref {{ order.paymentReference }}</dd>
            </div>
          </dl>
        </div>

        <div class="space-y-6">
          <section
            class="rounded-xl border border-gray-100 p-4 dark:border-white/5"
          >
            <div class="flex items-baseline justify-between gap-3">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
                Items
              </h3>

              <p class="shrink-0 text-xs text-gray-400 dark:text-white/30">
                {{ itemCount }} unit{{ itemCount === 1 ? "" : "s" }}
              </p>
            </div>

            <ul class="mt-2 divide-y divide-gray-100 dark:divide-white/5">
              <li
                v-for="item in order.items"
                :key="item.identifier"
                class="flex items-start gap-3 py-3"
              >
                <div
                  class="size-12 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-white/5"
                >
                  <img
                    v-if="item.product.picture"
                    :src="item.product.picture"
                    :alt="item.product.name"
                    referrerpolicy="no-referrer"
                    class="h-full w-full object-cover object-center"
                  />

                  <div
                    v-else
                    class="flex h-full w-full items-center justify-center text-gray-300 dark:text-white/20"
                  >
                    <UIcon name="heroicons:photo" class="size-4" />
                  </div>
                </div>

                <div class="min-w-0 flex-1">
                  <p
                    class="line-clamp-2 text-sm font-medium text-gray-900 sm:truncate dark:text-white"
                  >
                    {{ item.product.name }}
                  </p>

                  <p class="mt-1 text-xs text-gray-400 dark:text-white/30">
                    {{ money(item.price.amount, item.price.currency) }} each
                    &times; {{ item.quantity }}
                  </p>
                </div>

                <p
                  class="shrink-0 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {{ lineTotal(item) }}
                </p>
              </li>
            </ul>

            <div
              class="flex items-baseline justify-between gap-3 border-t border-gray-100 pt-3 dark:border-white/5"
            >
              <span class="text-sm text-gray-500 dark:text-white/40">Total</span>

              <span class="text-right">
                <span
                  v-for="line in lineTotals"
                  :key="line.currency"
                  class="block text-base font-semibold text-gray-900 dark:text-white"
                >
                  {{ money(line.total, line.currency) }}
                </span>
              </span>
            </div>
          </section>

          <section
            class="rounded-xl border border-gray-100 p-4 dark:border-white/5"
          >
            <h3
              class="text-sm font-semibold text-gray-900 dark:text-white"
            >
              Delivery
            </h3>

            <div v-if="delivery" class="mt-2">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ delivery.recipientName }}
              </p>

              <p class="text-xs text-gray-500 dark:text-white/40">
                {{ delivery.recipientPhone }}
              </p>

              <address
                class="mt-2 text-sm not-italic text-gray-500 dark:text-white/40"
              >
                <span v-for="line in lines" :key="line" class="block">
                  {{ line }}
                </span>
              </address>

              <p
                v-if="delivery.deliveryNotes"
                class="mt-2 border-t border-gray-100 pt-2 text-xs text-gray-500 dark:border-white/5 dark:text-white/40"
              >
                {{ delivery.deliveryNotes }}
              </p>
            </div>

            <p
              v-else
              class="mt-2 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500 dark:bg-white/5 dark:text-white/40"
            >
              No delivery recorded yet. It is added when you place the order.
            </p>
          </section>

          <slot name="actions" :order="order" />
        </div>
      </div>
    </template>
  </div>
</template>