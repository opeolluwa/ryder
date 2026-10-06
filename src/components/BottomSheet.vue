<script setup lang="ts">
import { onBeforeUnmount, watch } from "vue";
import { kSheet } from "konsta/vue";
import UButton from "@nuxt/ui/components/Button.vue";
import Button from "./Button.vue";

// Konsta's own transition is `duration-400`; mirror it so consumers that wait
// for `after:leave` (the Nuxt UI overlay contract) unmount at the right time.
const TRANSITION_MS = 400;

const props = withDefaults(
  defineProps<{
    title: string;
    description?: string;
    loading?: boolean;
    submitDisabled?: boolean;
    dismissible?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
  }>(),
  {
    dismissible: true,
  },
);

const open = defineModel<boolean>("open", { default: false });

const emit = defineEmits<{
  submit: [];
  cancel: [];
  leave: [];
  "after:leave": [];
}>();

let leaveTimer: ReturnType<typeof setTimeout> | undefined;

watch(open, (isOpen) => {
  clearTimeout(leaveTimer);

  if (isOpen) {
    return;
  }

  emit("leave");

  leaveTimer = setTimeout(() => emit("after:leave"), TRANSITION_MS);
});

onBeforeUnmount(() => clearTimeout(leaveTimer));

function onBackdropClick() {
  if (props.dismissible) {
    onCancel();
  }
}

function onCancel() {
  emit("cancel");
  open.value = false;
}

function onSubmit() {
  emit("submit");
}
</script>

<template>
  <!-- kSheet renders `position: fixed` in place, so an ancestor with a
       transform/filter/overflow would trap it. Portal to <body> to be safe. -->
  <Teleport to="body">
    <div class="relative z-[60]">
      <kSheet
        :opened="open"
        :colors="{
          bgIos: 'bg-white dark:bg-onyx-700',
          bgMaterial: 'bg-white dark:bg-onyx-700',
        }"
        @backdropclick="onBackdropClick"
      >
        <div
          class="flex max-h-[85dvh] flex-col overflow-hidden rounded-t-[20px] bg-white dark:bg-onyx-700"
          style="padding-bottom: env(safe-area-inset-bottom, 0px)"
        >
          <div
            class="mx-auto my-3 h-1 w-9 shrink-0 rounded-full bg-gray-300 dark:bg-white/15"
          />

          <div class="shrink-0 px-4 pb-4">
            <div class="flex items-center justify-between gap-3">
              <h2
                class="min-w-0 flex-1 text-lg font-semibold leading-6 text-gray-900 dark:text-white"
              >
                {{ title }}
              </h2>

              <UButton
                v-if="dismissible"
                icon="heroicons:x-mark"
                color="neutral"
                variant="ghost"
                size="sm"
                aria-label="Close"
                class="-mr-2 shrink-0"
                :disabled="loading"
                @click="onCancel"
              />
            </div>

            <p
              v-if="description"
              class="pt-1 text-sm text-gray-500 dark:text-white/40"
            >
              {{ description }}
            </p>
          </div>

          <div
            class="min-h-0 flex-1 overflow-y-auto px-4 pb-4"
            style="-webkit-overflow-scrolling: touch"
          >
            <slot />
          </div>

          <div
            class="shrink-0 border-t border-gray-100 px-4 pb-2 pt-3 dark:border-white/5"
          >
            <slot name="footer">
              <div class="flex w-full justify-end gap-2">
                <Button
                  variant="ghost"
                  color="error"
                  class="bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20"
                  :disabled="loading"
                  @click="onCancel"
                >
                  {{ cancelLabel ?? "Cancel" }}
                </Button>

                <Button
                  variant="ghost"
                  :loading="loading"
                  :disabled="loading || submitDisabled"
                  @click="onSubmit"
                >
                  {{ submitLabel ?? "Submit" }}
                </Button>
              </div>
            </slot>
          </div>
        </div>
      </kSheet>
    </div>
  </Teleport>
</template>
