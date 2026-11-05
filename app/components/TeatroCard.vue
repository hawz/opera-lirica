<template>
  <NuxtLink
    :to="localePath(`/teatri/${teatro.path.split('/').pop()}`)"
    class="group block border border-accent/25 hover:border-accent/50 transition-colors"
    style="
      padding: 2rem 2.5rem;
      background: linear-gradient(
        160deg,
        rgb(var(--color-bg-2) / 0.6) 0%,
        rgb(var(--color-bg) / 0.9) 100%
      );
    "
  >
    <TeatroDetails :teatro="teatro" compact />
  </NuxtLink>
</template>

<script setup>
defineProps({
  teatro: { type: Object, required: true },
});

const localePath = useLocalePath();
</script>
