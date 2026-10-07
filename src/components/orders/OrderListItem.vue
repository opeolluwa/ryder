<script setup lang="ts">
import { computed } from "vue";
import UIcon from "@nuxt/ui/components/Icon.vue";
import OrderStatusBadge from "./OrderStatusBadge.vue";
import { formatListDate } from "../../utils/date";
import { formatPrice } from "../../utils/formatPrice";
import { orderItemCount, totalsByCurrency } from "../../utils/orders";
import type { Order, OrderStatus } from "../../types/orders";

const props = withDefaults(
  defineProps<{
    order: Order;
    selected: boolean;
    labels?: Partial<Record<OrderStatus, string>>;
  }>(),
  {
    labels: () => ({}),
  },
);

defineEmits<{
  select: [identifier: string];
}>();

const title = computed(
  () => props.order.items[0]?.product.name ?? `Order #${props.order.identifier}`,
);

const unitCount = computed(() => orderItemCount(props.order));

const lineLabel = computed(() => {
  const lines = props.order.items.length;

  return `${lines} ${lines === 1 ? "item" : "items"}`;
});

const headlineTotal = computed(() => {
  const total = totalsByCurrency(props.order)[0];

  return total
    ? formatPrice(total.total, total.currency)
    : "";
});

function shortId(identifier: string) {
  return identifier.length > 14
    ? `${identifier.slice(0, 10)}…`
    : identifier;
}
</script>

<template>
  <button
    type="button"
    class="w-full rounded-xl border p-4 text-left transition-colors active:scale-[0.99] lg:rounded-none lg:border-0 lg:border-b lg:border-gray-50 lg:p-3 lg:px-4 lg:active:scale-100 dark:border-white/5 dark:lg:border-white/[0.03]"
    :class="
      selected
        ? 'border-primary-200 bg-primary-50/50 dark:border-primary-500/30 dark:bg-primary-500/5 lg:bg-gray-50/60 lg:dark:bg-white/5'
        : 'border-gray-100 bg-white active:bg-gray-50 dark:border-white/5 dark:bg-gray-950 dark:active:bg-white/5 lg:bg-transparent lg:dark:bg-transparent'
    "
    :aria-current="selected ? 'true' : undefined"
    @click="$emit('select', order.identifier)"
  >
    <div class="flex items-start gap-3">
      <span
        class="mt-1 size-2 shrink-0 rounded-full"
        :class="
          order.status === 'pending' || order.status === 'conflicted'
            ? 'bg-primary-500'
            : 'bg-transparent ring-1 ring-gray-200 dark:ring-white/10'
        "
        :aria-label="
          order.status === 'pending' || order.status === 'conflicted'
            ? 'Needs attention'
            : 'Settled'
        "
      />

      <div class="min-w-0 flex-1">
        <div class="flex items-baseline justify-between gap-2">
          <p class="min-w-0 truncate text-sm font-medium text-gray-900 dark:text-white">
            {{ title }}
          </p>

          <span
            class="shrink-0 whitespace-nowrap text-[11px] text-gray-400 dark:text-white/30"
          >
            {{ formatListDate(order.createdAt) }}
          </span>
        </div>

        <div class="mt-1 flex flex-wrap items-center gap-2">
          <OrderStatusBadge :status="order.status" :labels="labels" />

          <p class="text-xs text-gray-500 dark:text-white/40">
            {{ unitCount }} unit{{ unitCount === 1 ? "" : "s" }} · {{ lineLabel }}
          </p>
        </div>

        <div
          v-if="headlineTotal || order.paymentReference"
          class="mt-1.5 flex items-center gap-2 text-[11px] text-gray-400 dark:text-white/25"
        >
          <span v-if="headlineTotal">{{ headlineTotal }}</span>

          <span v-if="order.paymentReference" class="truncate">
            Ref {{ order.paymentReference }}
          </span>
        </div>

        <p class="mt-0.5 truncate font-mono text-[10px] text-gray-300 dark:text-white/15">
          #{{ shortId(order.identifier) }}
        </p>
      </div>

      <UIcon
        name="heroicons:chevron-right"
        class="mt-2 size-4 shrink-0 text-gray-400 dark:text-white/30"
      />
    </div>
  </button>
</template>