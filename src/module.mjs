import { existsSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { addComponentsDir, addTemplate, defineNuxtModule, useNuxt } from "@nuxt/kit"

/**
 * @typedef {Object} SharedModuleOptions
 * @property {boolean} [components] Register shared components under a prefix. Default: true
 * @property {boolean} [layouts] Register shared layouts. Default: true
 * @property {string} [prefix] Prefix for registered components. Default: "Shared"
 */

const srcDir = fileURLToPath(new URL(".", import.meta.url))

const LAYOUT_NAMES = ["SharedDefault", "SharedAuth", "SharedShell", "SharedSettings"]

export default defineNuxtModule({
  meta: {
    name: "@weangel/shared",
    configKey: "shared",
    compatibility: { nuxt: ">=4.1.0" },
  },
  defaults: {
    components: true,
    layouts: true,
    prefix: "Shared",
  },
  /** @param {SharedModuleOptions} options */
  setup(options) {
    useNuxt().options.build.transpile.push(srcDir)

    if (options.components !== false) {
      addComponentsDir({
        path: join(srcDir, "components"),
        prefix: options.prefix ?? "Shared",
        pathPrefix: false,
        global: false,
      })
    }

    if (options.layouts !== false) {
      for (const name of LAYOUT_NAMES) {
        const fullPath = join(srcDir, "layouts", `${name}.vue`)
        if (!existsSync(fullPath)) continue

        // A re-export instead of `addLayout`'s copy: the real SFC stays at its
        // own path, so its relative imports (`../utils/…`, `../components/…`)
        // resolve against `src/` rather than the generated file in `.nuxt/`.
        addTemplate({
          filename: `layouts/${name}.vue`,
          getContents: () =>
            `<script>\nimport Layout from ${JSON.stringify(fullPath)};\nexport default Layout;\n</script>\n`,
        })

        useNuxt().hook("app:templates", (app) => {
          if (name in app.layouts) return

          app.layouts[name] = {
            file: join("#build", "layouts", `${name}.vue`),
            name,
          }
        })
      }
    }
  },
})
