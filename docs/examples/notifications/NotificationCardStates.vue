<script setup lang="ts">
import NotificationCard from "../../../src/components/notifications/NotificationCard.vue";
import { notifications } from "./fixtures";

const unread = notifications.find((item) => item.readAt === null)!;
const read = notifications.find((item) => item.readAt !== null)!;
</script>

<template>
  <div class="space-y-3">
    <NotificationCard :notification="unread" />
    <NotificationCard :notification="read" />
  </div>
</template>
