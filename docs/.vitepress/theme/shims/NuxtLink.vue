<script setup lang="ts">
defineProps<{ to?: string; href?: string }>();
</script>

<template>
  <a :href="to ?? href"><slot /></a>
</template>
