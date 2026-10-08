import { fileURLToPath } from "node:url";
import nuxtUI from "@nuxt/ui/vite";
import type { Plugin } from "vite";
import { defineConfig } from "vitepress";

const fromHere = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const IMPORTS_SHIM = fromHere("./theme/shims/imports.ts");
const ICON_SHIM = fromHere("./theme/shims/NuxtIcon.vue");
const RYDER_SRC = fromHere("../../src/");

/** Wins the `#imports` resolve race against Nuxt UI's own stub. */
function ryderImportsShim(): Plugin {
  return {
    name: "ryder:docs#imports",
    enforce: "pre",
    resolveId(id) {
      if (id === "#imports") return IMPORTS_SHIM;
    },
  };
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // Served under the GitHub Pages project-site subpath (opeolluwa.github.io/ryder)
  base: "/ryder/",
  title: "@opeolluwa/ryder",
  description:
    "Shared Nuxt 4 UI kit: components, layouts, composables, utils and a $api plugin extracted from duplicated app code and published as one package. Consumer apps keep their own thin adapters; the kit never imports app code.",
  cleanUrls: true,

  vite: {
    // Nuxt UI resolves virtual `#build/*` modules through its own plugin, so
    // it must go through Vite's pipeline instead of being externalized in SSR.
    ssr: {
      noExternal: ["@nuxt/ui", "@nuxt/icon", "konsta"],
    },
    plugins: [
      ryderImportsShim(),
      nuxtUI({ dts: false }),
    ],
    resolve: {
      alias: [
        { find: /^#imports$/, replacement: IMPORTS_SHIM },
        {
          find: /^@nuxt\/icon\/runtime\/components\/index\.js$/,
          replacement: ICON_SHIM,
        },
        { find: /^@opeolluwa\/ryder\//, replacement: RYDER_SRC },
      ],
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Guide",
        link: "/guide/getting-started",
        activeMatch: "/guide/",
      },
      {
        text: "Components",
        link: "/components/",
        activeMatch: "/components/",
      },
      { text: "GitHub", link: "https://github.com/opeolluwa/ryder" },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting started", link: "/guide/getting-started" },
          { text: "Layouts", link: "/guide/layouts" },
          { text: "Search page", link: "/guide/pages" },
          {
            text: "Composables, utils & types",
            link: "/guide/composables-utils",
          },
          { text: "Contributing", link: "/guide/development" },
        ],
      },
      {
        text: "Components",
        items: [{ text: "Overview", link: "/components/" }],
      },
      {
        text: "Primitives",
        collapsed: false,
        items: [
          { text: "Button", link: "/components/primitives/Button" },
          { text: "Card", link: "/components/primitives/Card" },
          { text: "Input", link: "/components/primitives/Input" },
          { text: "Logo", link: "/components/primitives/Logo" },
          { text: "Select", link: "/components/primitives/Select" },
          { text: "Textarea", link: "/components/primitives/Textarea" },
        ],
      },
      {
        text: "Feedback",
        collapsed: false,
        items: [
          { text: "BottomSheet", link: "/components/feedback/BottomSheet" },
          { text: "CreateDialog", link: "/components/feedback/CreateDialog" },
          { text: "Dialog", link: "/components/feedback/Dialog" },
          { text: "EmptyState", link: "/components/feedback/EmptyState" },
          { text: "PageHeader", link: "/components/feedback/PageHeader" },
          { text: "PageLoader", link: "/components/feedback/PageLoader" },
        ],
      },
      {
        text: "Navigation",
        collapsed: false,
        items: [
          { text: "BottomNav", link: "/components/navigation/BottomNav" },
          { text: "Fab", link: "/components/navigation/Fab" },
          { text: "SideNav", link: "/components/navigation/SideNav" },
        ],
      },
      {
        text: "Typography",
        collapsed: false,
        items: [
          { text: "LeadingText", link: "/components/typography/LeadingText" },
          { text: "SubText", link: "/components/typography/SubText" },
        ],
      },
      {
        text: "Auth",
        collapsed: false,
        items: [{ text: "AuthHeader", link: "/components/auth/AuthHeader" }],
      },
      {
        text: "Complaints",
        collapsed: true,
        items: [
          {
            text: "ComplaintList",
            link: "/components/complaints/ComplaintList",
          },
          {
            text: "ComplaintListItem",
            link: "/components/complaints/ComplaintListItem",
          },
          {
            text: "ComplaintHeader",
            link: "/components/complaints/ComplaintHeader",
          },
          {
            text: "ComplaintThread",
            link: "/components/complaints/ComplaintThread",
          },
          {
            text: "ComplaintPreview",
            link: "/components/complaints/ComplaintPreview",
          },
          { text: "ComplaintForm", link: "/components/complaints/ComplaintForm" },
          {
            text: "ComplaintCreateForm",
            link: "/components/complaints/ComplaintCreateForm",
          },
          {
            text: "ComplaintCreateDialog",
            link: "/components/complaints/ComplaintCreateDialog",
          },
          {
            text: "ComplaintDialog",
            link: "/components/complaints/ComplaintDialog",
          },
        ],
      },
      {
        text: "Orders",
        collapsed: true,
        items: [
          { text: "OrderList", link: "/components/orders/OrderList" },
          { text: "OrderListItem", link: "/components/orders/OrderListItem" },
          { text: "OrderPreview", link: "/components/orders/OrderPreview" },
          {
            text: "OrderStatusBadge",
            link: "/components/orders/OrderStatusBadge",
          },
          {
            text: "CancelOrderDialog",
            link: "/components/orders/CancelOrderDialog",
          },
        ],
      },
      {
        text: "Notes",
        collapsed: true,
        items: [
          { text: "Editor", link: "/components/notes/Editor" },
          { text: "EditorToolBar", link: "/components/notes/EditorToolBar" },
          {
            text: "PullToRefresh",
            link: "/components/notes/PullToRefresh",
          },
          { text: "ToolBarWrapper", link: "/components/notes/ToolBarWrapper" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/opeolluwa/ryder" },
    ],
  },
});
