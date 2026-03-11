<template>
  <header
    class="text-center px-4 relative overflow-hidden"
    style="padding: 5rem 2rem 3rem"
  >
    <!-- Alone cremisi dall'alto, come nell'originale -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="
        background: radial-gradient(
          ellipse 80% 60% at 50% 0%,
          rgba(139, 26, 26, 0.3) 0%,
          transparent 70%
        );
      "
      aria-hidden="true"
    />

    <NuxtLink :to="localePath('/')" class="inline-block relative">
      <p
        class="font-cinzel text-gold tracking-widest text-lg mb-3"
        style="letter-spacing: 0.5em; opacity: 0.7"
      >
        ✦ ✦ ✦
      </p>
      <h1
        class="font-cinzel text-gold-light tracking-widest"
        style="
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          letter-spacing: 0.15em;
          text-shadow: 0 0 40px rgba(201, 168, 76, 0.3);
        "
      >
        {{ $t("site_title") }}
      </h1>
      <p
        class="font-playfair italic text-cream-2 mt-3"
        style="font-size: 1.3rem; opacity: 0.8"
      >
        {{ $t("site_subtitle") }}
      </p>
    </NuxtLink>

    <!-- Linea dorata -->
    <div
      style="
        width: 200px;
        height: 1px;
        background: linear-gradient(90deg, transparent, #c9a84c, transparent);
        margin: 1.5rem auto;
      "
    />

    <!-- Nav: ricerca + lingue -->
    <div class="flex items-center justify-center gap-4">
      <NuxtLink
        :to="localePath('/ricerca')"
        class="font-cinzel text-xs text-gold/40 tracking-widest hover:text-gold transition-colors"
        style="letter-spacing: 0.15em"
      >
        🔍 {{ $t("search") }}
      </NuxtLink>
      <span class="text-gold/20">|</span>
      <div class="flex gap-3">
        <NuxtLink
          v-for="loc in locales"
          :key="loc.code"
          :to="switchLocalePath(loc.code)"
          class="font-cinzel text-xs tracking-widest transition-colors"
          :class="
            loc.code === locale
              ? 'text-gold'
              : 'text-gold/30 hover:text-gold/60'
          "
        >
          {{ loc.code.toUpperCase() }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
const { locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
</script>
