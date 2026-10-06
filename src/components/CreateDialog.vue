<script setup lang="ts">
import Dialog from "./Dialog.vue";
import Button from "./Button.vue";

withDefaults(
  defineProps<{
    title: string;
    description?: string;
    loading?: boolean;
    submitDisabled?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
  }>(),
  {
    submitLabel: "Submit",
    cancelLabel: "Cancel",
    description: undefined,
  },
);

const open = defineModel<boolean>("open", { default: false });

const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();

function onCancel() {
  emit("cancel");
  open.value = false;
}

function onSubmit() {
  emit("submit");
}
</script>

<template>
  <Dialog v-model:open="open" :title="title" :description="description">
    <template #body>
      <slot />
    </template>

    <template #footer>
      <slot name="footer">
        <div class="flex justify-end w-full gap-2">
          <Button
            variant="ghost"
            color="error"
            class="bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20"
            :disabled="loading"
            @click="onCancel"
          >
            {{ cancelLabel }}
          </Button>

          <Button
            variant="ghost"
            :loading="loading"
            :disabled="loading || submitDisabled"
            @click="onSubmit"
          >
            {{ submitLabel }}
          </Button>
        </div>
      </slot>
    </template>
  </Dialog>
</template>
