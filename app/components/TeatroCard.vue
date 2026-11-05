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
    <h3
      class="font-playfair italic text-text group-hover:text-accent-light transition-colors"
      style="font-size: clamp(1.3rem, 2.5vw, 1.8rem); line-height: 1.2"
    >
      {{ teatro.nome }}
    </h3>
    <p
      class="font-cormorant italic text-accent/70"
      style="font-size: 0.9rem; letter-spacing: 0.05em; margin-top: 0.3rem"
    >
      {{ teatro.indirizzo }}
    </p>
    <p
      class="font-cormorant text-text/70"
      style="font-size: 1rem; line-height: 1.6; margin-top: 1rem"
    >
      {{ teatro.descrizione }}
    </p>
    <a
      v-if="teatro.sito_web"
      :href="teatro.sito_web"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block font-cinzel text-xs text-accent/50 tracking-widest hover:text-accent transition-colors"
      style="letter-spacing: 0.15em; margin-top: 1.2rem"
      @click.stop
    >
      {{ $t("teatro_website") }} ↗
    </a>
  </NuxtLink>
</template>

<script setup>
defineProps({
  teatro: { type: Object, required: true },
});

const localePath = useLocalePath();
</script>
