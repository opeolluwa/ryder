<script setup lang="ts">
import { computed } from "vue";
import { navigateTo, useColorMode, useRoute } from "#imports";
import { kApp, kTabbar, kTabbarLink } from "konsta/vue";
import UIcon from "@nuxt/ui/components/Icon.vue";
import { usePlatform } from "../../composables/usePlatform";

export interface BottomNavItem {
  label: string;
  /** Route to navigate to. Omit when `action` is set. */
  to?: string;
  icon: string;
  /** Swap in for `icon` while the item is active (filled variants, e.g.). */
  activeIcon?: string;
  /**
   * Marks a non-navigation item — a cart drawer, a sheet. The item is emitted
   * through `select` for the app to handle instead of being navigated to.
   */
  action?: string;
}

withDefaults(
  defineProps<{
    /** Tab entries; the app owns the list (labels, icons, targets). */
    items?: BottomNavItem[];
    /** Classes on the Konsta tabbar background. */
    bgClass?: string;
  }>(),
  {
    items: () => [],
    bgClass: "bg-white dark:bg-onyx-600",
  },
);

const emit = defineEmits<{
  /** Fired for an item that has an `action` instead of a `to`. */
  select: [item: BottomNavItem];
}>();

const route = useRoute();
const colorMode = useColorMode();
const { framework7Theme } = usePlatform();

const isDark = computed(() => colorMode.value === "dark");

function isActive(item: BottomNavItem): boolean {
  if (item.action || !item.to) return false;

  if (item.to === "/") return route.path === "/";

  return route.path === item.to || route.path.startsWith(`${item.to}/`);
}

function onSelect(item: BottomNavItem) {
  if (item.action) {
    emit("select", item);

    return;
  }

  if (item.to) navigateTo(item.to);
}
</script>

<template>
  <div class="fixed inset-x-0 bottom-0 z-40 lg:hidden">
    <kApp :theme="framework7Theme" :dark="isDark" class="min-h-0!">
      <kTabbar
        labels
        icons
        outline
        :bg-class="bgClass"
        class="[&_.k-link]:w-auto [&_.k-link]:min-w-0 [&_.k-link]:flex-1 [&_.k-link>span]:gap-0 [&_.k-tabbar-link-icon]:h-7"
      >
        <kTabbarLink
          v-for="item in items"
          :key="item.label"
          :active="isActive(item)"
          :colors="
            isActive(item)
              ? {
                textActiveIos: 'text-primary-500 dark:text-primary-400',
                textActiveMaterial: 'text-primary-500 dark:text-primary-400',
              }
              : {}
          "
          @click="onSelect(item)"
        >
          <template #label>
            {{ item.label }}
          </template>

          <template #icon>
            <span class="relative inline-flex">
              <UIcon
                :name="isActive(item) ? item.activeIcon || item.icon : item.icon"
                class="size-5"
              />

              <!-- Per-item badge, e.g. the cart count on an `action` item. -->
              <slot name="badge" :item="item" :active="isActive(item)" />
            </span>
          </template>
        </kTabbarLink>
      </kTabbar>
    </kApp>
  </div>
</template>
