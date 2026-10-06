<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import UModal from "@nuxt/ui/components/Modal.vue";
import { useIsMobile } from "../composables/useIsMobile";
import BottomSheet from "./BottomSheet.vue";

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
  cancel: [];
  leave: [];
  "after:leave": [];
  "close:prevent": [];
}>();

const isMobile = useIsMobile();

// Server render and the first client render must agree on the same branch or
// Vue reports a hydration mismatch. The dialog is closed at that point, so
// deferring the switch to `mounted` is invisible.
const ready = ref(false);

onMounted(() => {
  ready.value = true;
});

const useSheet = computed(() => ready.value && isMobile.value);

const contentClass = computed(() =>
  props.size ? SIZES[props.size] : undefined,
);
</script>

<template>
  <!-- The sheet draws its own header from `title`/`description` because it needs
       a drag handle and a close button, so `header` is desktop-only. Both
       branches expose the same `body`/`footer` slots. -->
  <BottomSheet
    v-if="useSheet"
    v-model:open="open"
    :title="title ?? ''"
    :description="description"
    :dismissible="dismissible"
    @cancel="emit('cancel')"
    @leave="emit('leave')"
    @after:leave="emit('after:leave')"
  >
    <slot name="body" />

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </BottomSheet>

  <UModal
    v-else
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
