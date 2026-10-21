<script setup lang="ts">
import { computed } from "vue";
import { useTimeAgo } from "@vueuse/core";
import UIcon from "@nuxt/ui/components/Icon.vue";
import type { NotificationItem } from "../../types/notifications";
import { isNotificationUnread } from "../../types/notifications";

const props = defineProps<{ notification: NotificationItem }>();

const emit = defineEmits<{
  read: [identifier: string];
  unread: [identifier: string];
  dismiss: [identifier: string];
}>();

const timeAgo = useTimeAgo(() => props.notification.createdAt, { max: "7d" });

const unread = computed(() => isNotificationUnread(props.notification));

function onRead() {
  if (!unread.value) return;

  emit("read", props.notification.identifier);
}
</script>

<template>
  <div
    role="button"
    :tabindex="unread ? 0 : -1"
    class="group relative flex items-start gap-3 rounded-xl border bg-white p-4 transition-colors dark:bg-onyx-700"
    :class="
      unread
        ? 'cursor-default border-gray-100 dark:border-white/5'
        : 'cursor-pointer border-primary-100/10 hover:border-primary-500/20 active:scale-[0.99] dark:border-primary-500/20 dark:hover:border-primary-500/30'
    "
    @click="onRead"
    @keydown.enter.prevent="onRead"
  >
    <span
      v-if="unread"
      class="absolute right-4 top-4 size-2 shrink-0 rounded-full bg-primary-500"
      aria-label="Unread"
    />

    <div
      class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gray-100/20 dark:bg-white/5"
    >
      <UIcon
        name="heroicons:bell"
        class="size-4 text-gray-500 dark:text-gray-400"
      />
    </div>

    <div class="min-w-0 flex-1 pr-6">
      <div class="flex items-baseline justify-between gap-2">
        <h3
          class="truncate text-sm"
          :class="
            unread
              ? 'font-semibold text-gray-900 dark:text-white'
              : 'font-medium text-gray-500 dark:text-white/50'
          "
        >
          {{ notification.title }}
        </h3>

        <time class="shrink-0 text-[11px] text-gray-400 dark:text-white/40">
          {{ timeAgo }}
        </time>
      </div>

      <p class="mt-0.5 line-clamp-2 text-xs leading-snug text-muted">
        {{ notification.body }}
      </p>
    </div>

    <div class="absolute bottom-3.5 right-3.5 flex items-center gap-1">
      <button
        v-if="!unread"
        type="button"
        class="rounded-md p-1 text-gray-300 transition-colors hover:text-gray-500 dark:text-white/15 dark:hover:text-white/60"
        aria-label="Mark notification as unread"
        @click.stop="emit('unread', notification.identifier)"
      >
        <UIcon name="heroicons:envelope" class="size-3.5" />
      </button>

      <button
        type="button"
        class="rounded-md p-1 text-gray-300 transition-colors hover:text-gray-500 dark:text-white/15 dark:hover:text-white/60"
        aria-label="Dismiss notification"
        @click.stop="emit('dismiss', notification.identifier)"
      >
        <UIcon name="heroicons:x-mark" class="size-3.5" />
      </button>
    </div>
  </div>
</template>
