import "vue"

declare module "vue" {
  export interface GlobalComponents {
    /** Provided by the host Nuxt app; shared components reference it without importing. */
    NuxtLink: (typeof import("vue"))["defineComponent"]
  }
}

export {}
