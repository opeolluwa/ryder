<script setup lang="ts">
import { type Quote } from "./data";
import quotes from "./data";
import LeadingText from "../typography/LeadingText.vue";
import { ref, onMounted, onBeforeUnmount} from "vue";
const duration = 15000;

const current = ref<Quote | null>(null);

function pickRandom(): Quote {
  const index = Math.floor(quotes.length * Math.random());
  return quotes[index] ?? quotes[0] ?? { quote: "", quoter: "" };
}

let interval: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
  current.value = pickRandom();
  interval = setInterval(() => {
    current.value = pickRandom();
  }, duration);
});

onBeforeUnmount(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <div v-if="current" class="flex flex-col items-center justify-center">
    <Transition appear mode="out-in" name="quote-fade">
      <div :key="current.quote" class="quote">
        <LeadingText class="quote-text text-gray-200">{{
          current.quote
        }}</LeadingText>
        <small class="quoter text-gray-200">{{ current.quoter }}</small>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.quote {
  font-size: 110%;
  font-weight: 200;
  font-family: "Crimson Pro", serif;
  text-align: center;
  margin-bottom: 1rem;
  max-width: 100%;
}

.quote-text::before {
  content: "\201C\00A0";
}

.quote-text::after {
  content: "\00A0\201D";
}

.quoter {
  text-align: center;
  display: inline-block;
  font-size: 80%;
  font-family: "Crimson Pro", serif;
}

.quoter::before {
  content: "\2014\00A0";
}

.quote-fade-enter-active,
.quote-fade-leave-active {
  transition:
    opacity 0.6s ease,
    filter 0.6s ease;
}

.quote-fade-enter-from,
.quote-fade-leave-to {
  opacity: 0;
  filter: blur(5px);
}
</style>
