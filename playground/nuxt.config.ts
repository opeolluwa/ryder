import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["axios"],
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL ||
        "http://localhost:4000",
    },
  },
  build: {
    transpile: ["konsta"],
  },
  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-seo-utils",
    fileURLToPath(new URL("../src/module.mjs", import.meta.url)),
  ],
});
