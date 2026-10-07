<script setup lang="ts">
/**
 * The bare shell both apps share: console semantics by default (a plain
 * `<main>`), with the client's chrome available as slots — its local wrapper
 * fills `header`/`footer` with `AppHeader`/`AppFooter` and passes the padding
 * and background through the class props.
 */
withDefaults(
  defineProps<{
    /** Classes on the outer wrapper (client: `bg-white dark:bg-onyx-700 ...`). */
    wrapperClass?: string;
    /** Classes on `<main>` (client: `pt-[68px] lg:pt-[72px]` under a fixed header). */
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
