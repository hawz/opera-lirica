<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <div class="mb-10">
      <h2 class="font-cinzel text-2xl text-gold-light tracking-widest mb-6">
        {{ $t("search") }}
      </h2>
      <input v-model="query" type="text" :placeholder="searchPlaceholder"
        class="w-full bg-dark-2 border border-gold/30 text-cream font-cormorant text-lg px-5 py-3 outline-none focus:border-gold/60 placeholder:text-cream/30 transition-colors" />
    </div>

    <!-- Risultati -->
    <div v-if="query.length > 1">

      <!-- Loading -->
      <div v-if="loading" class="space-y-3">
        <div v-for="n in 3" :key="n"
          style="height: 80px; border: 1px solid rgba(201,168,76,0.1); background: rgba(26,18,9,0.5); animation: pulse 1.5s ease-in-out infinite;" />
      </div>

      <!-- Nessun risultato -->
      <div v-else-if="risultati.length === 0" class="text-cream/40 italic font-cormorant text-lg">
        {{ $t("no_results") }} "{{ query }}"
      </div>

      <!-- Lista risultati -->
      <div v-else class="space-y-3">
        <NuxtLink v-for="r in risultati" :key="r.path" :to="localePath(r.path.replace(`/${locale}`, ''))"
          class="block p-5 border border-gold/20 hover:border-gold/40 bg-dark-2/50 transition-all group">
          <div class="font-cormorant italic text-gold/60 text-sm mb-1">
            {{ r.compositore || r.years }}
          </div>
          <div class="font-playfair italic text-cream text-lg group-hover:text-gold-light transition-colors">
            {{ r.title }}
          </div>
          <div v-if="r.tagline" class="text-cream/40 text-sm mt-1">
            {{ r.tagline }}
          </div>
        </NuxtLink>
      </div>

    </div>

    <!-- Prompt iniziale -->
    <div v-else class="text-cream/30 italic font-cormorant text-lg">
      {{ $t("start_typing") }}
    </div>
  </div>
</template>

<script setup>
const { locale, t } = useI18n()
const localePath = useLocalePath()
const query = ref('')
const risultati = ref([])
const loading = ref(false)
const searchPlaceholder = t('search_placeholder')

useSeoMeta({
  title: () => t('seo_search_title'),
  description: () => t('seo_search_description'),
  ogTitle: () => t('seo_search_title'),
  ogDescription: () => t('seo_search_description'),
  ogType: 'website',
  twitterCard: 'summary',
})

watch(query, async (val) => {
  if (val.trim().length < 2) {
    risultati.value = []
    return
  }

  loading.value = true

  const [byTitle, byCompositore, byTagline] = await Promise.all([
    queryCollection(locale.value).where('title', 'LIKE', `%${val}%`).all(),
    queryCollection(locale.value).where('compositore', 'LIKE', `%${val}%`).all(),
    queryCollection(locale.value).where('tagline', 'LIKE', `%${val}%`).all(),
  ])

  const tutti = [...byTitle, ...byCompositore, ...byTagline]
  const visti = new Set()
  risultati.value = tutti.filter((doc) => {
    if (visti.has(doc.path)) return false
    visti.add(doc.path)
    return true
  })

  loading.value = false
})
</script>

<style scoped>
@keyframes pulse {

  0%,
  100% {
    opacity: 0.4;
  }

  50% {
    opacity: 0.8;
  }
}
</style>
