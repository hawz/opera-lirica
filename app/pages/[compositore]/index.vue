<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <NuxtLink
      :to="localePath('/')"
      class="font-cinzel text-xs text-gold/50 tracking-widest hover:text-gold transition-colors"
      style="letter-spacing: 0.15em"
    >
      ← {{ $t("all_composers") }}
    </NuxtLink>

    <!-- Composer header -->
    <div
      v-if="compositore"
      class="text-center relative border border-gold/20"
      style="
        margin: 3rem 0;
        padding: 3rem 2rem;
        background: linear-gradient(
          135deg,
          rgba(36, 26, 14, 0.8) 0%,
          rgba(26, 18, 9, 0.95) 100%
        );
      "
    >
      <!-- Bordo interno decorativo -->
      <div
        class="absolute pointer-events-none"
        style="inset: 8px; border: 1px solid rgba(201, 168, 76, 0.1)"
        aria-hidden="true"
      />
      <div
        class="font-cormorant italic text-gold"
        style="
          font-size: 1rem;
          letter-spacing: 0.3em;
          margin-bottom: 0.5rem;
          opacity: 0.8;
        "
      >
        {{ compositore.years }}
      </div>
      <h1
        class="font-cinzel text-cream"
        style="font-size: clamp(2rem, 5vw, 3.5rem); letter-spacing: 0.1em"
      >
        {{ compositore.title }}
      </h1>
      <p
        class="font-cormorant italic text-cream/70 mx-auto mt-6"
        style="max-width: 600px; line-height: 1.8; font-size: 1.05rem"
      >
        {{ compositore.bio }}
      </p>
    </div>

    <!-- Lista opere -->
    <div style="display: flex; flex-direction: column; gap: 0">
      <NuxtLink
        v-for="(opera, i) in opere"
        :key="opera.path"
        :to="localePath(`/${slug}/${opera.path.split('/').pop()}`)"
        class="group"
        style="
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 2rem 2.5rem;
          border: 1px solid rgba(201, 168, 76, 0.25);
          background: linear-gradient(
            160deg,
            rgba(36, 26, 14, 0.6) 0%,
            rgba(13, 10, 7, 0.9) 100%
          );
          margin-bottom: 4rem;
          transition: border-color 0.3s;
        "
        @mouseover="
          $event.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'
        "
        @mouseleave="
          $event.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'
        "
      >
        <!-- Numero -->
        <div
          class="font-cinzel font-bold"
          style="
            font-size: 3rem;
            color: rgba(201, 168, 76, 0.2);
            min-width: 60px;
            line-height: 1;
          "
        >
          {{ String(i + 1).padStart(2, "0") }}
        </div>

        <!-- Testo -->
        <div style="flex: 1">
          <div
            class="font-cormorant italic text-gold"
            style="
              font-size: 0.85rem;
              letter-spacing: 0.3em;
              opacity: 0.7;
              margin-bottom: 0.3rem;
            "
          >
            <span v-if="slug === 'altri'">{{ opera.compositore }} · </span>
            {{ opera.anno }}
          </div>
          <div
            class="font-playfair italic text-cream group-hover:text-gold-light transition-colors"
            style="font-size: clamp(1.4rem, 2.5vw, 2rem); line-height: 1.2"
          >
            {{ opera.title }}
          </div>
          <div
            class="font-cormorant text-cream/60"
            style="
              font-size: 0.95rem;
              margin-top: 0.4rem;
              font-style: italic;
              opacity: 0.75;
            "
          >
            {{ opera.tagline }}
          </div>
        </div>

        <!-- Freccia -->
        <div
          class="text-gold/30 group-hover:text-gold/60 transition-colors"
          style="font-size: 1.5rem"
        >
          ›
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { locale, t } = useI18n();
const localePath = useLocalePath();
const slug = route.params.compositore;

const { data: compositore } = await useAsyncData(
  `compositore-${locale.value}-${slug}`,
  () =>
    queryCollection(locale.value)
      .where("path", "=", `/${locale.value}/${slug}`)
      .first(),
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
      .all(),
);

useSeoMeta({
  title: () =>
    compositore.value
      ? `${compositore.value.title} (${compositore.value.years}) — Opera Guide`
      : "Opera Guide",
  description: () => compositore.value?.bio ?? "",
  ogTitle: () => compositore.value?.title ?? "",
  ogDescription: () => compositore.value?.bio ?? "",
  ogType: "website",
  twitterCard: "summary",
});
</script>
