<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  ctaText: {
    type: String,
    default: "",
  },
  ctaIcon: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["cta"]);

function handleCta() {
  emit("cta");
}
</script>

<template>
  <div class="hidden items-start justify-between mb-8 lg:flex">
    <div>
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <p class="text-sm text-muted mt-1">{{ subtitle }}</p>
    </div>
    <UButton
      v-if="ctaText"
      :label="ctaText"
      :icon="ctaIcon || undefined"
      size="md"
      class="shrink-0"
      @click="handleCta()"
    />
  </div>
</template>
