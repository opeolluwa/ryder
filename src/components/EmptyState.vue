<script setup lang="ts">
import UIcon from "@nuxt/ui/components/Icon.vue";
import Button from "./Button.vue";

interface Props {
  title: string;
  description: string;
  icon?: string;
  actionLabel?: string;
  /**
   * Shrinks the block for use inside a panel rather than as a whole page. The
   * full-height default reserves the viewport, which reads as an accident once
   * there are sibling panels on screen (a tab that matched nothing, say).
   */
  compact?: boolean;
  /**
   * Class names merged onto each element of the block.
   *
   * Concatenation, not an override mechanism: Tailwind resolves conflicting
   * utilities by stylesheet order rather than class order, so a class that
   * collides with one of these — `text-2xl` against the title's `text-base`, or
   * a background against the button's own — needs the `!` modifier to win.
   * Classes that collide with nothing just apply.
   *
   * `icon` is the glyph and `iconWrapper` the tinted square behind it, since the
   * two are usually restyled together and the square is the one that carries the
   * tint.
   */
  ui?: {
    root?: string;
    title?: string;
    description?: string;
    iconWrapper?: string;
    icon?: string;
    actionLabel?: string;
  };
}

withDefaults(defineProps<Props>(), {
  icon: "heroicons:users",
  compact: false,
  ui: () => ({}),
});

const emit = defineEmits<{
  action: [];
}>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center text-center"
    :class="[compact ? 'h-56' : 'h-[60vh]', ui.root]"
  >
    <div
      class="flex size-12 items-center justify-center rounded-2xl bg-primary-50/20 p-0.5"
      :class="ui.iconWrapper"
    >
      <UIcon
        :name="icon"
        class="size-8 text-gray-400 dark:text-white/20"
        :class="ui.icon"
      />
    </div>

    <div>
      <p class="mt-3 text-base font-medium" :class="ui.title">
        {{ title }}
      </p>

      <p class="mt-1 text-sm text-muted" :class="ui.description">
        {{ description }}
      </p>
    </div>

    <Button
      v-if="actionLabel"
      size="md"
      class="mt-6"
      :class="ui.actionLabel"
      @click="emit('action')"
    >
      {{ actionLabel }}
    </Button>
  </div>
</template>
