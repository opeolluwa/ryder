<script setup lang="ts">
import { ref } from "vue";
import MessagingListItem from "../../../src/components/messaging/MessagingListItem.vue";
import { replyCounts, rows } from "./fixtures";

const selected = ref<string | null>(rows[0]?.conversation.identifier ?? null);
const viewed = ref(false);
</script>

<template>
  <div class="space-y-3">
    <div class="space-y-2">
      <MessagingListItem
        v-for="item in rows"
        :key="item.conversation.identifier"
        :row="item"
        :selected="selected === item.conversation.identifier"
        :reply-count="replyCounts[item.conversation.identifier] ?? 0"
        :viewed="
          selected === item.conversation.identifier ? viewed : true
        "
        show-participant
        @select="selected = $event"
      />
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <button
        type="button"
        class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs dark:border-white/10"
        @click="viewed = !viewed"
      >
        Toggle viewed on the selected row
      </button>

      <span class="text-xs text-gray-500 dark:text-white/40">
        Selected: {{ selected ?? "none" }} — viewed: {{ viewed }}
      </span>
    </div>
  </div>
</template>
