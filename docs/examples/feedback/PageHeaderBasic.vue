<script setup lang="ts">
import { ref } from "vue";
import PageHeader from "../../../src/components/feedback/PageHeader.vue";

const ctaCount = ref(0);
</script>

<template>
  <div class="space-y-3">
    <PageHeader
      title="Complaints"
      subtitle="Everything your customers reported, newest first."
      cta-text="New complaint"
      @cta="ctaCount += 1"
    />

    <p class="text-xs text-gray-400 dark:text-white/30">
      The header is desktop-only — it is invisible below 1024px.
      <code class="font-mono">cta</code> emitted {{ ctaCount }} time(s).
    </p>
  </div>
</template>
