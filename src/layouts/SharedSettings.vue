<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "#imports";
import UIcon from "@nuxt/ui/components/Icon.vue";
import { settingsTabForPath, type SettingsTab } from "../utils/settingsTabs";

const props = withDefaults(
  defineProps<{
    /** The tab list — each app supplies its own from its `~/data/settings-tabs`. */
    tabs?: SettingsTab[];
    /** Path whose default tab is active when nothing deeper matches. */
    basePath?: string;
    /** Tab key shown at `basePath` itself. */
    defaultTabKey?: string;
    /** Shell layout wrapped around the tabs (client: `account`, console: `dashboard`). */
    wrapperLayout?: string;
    /** Console-only eyebrow above the tab list. */
    heading?: string;
  }>(),
  {
    tabs: () => [],
    basePath: "/settings",
    defaultTabKey: "profile",
    wrapperLayout: "dashboard",
    heading: "Settings",
  },
);

const route = useRoute();

const activeKey = computed<string | null>(() => {
  if (route.path === props.basePath) {
    return props.defaultTabKey;
  }

  return settingsTabForPath(props.tabs, route.path)?.key ?? null;
});
</script>

<template>
  <NuxtLayout :name="wrapperLayout">
    <div class="flex items-start gap-6">
      <aside class="hidden w-52 shrink-0 lg:block">
        <div
          class="sticky top-0 rounded-2xl border border-gray-100 bg-white p-2 dark:border-white/5 dark:bg-onyx-600"
        >
          <p
            class="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-white/25"
          >
            {{ heading }}
          </p>

          <nav class="space-y-0.5">
            <NuxtLink
              v-for="tab in tabs"
              :key="tab.key"
              :to="tab.to"
              class="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all"
              :class="
                activeKey === tab.key
                  ? 'bg-accent/10 dark:bg-accent/15 text-accent font-medium'
                  : 'text-gray-500 dark:text-white/40 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-white'
              "
            >
              <UIcon :name="tab.icon" class="size-4 shrink-0" />

              <div class="min-w-0">
                <p class="leading-tight">{{ tab.label }}</p>

                <p
                  class="mt-0.5 truncate text-[10px] leading-tight"
                  :class="
                    activeKey === tab.key
                      ? 'text-accent/60'
                      : 'text-gray-400 dark:text-white/25'
                  "
                >
                  {{ tab.desc }}
                </p>
              </div>
            </NuxtLink>
          </nav>
        </div>
      </aside>

      <div class="min-w-0 max-w-xl flex-1">
        <slot />
      </div>
    </div>
  </NuxtLayout>
</template>
