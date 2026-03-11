<template>
  <div
    class="mt-8 p-5 border border-gold/20 border-l-4 border-l-gold bg-gradient-to-r from-crimson/10 to-gold/5"
  >
    <div class="flex items-center gap-4 mb-3">
      <span class="font-cinzel text-xs tracking-widest text-gold uppercase">
        {{ $t("finale") }}
      </span>
      <div class="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
    </div>
    <p class="font-cormorant italic text-cream-2 leading-relaxed">
      {{ testo }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  testo: {
    type: String,
    required: true,
  },
});
</script>
