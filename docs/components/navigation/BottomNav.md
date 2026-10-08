<script setup lang="ts">
import Basic from "../../examples/navigation/BottomNavBasic.vue";
</script>

# BottomNav

The mobile tab bar: a fixed, `lg:hidden` bar pinned to the bottom of the
viewport with labels, icons and per-item badges. Tabs either navigate (`to`) or
emit (`action`), and the app owns the item list.

```vue
<script setup lang="ts">
import RyderBottomNav from "@opeolluwa/ryder/components/navigation/BottomNav.vue"
</script>

<template>
  <RyderBottomNav :items="items" @select="onSelect" />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/navigation/BottomNavBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `items` | `BottomNavItem[]` | `[]` | Tab entries: `{ label, to?, icon, activeIcon?, action? }`. |
| `bgClass` | `string` | `"bg-white dark:bg-onyx-600"` | Classes on the konsta tabbar background. |

`BottomNavItem` fields:

| Field | Type | Description |
| ----- | ---- | ----------- |
| `label` | `string` | Tab label (also the `key`). |
| `to` | `string?` | Route to navigate to; omit when `action` is set. |
| `icon` | `string` | Icon shown when the item is inactive. |
| `activeIcon` | `string?` | Swap in while the item is active (filled variant, e.g.). |
| `action` | `string?` | Non-navigation item — emitted through `select` instead of being routed. |

## Emits

| Event | Payload | When |
| ----- | ------- | ---- |
| `select` | `item: BottomNavItem` | An `action` item was tapped. Never fires for `to` items (those navigate). |

## Slots

| Slot | Props | Content |
| ---- | ----- | ------- |
| `badge` | `{ item, active }` | Pill rendered inside the icon wrapper — typically a count on an `action` item. |

## Notes

- The bar is `fixed inset-x-0 bottom-0 z-40 lg:hidden`: it is a viewport-level
  element, hidden from 1024px up — narrow the window (or use devtools device
  mode) to see it in a docs page.
- Active state: `route.path === item.to`, plus `route.path.startsWith(item.to
  + "/")` for sub-paths (`to: "/"` matches exactly only). Items with `action`
  (or without `to`) are never active.
- Nuxt-only imports: `navigateTo`, `useRoute`, `useColorMode` come from
  `#imports`. They are available automatically in a Nuxt app; the docs host
  shims them (the nav then navigates by setting `location.href`), which is why
  the example stubs vue-router's route key before rendering the bar.