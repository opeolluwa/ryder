<script setup lang="ts">
import SharedShell from "@weangel/shared/layouts/SharedShell.vue";
import SharedSideNav from "@weangel/shared/components/SideNav.vue";

/**
 * Playground adapter for `SharedShell` — the console's `dashboard` layout
 * reduced to what an app supplies after migration: nav data, identity, logout
 * wiring, and its own drawer component through the slots.
 */
const navItems = [
  { label: "Home", icon: "heroicons:home", to: "/" },
  { label: "Shell demo", icon: "heroicons:squares-2x2", to: "/shell", badge: 3 },
  { label: "Settings", icon: "heroicons:cog-6-tooth", to: "/settings" },
  { label: "Auth", icon: "heroicons:lock-closed", to: "/auth" },
];

const user = {
  name: "Playground Admin",
  avatar: { text: "PA", alt: "Playground Admin" },
};

function onLogout() {
  console.log("[playground] logout requested");
}
</script>

<template>
  <SharedShell
    :nav-items="navItems"
    :user="user"
    :notifications-unread-count="3"
    root-path="/"
    profile-path="/settings"
    settings-path="/settings"
    avatar-path="/settings"
    @logout="onLogout"
  >
    <template #mobile-nav>
      <SharedSideNav
        :items="navItems"
        :user="user"
        root-path="/"
        @logout="onLogout"
      />
    </template>

    <slot />
  </SharedShell>
</template>
