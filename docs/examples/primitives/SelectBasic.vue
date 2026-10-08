<script setup lang="ts">
import Select from "../../../src/components/primitives/Select.vue";
import { ref } from "vue";

const items = ref([
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
]);
const value = ref("");
</script>

<template>
  <div class="flex flex-col gap-4">
    <Select
      v-model="value"
      label="Fruit"
      placeholder="Select a fruit"
      :items="items"
    />
    <p class="text-sm text-muted">{{ value }}</p>
  </div>
</template>
