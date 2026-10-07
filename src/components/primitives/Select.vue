<script setup lang="ts">
defineProps<{
  label?: string;
  icon?: string;
  className?: string;
  name?: string;
  trailingIcon?: string;
  placeholder?: string;
  hint?: string;
  avatar?: string;
  disabled?: boolean;
  preserveCase?: boolean;
  items: string[] | { label: string; value: string }[];
  labelClass?: string;
  /**
   * Lets the customer type a value that is not in `items`.
   *
   * The list is a prop, so the new value cannot be added to it here: the typed
   * term is re-emitted for the owner to merge in. It is not written to the
   * model either, because `USelectMenu` only displays a value it can find in
   * `items` — setting it before the list catches up renders as blank.
   */
  creatable?: boolean;
}>();

const emit = defineEmits<{ create: [term: string] }>();

const model = defineModel<string>();
</script>

<template>
  <UFormField
    v-slot="{ error }"
    :label="label"
    :name="name"
    :hint="hint"
    :ui="{
      error: 'text-red-500 mt-1',
      label:
        labelClass ||
        'text-xs font-medium text-gray-600 dark:text-gray-400 capitalize',
      hint: 'mr-auto text-gray-400 dark:text-gray-600 font-normal ml-1',
      root: preserveCase ? '' : 'lowercase',
    }"
  >
    <USelectMenu
      v-model="model"
      :items="items"
      :icon="icon"
      :trailing-icon="trailingIcon"
      value-key="value"
      :avatar="{ src: avatar, loading: 'lazy' }"
      :disabled="disabled"
      :placeholder="placeholder"
      :create-item="creatable ? 'always' : undefined"
      :ui="{
        base: preserveCase ? 'normal-case py-3' : 'lowercase py-3',
        trailingIcon: 'size-5',
      }"
      :class="[
        'w-full transition-colors bg-transparent ' +
          'placeholder:text-sm lg:placeholder:text-base ' +
          (preserveCase ? '' : 'first:capitalize ') +
          className,
        error
          ? 'border-red-500 focus-within:border-red-500'
          : 'border-gray-300 dark:border-gray-600 focus-within:border-black dark:focus-within:border-gray-400',
      ]"
      @create="emit('create', $event)"
    />
  </UFormField>
</template>
