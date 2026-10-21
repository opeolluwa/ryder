<script setup lang="ts">
import { computed } from "vue";
import UModal from "@nuxt/ui/components/Modal.vue";

// `UModal` has no `size` prop, so `size="xl"` used to be a dead attribute.
// Map it to a width instead.
const SIZES: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    closeIcon?: string;
    dismissible?: boolean;
    scrollable?: boolean;
    size?: string;
  }>(),
  {
    dismissible: true,
    closeIcon: "heroicons:x-mark",
  },
);

const open = defineModel<boolean>("open", { default: false });

const emit = defineEmits<{
  leave: [];
  "after:leave": [];
  "close:prevent": [];
}>();

const contentClass = computed(() =>
  props.size ? SIZES[props.size] : undefined,
);
</script>

<template>
  <UModal
    v-model:open="open"
    :title="title"
    :description="description"
    :close-icon="closeIcon"
    :dismissible="dismissible"
    :scrollable="scrollable"
    :ui="contentClass ? { content: contentClass } : undefined"
    @leave="emit('leave')"
    @after:leave="emit('after:leave')"
    @close:prevent="emit('close:prevent')"
  >
    <template v-if="$slots.header" #header="{ close }">
      <slot name="header" :close="close" />
    </template>

    <template v-if="$slots.body" #body="{ close }">
      <slot name="body" :close="close" />
    </template>

    <template v-if="$slots.footer" #footer="{ close }">
      <slot name="footer" :close="close" />
    </template>
  </UModal>
</template>
