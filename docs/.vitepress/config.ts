import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // Served under the GitHub Pages project-site subpath (opeolluwa.github.io/ryder)
  base: "/ryder/",
  title: "@opeolluwa/ryder",
  description: "Shared Nuxt 4 UI kit: components, layouts, composables, utils and a $api plugin extracted from duplicated app code and published as one package. Consumer apps keep their own thin adapters; the kit never imports app code.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guide',
        link: '/guide/getting-started',
        activeMatch: '/guide/',
      },
      { text: 'GitHub', link: 'https://github.com/opeolluwa/ryder' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Components', link: '/guide/components' },
          { text: 'Layouts', link: '/guide/layouts' },
          { text: 'Search page', link: '/guide/pages' },
          { text: 'Composables, utils & types', link: '/guide/composables-utils' },
          { text: 'Contributing', link: '/guide/development' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/opeolluwa/ryder' },
    ],
  },
})