<script setup lang="ts">
import { ref } from "vue";
import { formatPrice } from "@opeolluwa/ryder/utils";

definePageMeta({
  breadcrumb: { title: "Playground" },
});

const query = ref("");
const password = ref("");
const ripeness = ref<string>();
const term = ref<string>();
const terms = ref<string[]>(["ripe", "green"]);
const dialogOpen = ref(false);
const sheetOpen = ref(false);

function onCreateTerm(value: string) {
  terms.value = [...terms.value, value];
  term.value = value;
}

const cartCount = ref(2);
const lastBottomAction = ref("");

const bottomNavItems = [
  { label: "Home", to: "/", icon: "heroicons:home" },
  { label: "Search", to: "/search", icon: "heroicons:magnifying-glass" },
  { label: "Complaints", to: "/complaints", icon: "heroicons:chat-bubble-left" },
  { label: "Settings", to: "/settings", icon: "heroicons:cog-6-tooth" },
  { label: "Cart", icon: "heroicons:squares-2x2", action: "toggle-cart" },
];

function onBottomNavSelect(item: { label: string }) {
  lastBottomAction.value = `${item.label} → action`;
}
</script>

<template>
  <div class="space-y-10">
    <RyderPageHeader
      title="Ryder components"
      subtitle="Every component in @opeolluwa/ryder, rendered from one page."
      cta-text="Create dialog"
      @cta="dialogOpen = true"
    />

    <section class="space-y-3">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-white/70">
        Button
      </h3>

      <div class="flex flex-wrap items-center gap-3">
        <RyderButton>primary sm</RyderButton>
        <RyderButton size="md" variant="outline">outline md</RyderButton>
        <RyderButton variant="ghost" color="error">ghost error</RyderButton>
        <RyderButton variant="soft" color="success">soft success</RyderButton>
        <RyderButton loading>loading</RyderButton>
        <RyderButton disabled>disabled</RyderButton>
      </div>
    </section>

    <section class="grid max-w-xl gap-4">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-white/70">
        Input &amp; Select
      </h3>

      <RyderInput
        v-model="query"
        label="Email"
        name="email"
        placeholder="you@example.com"
        hint="We never share it."
      />

      <RyderInput
        v-model="password"
        label="Password"
        name="password"
        type="password"
      />

      <RyderInput label="Disabled" name="disabled" disabled placeholder="Read only" />

      <RyderSelect
        v-model="ripeness"
        label="Ripeness"
        name="ripeness"
        placeholder="Pick one"
        :items="['ripe', 'green', 'rotten']"
      />

      <RyderSelect
        v-model="term"
        label="Tag (creatable)"
        name="term"
        placeholder="Type to create"
        preserve-case
        creatable
        :items="terms"
        @create="onCreateTerm"
      />
    </section>

    <section class="space-y-3">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-white/70">
        Feedback &amp; chrome
      </h3>

      <RyderEmptyState
        compact
        icon="heroicons:magnifying-glass"
        title="Nothing matched"
        description="Adjust the filters and try again."
      />
    </section>

    <section class="max-w-xl space-y-3">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-white/70">
        Card
      </h3>

      <RyderCard title="Order summary">
        <p class="mt-2 text-sm text-gray-500 dark:text-white/50">
          Body content fills the default slot; the header carries the title.
        </p>
        <template #trailing>
          <RyderButton size="xs" variant="soft">Edit</RyderButton>
        </template>
      </RyderCard>

      <RyderCard>
        <template #header>
          <p class="text-sm font-semibold text-gray-900 dark:text-white">
            Custom header
          </p>
        </template>
        <p class="mt-2 text-sm text-gray-500 dark:text-white/50">
          The header slot replaces the title entirely.
        </p>
      </RyderCard>
    </section>

    <section class="space-y-3">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-white/70">
        Loader, fab &amp; utils
      </h3>

      <p class="text-sm text-gray-500 dark:text-white/50">
        formatPrice(1234567, "NGN") → {{ formatPrice(1234567, "NGN") }}
      </p>

      <div class="flex items-center gap-6">
        <RyderPageLoader class="h-16" />
        <RyderFab icon="heroicons:plus" />
      </div>
    </section>

    <section class="space-y-3">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-white/70">
        Overlays
      </h3>

      <div class="flex flex-wrap gap-3">
        <RyderButton variant="soft" @click="dialogOpen = true">
          Open dialog
        </RyderButton>
        <RyderButton variant="soft" @click="sheetOpen = true">
          Open bottom sheet
        </RyderButton>
      </div>

      <RyderCreateDialog
        v-model:open="dialogOpen"
        title="Create thing"
        description="The dialog on mobile collapses into a bottom sheet."
        submit-label="Create"
        @submit="dialogOpen = false"
        @cancel="dialogOpen = false"
      >
        <RyderInput label="Name" name="name" placeholder="Name" />
      </RyderCreateDialog>

      <RyderBottomSheet
        v-model:open="sheetOpen"
        title="Bottom sheet"
        description="Konsta sheet on mobile."
        submit-label="Confirm"
        @submit="sheetOpen = false"
        @cancel="sheetOpen = false"
      >
        <p class="text-sm text-gray-500 dark:text-white/50">Sheet body.</p>
      </RyderBottomSheet>
    </section>

    <section class="space-y-3">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-white/70">
        Bottom nav
      </h3>

      <p class="text-xs text-gray-400 dark:text-white/30">
        Mobile-only — the bar is fixed to the viewport bottom and hidden from
        <code class="font-mono">lg</code> up. Last action:
        <code class="font-mono">{{ lastBottomAction || "—" }}</code>
      </p>
    </section>

    <RyderBottomNav :items="bottomNavItems" @select="onBottomNavSelect">
      <template #badge="{ item }">
        <span
          v-if="item.action === 'toggle-cart' && cartCount > 0"
          class="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white"
        >
          {{ cartCount }}
        </span>
      </template>
    </RyderBottomNav>
  </div>
</template>
