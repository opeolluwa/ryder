
<script setup lang="ts">
import { computed } from "vue";
import UFormField from "@nuxt/ui/components/FormField.vue";
import UInputTime from "@nuxt/ui/components/InputTime.vue";
import type { Time } from "@internationalized/date";

const props = withDefaults(
    defineProps<{
        label?: string;
        name?: string;
        icon?: string;

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
        icon: "heroicons:clock",

        hint: undefined,
        disabled: false,
        size: "md",
        variant: "solid",
        color: "primary",
        inputClass: undefined,
        labelClass: undefined,
        required: false,
    },
);

const model = defineModel<Time | undefined>();

const disabledBgClass = computed(() =>
    props.disabled ? "bg-gray-100 dark:bg-onyx-600" : "",
);

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
        <UInputTime
            v-model="model"
            :icon="props.icon"
            :disabled="props.disabled"
            :size="props.size"
            :variant="props.variant"
            :color="error ? 'error' : props.color"
            :ui="{
                base: [
                    'py-3 bg-transparent text-sm',
                    !props.icon && 'pl-4',
                    props.inputClass,
                ],
            }"
            :class="[
                'w-full border transition-colors ring-0 focus-visible:ring-0',

                disabledBgClass,
                error
                    ? 'border-red-500 focus-within:border-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus-within:border-primary-400 dark:focus-within:border-primary-500',
            ]"
        />
    </UFormField>
</template>
