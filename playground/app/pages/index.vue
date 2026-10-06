<script setup lang="ts">
import { ref } from "vue";
import { formatPrice } from "@weangel/shared/utils";

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
</script>

<template>
  <div class="space-y-10">
    <SharedPageHeader
      title="Shared components"
      subtitle="Every component in @weangel/shared, rendered from one page."
      cta-text="Create dialog"
      @cta="dialogOpen = true"
    />

    <section class="space-y-3">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-white/70">
        Button
      </h3>

      <div class="flex flex-wrap items-center gap-3">
        <SharedButton>primary sm</SharedButton>
        <SharedButton size="md" variant="outline">outline md</SharedButton>
        <SharedButton variant="ghost" color="error">ghost error</SharedButton>
        <SharedButton variant="soft" color="success">soft success</SharedButton>
        <SharedButton loading>loading</SharedButton>
        <SharedButton disabled>disabled</SharedButton>
      </div>
    </section>

    <section class="grid max-w-xl gap-4">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-white/70">
        Input &amp; Select
      </h3>

      <SharedInput
        v-model="query"
        label="Email"
        name="email"
        placeholder="you@example.com"
        hint="We never share it."
      />

      <SharedInput
        v-model="password"
        label="Password"
        name="password"
        type="password"
      />

      <SharedInput label="Disabled" name="disabled" disabled placeholder="Read only" />

      <SharedSelect
        v-model="ripeness"
        label="Ripeness"
        name="ripeness"
        placeholder="Pick one"
        :items="['ripe', 'green', 'rotten']"
      />

      <SharedSelect
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

      <SharedEmptyState
        compact
        icon="heroicons:magnifying-glass"
        title="Nothing matched"
        description="Adjust the filters and try again."
      />
    </section>

    <section class="space-y-3">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-white/70">
        Loader, fab &amp; utils
      </h3>

      <p class="text-sm text-gray-500 dark:text-white/50">
        formatPrice(1234567) → {{ formatPrice(1234567) }}
      </p>

      <div class="flex items-center gap-6">
        <SharedPageLoader class="h-16" />
        <SharedFab icon="heroicons:plus" />
      </div>
    </section>

    <section class="space-y-3">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-white/70">
        Overlays
      </h3>

      <div class="flex flex-wrap gap-3">
        <SharedButton variant="soft" @click="dialogOpen = true">
          Open dialog
        </SharedButton>
        <SharedButton variant="soft" @click="sheetOpen = true">
          Open bottom sheet
        </SharedButton>
      </div>

      <SharedCreateDialog
        v-model:open="dialogOpen"
        title="Create thing"
        description="The dialog on mobile collapses into a bottom sheet."
        submit-label="Create"
        @submit="dialogOpen = false"
        @cancel="dialogOpen = false"
      >
        <SharedInput label="Name" name="name" placeholder="Name" />
      </SharedCreateDialog>

      <SharedBottomSheet
        v-model:open="sheetOpen"
        title="Bottom sheet"
        description="Konsta sheet on mobile."
        submit-label="Confirm"
        @submit="sheetOpen = false"
        @cancel="sheetOpen = false"
      >
        <p class="text-sm text-gray-500 dark:text-white/50">Sheet body.</p>
      </SharedBottomSheet>
    </section>
  </div>
</template>
