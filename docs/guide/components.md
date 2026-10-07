# Components

The module registers every component in `src/components/` under the `Ryder`
prefix, so they auto-import into pages and app components. Sources are grouped
into folders (shown as the import path after `@opeolluwa/ryder/components/`):

| Folder        | Components |
| ------------- | ---------- |
| `primitives/` | `Button` `Card` `Input` `Select` `Textarea` `Logo` |
| `feedback/`   | `EmptyState` `PageHeader` `PageLoader` `Dialog` `CreateDialog` `BottomSheet` |
| `navigation/` | `SideNav` `BottomNav` `Fab` |
| `complaints/` | `ComplaintList` `ComplaintListItem` `ComplaintHeader` `ComplaintThread` `ComplaintPreview` `ComplaintForm` `ComplaintCreateForm` `ComplaintCreateDialog` `ComplaintDialog` |
| `orders/`     | `OrderList` `OrderListItem` `OrderPreview` `OrderStatusBadge` `CancelOrderDialog` |
| `notes/`      | `Editor` `EditorToolBar` `ToolBarWrapper` `PullToRefresh` |

Usage: `<RyderButton>`, `<RyderCard>`, `<RyderInput>`, `<RyderSelect>`,
`<RyderEmptyState>`, `<RyderPageHeader>`, `<RyderFab>`, `<RyderLogo>`,
`<RyderPageLoader>`, `<RyderCreateDialog>`, `<RyderDialog>`,
`<RyderBottomSheet>`, `<RyderBottomNav>`, `<RyderSideNav>`,
`<RyderComplaintList>`, `<RyderComplaintListItem>`, `<RyderComplaintHeader>`,
`<RyderComplaintThread>`, `<RyderComplaintPreview>`, and so on.

Explicit imports use the folder path:

```ts
import RyderSideNav from "@opeolluwa/ryder/components/navigation/SideNav.vue"
```

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

## Card

`<RyderCard>` is a bordered panel: a `title` prop plus `header`/`trailing`
slots above a default slot for the body.

```vue
<RyderCard title="Line items">
  <template #trailing>
    <UBadge color="neutral">2</UBadge>
  </template>
  <!-- body -->
</RyderCard>
```

`RyderSettings` and the shared order surfaces render through it.

## Bottom nav

`<RyderBottomNav>` is the mobile tab bar — fixed to the viewport bottom and
hidden from `lg` up, usually dropped into `RyderShell`'s `bottom` slot.

Props: `items` (`{ label, to?, icon, activeIcon?, action? }[]`) and `bgClass`.
Emits `select` for `action` items (a cart drawer, say) instead of navigating;
scoped slot `badge` (`{ item, active }`) for per-item counters.

```vue
<RyderBottomNav
  :items="[
    { label: 'Home', to: '/', icon: 'heroicons:home' },
    { label: 'Cart', icon: 'heroicons:shopping-cart', action: 'cart' },
  ]"
  @select="onSelect"
>
  <template #badge="{ item, active }">
    <span v-if="item.action === 'cart' && cartCount" class="...">
      {{ cartCount }}
    </span>
  </template>
</RyderBottomNav>
```

## Order UI

The order components share the domain types and helpers in
`@opeolluwa/ryder/types` and `@opeolluwa/ryder/utils`:

- `OrderList` renders a tabbed list over `OrderListItem` rows, each with an
  `OrderStatusBadge`.
- `OrderStatusBadge` colours a status by meaning (pending / paid / fulfilled /
  cancelled / conflicted) via `orderStatusBadgeClass`.
- `OrderListItem` shows a line-item preview, customer snapshot and delivery
  summary backed by `totalsByCurrency`, `orderItemCount` and `deliveryLines`.
- `OrderPreview` renders a selected order's items, totals and delivery;
  `CancelOrderDialog` is the guarded confirmation before an admin cancels an
  order.

## Complaint UI

`ComplaintList` / `ComplaintListItem` / `ComplaintHeader` / `ComplaintThread` /
`ComplaintPreview` render the complaint domain; `ComplaintForm`,
`ComplaintCreateDialog`, `ComplaintCreateForm` and `ComplaintDialog` cover the
write paths. The related `Complaint*` types and status/customer helpers live in
`@opeolluwa/ryder/types` and `@opeolluwa/ryder/utils`.