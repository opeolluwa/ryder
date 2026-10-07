<script setup lang="ts">
import ComplaintForm from "./ComplaintForm.vue";

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <ComplaintForm v-bind="$attrs" />
</template>
