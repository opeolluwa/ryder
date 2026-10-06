<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from "vue";
import {
  navigateTo,
  useBreadcrumbItems,
  useRoute,
  useRouter,
} from "#imports";
import { useOnline } from "@vueuse/core";
import * as v from "valibot";
import UDashboardGroup from "@nuxt/ui/components/DashboardGroup.vue";
import UDashboardSidebar from "@nuxt/ui/components/DashboardSidebar.vue";
import UNavigationMenu from "@nuxt/ui/components/NavigationMenu.vue";
import UBreadcrumb from "@nuxt/ui/components/Breadcrumb.vue";
import UDropdownMenu from "@nuxt/ui/components/DropdownMenu.vue";
import UForm from "@nuxt/ui/components/Form.vue";
import UFormField from "@nuxt/ui/components/FormField.vue";
import UInput from "@nuxt/ui/components/Input.vue";
import UButton from "@nuxt/ui/components/Button.vue";
import UAvatar from "@nuxt/ui/components/Avatar.vue";
import UIcon from "@nuxt/ui/components/Icon.vue";
import UColorModeButton from "@nuxt/ui/components/color-mode/ColorModeButton.vue";
import { useMobileNav } from "../composables/useMobileNav";
import EmptyState from "../components/EmptyState.vue";

export interface ShellUser {
  name?: string;
  avatar?: { src?: string; text?: string; alt?: string; icon?: string };
}

const props = withDefaults(
  defineProps<{
    /**
     * Sidebar menu for `UNavigationMenu` (including any `badge`/`onSelect`
     * entries). Computed by the app — shared code never imports `~/data`.
     */
    navItems?: any[];
    /** Header identity: dropdown label and avatar. */
    user?: ShellUser;
    /** Unread count for the default bell; pass your own `notifications` slot to replace it. */
    notificationsUnreadCount?: number;
    /** Path the back-button falls back to when history has nowhere to go. */
    rootPath?: string;
    /** Dropdown "Profile" target. */
    profilePath?: string;
    /** Dropdown "Settings" target. */
    settingsPath?: string;
    /** Mobile avatar tap target. */
    avatarPath?: string;
    /** Search submit target (`` `${searchPath}?q=` ``). */
    searchPath?: string;
    /** Extra classes on the page content wrapper (client: `pb-28` for its tab bar). */
    contentClass?: string;
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
    contentClass: "",
  },
);

const emit = defineEmits<{
  /** Sign out was requested (sidebar footer or dropdown) — the app tears down its session. */
  logout: [];
}>();

const route = useRoute();
const router = useRouter();
const { toggleMobileNav } = useMobileNav();

/**
 * The browser's own verdict on connectivity, from VueUse's `useOnline`.
 *
 * `navigator.onLine` only goes false for a real disconnect, which is what makes
 * it worth reading: a reader with no network gets one explanation instead of a
 * page of failed queries, each rendering its own error.
 *
 * The other failure — a backend that is down while the network is fine — still
 * reports `true` here and has its own signal in each app.
 *
 * Server-side this is always `true`, so the page renders normally on first paint
 * and the client takes it from there.
 */
const isOnline = useOnline();

const lastPathSegment = computed(() => {
  const path = route.path.split("?")[0].replace(/\/+$/, "");

  return path.split("/").pop() ?? "";
});

/**
 * `useBreadcrumbItems` derives one item per path segment, so a dynamic route
 * such as `/account/orders/WA-10294` would label its last crumb with the raw
 * slug. Route params get an explicit label instead.
 */
const breadcrumbOverrides = computed(() => {
  const segment = lastPathSegment.value;
  const isRouteParam = Object.values(route.params).some((value) =>
    Array.isArray(value) ? value.includes(segment) : value === segment,
  );

  if (!isRouteParam) {
    return [];
  }

  const segmentCount = route.path
    .split("?")[0]
    .split("/")
    .filter(Boolean).length;

  return Array.from({ length: segmentCount + 1 }, (_, index) =>
    index === segmentCount ? { label: segment } : undefined,
  );
});

