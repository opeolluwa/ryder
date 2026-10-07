<script setup lang="ts">
import ComplaintCreateDialog from "./ComplaintCreateDialog.vue";

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <ComplaintCreateDialog v-bind="$attrs" />
</template>
