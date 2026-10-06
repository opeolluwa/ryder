<script setup lang="ts">
import SharedDefault from "@weangel/shared/layouts/SharedDefault.vue";
import SharedLogo from "@weangel/shared/components/Logo.vue";

/**
 * Playground adapter for `SharedDefault` — the shape an app's local layout
 * takes after migration: app chrome through the slots, app classes through
 * the props.
 */
</script>

<template>
  <SharedDefault
    wrapper-class="min-h-screen bg-white dark:bg-onyx-700"
    main-class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6"
  >
    <template #header>
      <header
        class="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-white/10 sm:px-6"
      >
        <SharedLogo />
        <nav class="flex items-center gap-4 text-sm text-gray-500 dark:text-white/50">
          <NuxtLink to="/" class="hover:text-gray-900 dark:hover:text-white">Home</NuxtLink>
          <NuxtLink to="/shell" class="hover:text-gray-900 dark:hover:text-white">Shell</NuxtLink>
          <NuxtLink to="/auth" class="hover:text-gray-900 dark:hover:text-white">Auth</NuxtLink>
          <NuxtLink to="/settings" class="hover:text-gray-900 dark:hover:text-white">Settings</NuxtLink>
        </nav>
      </header>
    </template>

    <slot />

    <template #footer>
      <footer
        class="mt-12 border-t border-gray-100 py-6 text-center text-xs text-gray-400 dark:border-white/10 dark:text-white/30"
      >
        @weangel/shared playground
      </footer>
    </template>
  </SharedDefault>
</template>
