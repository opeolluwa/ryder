<script setup lang="ts">
import UChatMessages from "@nuxt/ui/components/ChatMessages.vue";
import UChatPrompt from "@nuxt/ui/components/ChatPrompt.vue";
import UChatPromptSubmit from "@nuxt/ui/components/ChatPromptSubmit.vue";
import PageLoader from "./PageLoader.vue";
import { useIsMobile } from "../composables/useIsMobile";
import type {
  ComplaintReply,
  ComplaintRow,
  ThreadParty,
} from "../types/complaints";

const props = withDefaults(
  defineProps<{
    row: ComplaintRow;
    replies: ComplaintReply[];
    loadingReplies?: boolean;
    /** The replier — support staff or the customer, per `isSelfMessage`. */
    self: ThreadParty;
    /** The other side of the conversation. */
    counterpart: ThreadParty;
    /** Whether the parent's reply POST is in flight. */
    sending?: boolean;
    /** Bumped by the parent on each successful send; clears the composer. */
    sentCount?: number;
    /**
     * Decides which side a reply belongs to. Defaults to matching the replier's
     * own email; pass a custom matcher to compare against the complaint's
     * customer instead.
     */
    isSelfMessage?: (senderEmail: string) => boolean;
  }>(),
  {
    loadingReplies: false,
    sending: false,
    sentCount: 0,
  },
);

const emit = defineEmits<{
  send: [body: string];
}>();

const isMobile = useIsMobile();

const body = ref("");
const threadRef = ref<HTMLElement | null>(null);
const lastSentCount = ref(props.sentCount);

function normalize(email: string | null | undefined) {
  return (email ?? "").trim().toLowerCase();
}

function isSelf(email: string) {
  if (typeof props.isSelfMessage === "function") {
    return props.isSelfMessage(email);
  }

  return normalize(email) === normalize(props.self.email ?? "");
}

function authorFor(senderEmail: string) {
  return isSelf(senderEmail) ? props.self.name : props.counterpart.name;
}

/** The complaint itself is the opening message, spoken by whoever raised it. */
const threadMessages = computed(() => {
  const complaint: Record<string, unknown> = {
    id: props.row.complaint.identifier,
    role: "assistant",
    color: "neutral",
    parts: [{ type: "text", text: props.row.complaint.description }],
    metadata: {
      author: props.counterpart.name,
      createdAt: props.row.complaint.createdAt,
      text: props.row.complaint.description,
    },
  };

  const replies = [...props.replies]
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map((reply) => ({
      id: reply.identifier,
      role: isSelf(reply.senderEmail) ? "user" : "assistant",
      color: isSelf(reply.senderEmail) ? "primary" : "neutral",
      parts: [{ type: "text", text: reply.body }],
      metadata: {
        author: authorFor(reply.senderEmail),
        createdAt: reply.createdAt,
        text: reply.body,
      },
    }));

  return [complaint, ...replies];
});

function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function scrollToLatest() {
  const el = threadRef.value;
  const scrolls = el && el.scrollHeight > el.clientHeight;
  const target = scrolls ? el : (document.scrollingElement ?? el);

  target?.scrollTo({ top: target.scrollHeight, behavior: "smooth" });
}

function submit() {
  if (props.sending) return;

  const text = body.value.trim();

  if (!text) return;

  emit("send", text);
}

// The parent owns the reply POST, so it bumps `sentCount` on success; the
// composer empties and scrolls down only once the reply is actually on its way.
watch(
  () => props.sentCount,
  (count) => {
    if (count === lastSentCount.value) return;

    lastSentCount.value = count;
    body.value = "";
    nextTick(scrollToLatest);
  },
);

onMounted(scrollToLatest);
</script>

<template>
  <section
    ref="threadRef"
    class="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-5 sm:px-6"
  >
    <div v-if="loadingReplies" class="flex justify-center py-8">
      <PageLoader />
    </div>

    <UChatMessages
      v-else
      :messages="threadMessages"
      :assistant="{
        variant: 'subtle',
        avatar: {
          src: counterpart.avatarSrc,
          alt: counterpart.name,
          text: counterpart.avatarText,
        },
      }"
      :user="{
        variant: 'solid',
        avatar: {
          src: self.avatarSrc,
          alt: self.name,
          text: self.avatarText,
        },
      }"
      :auto-scroll="false"
      :ui="{ root: 'gap-y-2 px-0' }"
    >
      <template #header="{ metadata }">
        <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span
            class="text-xs font-semibold text-gray-800 dark:text-white/80"
          >
            {{ metadata.author }}
          </span>
          <span class="text-[11px] text-gray-400 dark:text-white/30">
            {{ formatShortDate(metadata.createdAt) }}
          </span>
        </div>
      </template>

      <template #content="{ metadata }">
        <p
          class="text-sm leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-white/80"
        >
          {{ metadata.text }}
        </p>
      </template>
    </UChatMessages>
  </section>

  <footer
    class="shrink-0 border-t border-gray-100 bg-white px-4 py-3 dark:border-white/5 dark:bg-gray-950 sm:px-6 sm:py-4"
  >
    <UChatPrompt
      v-model="body"
      :maxrows="6"
      :autofocus="!isMobile"
      placeholder="Write a reply..."
      @submit="submit"
    >
      <template #footer>
        <div class="flex w-full items-center justify-between gap-3">
          <p class="text-[11px] text-gray-400 dark:text-gray-500">
            Replying as {{ self.name }}
          </p>
          <div class="hidden lg:block">
            <UChatPromptSubmit
              class="ml-auto"
              :loading="sending"
              :disabled="!body.trim() || sending"
            />
          </div>
        </div>
      </template>
    </UChatPrompt>
  </footer>
</template>