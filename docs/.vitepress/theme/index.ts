import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Demo from "./components/Demo.vue";
import NuxtLink from "./shims/NuxtLink.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("NuxtLink", NuxtLink);
    app.component("Demo", Demo);
  },
} satisfies Theme;
