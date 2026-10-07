<script setup lang="ts">
import { computed } from "vue";
import { useColorMode, useRoute } from "#imports";
import USlideover from "@nuxt/ui/components/Slideover.vue";
import UUser from "@nuxt/ui/components/User.vue";
import UButton from "@nuxt/ui/components/Button.vue";
import UIcon from "@nuxt/ui/components/Icon.vue";
import USeparator from "@nuxt/ui/components/Separator.vue";
import { useMobileNav } from "../../composables/useMobileNav";

export interface SideNavItem {
  /** Navigation target. Omit for an action item (see `action`). */
  to?: string;
  label: string;
  icon: string;
  /** Trailing count pill (unread count, cart items, …). */
  badge?: string | number | null;
  /**
   * Marks a non-navigation item: rendered as a button that closes the drawer
   * and emits `action` with this name (for flows with no page of their own —
   * e.g. one that opens a drawer).
   */
  action?: string;
}

export interface SideNavUser {
  name?: string;
  description?: string;
  avatar?: { src?: string; text?: string; alt?: string; icon?: string };
}

const props = withDefaults(
  defineProps<{
    /** The drawer's menu. Supplied by the app — shared code never imports `~/data`. */
    items?: SideNavItem[];
    /** Rendered in the drawer header; defaults to a generic "User". */
    user?: SideNavUser;
    /** Path treated as "always active" when it is the current route. Default `"/"`. */
    rootPath?: string;
  }>(),
  {
    items: () => [],
    user: () => ({}),
    rootPath: "/",
  },
);

const emit = defineEmits<{
  /** An `action` item was tapped (the app opens its drawer / runs its flow). */
  action: [name: string];
  /** Sign out was tapped — the app performs its own teardown. */
  logout: [];
}>();

const route = useRoute();
const colorMode = useColorMode();

const { mobileNavOpen, closeMobileNav } = useMobileNav();

const isDark = computed(() => colorMode.value === "dark");

const themeIcon = computed(() =>
  isDark.value ? "heroicons:sun" : "heroicons:moon",
);
const themeLabel = computed(() => (isDark.value ? "Light mode" : "Dark mode"));

function toggleTheme() {
  colorMode.preference = isDark.value ? "light" : "dark";
}

function isActive(path: string): boolean {
  if (path === props.rootPath) {
    return route.path === path;
  }

  return route.path === path || route.path.startsWith(`${path}/`);
}

function onAction(item: SideNavItem) {
  closeMobileNav();
  emit("action", item.action ?? item.label);
}

function handleLogout() {
  closeMobileNav();
  emit("logout");
}
</script>

<template>
  <USlideover
    v-model:open="mobileNavOpen"
    side="left"
    :ui="{ content: 'max-w-64 z-50', overlay: 'z-50' }"
  >
    <template #content>
      <div class="flex flex-col h-full bg-primary-600 dark:bg-onyx-700">
        <div class="shrink-0" style="height: env(safe-area-inset-top)" />

        <div
          class="flex items-center justify-between px-4 py-4 border-b border-white/10 shrink-0"
        >
          <UUser
            :name="user.name || 'User'"
            :description="user.description"
            :avatar="{
              src: user.avatar?.src,
              text: user.avatar?.text,
              alt: user.avatar?.alt || user.name,
              icon: user.avatar?.icon || 'i-lucide-user',
            }"
            :ui="{
              name: 'text-white',
              description: 'text-white/60',
              avatar: 'ring-1 ring-white/15',
            }"
            class="min-w-0 flex-1 truncate"
          />
          <UButton
            color="neutral"
            variant="ghost"
            icon="heroicons:x-mark"
            aria-label="Close menu"
            class="text-white/70 hover:bg-white/10 hover:text-white dark:text-gray-400 dark:hover:bg-white/5"
            @click="closeMobileNav"
          />
        </div>

        <div
          class="flex flex-col min-h-0 flex-1 overflow-y-auto px-3 pt-2 pb-1"
        >
          <template v-for="item in items" :key="item.to ?? item.action ?? item.label">
            <!--
              An action item has no page — it triggers app logic (e.g. a
              cart drawer) — so it is a button rather than a link and never
              tries to resolve a route that does not exist.
            -->
            <button
              v-if="!item.to"
              type="button"
              class="flex items-center w-full h-11 my-0.5 gap-2 px-2 rounded-xl transition-colors text-white hover:bg-white/10 hover:text-white dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
              @click="onAction(item)"
            >
              <UIcon
                :name="item.icon"
                class="size-5 shrink-0 text-white/70 dark:text-gray-400"
              />

              <span class="text-sm truncate">{{ item.label }}</span>

              <span
                v-if="item.badge !== null && item.badge !== undefined"
                class="ml-auto shrink-0 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-semibold text-primary-600 dark:bg-primary-500 dark:text-white"
              >
                {{ item.badge }}
              </span>
            </button>

            <NuxtLink
              v-else
              :to="item.to"
              class="flex items-center w-full h-11 my-0.5 gap-2 px-2 rounded-xl transition-colors"
              :class="
                isActive(item.to)
                  ? 'bg-white/10 text-white dark:bg-primary-500/10 dark:text-primary-400 font-medium'
                  : 'text-white hover:bg-white/10 hover:text-white dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white'
              "
              @click="closeMobileNav"
            >
              <UIcon
                :name="item.icon"
                class="size-5 shrink-0"
                :class="
                  isActive(item.to)
                    ? 'text-white'
                    : 'text-white/70 dark:text-gray-400'
                "
              />

              <span class="text-sm truncate">{{ item.label }}</span>

              <span
                v-if="item.badge !== null && item.badge !== undefined"
                class="ml-auto shrink-0 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-semibold text-primary-600 dark:bg-primary-500 dark:text-white"
              >
                {{ item.badge }}
              </span>
            </NuxtLink>
          </template>
        </div>

        <div class="shrink-0 px-3 pt-1 pb-4">
          <USeparator :ui="{ border: 'border-white/10' }" class="mb-3" />

          <button
            type="button"
            class="flex items-center w-full h-11 gap-2 px-2 rounded-xl text-white hover:bg-white/10 hover:text-white dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white transition-colors"
            @click="toggleTheme"
          >
            <UIcon
              :name="themeIcon"
              class="size-5 shrink-0 text-white/70 dark:text-gray-400"
            />
            <span class="text-sm font-medium">{{ themeLabel }}</span>
          </button>

          <button
            type="button"
            class="flex items-center w-full h-11 gap-2 px-2 rounded-xl text-white/60 hover:bg-white/10 hover:text-red-200 dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300 transition-colors"
            @click="handleLogout"
          >
            <UIcon
              name="heroicons:arrow-right-start-on-rectangle"
              class="size-5 shrink-0 text-white/70 dark:text-gray-400"
            />
            <span class="text-sm font-medium">Sign out</span>
          </button>
        </div>

        <div class="shrink-0" style="height: env(safe-area-inset-bottom)" />
      </div>
    </template>
  </USlideover>
</template>
