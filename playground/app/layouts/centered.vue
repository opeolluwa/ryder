<script setup lang="ts">
import RyderCenteredLayout from "@opeolluwa/ryder/layouts/RyderCenteredLayout.vue";
</script>

<template>
  <RyderCenteredLayout bg="/bg.jpg" fallback-bg="/bg.jpg">
    <slot />
  </RyderCenteredLayout>
</template>
