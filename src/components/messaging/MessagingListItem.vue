<script setup lang="ts">
import { computed } from "vue";
import UIcon from "@nuxt/ui/components/Icon.vue";
import { isMessagingResolvable } from "../../utils/messagingStatus";
import { participantLabel } from "../../utils/messagingParticipant";
import type { ConversationRow } from "../../types/messaging";

const props = withDefaults(
  defineProps<{
    row: ConversationRow;
    selected: boolean;
    replyCount: number;
    viewed?: boolean;
    showParticipant?: boolean;
  }>(),
  {
    viewed: true,
    showParticipant: true,
  },
);

defineEmits<{
  select: [identifier: string];
}>();

const isViewed = computed(() => props.viewed);

const dotClass = computed(() =>
  isMessagingResolvable(props.row.conversation.status)
    ? "bg-primary-500"
    : "bg-transparent ring-1 ring-gray-200 dark:ring-white/10",
);

const label = computed(() => participantLabel(props.row));

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();

  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
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
    @click="$emit('select', row.conversation.identifier)"
  >
    <div class="flex items-start gap-3">
      <span
        class="mt-1.5 size-2 shrink-0 rounded-full"
        :class="dotClass"
        :aria-label="isMessagingResolvable(row.conversation.status) ? 'Open' : 'Resolved'"
      />

      <div class="min-w-0 flex-1">
        <div class="flex items-baseline justify-between gap-2">
          <p
            class="min-w-0 truncate text-sm text-gray-900 dark:text-white"
            :class="isViewed ? 'font-medium' : 'font-semibold'"
          >
            {{ showParticipant ? label : row.conversation.subject }}
          </p>

          <span
            class="shrink-0 whitespace-nowrap text-[11px] text-gray-400 dark:text-white/30"
          >
            {{ formatDate(row.conversation.createdAt) }}
          </span>
        </div>

        <p v-if="showParticipant" class="mt-0.5 truncate text-xs text-gray-800 dark:text-white/80">
          {{ row.conversation.subject }}
        </p>

        <p class="mt-1 truncate text-[11px] text-gray-400 dark:text-white/25">
          {{ row.conversation.description }}
        </p>

        <div class="mt-1.5 flex items-center gap-2">
          <span
            v-if="replyCount > 0"
            class="flex shrink-0 items-center gap-1 text-[10px] text-gray-400 dark:text-white/25"
          >
            <UIcon name="heroicons:chat-bubble-left" class="size-3" />
            {{ replyCount }}
          </span>
        </div>
      </div>
    </div>
  </button>
</template>
