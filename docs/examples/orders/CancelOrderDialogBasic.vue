<script setup lang="ts">
import { ref } from "vue";
import CancelOrderDialog from "../../../src/components/orders/CancelOrderDialog.vue";
import Button from "../../../src/components/primitives/Button.vue";
import { order } from "./fixtures";

const open = ref(false);
const loading = ref(false);
const confirmed = ref<string | null>(null);

function confirmCancel(identifier: string) {
  confirmed.value = identifier;
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    open.value = false;
  }, 600);
}
</script>

<template>
  <div class="space-y-3">
    <Button color="error" variant="outline" @click="open = true">
      Cancel order {{ order.identifier }}
    </Button>

    <p v-if="confirmed" class="text-xs text-gray-500 dark:text-white/50">
      <code class="font-mono">{{ confirmed }}</code> was emitted by
      <code class="font-mono">confirm</code>.
    </p>

    <CancelOrderDialog
      v-model:open="open"
      :order="order"
      :loading="loading"
      @confirm="confirmCancel"
    />
  </div>
</template>
