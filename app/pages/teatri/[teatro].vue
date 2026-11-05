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
      <h1
        class="font-playfair italic text-text"
        style="font-size: clamp(1.6rem, 4vw, 3rem); line-height: 1.2"
      >
        {{ teatro.nome }}
      </h1>
      <p
        class="font-cormorant italic text-text/60"
        style="font-size: 0.95rem; margin-top: 0.4rem; opacity: 0.75"
      >
        {{ teatro.indirizzo }}
      </p>

      <p
        class="font-cormorant text-text/80"
        style="font-size: 1.1rem; line-height: 1.8; margin-top: 2rem"
      >
        {{ teatro.descrizione }}
      </p>

      <a
        v-if="teatro.sito_web"
        :href="teatro.sito_web"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block font-cinzel text-xs text-accent/50 tracking-widest hover:text-accent transition-colors"
        style="letter-spacing: 0.15em; margin-top: 2rem"
      >
        {{ $t("teatro_website") }} ↗
      </a>
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
