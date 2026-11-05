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
