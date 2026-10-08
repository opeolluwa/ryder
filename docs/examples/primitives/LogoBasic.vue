<script setup lang="ts">
import Logo from "../../../src/components/primitives/Logo.vue";
</script>

<template>
  <div class="flex flex-col gap-4">
    <Logo to="/" />
    <Logo
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'%3E%3Crect width='120' height='40' rx='8' fill='%231a1a1a'/%3E%3Ctext x='60' y='25' font-size='14' fill='%23fff' text-anchor='middle'%3ERyder%3C/text%3E%3C/svg%3E"
      src-dark="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'%3E%3Crect width='120' height='40' rx='8' fill='%23fff'/%3E%3Ctext x='60' y='25' font-size='14' fill='%231a1a1a' text-anchor='middle'%3ERyder%3C/text%3E%3C/svg%3E"
      alt="Ryder"
      to="/"
    />
  </div>
</template>
