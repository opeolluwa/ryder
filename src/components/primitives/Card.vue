<script setup lang="ts">
defineProps<{
  title?: string;
  ui?: {
    root?: string;
    header?: string;
    title?: string;
  };
}>();
</script>

<template>
  <section
    :class="[
      'rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-onyx-700 dark:shadow-lg dark:shadow-black/25',
      ui?.root,
    ]"
  >
    <header
      v-if="title || $slots.header || $slots.trailing"
      :class="['flex items-center justify-between gap-3', ui?.header]"
    >
      <slot name="header">
        <div class="flex min-w-0 items-center">
          <h3
            v-if="title"
            :class="[
              'truncate text-sm font-semibold text-gray-900 dark:text-white',
              ui?.title,
            ]"
          >
            {{ title }}
          </h3>
        </div>
      </slot>

      <slot name="trailing" />
    </header>

    <slot />
  </section>
</template>
