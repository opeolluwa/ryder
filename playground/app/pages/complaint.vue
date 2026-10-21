<script setup lang="ts">
import RyderMessagingPreview from "@opeolluwa/ryder/components/messaging/MessagingPreview.vue";
import {
  counterpartParty,
  staffParty,
  useMessagingDemo,
} from "~/data/messaging-fixtures";

definePageMeta({
  layout: "complaint",
  back: true,
  breadcrumb: { ariaLabel: "Complaint", title: "Complaint" },
});

const { rows, threads, sendsAreLoading, sentCount, sendReply } =
  useMessagingDemo();

const row = computed(
  () => rows.value.find((item) => item.conversation.identifier === "MSG-0001") ?? null,
);

const replies = computed(() => threads.value["MSG-0001"] ?? []);

function onSend(body: string) {
  void sendReply("MSG-0001", body);
}
</script>

<template>
  <!--
    The layout hands this page a bounded, non-scrolling `main`, so the page
    sizes its own thread pane to that definite height (mobile: the `h-dvh`
    shell minus the 3rem header; `lg`: the desktop shell's content box).
  -->
  <div class="flex h-[calc(100dvh-3rem)] min-h-0 flex-col gap-4 p-4 lg:h-[calc(100dvh-4rem)] lg:gap-6 lg:p-6">
    <RyderMessagingPreview
      :row="row"
      :replies="replies"
      :loading-replies="false"
      :self="staffParty"
      :counterpart="counterpartParty()"
      :sending="sendsAreLoading"
      :sent-count="sentCount"
      :status-menu="false"
      :show-participant="false"
      @send="onSend"
    />
  </div>
</template>
