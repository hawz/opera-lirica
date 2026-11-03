<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <div class="mb-10">
      <h2 class="font-cinzel text-2xl text-accent-light tracking-widest mb-6">
        {{ $t("search") }}
      </h2>
      <input
        v-model="query" type="text" :placeholder="searchPlaceholder"
        class="w-full bg-bg-2 border border-accent/30 text-text font-cormorant text-lg px-5 py-3 outline-none focus:border-accent/60 placeholder:text-text/30 transition-colors" >
    </div>

    <!-- Risultati -->
    <div v-if="isSearchActive">

      <!-- Loading -->
      <div v-if="loading" class="space-y-3">
        <div
          v-for="n in 3" :key="n"
          style="height: 80px; border: 1px solid rgb(var(--color-accent) / 0.1); background: rgb(var(--color-bg-2) / 0.5); animation: pulse 1.5s ease-in-out infinite;" />
      </div>

      <!-- Nessun risultato -->
      <div v-else-if="risultati.length === 0" class="text-text/40 italic font-cormorant text-lg">
        {{ $t("no_results") }} "{{ query }}"
      </div>

      <!-- Lista risultati -->
      <div v-else class="space-y-3">
        <NuxtLink
          v-for="r in risultati" :key="r.path" :to="localePath(r.path.replace(`/${locale}`, ''))"
          class="block p-5 border border-accent/20 hover:border-accent/40 bg-bg-2/50 transition-all group">
          <div class="font-cormorant italic text-accent/60 text-sm mb-1">
            {{ r.compositore || r.years }}
          </div>
          <div class="font-playfair italic text-text text-lg group-hover:text-accent-light transition-colors">
            {{ r.title }}
          </div>
          <div v-if="r.tagline" class="text-text/40 text-sm mt-1">
            {{ r.tagline }}
          </div>
        </NuxtLink>
      </div>

    </div>

    <!-- Prompt iniziale -->
    <div v-else class="text-text/30 italic font-cormorant text-lg">
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
const isSearchActive = computed(() => shouldSearch(query.value))

useSeoMeta({
  title: () => t('seo_search_title'),
  description: () => t('seo_search_description'),
  ogTitle: () => t('seo_search_title'),
  ogDescription: () => t('seo_search_description'),
  ogType: 'website',
  twitterCard: 'summary',
})

watch(query, async (val) => {
  if (!shouldSearch(val)) {
    risultati.value = []
    return
  }

  loading.value = true
  const docs = await queryCollection(locale.value).all()
  risultati.value = searchOperas(docs, val)
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
