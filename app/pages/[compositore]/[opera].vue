<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <!-- Back -->
    <NuxtLink
      :to="`/${slug.compositore}`"
      class="font-cinzel text-xs text-gold/50 tracking-widest hover:text-gold transition-colors"
    >
      ← {{ opera?.compositore?.toUpperCase() }}
    </NuxtLink>

    <div v-if="opera" class="mt-8">
      <!-- Header opera -->
      <div class="mb-10">
        <div
          class="font-cormorant italic text-gold/70 text-sm tracking-widest mb-2"
        >
          {{ opera.anno }}
        </div>
        <h1
          class="font-playfair italic text-cream text-4xl md:text-5xl leading-tight"
        >
          {{ opera.title }}
        </h1>
        <p class="font-cormorant italic text-cream/60 text-lg mt-3">
          {{ opera.tagline }}
        </p>
        <div
          class="w-48 h-px bg-gradient-to-r from-gold/50 to-transparent mt-6"
        />
      </div>

      <!-- Personaggi -->
      <OperaCharacters
        v-if="opera.meta.personaggi"
        :personaggi="opera.meta.personaggi"
        class="mb-10"
      />

      <!-- Atti -->
      <OperaActs v-if="opera.meta.atti" :atti="opera.meta.atti" class="mb-4" />

      <!-- Aria -->
      <AriaHighlight v-if="opera.meta.aria" :aria="opera.meta.aria" />

      <!-- Finale -->
      <OperaFinale v-if="opera.meta.finale" :testo="opera.meta.finale" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { locale } = useI18n();
const slug = {
  compositore: route.params.compositore,
  opera: route.params.opera,
};

const { data: opera } = await useAsyncData(
  `opera-${locale.value}-${slug.compositore}-${slug.opera}`,
  () =>
    queryCollection(locale.value)
      .where("path", "=", `/${locale.value}/${slug.compositore}/${slug.opera}`)
      .first()
);

if (!opera.value) {
  throw createError({ statusCode: 404, statusMessage: "Opera non trovata" });
}
</script>
