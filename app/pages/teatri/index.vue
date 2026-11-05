<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div class="text-center mb-10">
      <h2 class="font-cinzel text-2xl text-accent-light tracking-widest mb-4">
        {{ $t("teatri_title") }}
      </h2>
      <p class="text-text-dim/80 text-lg leading-relaxed max-w-2xl mx-auto">
        {{ $t("teatri_subtitle") }}
      </p>
    </div>

    <TeatroCityPicker v-model="selectedCity" :cities="città" class="mb-12" />

    <div v-if="selectedCity" style="display: flex; flex-direction: column; gap: 1.5rem">
      <TeatroCard v-for="teatro in teatriDellaCittà" :key="teatro.path" :teatro="teatro" />
    </div>
    <div v-else class="text-text/30 italic font-cormorant text-lg text-center">
      {{ $t("teatri_choose_city") }}
    </div>
  </div>
</template>

<script setup>
const { locale, t } = useI18n();

useSeoMeta({
  title: () => t("seo_teatri_title"),
  description: () => t("seo_teatri_description"),
  ogTitle: () => t("seo_teatri_title"),
  ogDescription: () => t("seo_teatri_description"),
  ogType: "website",
  twitterCard: "summary",
});

const { data: teatri } = await useAsyncData(
  `teatri-${locale.value}`,
  () => queryCollection(`teatri_${locale.value}`).all(),
);

const città = computed(() =>
  [...new Set((teatri.value ?? []).map((t) => t.città))].sort(),
);

const selectedCity = ref(null);

const teatriDellaCittà = computed(() =>
  (teatri.value ?? []).filter((t) => t.città === selectedCity.value),
);
</script>
