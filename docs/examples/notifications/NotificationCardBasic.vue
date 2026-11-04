<script setup lang="ts">
import { ref } from "vue";
import NotificationCard from "../../../src/components/notifications/NotificationCard.vue";
import { notifications as seed } from "./fixtures";
import type { NotificationItem } from "../../../src/types/notifications";

const items = ref<NotificationItem[]>(seed.map((item) => ({ ...item })));
const lastEvent = ref("—");

function onRead(identifier: string) {
  lastEvent.value = `read ${identifier}`;
  items.value = items.value.map((item) =>
    item.identifier === identifier
      ? { ...item, readAt: new Date().toISOString() }
      : item,
  );
}

function onUnread(identifier: string) {
  lastEvent.value = `unread ${identifier}`;
  items.value = items.value.map((item) =>
    item.identifier === identifier ? { ...item, readAt: null } : item,
  );
}

function onDismiss(identifier: string) {
  lastEvent.value = `dismissed ${identifier}`;
  items.value = items.value.filter((item) => item.identifier !== identifier);
}

function reset() {
  items.value = seed.map((item) => ({ ...item }));
  lastEvent.value = "reset";
}
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-3">
      <NotificationCard
        v-for="item in items"
        :key="item.identifier"
        :notification="item"
        @read="onRead"
        @unread="onUnread"
        @dismiss="onDismiss"
      />

      <p
        v-if="items.length === 0"
        class="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500 dark:border-white/10 dark:text-white/40"
      >
        All notifications dismissed.
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <button
        type="button"
        class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs dark:border-white/10"
        @click="reset"
      >
        Reset notifications
      </button>

      <span class="text-xs text-gray-500 dark:text-white/40">
        Last event: {{ lastEvent }}
      </span>
    </div>
  </div>
</template>
