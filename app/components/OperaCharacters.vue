<template>
  <div>
    <div class="flex items-center gap-4 mb-4">
      <span class="font-cinzel text-xs tracking-widest text-gold uppercase">
        {{ $t("characters") }}
      </span>
      <div class="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <div
        v-for="p in personaggi"
        :key="p.nome"
        class="p-4 border border-gold/15 bg-black/30"
      >
        <div class="font-playfair font-bold text-cream text-base mb-1">
          {{ p.nome }}
        </div>
        <div
          class="font-cormorant italic text-gold/70 text-sm mb-2 tracking-wide"
        >
          {{ p.voce }}
        </div>
        <div class="text-sm text-cream/70 leading-relaxed">
          {{ p.descrizione }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  personaggi: {
    type: Array,
    required: true,
  },
});
</script>
