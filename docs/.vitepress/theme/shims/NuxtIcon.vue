<script setup lang="ts">
import { Icon as Iconify } from "@iconify/vue";
import { COLLECTION_PREFIXES } from "./icons";
import "./icons";

const props = defineProps<{
  name: string;
  mode?: string | null;
  size?: number | string;
  customize?: unknown;
}>();

/** Maps Nuxt UI / UnoCSS-style names (`i-lucide-x`) onto iconify names (`lucide:x`). */
function resolveName(name: string): string {
  if (!name) return name;
  const bare = name.startsWith("i-") ? name.slice(2) : name;
  if (!bare.includes(":")) {
    for (const prefix of COLLECTION_PREFIXES) {
      if (bare.startsWith(`${prefix}-`)) {
        return `${prefix}:${bare.slice(prefix.length + 1)}`;
      }
    }
  }
  return bare;
}
</script>

<template>
  <Iconify
    :icon="resolveName(props.name)"
    :width="typeof props.size === 'number' ? props.size : undefined"
    :height="typeof props.size === 'number' ? props.size : undefined"
  />
</template>
