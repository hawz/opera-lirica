<template>
  <div class="min-h-screen" :style="pageStyle">
    <!-- Prototype chrome: not part of the real site, explains itself -->
    <div class="px-4 py-6 text-center" style="border-bottom: 1px solid rgba(128, 128, 128, 0.3)">
      <p class="font-cinzel text-xs tracking-widest" style="letter-spacing: 0.15em; opacity: 0.6">
        PROTOTIPO — ticket #4 — non è una pagina del sito reale
      </p>
      <p class="font-cormorant italic mt-2" style="opacity: 0.6; font-size: 0.9rem">
        Lo switch "Sipario aperto/chiuso" nell'header alterna Sipario ↔ Palco Chiaro, come un toggle chiaro/scuro.
      </p>
      <div class="flex items-center justify-center gap-3 mt-4">
        <button
          v-for="p in palettes"
          :key="p.key"
          type="button"
          class="font-cinzel text-xs tracking-widest px-4 py-2 border transition-colors"
          :style="switcherStyle(p)"
          @click="selectedKey = p.key"
        >
          {{ p.name }}
        </button>
      </div>
      <p class="font-cormorant italic mt-3" style="opacity: 0.7">
        {{ selectedPalette.tagline }}
      </p>
    </div>

    <!-- Mockup: header -->
    <header class="text-center px-4 relative overflow-hidden" style="padding: 4rem 2rem 2.5rem">
      <p class="font-cinzel tracking-widest text-lg mb-3" style="letter-spacing: 0.5em; opacity: 0.7; color: var(--accent)">
        ✦ ✦ ✦
      </p>
      <h1
        class="font-cinzel tracking-widest"
        style="font-size: clamp(2.2rem, 5.5vw, 4rem); letter-spacing: 0.15em; color: var(--accent-light)"
      >
        IL GRANDE TEATRO
      </h1>
      <p class="font-playfair italic mt-3" style="font-size: 1.2rem; opacity: 0.85; color: var(--text-dim)">
        Guida alle opere immortali
      </p>
      <div style="width: 200px; height: 1px; margin: 1.5rem auto" :style="{ background: `linear-gradient(90deg, transparent, ${selectedPalette.accent}, transparent)` }" />
      <div class="flex items-center justify-center gap-4">
        <span class="font-cinzel text-xs tracking-widest" style="letter-spacing: 0.15em; color: var(--accent)">
          🔍 Ricerca
        </span>
        <span style="color: var(--accent); opacity: 0.3">|</span>
        <button
          type="button"
          class="flex items-center gap-2 font-cinzel text-xs tracking-widest transition-colors"
          style="color: var(--accent)"
          :aria-pressed="isLightMode"
          :title="isLightMode ? 'Chiudi il sipario (tema scuro)' : 'Apri il sipario (tema chiaro)'"
          @click="toggleCurtain"
        >
          <svg width="26" height="16" viewBox="0 0 26 16" aria-hidden="true">
            <rect y="0" :width="curtainPanelWidth" height="16" fill="#8b1a1a" style="transition: width 0.35s ease" />
            <rect :x="26 - curtainPanelWidth" y="0" :width="curtainPanelWidth" height="16" fill="#8b1a1a" style="transition: x 0.35s ease, width 0.35s ease" />
          </svg>
          {{ isLightMode ? 'Sipario aperto' : 'Sipario chiuso' }}
        </button>
        <span style="color: var(--accent); opacity: 0.3">|</span>
        <span class="font-cinzel text-xs tracking-widest" style="color: var(--accent)">EN</span>
        <span class="font-cinzel text-xs tracking-widest" style="opacity: 0.5; color: var(--text-dim)">IT</span>
      </div>
    </header>

    <!-- Mockup: card grid -->
    <div class="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="card in mockCards"
        :key="card.title"
        class="block p-8 border transition-all duration-300"
        :style="cardStyle"
      >
        <div class="font-cormorant italic text-sm tracking-widest mb-1" style="color: var(--accent); opacity: 0.8">
          {{ card.years }}
        </div>
        <h3 class="font-cinzel text-2xl tracking-wide" style="color: var(--text)">
          {{ card.title }}
        </h3>
        <p class="text-sm mt-3 leading-relaxed" style="color: var(--text-dim)">
          {{ card.bio }}
        </p>
        <div class="mt-4 text-xs font-cinzel tracking-widest" style="color: var(--accent)">
          {{ card.operas }} opere →
        </div>
      </div>
    </div>

    <!-- Mockup: CTA button -->
    <div class="text-center py-8">
      <button
        type="button"
        class="font-cinzel text-xs tracking-widest px-8 py-3 border transition-colors"
        :style="ctaStyle"
      >
        Scopri di più
      </button>
    </div>

    <!-- Mockup: footer -->
    <footer class="text-center px-4 py-10" style="border-top: 1px solid var(--border)">
      <p class="font-cormorant italic" style="font-size: 0.95rem; color: var(--text-dim)">
        Un omaggio ai grandi compositori<br>
        <em>opera-lirica</em>
      </p>
    </footer>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const palettes = [
  {
    key: 'sipario',
    name: 'Sipario',
    tagline: 'Il tema attuale, alleggerito: stesso buio da teatro, più contrasto per il testo.',
    bg: '#15100a',
    bg2: '#241a0f',
    text: '#f5edd8',
    textDim: '#e8d9b8',
    accent: '#c9a84c',
    accentLight: '#e8c97a',
    border: 'rgba(201, 168, 76, 0.25)',
  },
  {
    key: 'palco-chiaro',
    name: 'Palco Chiaro',
    tagline: 'Palcoscenico illuminato: fondo avorio caldo, accenti cremisi e oro scuro per leggibilità e percezione di qualità.',
    bg: '#f3ead9',
    bg2: '#e9dcc0',
    text: '#2b1d10',
    textDim: '#5b4a34',
    accent: '#8b1a1a',
    accentLight: '#a62f2f',
    border: 'rgba(139, 26, 26, 0.2)',
  },
  {
    key: 'mezzanotte-blu',
    name: 'Mezzanotte Blu',
    tagline: 'Velluto blu notte invece del marrone-nero: stessa atmosfera di sipario, tonalità più fredda e distintiva.',
    bg: '#0a0e1a',
    bg2: '#141b2e',
    text: '#e9edf5',
    textDim: '#b8c2d9',
    accent: '#c9a84c',
    accentLight: '#e8c97a',
    border: 'rgba(201, 168, 76, 0.22)',
  },
]

