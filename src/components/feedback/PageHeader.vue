
<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaIcon?: string;
  ui?: {
    root?: string;
    title?: string;
    description?: string;
    iconWrapper?: string;
    icon?: string;
    actionLabel?: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  subtitle: "",
  ctaText: "",
  ctaIcon: "",
  ui: () => ({}),
});

const emit = defineEmits<{
  cta: [];
}>();

function handleCta() {
  emit("cta");
}
</script>

<template>
  <div
    :class="[
      'hidden items-start justify-between mb-8 lg:flex',
      props.ui.root,
    ]"
  >
    <div>
      <h2 :class="['text-lg font-semibold', props.ui.title]">
        {{ title }}
      </h2>

      <p :class="['text-sm text-muted mt-1', props.ui.description]">
        {{ subtitle }}
      </p>
    </div>

    <UButton
      v-if="ctaText"
      :label="ctaText"
      :icon="ctaIcon || undefined"
      size="md"
      :class="['shrink-0', props.ui.actionLabel]"
      @click="handleCta"
    />
  </div>
</template>
