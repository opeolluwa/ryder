<script setup lang="ts">
import RyderSettings from "@opeolluwa/ryder/layouts/RyderSettings.vue";

/**
 * Playground adapter for `RyderSettings` — tabs come from the app (here a
 * local list; console: `~/data/settings-tabs`), the shell it wraps is named
 * through `wrapperLayout`.
 */
const tabs = [
  {
    key: "profile",
    label: "Profile",
    icon: "heroicons:user",
    desc: "Your account",
    to: "/settings",
  },
  {
    key: "security",
    label: "Security",
    icon: "heroicons:lock-closed",
    desc: "Password & sessions",
    to: "/settings/security",
  },
];
</script>

<template>
  <RyderSettings
    :tabs="tabs"
    base-path="/settings"
    default-tab-key="profile"
    wrapper-layout="dashboard"
    heading="Settings"
  >
    <slot />
  </RyderSettings>
</template>
