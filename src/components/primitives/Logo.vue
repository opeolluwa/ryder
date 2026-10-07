<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Light-mode logo (hidden once `.dark` is on `<html>`). */
    src?: string;
    /** Dark-mode logo. */
    srcDark?: string;
    alt?: string;
    /** Where the logo links to. */
    to?: string;
  }>(),
  {
    src: "/extended-logo-white.png",
    srcDark: "/extended-logo-green.png",
    alt: "logo",
    to: "/",
  },
);
</script>

<template>
  <NuxtLink class="my-4" :href="to">
    <img :src="src" :alt="alt" class="w-24 object-cover dark:hidden" />
    <img :src="srcDark" :alt="alt" class="hidden w-22 object-cover dark:block" />
  </NuxtLink>
</template>
