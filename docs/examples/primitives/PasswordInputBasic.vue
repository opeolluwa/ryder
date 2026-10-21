<script setup lang="ts">
import PasswordInput from "../../../src/components/primitives/PasswordInput.vue";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <div class="flex flex-col gap-4">
    <PasswordInput
      v-model="value"
      label="Password"
      name="password"
    />
    <p class="text-sm text-muted">{{ value }}</p>
  </div>
</template>
