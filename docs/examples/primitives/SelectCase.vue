<script setup lang="ts">
import Select from "../../../src/components/primitives/Select.vue";
import { ref } from "vue";

const items = ref([
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
]);
const value = ref("");

function handleCreate(term: string) {
  const newValue = term.toLowerCase().trim();
  if (!newValue) return;
  const exists = items.value.some((item) => {
    const itemValue = typeof item === "string" ? item : item.value;
    return itemValue.toLowerCase() === newValue;
  });
  if (!exists) {
    items.value.push({ label: term, value: newValue });
  }
  value.value = newValue;
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Select
      v-model="value"
      label="Fruit"
      placeholder="Type to add new fruit"
      :items="items"
      creatable
      @create="handleCreate"
    />
    <p class="text-sm text-muted">{{ value }}</p>
  </div>
</template>
