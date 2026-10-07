<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "#imports";
import UButton from "@nuxt/ui/components/Button.vue";

const props = withDefaults(
  defineProps<{
    /**
     * `split` is the console: a 5-column grid whose image panel holds a
     * frosted card (fill it through the `side` slot) beside the form, with
     * router back/forward buttons. `centered` is the client: a full-bleed
     * image behind a floating card, with the brand/help header and hero copy
     * through their slots.
     */
    variant?: "split" | "centered";
    /** Background image source. */
    src?: string;
    /** Where a failed image load falls back to. */
    fallbackSrc?: string;
  }>(),
  {
    variant: "split",
    src: "/auth/login.jpg",
    fallbackSrc: "/auth/login.jpg",
  },
);

const router = useRouter();

const pageImage = ref(props.src);

const onImageError = () => {
  if (pageImage.value !== props.fallbackSrc) {
    pageImage.value = props.fallbackSrc;
  }
};
</script>

<template>
  <!-- Console: 5-column split -->
  <div
    v-if="variant === 'split'"
    class="grid h-dvh w-full grid-cols-1 overflow-hidden bg-white dark:bg-onyx-700 lg:grid-cols-5"
  >
    <!-- Left: image -->
    <div class="relative hidden rounded-lg lg:col-span-3 lg:block">
      <img
        :src="pageImage"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
        @error="onImageError"
      />

      <div class="absolute inset-0 bg-black/10 dark:bg-black/30" />

      <!-- Frosted quote card -->
      <div class="absolute inset-0 flex items-center justify-center p-8">
        <div
          class="w-full max-w-lg rounded-2xl bg-white/30 p-10 shadow-lg backdrop-blur-md dark:bg-black/20"
        >
          <slot name="side" />
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="absolute left-6 top-6 z-10 hidden items-center gap-2 lg:flex">
      <UButton
        icon="heroicons:arrow-left"
        size="lg"
        color="neutral"
        variant="solid"
        aria-label="Go back"
        class="bg-white text-gray-900 shadow-sm hover:bg-gray-100 dark:bg-onyx-600 dark:text-white dark:hover:bg-onyx-500"
        @click="router.back()"
      />

      <UButton
        icon="heroicons:arrow-right"
        size="lg"
        color="neutral"
        variant="solid"
        aria-label="Go forward"
        class="bg-white text-gray-900 shadow-sm hover:bg-gray-100 dark:bg-onyx-600 dark:text-white dark:hover:bg-onyx-500"
        @click="router.forward()"
      />
    </div>

    <!-- Right: content -->
    <div
      class="relative flex flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain bg-white px-6 pt-6 pb-10 transition-colors dark:bg-onyx-700 sm:px-10 lg:col-span-2 lg:px-16 lg:py-14"
    >
      <div class="mx-auto w-full max-w-md px-0 sm:px-6 lg:px-12 lg:my-auto">
        <slot />
      </div>

      <p class="mt-6 text-center text-[11px] text-gray-400 dark:text-gray-500">
        <slot name="footer" />
      </p>
    </div>
  </div>

  <!-- Client: centered card over a full-bleed image -->
  <div
    v-else
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
      class="absolute inset-x-0 top-0 z-20 hidden items-center justify-between px-6 py-6 lg:flex lg:px-14"
    >
      <slot name="header" />
    </header>

    <main class="relative z-10 flex min-h-dvh lg:h-dvh lg:px-4 lg:py-28 sm:lg:px-8">
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
