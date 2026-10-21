<script setup lang="ts">
import RyderComplaint from "@opeolluwa/ryder/layouts/RyderComplaint.vue";

/**
 * Playground adapter for `RyderComplaint` — the `complaint` layout reduced to
 * what an app supplies: nav data, identity, logout wiring, the mobile title and
 * a back-button fallback.
 */
const navItems = [
  { label: "Home", icon: "heroicons:home", to: "/" },
  { label: "Messaging", icon: "heroicons:chat-bubble-left", to: "/messaging" },
  { label: "Complaint", icon: "heroicons:exclamation-triangle", to: "/complaint" },
  { label: "Settings", icon: "heroicons:cog-6-tooth", to: "/settings" },
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
  <RyderComplaint
    :nav-items="navItems"
    :user="user"
    :notifications-unread-count="3"
    root-path="/"
    profile-path="/settings"
    settings-path="/settings"
    avatar-path="/settings"
    mobile-title="Complaint"
    fallback-path="/messaging"
    @logout="onLogout"
  >
    <slot />
  </RyderComplaint>
</template>
