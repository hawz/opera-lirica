<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <!-- Back -->
    <NuxtLink
      :to="localePath(`/${slug.compositore}`)"
      class="font-cinzel text-xs text-gold/50 tracking-widest hover:text-gold transition-colors"
      style="letter-spacing: 0.15em"
    >
      ← {{ opera?.compositore?.toUpperCase() }}
    </NuxtLink>

    <div
      v-if="opera"
      style="
        margin-top: 2rem;
        border: 1px solid rgba(201, 168, 76, 0.25);
        background: linear-gradient(
          160deg,
          rgba(36, 26, 14, 0.6) 0%,
          rgba(13, 10, 7, 0.9) 100%
        );
        padding: 2rem 2.5rem;
      "
    >
      <!-- Header opera -->
      <div
        style="
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(201, 168, 76, 0.1);
        "
      >
        <div
          class="font-cormorant italic text-gold"
          style="
            font-size: 0.85rem;
            letter-spacing: 0.3em;
            opacity: 0.7;
            margin-bottom: 0.3rem;
          "
        >
          {{ opera.anno }}
        </div>
        <h1
          class="font-playfair italic text-cream"
          style="font-size: clamp(1.6rem, 4vw, 3rem); line-height: 1.2"
        >
          {{ opera.title }}
        </h1>
        <p
          class="font-cormorant italic text-cream/60"
          style="font-size: 0.95rem; margin-top: 0.4rem; opacity: 0.75"
        >
          {{ opera.tagline }}
        </p>
      </div>

      <!-- Personaggi -->
      <OperaCharacters
        v-if="opera.personaggi"
        :personaggi="opera.personaggi"
        style="margin-bottom: 2.5rem"
      />

      <!-- Atti -->
      <OperaActs
        v-if="opera.atti"
        :atti="opera.atti"
        style="margin-bottom: 2rem"
      />

      <!-- Aria -->
      <AriaHighlight v-if="opera.aria" :aria="opera.aria" />

      <!-- Finale -->
      <OperaFinale v-if="opera.finale" :testo="opera.finale" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();
const slug = {
  compositore: route.params.compositore,
  opera: route.params.opera,
};

const { data: opera } = await useAsyncData(
  `opera-${locale.value}-${slug.compositore}-${slug.opera}`,
  () =>
    queryCollection(locale.value)
      .where("path", "=", `/${locale.value}/${slug.compositore}/${slug.opera}`)
      .first(),
);

if (!opera.value) {
  throw createError({ statusCode: 404, statusMessage: "Opera non trovata" });
}

useSeoMeta({
  title: () =>
    opera.value
      ? `${opera.value.title} — ${opera.value.compositore} — Opera Guide`
      : "Opera Guide",
  description: () =>
    opera.value ? `${opera.value.tagline} ${opera.value.anno}.` : "",
  ogTitle: () =>
    opera.value ? `${opera.value.title} — ${opera.value.compositore}` : "",
  ogDescription: () => opera.value?.tagline ?? "",
  ogType: "article",
  twitterCard: "summary",
});
</script>
