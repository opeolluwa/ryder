
<script setup lang="ts">
import {
    computed,
    useTemplateRef,
} from "vue";
import { CalendarDate } from "@internationalized/date";
import UFormField from "@nuxt/ui/components/FormField.vue";
import UInputDate from "@nuxt/ui/components/InputDate.vue";
import UCalendar from "@nuxt/ui/components/Calendar.vue";
import UPopover from "@nuxt/ui/components/Popover.vue";
import UButton from "@nuxt/ui/components/Button.vue";

const props = withDefaults(
    defineProps<{
        label?: string;
        name?: string;
        placeholder?: string;
        hint?: string;
        disabled?: boolean;
        size?: "xs" | "sm" | "md" | "lg" | "xl";
        variant?: "ghost" | "solid" | "outline" | "soft" | "subtle" | "none";
        color?:
            | "primary"
            | "error"
            | "secondary"
            | "success"
            | "info"
            | "warning"
            | "neutral";
        inputClass?: string;
        labelClass?: string;
        required?: boolean;
    }>(),
    {
        label: undefined,
        name: undefined,
        placeholder: undefined,
        hint: undefined,
        disabled: false,
        size: "md",
        variant: "outline",
        color: "primary",
        inputClass: undefined,
        labelClass: undefined,
        required: false,
    },
);

const model = defineModel<CalendarDate | undefined>();

const inputDate = useTemplateRef<InstanceType<typeof UInputDate>>("inputDate");

const disabledBgClass = computed(() =>
    props.disabled ? "bg-gray-100 dark:bg-onyx-600" : "",
);

const placeholderSizeClass = "placeholder:text-2xs";
</script>

<template>
  <UFormField
    v-slot="{ error }"
    :name="props.name"
    :label="props.label || undefined"
    :hint="props.hint"
    :required="props.required"
    :ui="{
      error: 'text-red-500 mt-1',
      label:
        props.labelClass ||
        'text-sm font-medium text-gray-600 dark:text-gray-400',
      hint: 'mr-auto text-gray-400 dark:text-gray-600 font-normal ml-1 text-2xs lg:text-sm',
    }"
  >
    <UInputDate
      ref="inputDate"
      v-model="model"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :size="props.size"
      :variant="props.variant"
      :color="error ? 'error' : props.color"
      :ui="{
        base: icon
          ? 'py-3 bg-transparent placeholder:text-sm text-sm'
          : 'py-3 pl-4 bg-transparent placeholder:text-sm text-sm' +
            (inputClass ? ' ' + inputClass : ''),
      }"
      :class="[
        'w-full border transition-colors ring-0 focus-visible:ring-0',
        placeholderSizeClass,
        disabledBgClass,
        error
          ? 'border-red-500 focus-within:border-red-500'
          : 'border-gray-300 dark:border-gray-600 focus-within:border-primary-400 dark:focus-within:border-primary-500',
      ]"
    >
      <template #trailing>
        <UPopover
          :reference="inputDate?.inputsRef[3]?.$el"
          :modal="false"
        >
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            icon="i-lucide-calendar"
            aria-label="Select a date"
            class="px-0"
            :disabled="props.disabled"
          />

          <template #content>
            <UCalendar
              v-model="model"
              class="p-2"
            />
          </template>
        </UPopover>
      </template>
    </UInputDate>
  </UFormField>
</template>
