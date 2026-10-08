<script setup lang="ts">
import Basic from "../../examples/navigation/SideNavBasic.vue";
</script>

# SideNav

The mobile menu: a left `USlideover` holding the user header, nav items, a
light/dark toggle and a sign-out row. Its open state lives in
`useMobileNav()` rather than in a prop, so the app's hamburger and this drawer
stay in sync.

```vue
<script setup lang="ts">
import RyderSideNav from "@opeolluwa/ryder/components/navigation/SideNav.vue"
</script>

<template>
  <RyderSideNav :items="items" :user="user" @logout="logout" />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/navigation/SideNavBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `items` | `SideNavItem[]` | `[]` | Menu entries: `{ to?, label, icon, badge?, action? }`. |
| `user` | `SideNavUser` | `{}` | Drawer header identity: `{ name?, description?, avatar?: { src?, text?, alt?, icon? } }`. Missing `name` falls back to `"User"`. |
| `rootPath` | `string` | `"/"` | Path treated as "always active" when it is the current route. |

`SideNavItem` fields:

| Field | Type | Description |
| ----- | ---- | ----------- |
| `to` | `string?` | Navigation target; omit for an `action` item. |
| `label` | `string` | Entry label (and fallback key). |
| `icon` | `string` | Icon name. |
| `badge` | `string \| number \| null?` | Trailing count pill (unread count, cart items, …). |
| `action` | `string?` | Non-navigation entry — closes the drawer and emits `action` with this name. |

## Emits

| Event | Payload | When |
| ----- | ------- | ---- |
| `action` | `name: string` | An `action` item was tapped — `item.action ?? item.label`, after the drawer closes. |
| `logout` | — | The built-in "Sign out" row was tapped — the app performs its own teardown. |

## Slots

None.

## Notes

- **Open state**: there is no `open` prop. The drawer binds
  `v-model:open="mobileNavOpen"` internally, so the caller opens it through the
  same composable — `useMobileNav()` returns `mobileNavOpen`,
  `openMobileNav()`, `closeMobileNav()` and `toggleMobileNav()` (backed by
  Nuxt's `useState`, so any component in the app sees the same flag).
- Usually slotted into `RyderShell`'s `mobile-nav` slot; import it explicitly
  from app layout files (Nuxt does not auto-import components there).
- Nuxt-only imports: `useColorMode` and `useRoute` from `#imports`, plus
  `NuxtLink` for `to` items; Nuxt UI provides `USlideover`, `UUser`, `UButton`
  and `USeparator`. The docs demo stubs vue-router's route key for the same
  reason as the BottomNav example (the docs host has no router).
- The drawer header includes a built-in light/dark toggle that writes
  `colorMode.preference`.
- `rootPath` only affects active highlighting; items without `to` render as
  buttons so a missing route is never requested.