const mockCards = [
  { title: 'Verdi', years: '1813–1901', bio: 'Maestro del melodramma italiano, da Nabucco ad Aida.', operas: 12 },
  { title: 'Puccini', years: '1858–1924', bio: 'Il verismo lirico di Tosca, Bohème e Turandot.', operas: 8 },
]

const selectedKey = ref(palettes[0].key)

const selectedPalette = computed(
  () => palettes.find((p) => p.key === selectedKey.value) ?? palettes[0],
)

const pageStyle = computed(() => ({
  '--bg': selectedPalette.value.bg,
  '--bg-2': selectedPalette.value.bg2,
  '--text': selectedPalette.value.text,
  '--text-dim': selectedPalette.value.textDim,
  '--accent': selectedPalette.value.accent,
  '--accent-light': selectedPalette.value.accentLight,
  '--border': selectedPalette.value.border,
  background: 'var(--bg)',
  color: 'var(--text)',
}))

const cardStyle = computed(() => ({
  background: `linear-gradient(135deg, ${selectedPalette.value.bg2}cc 0%, ${selectedPalette.value.bg}f2 100%)`,
  borderColor: selectedPalette.value.border,
}))

const ctaStyle = computed(() => ({
  color: selectedPalette.value.accentLight,
  borderColor: selectedPalette.value.border,
}))

const isLightMode = computed(() => selectedKey.value === 'palco-chiaro')
const curtainPanelWidth = computed(() => (isLightMode.value ? 5 : 13))

function toggleCurtain() {
  selectedKey.value = isLightMode.value ? 'sipario' : 'palco-chiaro'
}

function switcherStyle(palette) {
  const active = palette.key === selectedKey.value
  return {
    color: active ? palette.accentLight : palette.accent,
    borderColor: palette.border,
    opacity: active ? 1 : 0.5,
    background: active ? `${palette.bg2}` : 'transparent',
  }
}
</script>
