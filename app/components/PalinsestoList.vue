<template>
  <div>
    <h2
      class="font-cinzel text-xs text-accent/70 tracking-widest"
      style="letter-spacing: 0.2em; margin-bottom: 1rem"
    >
      {{ $t(titleKey) }}
    </h2>

    <p
      v-if="spettacoli.length === 0"
      class="font-cormorant italic text-text/50"
    >
      {{ $t(emptyKey) }}
    </p>

    <ul v-else style="display: flex; flex-direction: column; gap: 1rem">
      <li
        v-for="spettacolo in spettacoli"
        :key="`${spettacolo.data}-${spettacolo.opera}-${spettacolo.teatro}`"
        class="border-t border-accent/10"
        style="padding-top: 1rem"
      >
        <NuxtLink
          :to="localePath(spettacolo.targetPath)"
          class="font-playfair italic text-text hover:text-accent-light transition-colors"
          style="font-size: 1.1rem"
        >
          {{ spettacolo.targetLabel }}
        </NuxtLink>
        <p
          class="font-cormorant italic text-accent/70"
          style="font-size: 0.9rem; margin-top: 0.2rem"
        >
          {{ formattedDate(spettacolo) }}
        </p>
        <a
          v-if="spettacolo.link_biglietti"
          :href="spettacolo.link_biglietti"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block font-cinzel text-xs text-accent/50 tracking-widest hover:text-accent transition-colors"
          style="letter-spacing: 0.15em; margin-top: 0.5rem"
        >
          {{ $t("spettacolo_tickets") }} ↗
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  spettacoli: { type: Array, required: true },
  titleKey: { type: String, default: "palinsesto_title" },
  emptyKey: { type: String, default: "palinsesto_empty" },
});

const { locale } = useI18n();
const localePath = useLocalePath();

function formattedDate(spettacolo) {
  const [year, month, day] = spettacolo.data.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const formatted = date.toLocaleDateString(locale.value, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return spettacolo.ora ? `${formatted} · ${spettacolo.ora}` : formatted;
}
</script>
