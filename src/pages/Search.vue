<script setup lang="ts">
import { computed, getCurrentInstance } from "vue";
import { navigateTo, useRoute, useRouter } from "#imports";
import UBadge from "@nuxt/ui/components/Badge.vue";
import UButton from "@nuxt/ui/components/Button.vue";
import EmptyState from "../components/feedback/EmptyState.vue";
import PageLoader from "../components/feedback/PageLoader.vue";
import type { SearchSection } from "../types/search";
import { highlight } from "../utils/search";

const props = withDefaults(
  defineProps<{
    /** Grouped matches, built by the app from its own queries. */
    sections?: SearchSection[];
    /** Whether the first pass is still in flight. */
    loading?: boolean;
    /** Term to match; defaults to the route's `?q=`. */
    query?: string;
    /** Shown before a term is entered. */
    noQueryMessage?: string;
    emptyIcon?: string;
    emptyTitle?: string;
    emptyDescription?: string;
    emptyActionLabel?: string;
  }>(),
  {
    sections: () => [],
    loading: false,
    query: undefined,
    noQueryMessage:
      "Use the search bar above to look across orders, customers and records.",
    emptyIcon: "heroicons:magnifying-glass",
    emptyTitle: "No result found",
    emptyDescription: "Try a different search term.",
    emptyActionLabel: "Go back",
  },
);

const emit = defineEmits<{
  back: [];
}>();

const route = useRoute();
const router = useRouter();

const q = computed(() => (props.query ?? String(route.query.q ?? "")).trim());

const hasQuery = computed(() => q.value.length > 0);

// Only drive the back navigation ourselves when the host did not wire `@back`.
const instance = getCurrentInstance();
const handlesBack = Boolean(instance?.vnode.props?.onBack);

function goBack() {
  emit("back");

  if (handlesBack) return;

  if (import.meta.client && window.history.state?.back) {
    router.back();

    return;
  }

  navigateTo("/");
}
</script>

<template>
  <div class="space-y-6">
    <p v-if="!hasQuery" class="text-sm text-muted">
      {{ noQueryMessage }}
    </p>

    <PageLoader v-else-if="loading" />

    <EmptyState
      v-else-if="sections.length === 0"
      :icon="emptyIcon"
      :title="emptyTitle"
      :description="emptyDescription"
      :action-label="emptyActionLabel"
      @action="goBack"
    />

    <div v-else class="space-y-4">
      <section
        v-for="section in sections"
        :key="section.key"
        class="overflow-hidden rounded-2xl border border-gray-200/80 bg-white dark:border-white/10 dark:bg-onyx-700"
      >
        <div
          class="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-white/5"
        >
          <p
            class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
          >
            {{ section.title }}
            <span class="tabular-nums text-gray-400 dark:text-gray-500">
              {{ section.count }}
            </span>
          </p>

          <UButton
            v-if="section.viewAllTo"
            color="neutral"
            variant="link"
            size="xs"
            :aria-label="`View all ${section.title}`"
            @click="navigateTo(section.viewAllTo)"
          >
            View all
          </UButton>
        </div>

        <ul>
          <li
            v-for="(item, index) in section.items"
            :key="`${section.key}-${index}`"
          >
            <button
              type="button"
              class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
              @click="navigateTo(item.to)"
            >
              <div class="min-w-0 flex-1">
                <!-- eslint-disable-next-line vue/no-v-html -- highlight() escapes before wrapping matches -->
                <p class="truncate text-sm font-medium text-gray-900 dark:text-white" v-html="highlight(item.title, q)" />

                <p v-if="item.subtitle" class="truncate text-xs text-muted">
                  {{ item.subtitle }}
                </p>
              </div>

              <UBadge
                v-if="item.badge"
                color="neutral"
                variant="subtle"
                size="sm"
                class="shrink-0"
              >
                {{ item.badge }}
              </UBadge>
            </button>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
