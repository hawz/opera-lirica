<template>
  <div class="flex flex-wrap justify-center gap-3">
    <button
      v-for="city in cities"
      :key="city"
      type="button"
      class="font-cinzel text-xs tracking-widest px-4 py-2 border transition-colors"
      style="letter-spacing: 0.1em"
      :class="
        city === modelValue
          ? 'border-accent text-accent'
          : 'border-accent/25 text-text/60 hover:border-accent/50 hover:text-accent/80'
      "
      @click="$emit('update:modelValue', city)"
    >
      {{ city }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  cities: { type: Array, required: true },
  modelValue: { type: String, default: null },
});
defineEmits(["update:modelValue"]);
</script>
