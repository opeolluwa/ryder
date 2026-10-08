<script lang="ts" setup>
import LeadingText from '../typography/LeadingText.vue';
import SubText from '../typography/SubText.vue';
defineProps({
    title: {
        type: String,
        default: "",
    },
    subtitle: {
        type: String,
        default: "",
    },
});
</script>
<template>
  <div class="my-5 text-left lg:text-center">
    <LeadingText> {{ title }} </LeadingText>
    <SubText> {{ subtitle }}</SubText>
  </div>
</template>
