<script lang="ts" setup>
import UIcon from "@nuxt/ui/components/Icon.vue";

withDefaults(defineProps<{ icon?: string }>(), { icon: "heroicons:plus" });

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>
<template>
  <button
    type="button"
    aria-label="Add"
    class="fixed bottom-6 right-7 z-10 flex size-14 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-transform active:scale-95 lg:hidden dark:bg-primary-600"
    @click="emit('click', $event)"
  >
    <slot>
      <UIcon :name="icon" class="size-6" />
    </slot>
  </button>
</template>
