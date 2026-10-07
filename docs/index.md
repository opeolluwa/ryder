---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "@opeolluwa/ryder"
  text: ""
  tagline: Consumer apps keep their own thin adapters; the kit never imports app code.
  actions:
    - theme: brand
      text: Getting started
      link: /guide/getting-started
    - theme: alt
      text: Components
      link: /guide/components

features:
  - icon: 🧱
    title: Components & layouts
    details: 33 components under the Ryder* prefix plus RyderDefault, RyderAuth, RyderShell and RyderSettings — every surface app-aware through props/slots.
  - icon: 🔌
    title: Composables & types
    details: Auth composables over an AuthSession adapter, shared utils, and domain types that mirror the backend's OpenAPI document.
  - icon: 🌐
    title: $api plugin
    details: createApiPlugin ships hardened defaults — refresh-on-expiry, status-carrying ApiError rejections and guarded 401 session teardown.
---