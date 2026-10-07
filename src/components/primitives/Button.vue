<script setup lang="ts">
import type { PropType } from "vue";
import UButton from "@nuxt/ui/components/Button.vue";

defineProps({
  type: {
    type: String as PropType<"reset" | "button" | "submit" | undefined>,
    default: "button",
  },
  variant: {
    type: String as PropType<"ghost" | "solid" | "outline" | "soft" | "subtle">,
    default: "solid",
  },
  color: {
    type: String as PropType<
      | "primary"
      | "error"
      | "secondary"
      | "success"
      | "info"
      | "warning"
      | "neutral"
    >,
    default: "primary",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<"xs" | "sm" | "md" | "lg" | "xl">,
    default: "sm",
  },
});
</script>

<template>
  <UButton
    :type="type"
    :color="color"
    :loading="loading"
    :size="size"
    :variant="variant"
    :disabled="disabled || loading"
    class=""
    :ui="{ base: 'py-3 text-center justify-center' }"
  >
    <slot />
  </UButton>
</template>
