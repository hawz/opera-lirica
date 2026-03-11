<template>
  <div class="max-w-4xl mx-auto px-4 py-16">
    <div class="text-center mb-16">
      <h2 class="font-playfair italic text-gold-light text-3xl mb-6">
        {{ $t("welcome_title") }}
      </h2>
      <p class="text-cream-2/80 text-lg leading-relaxed max-w-2xl mx-auto">
        {{ $t("welcome_text") }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NuxtLink
        v-for="c in compositoriOrdinati"
        :key="c.slug"
        :to="localePath(`/${c.slug}`)"
        class="block p-8 border border-gold/25 bg-gradient-to-br from-dark-2/80 to-dark/95 hover:border-gold/50 transition-all duration-300 group"
      >
        <div
          class="font-cormorant italic text-gold/70 text-sm tracking-widest mb-1"
        >
          {{ c.years || c.meta.years }}
        </div>
        <h3
          class="font-cinzel text-cream text-2xl tracking-wide group-hover:text-gold-light transition-colors"
        >
          {{ c.title }}
        </h3>
        <p class="text-cream/60 text-sm mt-3 leading-relaxed line-clamp-2">
          {{ c.bio }}
        </p>
        <div
          class="mt-4 text-gold/50 text-xs font-cinzel tracking-widest group-hover:text-gold transition-colors"
        >
          {{ c.meta.opere?.length || 0 }} {{ $t("operas_count") }} →
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const localePath = useLocalePath();

const { data: compositori } = await useAsyncData(
  `compositori-${locale.value}`,
  () =>
    queryCollection(locale.value)
      .where(
        "path",
        "IN",
        [
          `/en/mozart`,
          `/en/verdi`,
          `/en/puccini`,
          `/en/altri`,
          `/en/donizetti`,
          `/en/wagner`,
          `/en/strauss`,
        ].map((p) => p.replace("/en/", `/${locale.value}/`))
      )
      .all()
);

const compositoriOrdinati = computed(() =>
  [...(compositori.value ?? [])].sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99)
  )
);
</script>