const items = useBreadcrumbItems({
  rootSegment: "/",
  hideRoot: true,
  hideNonExisting: true,
  overrides: breadcrumbOverrides,
});

const hideBreadcrumb = computed(() => route.meta.hideBreadcrumb === true);

const showBack = computed(() => route.meta.back === true);

const mobileTitle = computed(() => {
  const breadcrumb = route.meta.breadcrumb as { title?: string } | undefined;

  return typeof breadcrumb?.title === "string" ? breadcrumb.title : "";
});

const goBack = () => {
  if (import.meta.client && window.history.state?.back) {
    router.back();

    return;
  }

  const override = route.meta.backTo as string | undefined;

  if (override) {
    navigateTo(override);

    return;
  }

  const segments = route.path.split("/").filter(Boolean);

  navigateTo(
    segments.length > 1
      ? `/${segments.slice(0, -1).join("/")}`
      : props.rootPath,
  );
};

const searchInputRef = ref<HTMLInputElement | null>(null);
const mobileSearchOpen = ref(false);

const isMac =
  typeof navigator !== "undefined" &&
  /mac|iphone|ipad|ipod/i.test(navigator.userAgent);

const schema = v.object({
  query: v.string(),
});

const state = reactive({
  query: "",
});

const focusSearch = (event: KeyboardEvent) => {
  const isTrigger =
    event.key.toLowerCase() === "f" &&
    (isMac ? event.metaKey : event.ctrlKey) &&
    !event.shiftKey;

  if (!isTrigger) {
    return;
  }

  event.preventDefault();
  searchInputRef.value?.focus();
};

const onLogout = () => {
  emit("logout");
};

const onSearchSubmit = () => {
  const query = state.query.trim();

  mobileSearchOpen.value = false;

  if (!query) {
    searchInputRef.value?.blur();
    return;
  }

  searchInputRef.value?.blur();
  navigateTo(`${props.searchPath}?q=${encodeURIComponent(query)}`);
};

async function openMobileSearch() {
  mobileSearchOpen.value = true;

  await nextTick();

  searchInputRef.value?.focus();
}

function onSearchEscape() {
  state.query = "";

  searchInputRef.value?.blur();
  mobileSearchOpen.value = false;
}

onMounted(() => {
  window.addEventListener("keydown", focusSearch);
});

onUnmounted(() => {
  window.removeEventListener("keydown", focusSearch);
});

/**
 * Slots that belong to this layout rather than to the sidebar's navigation
 * menu; everything else is forwarded so callers can pass item slots such as
 * the client's `cart-trailing` badge.
 */
const RESERVED_SLOTS = new Set([
  "default",
  "sidebar-brand",
  "notifications",
  "actions",
  "bottom",
  "mobile-nav",
]);
</script>

