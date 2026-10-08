
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "#imports";
import UButton from "@nuxt/ui/components/Button.vue";

definePageMeta({layout:false})
const props = withDefaults(
  defineProps<{
    /** Background image source for the left panel. */
    src?: string;
    /** Image source to use when the primary image fails to load. */
    fallbackSrc?: string;
    /** Show browser back/forward navigation buttons. */
    showNav?: boolean;
  }>(),
  {
    src: "/bg.jpg",
    fallbackSrc: "/bg.jpg",
    showNav: true,
  },
);

const router = useRouter();

const pageImage = ref(props.src);

watch(
  () => props.src,
  (src) => {
    pageImage.value = src;
  },
);

const onImageError = () => {
  if (pageImage.value !== props.fallbackSrc) {
    pageImage.value = props.fallbackSrc;
  }
};
</script>

<template>
  <div
    class="grid h-dvh w-full grid-cols-1 overflow-hidden bg-white dark:bg-onyx-700 lg:grid-cols-5"
  >
    <!-- Left: image -->
    <div class="relative hidden rounded-lg lg:col-span-3 lg:block">
      <img
        :src="pageImage"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
        @error="onImageError"
      />

      <div class="absolute inset-0 bg-black/10 dark:bg-black/30" />

      <!-- Frosted quote card -->
      <div class="absolute inset-0 flex items-center justify-center p-8">
        <div
          class="w-full max-w-lg rounded-2xl bg-white/30 p-10 shadow-lg backdrop-blur-md dark:bg-black/20"
        >

        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="absolute left-6 top-6 z-10 hidden items-center gap-2 lg:flex">
      <UButton
        icon="heroicons:arrow-left"
        size="lg"
        color="neutral"
        variant="solid"
        aria-label="Go back"
        class="bg-white text-gray-900 shadow-sm hover:bg-gray-100 dark:bg-onyx-600 dark:text-white dark:hover:bg-onyx-500"
        @click="router.back()"
      />

      <UButton
        icon="heroicons:arrow-right"
        size="lg"
        color="neutral"
        variant="solid"
        aria-label="Go forward"
        class="bg-white text-gray-900 shadow-sm hover:bg-gray-100 dark:bg-onyx-600 dark:text-white dark:hover:bg-onyx-500"
        @click="router.forward()"
      />
    </div>

    <!-- Right: content -->
    <div
      class="relative flex flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain bg-white px-6 pt-6 pb-10 transition-colors dark:bg-onyx-700 sm:px-10 lg:col-span-2 lg:px-16 lg:py-14"
    >
      <div class="mx-auto w-full max-w-md px-0 sm:px-6 lg:px-12 lg:my-auto">
          <div>
            <UAlert
              v-if="formError"
              color="error"
              variant="subtle"
              title="Request failed"
              :description="formError"
              class="mt-4"
              icon="heroicons:information-circle"
            />
        
            <AuthHeader
              title="Welcome"
              subtitle="Please enter your email and password"
            />
        
            <UForm
              :schema="schema"
              :state="state"
              class="space-y-4 w-full mt-6"
              @submit="onSubmit"
            >
              <RyderInput
                v-model="state.email"
                name="email"
                label="Email"
                placeholder="name@example.com"
              />
        
              <RyderInput
                v-model="state.password"
                name="password"
                label="Password"
                type="password"
              />
        
              <RyderButton
                type="submit"
                size="lg"
                :loading="loading"
                :disabled="loading"
                class="w-full"
              >
                Login
              </RyderButton>
            </UForm>
            <NuxtLink
              to="/auth/forgotten-password"
              class="text-sm mt-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors flex justify-end"
            >
              Forgot password?
            </NuxtLink>
        
            <p class="mt-6 text-center text-sm text-gray-500 dark:text-onyx-200">
              Don't have an account?
              <NuxtLink
                to="/auth/signup"
                class="text-primary-600 hover:text-primary-500 font-semibold"
              >
                Create one
              </NuxtLink>
            </p>
          </div>
      </div>

      <p class="mt-6 text-center text-[11px] text-gray-400 dark:text-gray-500">
        <slot name="footer" />
      </p>
    </div>
  </div>
</template>
