<script setup lang="ts">
import MessagingCreateDialog from "./MessagingCreateDialog.vue";

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <MessagingCreateDialog v-bind="$attrs" />
</template>
