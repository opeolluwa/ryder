<script setup lang="ts">
import { ref, watch } from "vue";

const props = withDefaults(
    defineProps<{
        /** Background image source for the left panel. */
        bg?: string;
        /** Image source to use when the primary image fails to load. */
        fallbackBg?: string;
    }>(),
    {
        bg: "/bg.jpg",
        fallbackBg: "/bg.jpg",
    },
);

const pageImage = ref(props.bg);

watch(
    () => props.bg,
    (bg) => {
        pageImage.value = bg;
    },
);

const onImageError = () => {
    if (pageImage.value !== props.fallbackBg) {
        pageImage.value = props.fallbackBg;
    }
};
</script>

<template>
  <div
    class="relative min-h-dvh w-full overflow-x-hidden bg-white lg:h-dvh lg:overflow-hidden dark:bg-onyx-700"
  >
    <div class="absolute inset-0 hidden lg:block">
      <img
        :src="pageImage"
        alt=""
        class="h-full w-full object-cover"
        @error="onImageError"
      />

      <div class="absolute inset-0 bg-black/10 dark:bg-black/30" />
    </div>

    <header
      v-if="$slots.header" class="absolute inset-x-0 top-0 z-20 hidden items-center justify-between px-6 py-6 lg:flex lg:px-14"
    >
      <slot name="header" />
    </header>

    <main
      class="relative z-10 flex min-h-dvh lg:h-dvh lg:px-4 lg:py-28 sm:lg:px-8"
    >
      <div
        class="absolute left-10 top-1/2 hidden max-w-xl -translate-y-1/2 text-white xl:left-20 lg:block"
      >
        <slot name="hero" />
      </div>

      <div
        class="flex w-full min-h-dvh flex-col justify-center bg-white px-5 py-8 dark:bg-onyx-600 lg:m-auto lg:min-h-0 lg:max-w-[500px] lg:rounded-xl lg:px-8 lg:shadow-2xl"
      >
        <div class="w-full">
          <slot />
        </div>

        <p
          class="mt-6 text-center text-[11px] text-gray-400 dark:text-gray-500"
        >
          <slot name="footer" />
        </p>
      </div>
    </main>
  </div>
</template>
