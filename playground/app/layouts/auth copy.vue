<script setup lang="ts">
import RyderSplitLayout from "@opeolluwa/ryder/layouts/RyderSplitLayout.vue";
</script>

<template>
  <RyderSplitLayout src="/bg.jpg" fallback-src="/bg.jpg">
    <slot />
  </RyderSplitLayout>
</template>