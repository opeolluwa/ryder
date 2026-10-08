# Components

The module registers every component in `src/components/` under the `Ryder`
prefix, so they auto-import into pages and app components. Each component has
its own page below — with props, emits, slots and a live example you can edit
in the playground.

## Import

Auto-imported under the `Ryder` prefix (no folder segment):

```vue
<template>
  <RyderButton>Save</RyderButton>
  <RyderEmptyState title="Nothing here" description="Try again later." />
</template>
```

Explicit imports use the folder path:

```ts
import RyderSideNav from "@opeolluwa/ryder/components/navigation/SideNav.vue"
```

## Pages by folder

| Folder | Import path after `@opeolluwa/ryder/components/` | Components |
| ------ | ------------------------------------------------- | ---------- |
| [primitives](/components/primitives/Button) | `primitives/` | [Button](/components/primitives/Button) [Card](/components/primitives/Card) [Input](/components/primitives/Input) [Logo](/components/primitives/Logo) [Select](/components/primitives/Select) [Textarea](/components/primitives/Textarea) |
| [feedback](/components/feedback/Dialog) | `feedback/` | [BottomSheet](/components/feedback/BottomSheet) [CreateDialog](/components/feedback/CreateDialog) [Dialog](/components/feedback/Dialog) [EmptyState](/components/feedback/EmptyState) [PageHeader](/components/feedback/PageHeader) [PageLoader](/components/feedback/PageLoader) |
| [navigation](/components/navigation/BottomNav) | `navigation/` | [BottomNav](/components/navigation/BottomNav) [Fab](/components/navigation/Fab) [SideNav](/components/navigation/SideNav) |
| [typography](/components/typography/LeadingText) | `typography/` | [LeadingText](/components/typography/LeadingText) [SubText](/components/typography/SubText) |
| [auth](/components/auth/AuthHeader) | `auth/` | [AuthHeader](/components/auth/AuthHeader) |
| [complaints](/components/complaints/ComplaintList) | `complaints/` | [ComplaintList](/components/complaints/ComplaintList) [ComplaintListItem](/components/complaints/ComplaintListItem) [ComplaintHeader](/components/complaints/ComplaintHeader) [ComplaintThread](/components/complaints/ComplaintThread) [ComplaintPreview](/components/complaints/ComplaintPreview) [ComplaintForm](/components/complaints/ComplaintForm) [ComplaintCreateForm](/components/complaints/ComplaintCreateForm) [ComplaintCreateDialog](/components/complaints/ComplaintCreateDialog) [ComplaintDialog](/components/complaints/ComplaintDialog) |
| [orders](/components/orders/OrderList) | `orders/` | [OrderList](/components/orders/OrderList) [OrderListItem](/components/orders/OrderListItem) [OrderPreview](/components/orders/OrderPreview) [OrderStatusBadge](/components/orders/OrderStatusBadge) [CancelOrderDialog](/components/orders/CancelOrderDialog) |
| [notes](/components/notes/Editor) | `notes/` | [Editor](/components/notes/Editor) [EditorToolBar](/components/notes/EditorToolBar) [PullToRefresh](/components/notes/PullToRefresh) [ToolBarWrapper](/components/notes/ToolBarWrapper) |

## Gotcha — layouts vs. auto-imports

Nuxt auto-imports the `Ryder*` components into **pages and app components, but
not into app layout files** (`app/layouts/*.vue`). A layout that renders a
shared component must import it explicitly:

```vue
<script setup lang="ts">
import RyderShell from "@opeolluwa/ryder/layouts/RyderShell.vue"
import RyderSideNav from "@opeolluwa/ryder/components/navigation/SideNav.vue"
</script>
```

## Domain types & helpers

The order and complaint components share the domain types and helpers in
`@opeolluwa/ryder/types` and `@opeolluwa/ryder/utils` (status colours,
totals, customer labels, …) — each page links the ones it uses.
