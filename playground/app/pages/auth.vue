<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: false,
});

const email = ref("");
const password = ref("");

onMounted(() => {
  const rect = (el: Element | null) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      cls: (el as HTMLElement).className.slice(0, 80),
      rect: [Math.round(r.width), Math.round(r.height), Math.round(r.top), Math.round(r.left)],
      h: cs.height,
      display: cs.display,
      overflow: cs.overflow,
    };
  };
  const grid = document.querySelector('[class~="grid"][class~="h-screen"]') as HTMLElement | null;
  const p = document.createElement("p");
  p.id = "measure";
  p.textContent = JSON.stringify({
    win: [window.innerWidth, window.innerHeight],
    scroll: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
    html: rect(document.documentElement),
    body: rect(document.body),
    nuxt: rect(document.querySelector("#__nuxt")),
    kapp: rect(document.querySelector(".k-app")),
    grid: rect(grid),
    gridCols: grid ? getComputedStyle(grid).gridTemplateColumns : null,
    children: grid ? Array.from(grid.children).map(rect) : null,
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
