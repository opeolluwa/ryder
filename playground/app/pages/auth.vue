<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: false,
});

const email = ref("");
const password = ref("");


</script>

<template>
  <!-- The manual wrap mirrors a typical login page: it is what lets a page fill
       the layout's named slots (`side`, `footer`). -->
  <NuxtLayout name="RyderSplitLayout">
    <template #side>
      <p class="text-xl leading-relaxed font-semibold text-white">
        "Ryder auth layout, split variant."
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

      <RyderInput
        v-model="email"
        label="Email"
        name="email"
        placeholder="you@example.com"
      />

      <RyderInput
        v-model="password"
        label="Password"
        name="password"
        type="password"
      />

      <RyderButton type="submit" class="w-full">Sign in</RyderButton>
    </div>
  </NuxtLayout>
</template>
