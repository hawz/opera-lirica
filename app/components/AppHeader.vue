<template>
  <header class="text-center py-8 px-4 border-b border-gold/20">
    <NuxtLink :to="localePath('/')" class="inline-block">
      <p class="font-cinzel text-gold/70 tracking-widest text-sm mb-1">✦ ✦ ✦</p>
      <h1
        class="font-cinzel text-3xl md:text-4xl text-gold-light tracking-widest"
      >
        {{ $t("site_title") }}
      </h1>
      <p class="font-playfair italic text-cream-2/80 text-sm mt-1">
        {{ $t("site_subtitle") }}
      </p>
    </NuxtLink>
    <div class="mt-4 flex items-center justify-center gap-4">
      <NuxtLink
        :to="localePath('/ricerca')"
        class="font-cinzel text-xs text-gold/40 tracking-widest hover:text-gold transition-colors"
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
