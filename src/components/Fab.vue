<script lang="ts" setup>
import { kFab } from "konsta/vue";
import UIcon from "@nuxt/ui/components/Icon.vue";

withDefaults(defineProps<{ icon?: string }>(), { icon: "heroicons:plus" });

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>
<template>
  <kFab
    component="button"
    aria-label="Add"
    class="fixed bottom-6 right-7 z-10 lg:hidden"
    :colors="{
      bgIos: 'bg-primary-500 dark:bg-primary-600',
      bgMaterial: 'bg-primary-500 dark:bg-primary-600',
      textIos: 'text-white',
      textMaterial: 'text-white',
    }"
    @click="emit('click', $event)"
  >
    <template #icon>
      <slot>
        <UIcon :name="icon" class="size-6" />
      </slot>
    </template>
  </kFab>
</template>
