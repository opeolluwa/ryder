<script setup lang="ts">
import { computed } from "vue";
import UDropdownMenu from "@nuxt/ui/components/DropdownMenu.vue";
import UButton from "@nuxt/ui/components/Button.vue";
import UIcon from "@nuxt/ui/components/Icon.vue";
import { useIsMobile } from "../../composables/useIsMobile";
import {
  complaintStatusTransitions,
  formatStatus,
  isResolvable,
  resolveStatus,
} from "../../utils/complaintStatus";
import {
  complaintCustomerAvatar,
  complaintCustomerLabel,
} from "../../utils/complaintCustomer";
import type {
  ComplaintRow,
  ComplaintWritableStatus,
} from "../../types/complaints";

const props = withDefaults(
  defineProps<{
    row: ComplaintRow;
    /** Whether staff can move the complaint. Off for the customer-facing app. */
    statusMenu?: boolean;
    /** Show the complainer's identity. The customer-facing app hides it. */
    showCustomer?: boolean;
  }>(),
  {
    statusMenu: true,
    showCustomer: true,
  },
);

const emit = defineEmits<{
  setStatus: [status: ComplaintWritableStatus];
}>();

const isMobile = useIsMobile();

const status = computed(() => resolveStatus(props.row.complaint.status));

const canResolve = computed(() => isResolvable(props.row.complaint.status));

const customerLabel = computed(() => complaintCustomerLabel(props.row));

const customerAvatar = computed(() => complaintCustomerAvatar(props.row));

const STATUS_ICONS: Record<ComplaintWritableStatus, string> = {
  in_progress: "i-lucide-circle-dashed",
  resolved: "i-lucide-check",
  closed: "i-lucide-archive",
};

/** Only the moves this complaint can actually make, so the menu cannot offer a
 *  status change the API would reject. */
const statusItems = computed(() =>
  complaintStatusTransitions(props.row.complaint.status).map((next) => ({
    label: `Mark as ${formatStatus(next).toLowerCase()}`,
    icon: STATUS_ICONS[next],
    onSelect: () => emit("setStatus", next),
  })),
);

function formatFullDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
</script>

<template>
  <header class="shrink-0 border-b border-gray-100 dark:border-white/5">
    <div class="flex items-start justify-between gap-3 px-4 py-4 sm:px-6">
      <div class="flex min-w-0 items-start gap-3">
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <h2
              class="min-w-0 text-sm font-semibold text-gray-900 dark:text-white"
            >
              {{ row.complaint.subject }}
            </h2>

            <span
              class="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium"
              :class="
                canResolve
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                  : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
              "
            >
              <span
                class="size-1.5 rounded-full"
                :class="canResolve ? 'bg-amber-500' : 'bg-emerald-500'"
              />
              {{ formatStatus(status) }}
            </span>
          </div>

          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Received {{ formatFullDate(row.complaint.createdAt) }}
          </p>
        </div>
      </div>

      <UDropdownMenu
        v-if="statusMenu && statusItems.length"
        :content="{ align: 'end' }"
        :items="statusItems"
        aria-label="Update complaint status"
      >
        <UButton
          size="xs"
          variant="ghost"
          color="neutral"
          icon="i-lucide-ellipsis-vertical"
          aria-label="Update complaint status"
        />
      </UDropdownMenu>
    </div>

    <div
      v-if="showCustomer || row.order"
      class="px-4 pb-4 sm:px-6"
    >
      <div
        v-if="!isMobile || row.order"
        class="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl bg-gray-50 px-3 py-2.5 dark:bg-white/[0.03]"
      >
        <div
          v-if="showCustomer"
          class="hidden min-w-0 items-center gap-2 lg:flex"
        >
          <div
            class="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100/30 text-xs font-semibold text-primary-700 dark:bg-primary-500/15 dark:text-primary-300"
          >
            <img
              v-if="customerAvatar.src"
              :src="customerAvatar.src"
              :alt="customerAvatar.alt"
              class="size-full object-cover"
            />
            <span v-else>{{ customerAvatar.text }}</span>
          </div>

          <div class="min-w-0">
            <p
              class="truncate text-xs font-semibold text-gray-800 dark:text-white/90"
            >
              {{ customerLabel }}
            </p>
            <p
              v-if="row.customer?.email"
              class="truncate text-[11px] text-gray-500 dark:text-gray-400"
            >
              {{ row.customer.email }}
            </p>
          </div>
        </div>

        <div
          v-if="row.order"
          class="flex min-w-0 items-center gap-1.5 lg:border-l lg:border-gray-200 lg:pl-3 dark:lg:border-white/10"
        >
          <UIcon
            name="i-heroicons-shopping-bag"
            class="size-3.5 shrink-0 text-gray-400"
          />
          <span class="text-[11px] text-gray-500 dark:text-gray-400">Order</span>
          <span
            class="max-w-32 truncate text-[11px] font-medium text-gray-700 dark:text-gray-300"
          >
            {{ row.order.identifier }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>