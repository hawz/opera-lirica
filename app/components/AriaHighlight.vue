<template>
  <div
    style="
      margin: 2rem 0;
      padding: 1.5rem 2rem;
      background: rgb(var(--color-accent) / 0.05);
      border: 1px dashed rgb(var(--color-accent) / 0.25);
      text-align: center;
    "
  >
    <div style="font-size: 1.5rem; margin-bottom: 0.5rem">♪</div>
    <div class="font-playfair italic text-accent-light" style="font-size: 1.3rem">
      {{ aria.nome }}
    </div>
    <div style="font-size: 0.95rem; color: rgb(var(--color-text-dim)); margin-top: 0.5rem">
      {{ aria.descrizione }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  aria: {
    type: Object,
    required: true,
  },
});
</script>
