<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <NuxtLink
      :to="localePath('/teatri')"
      class="font-cinzel text-xs text-accent/50 tracking-widest hover:text-accent transition-colors"
      style="letter-spacing: 0.15em"
    >
      ← {{ $t("teatri_title") }}
    </NuxtLink>

    <div
      v-if="teatro"
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
      <div
        class="font-cormorant italic text-accent"
        style="
          font-size: 0.85rem;
          letter-spacing: 0.3em;
          opacity: 0.7;
          margin-bottom: 0.3rem;
        "
      >
        {{ teatro.città }}
      </div>
      <TeatroDetails :teatro="teatro" />

      <div
        style="
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid rgb(var(--color-accent) / 0.1);
        "
      >
        <PalinsestoList :spettacoli="spettacoliInProgramma" />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();
const slug = route.params.teatro;

const { data: teatro } = await useAsyncData(
  `teatro-${locale.value}-${slug}`,
  () =>
    queryCollection(`teatri_${locale.value}`)
      .where("path", "=", `/${locale.value}/teatri/${slug}`)
      .first(),
);

if (!teatro.value) {
  throw createError({ statusCode: 404, statusMessage: "Teatro non trovato" });
}

const { data: spettacoli } = await useAsyncData(
  `spettacoli-${locale.value}-${slug}`,
  () => queryCollection(`spettacoli_${locale.value}`).all(),
);

const { data: opere } = await useAsyncData(`opere-${locale.value}`, () =>
  queryCollection(locale.value).all(),
);

const opereBySlug = computed(() => {
  const entries = (opere.value ?? [])
    .filter((opera) => opera.compositore)
    .map((opera) => [opera.path.split("/").pop(), opera]);
  return Object.fromEntries(entries);
});

const spettacoliInProgramma = computed(() => {
  const perQuestoTeatro = spettacoliForTeatro(spettacoli.value ?? [], slug);
  const inProgramma = upcomingSpettacoli(perQuestoTeatro, new Date());

  return inProgramma.map((spettacolo) => {
    const opera = opereBySlug.value[spettacolo.opera];
    return {
      ...spettacolo,
      targetLabel: opera?.title ?? spettacolo.opera,
      targetPath: opera
        ? `/${opera.path.split("/").slice(2).join("/")}`
        : "/",
    };
  });
});

useSeoMeta({
  title: () =>
    teatro.value ? `${teatro.value.nome} — ${teatro.value.città} — Opera Guide` : "Opera Guide",
  description: () => teatro.value?.descrizione ?? "",
  ogTitle: () => teatro.value?.nome ?? "",
  ogDescription: () => teatro.value?.descrizione ?? "",
  ogType: "article",
  twitterCard: "summary",
});
</script>
