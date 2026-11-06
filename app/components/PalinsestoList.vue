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

    <ul v-else style="display: flex; flex-direction: column; gap: 1.5rem">
      <li
        v-for="gruppo in gruppi"
        :key="gruppo.targetPath"
        class="border-t border-accent/10"
        style="padding-top: 1rem"
      >
        <NuxtLink
          :to="localePath(gruppo.targetPath)"
          class="font-playfair italic text-text hover:text-accent-light transition-colors"
          style="font-size: 1.1rem"
        >
          {{ gruppo.targetLabel }}
        </NuxtLink>
        <ul style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.4rem">
          <li v-for="occorrenza in gruppo.occorrenze" :key="occorrenza.data">
            <p class="font-cormorant italic text-accent/70" style="font-size: 0.9rem">
              {{ formattedDate(occorrenza) }}
            </p>
            <a
              v-if="occorrenza.link_biglietti"
              :href="occorrenza.link_biglietti"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block font-cinzel text-xs text-accent/50 tracking-widest hover:text-accent transition-colors"
              style="letter-spacing: 0.15em; margin-top: 0.2rem"
            >
              {{ $t("spettacolo_tickets") }} ↗
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  spettacoli: { type: Array, required: true },
  titleKey: { type: String, default: "palinsesto_title" },
  emptyKey: { type: String, default: "palinsesto_empty" },
});

const { locale } = useI18n();
const localePath = useLocalePath();

const gruppi = computed(() => groupSpettacoliByTarget(props.spettacoli));

function formattedDate(occorrenza) {
  const [year, month, day] = occorrenza.data.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const formatted = date.toLocaleDateString(locale.value, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return occorrenza.ora ? `${formatted} · ${occorrenza.ora}` : formatted;
}
</script>
