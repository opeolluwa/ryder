<script setup lang="ts">
import { computed } from "vue";
import { navigateTo, useRoute, useRouter } from "#imports";
import UButton from "@nuxt/ui/components/Button.vue";
import RyderShell, { type ShellUser } from "./RyderShell.vue";
import { useVisualViewportHeight } from "../composables/useVisualViewportHeight";

/**
 * A message-thread shell: the full `RyderShell` on `lg` and up, and minimal
 * chrome below it.
 *
 * The dual chrome exists because a thread page owns its own scroll regions
 * (the message list, the composer), so the mobile branch must not scroll — a
 * scrolling `main` would fight the pages' inner `overflow-y-auto` panes and
 * leave a chat unable to scroll. It is a bounded, non-scrolling host that hands
 * a definite height to the slot.
 *
 * The layout has no app imports (`~/data`, stores, composables): navigation
 * items, the user object and the back-fallback path all arrive as props.
 */
const props = withDefaults(
  defineProps<{
    /** Sidebar menu for `RyderShell`'s `UNavigationMenu` (computed by the app). */
    navItems?: any[];
    /** Header identity: dropdown label and avatar. */
    user?: ShellUser;
    /** Unread count for the shell's default bell. */
    notificationsUnreadCount?: number;
    /** Path the shell's back-button falls back to when history has nowhere to go. */
    rootPath?: string;
    /** Dropdown "Profile" target. */
    profilePath?: string;
    /** Dropdown "Settings" target. */
    settingsPath?: string;
    /** Mobile avatar tap target. */
    avatarPath?: string;
    /** Search submit target (`` `${searchPath}?q=` ``). */
    searchPath?: string;
    /** Notifications bell target. */
    notificationsPath?: string;
    /**
     * Extra classes on `RyderShell`'s content wrapper. Defaults to removing
     * the shell's padding and pinning the content to the viewport under the
     * 4rem header, which is what a full-height thread needs.
     */
    contentClass?: string;
    /**
     * Stops `RyderShell`'s `main` scrolling so the page's own `overflow-y-auto`
     * panes are the only scroller. Default `true`: a thread page always fills
     * the content box. `contentClass` should pin a height when this is set.
     */
    fixedHeight?: boolean;
    /** Title shown in the minimal mobile header. */
    mobileTitle?: string;
    /**
     * Mobile back-button target when there is no in-app history and the route
     * declares no `backTo` meta.
     */
    fallbackPath?: string;
    /** Whether `RyderShell` shows the header search input. */
    showSearch?: boolean;
  }>(),
  {
    navItems: () => [],
    user: () => ({}),
    notificationsUnreadCount: 0,
    rootPath: "/",
    profilePath: "/settings/profile",
    settingsPath: "/settings",
    avatarPath: "/settings/profile",
    searchPath: "/search",
    notificationsPath: "/notifications",
    contentClass: "!p-0 h-[calc(100dvh-4rem)]",
    fixedHeight: true,
    mobileTitle: "",
    fallbackPath: "/",
    showSearch: true,
  },
);

const emit = defineEmits<{
  /** Sign out was requested (sidebar footer or dropdown). */
  logout: [];
}>();

const router = useRouter();
const route = useRoute();

/**
 * The mobile shell is a flex column whose last row is the thread composer. It
 * has to shrink when the keyboard opens or the composer ends up hidden under
 * it, so its height comes from the visual viewport rather than `h-dvh`.
 */
const { style: viewportStyle } = useVisualViewportHeight();

const showBack = computed(() => route.meta.back === true);

function goBack() {
  if (import.meta.client && window.history.state?.back) {
    router.back();
    return;
  }

  const override = route.meta.backTo as string | undefined;

  navigateTo(override ?? props.fallbackPath);
}
</script>

<template>
  <!-- Desktop: full shell -->
  <div class="hidden lg:block">
    <RyderShell
      :nav-items="navItems"
      :user="user"
      :notifications-unread-count="notificationsUnreadCount"
      :root-path="rootPath"
      :notifications-path="notificationsPath"
      :search-path="searchPath"
      :settings-path="settingsPath"
      :avatar-path="avatarPath"
      :profile-path="profilePath"
      :content-class="contentClass"
      :fixed-height="fixedHeight"
      :show-search="showSearch"
      @logout="emit('logout')"
    >
      <template #sidebar-brand>
        <slot name="sidebar-brand" />
      </template>

      <slot />
    </RyderShell>
  </div>

  <!-- Mobile: minimal chrome, the page's own header lives inside the slot -->
  <div
    class="flex h-dvh flex-col bg-white dark:bg-onyx-700 lg:hidden"
    :style="viewportStyle"
  >
    <header
      class="flex h-12 shrink-0 items-center gap-2 border-b border-gray-100 px-2 dark:border-white/5"
    >
      <UButton
        v-if="showBack"
        icon="heroicons:arrow-left"
        color="neutral"
        variant="ghost"
        size="sm"
        aria-label="Go back"
        @click="goBack"
      />
      <UButton
        v-else
        icon="heroicons:arrow-left"
        color="neutral"
        variant="ghost"
        size="sm"
        aria-label="Go back"
        @click="navigateTo(fallbackPath)"
      />

      <p
        class="min-w-0 flex-1 truncate text-sm font-medium text-gray-900 dark:text-white"
      >
        {{ mobileTitle }}
      </p>
    </header>

    <!--
      The page owns its own scroll regions (the thread list, the inbox list),
      so `main` must not scroll too: a scrolling `main` would fight the inner
      `overflow-y-auto` panes and leave the mobile chat unable to scroll. It is
      a bounded, non-scrolling host that hands a definite height to the slot.
    -->
    <main class="flex min-h-0 flex-1 flex-col overflow-hidden">
      <slot />
    </main>
  </div>
</template>
