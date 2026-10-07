<script setup lang="ts">
import { ref } from "vue";
import SearchPage from "@opeolluwa/ryder/pages/Search.vue";
import type { SearchSection } from "@opeolluwa/ryder/types";

definePageMeta({
  layout: "dashboard",
  breadcrumb: { title: "Search" },
  back: true,
});

const route = useRoute();
const q = computed(() => String(route.query.q ?? ""));

const loading = ref(false);

const FIXTURE: SearchSection[] = [
  {
    key: "orders",
    title: "Orders",
    count: 0,
    viewAllTo: "/orders",
    items: [
      {
        title: "Order #A1B2C3",
        subtitle: "Ada Lovelace",
        badge: "paid",
        to: "/orders/1",
      },
      {
        title: "Order #D4E5F6",
        subtitle: "Grace Hopper",
        to: "/orders/2",
      },
    ],
  },
  {
    key: "customers",
    title: "Customers",
    count: 0,
    viewAllTo: "/customers",
    items: [
      {
        title: "Ada Lovelace",
        subtitle: "ada@example.com",
        to: "/customers/1",
      },
    ],
  },
];

// The app owns the matching; the page only renders what it is handed.
const sections = computed<SearchSection[]>(() => {
  const needle = q.value.trim().toLowerCase();
  if (!needle) return [];

  return FIXTURE.map((section) => {
    const items = section.items.filter((item) =>
      `${item.title} ${item.subtitle ?? ""}`.toLowerCase().includes(needle),
    );

    return { ...section, count: items.length, items };
  }).filter((section) => section.items.length > 0);
});
</script>

<template>
  <SearchPage :sections="sections" :loading="loading" />
</template>
