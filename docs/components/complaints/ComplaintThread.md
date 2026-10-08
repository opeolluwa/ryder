<script setup lang="ts">
import Basic from "../../examples/complaints/ComplaintThreadBasic.vue";
</script>

# ComplaintThread

The message history plus reply composer for one complaint. The complaint
itself is the opening message, replies are sorted chronologically, and the
component is stateful: it owns the draft, decides which side each message is
on, and clears the composer once the parent confirms a send.

```vue
<script setup lang="ts">
import { ref } from "vue"
import RyderComplaintThread from "@opeolluwa/ryder/components/complaints/ComplaintThread.vue"
import type { ComplaintReply } from "@opeolluwa/ryder/types"

const replies = ref<ComplaintReply[]>([])
const sending = ref(false)
const sentCount = ref(0)
</script>

<template>
  <RyderComplaintThread
    :row="row"
    :replies="replies"
    :self="self"
    :counterpart="counterpart"
    :sending="sending"
    :sent-count="sentCount"
    @send="sendReply"
  />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/complaints/ComplaintThreadBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `row` | `ComplaintRow` | — | The complaint; its `description` renders as the opening message. |
| `replies` | `ComplaintReply[]` | — | Thread messages, sorted by `createdAt` internally. |
| `loadingReplies` | `boolean` | `false` | Replaces the thread with a `PageLoader` while fetching. |
| `self` | `ThreadParty` | — | The replier (support staff or the customer): name, email, avatar. |
| `counterpart` | `ThreadParty` | — | The other side of the conversation. |
| `sending` | `boolean` | `false` | The parent's reply POST is in flight: submit is blocked and the button spins. |
| `sentCount` | `number` | `0` | Bumped by the parent on each successful send; a change clears the composer and scrolls to the latest message. |
| `isSelfMessage` | `(senderEmail: string) => boolean` | matches `self.email` (trim + case-insensitive) | Decides which side a reply belongs to — pass a custom matcher to compare against the complaint's customer instead. |

## Emits

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `send` | `[body: string]` | The trimmed composer text was submitted. Ignored while `sending` or when the draft is blank. |

## Slots

None.

## Notes

- Stateful by design: the draft (`body`), the scroll container and the
  "which side is this message" logic all live inside. The parent only owns the
  data (`replies`, `sending`) and the POST.
- Authorship: replies whose `senderEmail` passes `isSelfMessage` render as the
  `self` side (`user`, primary bubble); everything else — including the
  opening complaint — renders as `counterpart`.
- On `sentCount` change the composer empties and the thread smooth-scrolls to
  the bottom; the same scroll runs on mount. With `:auto-scroll="false"` on
  `UChatMessages`, this scroll is the only one — a growing `replies` array
  alone will not move the view.
- It renders a fragment: a scrolling `<section>` plus the composer
  `<footer>`. Wrap it in a `flex flex-col` parent with a height so the thread
  scrolls instead of the page.
- Autofocus is disabled below `lg` (`useIsMobile`) so mobile keyboards do not
  open unprompted.
