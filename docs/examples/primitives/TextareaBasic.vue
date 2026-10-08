<script setup lang="ts">
import Textarea from "../../../src/components/primitives/Textarea.vue";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <div class="flex flex-col gap-4">
    <Textarea
      v-model="value"
      name="message"
      label="Message"
      placeholder="Enter your message"
      rows="4"
    />
    <p class="text-sm text-muted">{{ value }}</p>
  </div>
</template>
