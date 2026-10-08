<script setup lang="ts">
import Button from "../../../src/components/primitives/Button.vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button>primary sm</Button>
    <Button size="md" variant="outline">outline md</Button>
    <Button variant="ghost" color="error">ghost error</Button>
    <Button variant="soft" color="success">soft success</Button>
    <Button loading>loading</Button>
    <Button disabled>disabled</Button>
  </div>
</template>
