<script setup lang="ts">
/**
 * The bare shell: plain semantics by default (a plain `<main>`), with the
 * app's chrome available as slots — the local wrapper fills `header`/`footer`
 * with its own components and passes the padding and background through the
 * class props.
 */
withDefaults(
  defineProps<{
    /** Classes on the outer wrapper (e.g. `bg-white dark:bg-onyx-700 ...`). */
    wrapperClass?: string;
    /** Classes on `<main>` (e.g. `pt-[68px] lg:pt-[72px]` under a fixed header). */
    mainClass?: string;
  }>(),
  {
    wrapperClass: "",
    mainClass: "",
  },
);
</script>

<template>
  <div :class="wrapperClass">
    <slot name="header" />
    <main :class="mainClass">
      <slot />
    </main>
    <slot name="footer" />
    <slot name="bottom" />
  </div>
</template>
