<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <!-- Back -->
    <NuxtLink
      :to="localePath(`/${slug.compositore}`)"
      class="font-cinzel text-xs text-accent/50 tracking-widest hover:text-accent transition-colors"
      style="letter-spacing: 0.15em"
    >
      ← {{ opera?.compositore?.toUpperCase() }}
    </NuxtLink>

    <div
      v-if="opera"
      style="
        margin-top: 2rem;
        border: 1px solid rgb(var(--color-accent) / 0.25);
        background: linear-gradient(
          160deg,
          rgb(var(--color-bg-2) / 0.6) 0%,
          rgb(var(--color-bg) / 0.9) 100%
        );
        padding: 2rem 2.5rem;
      "
    >
      <!-- Header opera -->
      <div
        style="
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgb(var(--color-accent) / 0.1);
        "
      >
        <div
          class="font-cormorant italic text-accent"
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
          class="font-playfair italic text-text"
          style="font-size: clamp(1.6rem, 4vw, 3rem); line-height: 1.2"
        >
          {{ opera.title }}
        </h1>
        <p
          class="font-cormorant italic text-text/60"
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

      <!-- Spettacoli -->
      <div
        v-if="spettacoliInProgramma.length > 0"
        style="
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid rgb(var(--color-accent) / 0.1);
        "
      >
        <PalinsestoList
          :spettacoli="spettacoliInProgramma"
          title-key="opera_spettacoli_title"
          empty-key="opera_spettacoli_empty"
        />
      </div>
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

const { data: spettacoli } = await useAsyncData(
  `spettacoli-opera-${locale.value}-${slug.opera}`,
  () => queryCollection(`spettacoli_${locale.value}`).all(),
);

const { data: teatri } = await useAsyncData(`teatri-${locale.value}`, () =>
  queryCollection(`teatri_${locale.value}`).all(),
);

const teatriBySlug = computed(() => {
  const entries = (teatri.value ?? []).map((teatro) => [
    teatro.path.split("/").pop(),
    teatro,
  ]);
  return Object.fromEntries(entries);
});

const spettacoliInProgramma = computed(() => {
  const perQuestaOpera = spettacoliForOpera(spettacoli.value ?? [], slug.opera);
  const inProgramma = upcomingSpettacoli(perQuestaOpera, new Date());

  return inProgramma.map((spettacolo) => {
    const teatro = teatriBySlug.value[spettacolo.teatro];
    return {
      ...spettacolo,
      targetLabel: teatro?.nome ?? spettacolo.teatro,
      targetPath: teatro ? stripLocalePrefix(teatro.path) : "/",
    };
  });
});

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
