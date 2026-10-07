<script setup lang="ts"></script>

<template>
  <nav
    class="fixed inset-x-0 z-50 flex h-16 items-center justify-around border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
    style="
      bottom: var(--kb-inset, 0px);
      padding-bottom: max(0.625rem, env(safe-area-inset-bottom));
    "
  >
    <slot />
  </nav>
</template>
