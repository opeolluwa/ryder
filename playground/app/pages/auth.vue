<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: false,
});

const email = ref("");
const password = ref("");
</script>

<template>
  <!-- The manual wrap mirrors console's login page: it is what lets a page fill
       the layout's named slots (`side`, `footer`). -->
  <NuxtLayout name="SharedAuth">
    <template #side>
      <p class="text-xl leading-relaxed font-semibold text-white">
        "Shared auth layout, split variant."
      </p>
      <p class="mt-4 text-sm text-white/80">
        The frosted card is the `side` slot.
      </p>
    </template>

    <template #footer>© Playground</template>

    <div class="space-y-5">
      <div>
        <h1 class="text-2xl font-semibold">Welcome back</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-white/50">
          Sign in to continue.
        </p>
      </div>

      <SharedInput
        v-model="email"
        label="Email"
        name="email"
        placeholder="you@example.com"
      />

      <SharedInput
        v-model="password"
        label="Password"
        name="password"
        type="password"
      />

      <SharedButton type="submit" class="w-full">Sign in</SharedButton>
    </div>
  </NuxtLayout>
</template>