<template>
  <div class="min-h-screen bg-white transition-colors dark:bg-onyx-700">
    <UDashboardGroup>
      <UDashboardSidebar
        collapsible
        class="border-r-0"
        :ui="{
          root: 'bg-primary-600 border-r-0 dark:bg-onyx-700 dark:border-r dark:border-white/10',
          header: 'h-16 bg-primary-600 dark:bg-onyx-700',
          body: 'gap-1 bg-primary-600 px-2 py-2 dark:bg-onyx-700',
          footer:
            'border-t border-white/10 bg-primary-600 dark:bg-onyx-700 dark:border-white/10',
        }"
      >
        <template #header>
          <slot name="sidebar-brand" />
        </template>

        <template #default="{ collapsed }">
          <UNavigationMenu
            orientation="vertical"
            :items="navItems"
            highlight
            highlight-color="neutral"
            :collapsed="collapsed"
            class="w-full"
            :ui="{
              link: 'px-2 py-2 text-sm rounded-lg transition-colors text-white hover:bg-white/10 hover:text-white dark:text-gray-200 dark:hover:bg-white/5 dark:hover:text-white data-active:bg-white/10 data-active:text-white dark:data-active:bg-primary-500/10 dark:data-active:text-primary-400 data-active:font-medium',

              linkLeadingIcon:
                'size-5 text-white/70 group-hover:text-white group-data-active:text-white dark:text-gray-400 dark:group-hover:text-white dark:group-data-active:text-primary-400',
            }"
          >
            <template
              v-for="(_, name) in $slots"
              :key="name"
              #[name]="data"
            >
              <slot
                v-if="!RESERVED_SLOTS.has(name)"
                :name="name"
                v-bind="data ?? {}"
              />
            </template>
          </UNavigationMenu>
        </template>

        <template #footer="{ collapsed }">
          <button
            class="flex w-full cursor-pointer items-center gap-3 rounded-lg text-sm transition-colors"
            :class="
              collapsed
                ? 'justify-center py-2 text-white/60 hover:text-red-200 dark:text-gray-400 dark:hover:text-red-300'
                : 'px-0 py-2 text-white/60 hover:text-red-200 dark:text-gray-400 dark:hover:text-red-300'
            "
            @click="onLogout"
          >
            <UIcon
              name="heroicons:arrow-left-start-on-rectangle"
              class="size-5 shrink-0"
            />

            <Transition name="fade" mode="out-in">
              <span v-if="!collapsed">Sign out</span>
            </Transition>
          </button>
        </template>
      </UDashboardSidebar>

      <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header
          class="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-4 dark:border-white/5 dark:bg-onyx-700 sm:px-6 lg:px-8"
        >
          <div class="flex min-w-0 flex-1 items-center gap-1 sm:gap-3">
            <UButton
              v-if="!showBack"
              icon="heroicons:bars-3"
              color="neutral"
              variant="ghost"
              aria-label="Open menu"
              class="lg:hidden"
              @click="toggleMobileNav"
            />

            <UButton
              v-else
              icon="heroicons:chevron-left"
              color="neutral"
              variant="ghost"
              aria-label="Go back"
              class="lg:hidden"
              @click="goBack"
            />

            <p
              v-if="mobileTitle && !mobileSearchOpen"
              class="min-w-0 flex-1 truncate text-sm font-medium text-gray-900 sm:hidden dark:text-white"
            >
              {{ mobileTitle }}
            </p>

            <UForm
              :schema="schema"
              :state="state"
              :class="
                mobileSearchOpen ? 'w-full' : 'hidden w-full max-w-sm md:block'
              "
              @submit.prevent="onSearchSubmit"
            >
              <UFormField name="query">
                <UInput
                  :ref="
                    (element: any) =>
                      (searchInputRef =
                        element?.$el?.querySelector('input') ?? null)
                  "
                  v-model="state.query"
                  placeholder="Search"
                  icon="heroicons:magnifying-glass"
                  variant="none"
                  class="w-full"
                  :ui="{
                    base: 'rounded-lg bg-gray-50 px-3 py-2 text-sm ring-0 focus:ring-1 focus:ring-primary-500/30 dark:bg-white/5',
                    leadingIcon: 'text-gray-400 dark:text-white/30',
                  }"
                  @keydown.escape="onSearchEscape"
                >
                  <template #trailing>
                    <kbd
                      class="hidden items-center gap-0.5 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400 select-none dark:border-white/10 dark:bg-white/5 dark:text-white/30 sm:inline-flex"
                    >
                      {{ isMac ? "⌘" : "Ctrl" }}F
                    </kbd>
                  </template>
                </UInput>
              </UFormField>
            </UForm>
          </div>

          <div class="ml-3 flex shrink-0 items-center gap-1 sm:ml-6">
            <UButton
              :icon="
                mobileSearchOpen
                  ? 'heroicons:x-mark'
                  : 'heroicons:magnifying-glass'
              "
              color="neutral"
              variant="ghost"
              :aria-label="mobileSearchOpen ? 'Close search' : 'Search'"
              class="text-gray-500 hover:text-gray-900 md:hidden dark:text-white/50 dark:hover:text-white"
              @click="mobileSearchOpen ? onSearchEscape() : openMobileSearch()"
            />

            <!-- Default bell; override with the `notifications` slot. -->
            <slot name="notifications">
              <div class="relative">
                <UButton
                  icon="heroicons:bell"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  aria-label="Notifications"
                  :to="profilePath"
                  class="text-gray-500 hover:text-gray-900 dark:text-white/50 dark:hover:text-white"
                />

                <span
                  v-if="notificationsUnreadCount > 0"
                  class="pointer-events-none absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-500 px-1 text-[10px] font-medium leading-none text-white"
                >
                  {{
                    notificationsUnreadCount > 9
                      ? "9+"
                      : notificationsUnreadCount
                  }}
                </span>
              </div>
            </slot>

            <slot name="actions" />

            <UColorModeButton
              class="text-gray-500 hover:text-gray-900 dark:text-white/50 dark:hover:text-white"
            />

            <UAvatar
              :src="user.avatar?.src"
              :alt="user.avatar?.alt || user.name"
              :text="user.avatar?.text"
              :icon="user.avatar?.icon || 'i-lucide-user'"
              size="sm"
              class="squircle lg:hidden"
              @click="navigateTo(avatarPath)"
            />

            <div class="hidden items-center sm:flex">
              <div class="mx-1 h-6 w-px bg-gray-100 dark:bg-white/10 sm:mx-2" />

              <UDropdownMenu
                :items="[
                  [
                    {
                      label: user.name || 'User',
                      type: 'label',
                    },
                  ],
                  [
                    {
                      label: 'Profile',
                      icon: 'heroicons:user',
                      to: profilePath,
                    },
                    {
                      label: 'Settings',
                      icon: 'heroicons:cog-6-tooth',
                      to: settingsPath,
                    },
                  ],
                  [
                    {
                      label: 'Sign out',
                      icon: 'heroicons:arrow-left-start-on-rectangle',
                      color: 'error',
                      onSelect: onLogout,
                    },
                  ],
                ]"
              >
                <UButton
                  color="neutral"
                  variant="ghost"
                  class="rounded-lg px-1.5 py-1.5"
                >
                  <UAvatar
                    :src="user.avatar?.src"
                    :alt="user.avatar?.alt || user.name"
                    :text="user.avatar?.text"
                    :icon="user.avatar?.icon || 'i-lucide-user'"
                    size="sm"
                    class="squircle"
                  />

                  <UIcon
                    name="heroicons:chevron-down"
                    class="hidden size-5 text-gray-400 dark:text-white/30 sm:block"
                  />
                </UButton>
              </UDropdownMenu>
            </div>
          </div>
        </header>

        <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-onyx-900">
          <div
            v-if="!hideBreadcrumb"
            class="hidden px-4 pt-5 sm:block sm:px-6 lg:px-8"
          >
            <UBreadcrumb :items="items">
              <template #separator>
                <span class="mx-2 text-gray-300 dark:text-white/20">/</span>
              </template>
            </UBreadcrumb>
          </div>

          <div
            class="px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
            :class="contentClass"
          >
            <slot v-if="isOnline" />

            <slot v-else name="offline">
              <EmptyState
                icon="heroicons:signal-slash"
                title="You're offline"
                description="No connection to the server. This clears itself as soon as you're back online."
                :ui="{
                  icon: 'text-red-500',
                  iconWrapper: 'bg-red-50/10',
                }"
              />
            </slot>
          </div>
        </main>
      </div>
    </UDashboardGroup>

    <slot name="mobile-nav" />
    <slot name="bottom" />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
