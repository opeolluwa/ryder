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
  </div>
</template>
