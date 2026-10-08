<script setup lang="ts">
import RyderDefault from "@opeolluwa/ryder/layouts/RyderDefault.vue";
import RyderLogo from "@opeolluwa/ryder/components/primitives/Logo.vue";

/**
 * Playground adapter for `RyderDefault` — the shape an app's local layout
 * takes after migration: app chrome through the slots, app classes through
 * the props.
 */
</script>

<template>
  <RyderDefault
    wrapper-class="min-h-screen bg-brown-50 dark:bg-onyx-700"
    main-class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6"
  >
    <template #header>
      <header
        class="flex items-center justify-between border-b border-brown-100/60 px-4 py-3 dark:border-white/10 sm:px-6"
      >
        <RyderLogo />
        <nav class="flex items-center gap-4 text-sm text-brown-600 dark:text-white/50">
          <NuxtLink to="/" class="hover:text-brown-900 dark:hover:text-white">Home</NuxtLink>
          <NuxtLink to="/shell" class="hover:text-brown-900 dark:hover:text-white">Shell</NuxtLink>
          <NuxtLink to="/auth" class="hover:text-brown-900 dark:hover:text-white">Auth</NuxtLink>
          <NuxtLink to="/settings" class="hover:text-brown-900 dark:hover:text-white">Settings</NuxtLink>
          <NuxtLink to="/editor" class="hover:text-brown-900 dark:hover:text-white">Editor</NuxtLink>
        </nav>
      </header>
    </template>

    <slot />

    <template #footer>
      <footer
        class="mt-12 border-t border-brown-100/60 py-6 text-center text-xs text-brown-400 dark:border-white/10 dark:text-white/30"
      >
        @opeolluwa/ryder playground
      </footer>
    </template>
  </RyderDefault>
</template>
