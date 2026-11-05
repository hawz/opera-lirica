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
          rgb(var(--color-accent-2) / 0.3) 0%,
          transparent 70%
        );
      "
      aria-hidden="true"
    />

    <NuxtLink :to="localePath('/')" class="inline-block relative">
      <p
        class="font-cinzel text-accent tracking-widest text-lg mb-3"
        style="letter-spacing: 0.5em; opacity: 0.7"
      >
        ✦ ✦ ✦
      </p>
      <h1
        class="font-cinzel text-accent-light tracking-widest"
        style="
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          letter-spacing: 0.15em;
          text-shadow: 0 0 40px rgb(var(--color-accent) / 0.3);
        "
      >
        {{ $t("site_title") }}
      </h1>
      <p
        class="font-playfair italic text-text-dim mt-3"
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
        background: linear-gradient(90deg, transparent, rgb(var(--color-accent)), transparent);
        margin: 1.5rem auto;
      "
    />

    <!-- Nav: ricerca + sipario + lingue -->
    <div class="flex items-center justify-center gap-4">
      <NuxtLink
        :to="localePath('/ricerca')"
        class="font-cinzel text-xs text-accent/40 tracking-widest hover:text-accent transition-colors"
        style="letter-spacing: 0.15em"
      >
        🔍 {{ $t("search") }}
      </NuxtLink>
      <span class="text-accent/20">|</span>
      <NuxtLink
        :to="localePath('/teatri')"
        class="font-cinzel text-xs text-accent/40 tracking-widest hover:text-accent transition-colors"
        style="letter-spacing: 0.15em"
      >
        🎭 {{ $t("teatri_nav") }}
      </NuxtLink>
      <span class="text-accent/20">|</span>
      <button
        type="button"
        class="flex items-center gap-2 font-cinzel text-xs text-accent/40 tracking-widest hover:text-accent transition-colors"
        :aria-pressed="isLightTheme"
        :title="isLightTheme ? $t('theme_close_curtain') : $t('theme_open_curtain')"
        @click="toggleTheme"
      >
        <svg :width="CURTAIN_ICON_WIDTH" :height="CURTAIN_ICON_HEIGHT" :viewBox="`0 0 ${CURTAIN_ICON_WIDTH} ${CURTAIN_ICON_HEIGHT}`" aria-hidden="true">
          <rect y="0" :width="curtainPanelWidth" :height="CURTAIN_ICON_HEIGHT" class="fill-accent-2" style="transition: width 0.35s ease" />
          <rect :x="CURTAIN_ICON_WIDTH - curtainPanelWidth" y="0" :width="curtainPanelWidth" :height="CURTAIN_ICON_HEIGHT" class="fill-accent-2" style="transition: x 0.35s ease, width 0.35s ease" />
        </svg>
      </button>
      <span class="text-accent/20">|</span>
      <div class="flex gap-3">
        <NuxtLink
          v-for="loc in locales"
          :key="loc.code"
          :to="switchLocalePath(loc.code)"
          class="font-cinzel text-xs tracking-widest transition-colors"
          :class="
            loc.code === locale
              ? 'text-accent'
              : 'text-accent/30 hover:text-accent/60'
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
const { theme, toggleTheme } = useTheme();

const isLightTheme = computed(() => theme.value === 'palco-chiaro');

// Icon geometry: a closed curtain's two panels meet at the middle (each
// panel is half the icon width); an open curtain's panels are pulled
// aside, each shrunk to roughly a third of that.
const CURTAIN_ICON_WIDTH = 22;
const CURTAIN_ICON_HEIGHT = 14;
const CURTAIN_PANEL_WIDTH_CLOSED = CURTAIN_ICON_WIDTH / 2;
const CURTAIN_PANEL_WIDTH_OPEN = CURTAIN_ICON_WIDTH / 5.5;
const curtainPanelWidth = computed(() =>
  isLightTheme.value ? CURTAIN_PANEL_WIDTH_OPEN : CURTAIN_PANEL_WIDTH_CLOSED,
);
</script>
