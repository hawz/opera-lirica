<template>
  <div>
    <div class="flex items-center gap-4 mb-4">
      <span class="font-cinzel text-xs tracking-widest text-gold uppercase">
        {{ $t("story") }}
      </span>
      <div class="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
    </div>
    <div class="space-y-6">
      <div
        v-for="atto in atti"
        :key="atto.titolo"
        class="pl-5 border-l-2 border-crimson relative"
      >
        <div
          class="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-crimson"
        />
        <div
          class="font-cinzel text-xs tracking-widest text-crimson/80 mb-2 uppercase"
        >
          {{ atto.titolo }}
        </div>
        <p class="text-cream-2/90 leading-relaxed">{{ atto.testo }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  atti: {
    type: Array,
    required: true,
  },
});
</script>
