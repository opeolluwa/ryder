import globals from "globals"
import js from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"

export default tseslint.config(
  { ignores: [".nuxt/**", ".output/**", "playground/.nuxt/**", "playground/.output/**", "node_modules/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    // Package code runs in both the browser and the Nitro server, and the
    // scripts build it with `import.meta`, so both global sets apply.
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    // Nuxt auto-imports (`definePageMeta`, `useRoute`, `computed`, …) are
    // module-level so `no-undef` is wrong for app-facing SFCs; TypeScript owns
    // that check in the consuming apps.
    rules: {
      "no-undef": "off",
    },
  },
  {
    rules: {
      "vue/multi-word-component-names": "off",
      // Packaged markup came from the source apps verbatim; reformatting
      // attributes/self-closing tags is noise, not correctness.
      "vue/max-attributes-per-line": "off",
      "vue/html-self-closing": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/multiline-html-element-content-newline": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
)