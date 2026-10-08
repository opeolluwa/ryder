<script setup lang="ts">
import Button from "../../../src/components/primitives/Button.vue";
</script>

<template>
  <div class="w-56 space-y-3">
    <Button type="submit" class="w-full">Submit form</Button>
    <Button variant="outline" color="neutral" class="w-full" icon="heroicons:x-mark">
      Cancel
    </Button>
  </div>
</template>
