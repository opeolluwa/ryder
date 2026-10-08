<script setup lang="ts">
import RyderShell from "@opeolluwa/ryder/layouts/RyderShell.vue";
import RyderSideNav from "@opeolluwa/ryder/components/navigation/SideNav.vue";

/**
 * Playground adapter for `RyderShell` — the `dashboard` layout reduced to
 * what an app supplies: nav data, identity, logout wiring, and its own
 * drawer component through the slots.
 */
const navItems = [
  { label: "Home", icon: "heroicons:home", to: "/" },
  { label: "Search", icon: "heroicons:magnifying-glass", to: "/search" },
  { label: "Messaging", icon: "heroicons:chat-bubble-left", to: "/messaging" },
  { label: "Editor", icon: "heroicons:pencil-square", to: "/editor" },
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
  <RyderShell
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
      <RyderSideNav
        :items="navItems"
        :user="user"
        root-path="/"
        @logout="onLogout"
      />
    </template>

    <slot />
  </RyderShell>
</template>
