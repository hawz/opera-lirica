<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <NuxtLink
      :to="localePath('/')"
      class="font-cinzel text-xs text-gold/50 tracking-widest hover:text-gold transition-colors"
    >
      ← {{ $t("all_composers") }}
    </NuxtLink>

    <div
      v-if="compositore"
      class="text-center my-12 p-10 border border-gold/20 bg-gradient-to-br from-dark-2/80 to-dark/95 relative"
    >
      <div class="absolute inset-2 border border-gold/10 pointer-events-none" />
      <div
        class="font-cormorant italic text-gold/70 tracking-widest text-sm mb-2"
      >
        {{ compositore.years || compositore.meta.years }}
      </div>
      <h1 class="font-cinzel text-4xl md:text-5xl text-cream tracking-wide">
        {{ compositore.title }}
      </h1>
      <p
        class="font-cormorant italic text-cream/70 max-w-xl mx-auto mt-4 text-lg leading-relaxed"
      >
        {{ compositore.bio }}
      </p>
    </div>

    <div class="space-y-4">
      <NuxtLink
        v-for="(opera, i) in opere"
        :key="opera.path"
        :to="localePath(`/${slug}/${opera.path.split('/').pop()}`)"
        class="flex items-center gap-6 p-6 border border-gold/20 hover:border-gold/40 bg-dark-2/50 hover:bg-dark-2/80 transition-all duration-300 group"
      >
        <div class="font-cinzel text-3xl text-gold/15 font-bold min-w-[48px]">
          {{ String(i + 1).padStart(2, "0") }}
        </div>
        <div class="flex-1">
          <div class="font-cormorant italic text-gold/60 text-sm mb-1">
            {{ opera.anno }}
          </div>
          <div
            class="font-playfair italic text-cream text-xl group-hover:text-gold-light transition-colors"
          >
            {{ opera.title }}
          </div>
          <div class="text-cream/50 text-sm mt-1">{{ opera.tagline }}</div>
        </div>
        <div
          class="text-gold/30 group-hover:text-gold/60 transition-colors text-xl"
        >
          ›
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();
const slug = route.params.compositore;

const { data: compositore } = await useAsyncData(
  `compositore-${locale.value}-${slug}`,
  () =>
    queryCollection(locale.value)
      .where("path", "=", `/${locale.value}/${slug}`)
      .first()
);

if (!compositore.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Compositore non trovato",
  });
}

const { data: opere } = await useAsyncData(
  `opere-${locale.value}-${slug}`,
  () =>
    queryCollection(locale.value)
      .where("path", "LIKE", `/${locale.value}/${slug}/%`)
      .all()
);
</script>
