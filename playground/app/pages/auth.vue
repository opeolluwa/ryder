<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: false,
});

const email = ref("");
const password = ref("");

onMounted(() => {
  const grid = document.querySelector('[class~="grid"][class~="h-dvh"]') as HTMLElement | null;
  const body = document.body.getBoundingClientRect();
  const children = grid
    ? Array.from(grid.children).map((c) => {
        const r = c.getBoundingClientRect();
        const cs = getComputedStyle(c as Element);
        return {
          cls: (c as Element).className,
          display: cs.display,
          rect: [Math.round(r.width), Math.round(r.height), Math.round(r.top), Math.round(r.left)],
        };
      })
    : null;
  const gcs = grid ? getComputedStyle(grid) : null;
  const p = document.createElement("p");
  p.id = "measure";
  p.textContent = JSON.stringify({
    win: [window.innerWidth, window.innerHeight],
    grid: grid && [Math.round(grid.getBoundingClientRect().width), Math.round(grid.getBoundingClientRect().height)],
    gridCols: gcs?.gridTemplateColumns,
    alignContent: gcs?.alignContent,
    body: [body.width, body.height],
    children,
  });
  document.body.appendChild(p);
});
</script>

<template>
  <!-- The manual wrap mirrors a typical login page: it is what lets a page fill
       the layout's named slots (`side`, `footer`). -->
  <NuxtLayout name="RyderAuth">
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
