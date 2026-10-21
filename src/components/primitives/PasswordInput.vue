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

// Password placeholders default to `********`, so they only need to sit a
// step below the typed value the same way `Input` and `Textarea` do.
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
  >
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
        placeholderSizeClass,
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
  </UFormField>
</template>
