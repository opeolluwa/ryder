<script setup lang="ts">
import { inject, provide, ref } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { routeLocationKey } from "vue-router";
import BottomNav from "../../../src/components/navigation/BottomNav.vue";

// The kit's nav reads `useRoute()` from `#imports` (vue-router). The docs host
// has no router, so the active-item check would run against `undefined` here;
// supply a path only when nothing else has. A Nuxt app's router provides the
// real route and this is a no-op.
if (!inject(routeLocationKey, null)) {
  provide(routeLocationKey, { path: "/" } as RouteLocationNormalizedLoaded);
}

const items = [
  {
    label: "Home",
    to: "/",
    icon: "ri:home-line",
    activeIcon: "ri:home-fill",
  },
  { label: "Search", icon: "heroicons:magnifying-glass", action: "open-search" },
  { label: "Cart", icon: "heroicons:shopping-cart", action: "toggle-cart" },
];

const cartCount = ref(2);
const lastSelect = ref("");

function onSelect(item: { label: string; action?: string }) {
  lastSelect.value = item.action
    ? `${item.label} → ${item.action}`
    : item.label;
}
</script>

<template>
  <div class="space-y-3">
    <p class="text-xs text-gray-400 dark:text-white/30">
      The bar is fixed to the viewport bottom and hidden from 1024px up — narrow
      the window to see it. An <code class="font-mono">action</code> item only
      emits <code class="font-mono">select</code>; the Home item navigates.
      Last select: {{ lastSelect || "—" }}
    </p>

    <BottomNav :items="items" @select="onSelect">
      <template #badge="{ item, active }">
        <span
          v-if="item.action === 'toggle-cart' && cartCount > 0"
          class="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white"
          :class="active ? 'bg-primary-600' : 'bg-red-500'"
        >
          {{ cartCount }}
        </span>
      </template>
    </BottomNav>
  </div>
</template>