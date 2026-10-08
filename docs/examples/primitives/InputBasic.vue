<script setup lang="ts">
import Input from "../../../src/components/primitives/Input.vue";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <div class="flex flex-col gap-4">
    <Input
      v-model="value"
      label="Email"
      name="email"
      placeholder="Enter your email"
    />
    <p class="text-sm text-muted">{{ value }}</p>
  </div>
</template>
