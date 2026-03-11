<template>
  <div
    class="my-8 p-6 bg-gold/5 border border-dashed border-gold/25 text-center"
  >
    <div class="text-2xl mb-2">♪</div>
    <div class="font-playfair italic text-gold-light text-xl mb-2">
      {{ aria.nome }}
    </div>
    <div class="text-cream/70 text-sm">{{ aria.descrizione }}</div>
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
