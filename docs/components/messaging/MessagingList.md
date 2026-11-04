---
title: MessagingList
description: The messaging inbox sidebar — tabs, loading, empty states and conversation rows.
outline: deep
---

<script setup lang="ts">
import Basic from "../../examples/messaging/MessagingListBasic.vue";
</script>

# MessagingList

The messaging inbox sidebar: a tab bar over conversation rows, a loader while
fetching, and two empty states. Rows render through
[MessagingListItem](./MessagingListItem); filtering is the parent's job — the
component renders `rows` exactly as handed over.

## Usage

```vue
<script setup lang="ts">
import { ref } from "vue"
import RyderMessagingList from "@opeolluwa/ryder/components/messaging/MessagingList.vue"
import type { MessagingInboxTab } from "@opeolluwa/ryder/types"

const activeTab = ref<MessagingInboxTab>("all")
const selectedId = ref<string | null>(null)
</script>

<template>
  <RyderMessagingList
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

### Basic

A three-tab inbox with filtering handled by the shared
`messagingMatchesTab` helper.

<Demo>

<Basic />

</Demo>

<<< @/examples/messaging/MessagingListBasic.vue

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `rows` | `ConversationRow[]` | — | Rows to render, already filtered by the parent. |
| `loading` | `boolean` | — | Shows `PageLoader` and disables every tab. |
| `inboxEmpty` | `boolean` | — | The account has no conversations at all: hides the tab bar and shows the "No conversations yet" empty state. |
| `activeTab` | `"all" \| "open" \| "resolved"` | — | Which tab is on; controlled through `update:activeTab`. |
| `tabCount` | `Record<"all" \| "open" \| "resolved", number>` | — | Per-tab counts. Declared required but never rendered — see Notes. |
| `replyCounts` | `Record<string, number>` | — | Reply badge per conversation identifier; a missing key renders `0` (no badge). |
| `selectedId` | `string \| null` | — | Identifier of the highlighted row. |
| `tabs` | `MessagingInboxTab[]` | `["all", "open", "resolved"]` | Which tabs exist. Pass `[]` to drop the tab bar. |
| `showParticipant` | `boolean` | `true` | Forwarded to each row: headline by participant vs by subject. |
| `emptyActionLabel` | `string` | `undefined` | Optional CTA on the fully-empty inbox. Omit for a read-only inbox. |

### Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `update:activeTab` | `[value: MessagingInboxTab]` | A tab was picked; write it back into `activeTab`. |
| `select` | `[identifier: string]` | A conversation row was clicked. |
| `emptyAction` | `[]` | The empty-state CTA was clicked. |

### Slots

None.

### Expose

None.

## Theme

The list inherits the docs/app shell. On desktop it becomes a fixed `w-80`
sidebar with its own border and rounded corners; below `lg` it fills the
available width and drops the surrounding chrome.

## Accessibility

- Tabs are disabled while `loading` is true, so the empty/loading state cannot
  be navigated out of mid-request.
- Rows are real `<button>` elements with `aria-current` when selected.
- The two empty states use distinct copy so "account empty" is not confused
  with "this tab is empty".

## Notes

- **`tabCount` is declared required but never rendered.** No template
  reference reads it. Keep passing it — callers usually derive it from the same
  rows — but know it currently has no visual effect.
- Tab bar visibility: hidden when `inboxEmpty` is true or `tabs` is `[]`;
  every tab is disabled while `loading`.
- Two distinct empty states: `inboxEmpty` → "No conversations yet";
  `rows.length === 0` with `inboxEmpty` false → "No conversations in this tab".
- Filtering is the caller's job — use `messagingMatchesTab` from
  `src/utils/messagingStatus.ts` so tabs and rows agree.
- Layout: give it a sized parent; on desktop it is `lg:h-full` with a scrolling
  row area.

## Related

- [MessagingListItem](./MessagingListItem)
- [MessagingPreview](./MessagingPreview)
- [Messaging status helpers](/guide/composables-utils#messaging-status)
