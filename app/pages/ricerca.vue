<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <div class="mb-10">
      <h2 class="font-cinzel text-2xl text-gold-light tracking-widest mb-6">
        RICERCA
      </h2>
      <input
        v-model="query"
        type="text"
        placeholder="Cerca un'opera, un personaggio, un compositore..."
        class="w-full bg-dark-2 border border-gold/30 text-cream font-cormorant text-lg px-5 py-3 outline-none focus:border-gold/60 placeholder:text-cream/30 transition-colors"
      />
    </div>

    <!-- Risultati -->
    <div v-if="query.length > 1" class="space-y-3">
      <div
        v-if="risultati?.length === 0"
        class="text-cream/40 italic font-cormorant text-lg"
      >
        Nessun risultato per "{{ query }}"
      </div>
      <NuxtLink
        v-for="r in risultati"
        :key="r.path"
        :to="r.path"
        class="block p-5 border border-gold/20 hover:border-gold/40 bg-dark-2/50 transition-all group"
      >
        <div class="font-cormorant italic text-gold/60 text-sm mb-1">
          {{ r.compositore || r.years }}
        </div>
        <div
          class="font-playfair italic text-cream text-lg group-hover:text-gold-light transition-colors"
        >
          {{ r.title }}
        </div>
        <div v-if="r?.tagline" class="text-cream/40 text-sm mt-1">
          {{ r.tagline }}
        </div>
      </NuxtLink>
    </div>

    <div v-else class="text-cream/30 italic font-cormorant text-lg">
      Inizia a scrivere per cercare...
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const query = ref("");

const { data: risultati } = await useAsyncData(
  `ricerca-${locale.value}`,
  () => {
    if (query.value.length < 2) return Promise.resolve([]);
    return queryCollection(locale.value)
      .where("title", "LIKE", `%${query.value}%`)
      .all();
  },
  { watch: [query] }
);
</script>
