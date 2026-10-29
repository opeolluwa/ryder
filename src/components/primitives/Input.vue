<script setup lang="ts">
import { computed } from "vue";
import UFormField from "@nuxt/ui/components/FormField.vue";
import UInput from "@nuxt/ui/components/Input.vue";

const props = withDefaults(
    defineProps<{
        label?: string;
        name?: string;
        icon?: string;
        placeholder?: string;
        hint?: string;
        disabled?: boolean;
        type?: string;
        trailingIcon?: string;
        size?: "xs" | "sm" | "md" | "lg" | "xl";
        inputClass?: string;
        labelClass?: string;
        required?: boolean;
    }>(),
    {
        label: undefined,
        name: undefined,
        icon: undefined,
        placeholder: undefined,
        hint: undefined,
        disabled: false,
        type: "text",
        trailingIcon: undefined,
        size: "md",
        inputClass: undefined,
        labelClass: undefined,
        required: false,
    },
);

const model = defineModel<string>();

// The inner input is always `bg-transparent`, so a disabled fill has to go on
// the UInput root, otherwise it shows through.
const disabledBgClass = computed(() =>
    props.disabled ? "bg-gray-100 dark:bg-onyx-600" : "",
);

const placeholderSizeClass = "placeholder:text-2xs";
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
        labelClass || 'text-sm font-medium text-gray-600 dark:text-gray-400',
      hint: ' mr-auto text-gray-400 dark:text-gray-600 font-normal ml-1 text-2xs lg:text-sm',
    }"
    :required="required"
  >
    <UInput
      v-model="model"
      :icon="icon"
      :disabled="disabled"
      :placeholder="placeholder || label"
      :type="type"
      :size="size"
      :trailing-icon="trailingIcon"
      :ui="{
        base: icon
          ? 'py-3 bg-transparent placeholder:text-sm text-sm'
          : 'py-3 pl-4 bg-transparent placeholder:text-sm text-sm' +
            (inputClass ? ' ' + inputClass : ''),
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
  </UFormField>
</template>
