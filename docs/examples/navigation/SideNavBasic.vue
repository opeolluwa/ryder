<script setup lang="ts">
import { inject, provide, ref } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { routeLocationKey } from "vue-router";
import SideNav from "../../../src/components/navigation/SideNav.vue";
import { useMobileNav } from "../../../src/composables/useMobileNav";

// Same `#imports -> vue-router` note as the BottomNav demo: the docs host has
// no router, so give the active-item check a path when nothing else has.
if (!inject(routeLocationKey, null)) {
  provide(routeLocationKey, { path: "/" } as RouteLocationNormalizedLoaded);
}

const { mobileNavOpen, openMobileNav } = useMobileNav();

const items = [
  { label: "Home", to: "/", icon: "heroicons:home" },
  { label: "Cart", icon: "heroicons:shopping-cart", action: "toggle-cart", badge: 3 },
  { label: "Settings", icon: "heroicons:cog-6-tooth", action: "open-settings" },
];

const user = {
  name: "Docs demo",
  description: "Signed in",
  avatar: { text: "DD", alt: "Docs demo" },
};

const lastEvent = ref("");
</script>

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap items-center gap-3">
      <button
        type="button"
        class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        @click="openMobileNav()"
      >
        Open side nav
      </button>

      <span class="text-sm text-gray-500 dark:text-white/50">
        {{ lastEvent || `Drawer is ${mobileNavOpen ? "open" : "closed"}` }}
      </span>
    </div>

    <SideNav
      :items="items"
      :user="user"
      root-path="/"
      @action="lastEvent = `action: ${$event}`"
      @logout="lastEvent = 'logout'"
    />
  </div>
</template>