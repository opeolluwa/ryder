<script setup lang="ts">
import Basic from "../../examples/complaints/ComplaintListBasic.vue";
</script>

# ComplaintList

The complaints inbox sidebar: a tab bar over the rows, a loader while fetching
and two empty states, all in one column. Rows render through
[ComplaintListItem](./ComplaintListItem); the parent owns filtering — the
component renders `rows` exactly as handed over.

```vue
<script setup lang="ts">
import { ref } from "vue"
import RyderComplaintList from "@opeolluwa/ryder/components/complaints/ComplaintList.vue"
import type { ComplaintsInboxTab } from "@opeolluwa/ryder/types"

const activeTab = ref<ComplaintsInboxTab>("all")
const selectedId = ref<string | null>(null)
</script>

<template>
  <RyderComplaintList
    :rows="rows"
    :loading="loading"
    :inbox-empty="inboxEmpty"
    :active-tab="activeTab"
    :tab-count="tabCount"
    :reply-counts="replyCounts"
    :selected-id="selectedId"
    @update:active-tab="activeTab = $event"
    @select="selectedId = $event"
  />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/complaints/ComplaintListBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `rows` | `ComplaintRow[]` | — | Rows to render, already filtered by the parent. |
| `loading` | `boolean` | — | Shows `PageLoader` and disables every tab. |
| `inboxEmpty` | `boolean` | — | The account has no complaints at all: hides the tab bar and shows the "No complaints yet" empty state. |
| `activeTab` | `"all" \| "open" \| "resolved"` | — | Which tab is on; controlled through `update:activeTab`. |
| `tabCount` | `Record<"all" \| "open" \| "resolved", number>` | — | Per-tab counts. Declared required but never rendered — see Notes. |
| `replyCounts` | `Record<string, number>` | — | Reply badge per complaint identifier; a missing key renders `0` (no badge). |
| `selectedId` | `string \| null` | — | Identifier of the highlighted row. |
| `tabs` | `ComplaintsInboxTab[]` | `[...COMPLAINTS_INBOX_TABS]` | Which tabs exist — by default `all`, `open`, `resolved`. Pass `[]` to drop the tab bar (e.g. a customer's short history). |
| `showCustomer` | `boolean` | `true` | Forwarded to each row: headline by customer vs by subject. |

## Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `update:activeTab` | `[value: ComplaintsInboxTab]` | A tab was picked; write it back into `activeTab`. |
| `select` | `[identifier: string]` | A row was clicked. |

## Slots

None.

## Notes

- **`tabCount` is declared required but never rendered.** No template
  reference reads it (its only use would be labelling the tabs). Keep passing
  it — callers usually derive it from the same `rows` — but know it currently
  has no effect.
- Tab bar visibility: hidden when `inboxEmpty` is true or `tabs` is `[]`;
  every tab is disabled while `loading`.
- Two distinct empty states: `inboxEmpty` → "No complaints yet" (the account
  is empty); `rows.length === 0` with `inboxEmpty` false → "No complaints in
  this tab" (filtering emptied the view).
- Filtering is the caller's job — the demo filters with the shared
  `complaintMatchesTab` helper from `src/utils/complaintStatus.ts`.
- Layout: full width below `lg`, then a fixed `w-80` sidebar with a scrolling
  row area (`lg:h-full lg:overflow-y-auto`), so give it a sized parent.
