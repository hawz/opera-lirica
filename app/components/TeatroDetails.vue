<template>
  <div>
    <component
      :is="headingTag"
      :class="headingClass"
      :style="headingStyle"
    >
      {{ teatro.nome }}
    </component>
    <p :class="addressClass" :style="addressStyle">
      {{ teatro.indirizzo }}
    </p>
    <p :class="descriptionClass" :style="descriptionStyle">
      {{ teatro.descrizione }}
    </p>
    <a
      v-if="teatro.sito_web"
      :href="teatro.sito_web"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block font-cinzel text-xs text-accent/50 tracking-widest hover:text-accent transition-colors"
      :style="linkStyle"
      @click="compact ? $event.stopPropagation() : null"
    >
      {{ $t("teatro_website") }} ↗
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  teatro: { type: Object, required: true },
  compact: { type: Boolean, default: false },
});

const headingTag = props.compact ? "h3" : "h1";

const headingClass = props.compact
  ? "font-playfair italic text-text group-hover:text-accent-light transition-colors"
  : "font-playfair italic text-text";
const headingStyle = props.compact
  ? "font-size: clamp(1.3rem, 2.5vw, 1.8rem); line-height: 1.2"
  : "font-size: clamp(1.6rem, 4vw, 3rem); line-height: 1.2";

const addressClass = props.compact
  ? "font-cormorant italic text-accent/70"
  : "font-cormorant italic text-text/60";
const addressStyle = props.compact
  ? "font-size: 0.9rem; letter-spacing: 0.05em; margin-top: 0.3rem"
  : "font-size: 0.95rem; margin-top: 0.4rem; opacity: 0.75";

const descriptionClass = props.compact
  ? "font-cormorant text-text/70"
  : "font-cormorant text-text/80";
const descriptionStyle = props.compact
  ? "font-size: 1rem; line-height: 1.6; margin-top: 1rem"
  : "font-size: 1.1rem; line-height: 1.8; margin-top: 2rem";

const linkStyle = props.compact
  ? "letter-spacing: 0.15em; margin-top: 1.2rem"
  : "letter-spacing: 0.15em; margin-top: 2rem";
</script>
