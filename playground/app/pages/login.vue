<script setup lang="ts">
import { ref } from "vue";
definePageMeta({
    layout: false,
});
const email = ref("");
const password = ref("");
</script>

<template>
    <NuxtLayout name="RyderSplitLayout">
        <div>
            <RyderAuthHeader
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
                    v-model="email"
                    name="email"
                    label="Email"
                    placeholder="name@example.com"
                />

                <RyderInput
                    v-model="password"
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
    </NuxtLayout>
</template>
