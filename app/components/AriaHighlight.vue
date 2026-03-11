<template>
  <div
    style="
      margin: 2rem 0;
      padding: 1.5rem 2rem;
      background: rgba(201, 168, 76, 0.05);
      border: 1px dashed rgba(201, 168, 76, 0.25);
      text-align: center;
    "
  >
    <div style="font-size: 1.5rem; margin-bottom: 0.5rem">♪</div>
    <div class="font-playfair italic text-gold-light" style="font-size: 1.3rem">
      {{ aria.nome }}
    </div>
    <div style="font-size: 0.95rem; color: #d4c4a0; margin-top: 0.5rem">
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
