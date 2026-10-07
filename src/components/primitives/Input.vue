<script setup lang="ts">
import { computed, ref } from "vue";
import UFormField from "@nuxt/ui/components/FormField.vue";
import UInput from "@nuxt/ui/components/Input.vue";
import UButton from "@nuxt/ui/components/Button.vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    name?: string;
    icon?: string;
    placeholder?: string;
    hint?: string;
    disabled?: boolean;
    type?: string;
    enablePasswordToggle?: boolean;
    trailingIcon?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    inputClass?: string;
    labelClass?: string;
  }>(),
  {
    label: undefined,
    name: undefined,
    icon: undefined,
    placeholder: undefined,
    hint: undefined,
    disabled: false,
    type: "text",
    enablePasswordToggle: true,
    trailingIcon: undefined,
    size: "md",
    inputClass: undefined,
    labelClass: undefined,
  },
);

const model = defineModel<string>();
const show = ref(false);

// The inner input is always `bg-transparent`, so a disabled fill has to go on
// the UInput root, otherwise it shows through.
const disabledBgClass = computed(() =>
  props.disabled ? "bg-gray-100 dark:bg-onyx-600" : "",
);

// Mirrors the text size Nuxt UI applies for each `size`, so the placeholder
// doesn't stay a step below the typed value. Without an explicit `size` the
// control keeps the theme default (`md`) and the placeholder follows the
// viewport instead, on the same `lg` boundary the app shell uses to swap its
// sidebar for the bottom nav.
const placeholderSizeClass = computed(() => {
  if (props.size) {
    return props.size === "md" || props.size === "lg" || props.size === "xl"
      ? "placeholder:text-base"
      : "placeholder:text-sm";
  }

  return "placeholder:text-sm lg:placeholder:text-base";
});
</script>

<template>
  <UFormField
    v-slot="{ error }"
    :name="name"
    :label="label || undefined"
    :hint="hint"
    :ui="{
      error: 'text-red-500 mt-1',
      label:
        labelClass || 'text-xs font-medium text-gray-600 dark:text-gray-400',
      hint: ' mr-auto text-gray-400 dark:text-gray-600 font-normal ml-1',
    }"
  >
    <template v-if="type === 'password'">
      <UInput
        v-model="model"
        :icon="icon"
        :disabled="disabled"
        :placeholder="placeholder || '********'"
        :type="show ? 'text' : 'password'"
        :size="size"
        :trailing-icon="trailingIcon"
        :ui="{
          base: icon
            ? 'py-3 bg-transparent'
            : 'py-3 pl-4 bg-transparent' + (inputClass ? ' ' + inputClass : ''),
        }"
        :class="[
          'w-full transition-colors ring-0 focus-visible:ring-0',
          disabledBgClass,
          error
            ? 'border-red-500 focus-within:border-red-500'
            : 'border-gray-300 dark:border-gray-600 focus-within:border-primary-400 dark:focus-within:border-primary-500',
        ]"
      >
        <template v-if="enablePasswordToggle" #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="show ? 'i-uil-eye-slash' : 'i-uil-eye'"
            :aria-label="show ? 'Hide password' : 'Show password'"
            :aria-pressed="show"
            aria-controls="password"
            @click="show = !show"
          />
        </template>
      </UInput>
    </template>

    <template v-else>
      <UInput
        v-model="model"
        :icon="icon"
        :disabled="disabled"
        :placeholder="label || placeholder"
        :type="type"
        :size="size"
        :trailing-icon="trailingIcon"
        :ui="{
          base: icon
            ? 'py-3 bg-transparent'
            : 'py-3 pl-4 bg-transparent' + (inputClass ? ' ' + inputClass : ''),
        }"
        :class="[
          'w-full transition-colors ring-0 focus-visible:ring-0',
          placeholderSizeClass,
          disabledBgClass,
          error
            ? 'border-red-500 focus-within:border-red-500'
            : 'border-gray-300 dark:border-gray-600 focus-within:border-primary-400 dark:focus-within:border-primary-500',
        ]"
      />
    </template>
  </UFormField>
</template>
