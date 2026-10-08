/**
 * `#imports` shim for the docs build.
 *
 * The kit's components import Nuxt's runtime barrel (`#imports`). VitePress
 * resolves that specifier here (see `resolve.alias` in `.vitepress/config.ts`)
 * to Nuxt UI's non-Nuxt stub plus the few extras the kit needs.
 */
export * from "@nuxt/ui/runtime/vue/stubs/vue-router.js";

import { nextTick } from "vue";

/** Nuxt's "run after hydration" hook, reduced to a next-tick callback. */
export function onNuxtReady(cb?: () => unknown): void {
  if (typeof cb !== "function") return;
  nextTick(() => cb());
}

/** Router helper used by `BottomNav` for non-link tabs. */
export function navigateTo(to: string): void {
  if (typeof window === "undefined") return;
  if (/^[a-z][a-z0-9+.-]*:/i.test(to)) {
    window.location.href = to;
    return;
  }
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  const path = to.startsWith("/") ? to : `/${to}`;
  window.location.href = `${base}${path}`;
}
