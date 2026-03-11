<template>
  <div class="min-h-screen bg-dark text-cream font-cormorant relative">
    <!-- Luce centrale -->
    <!-- <div class="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div
        class="absolute inset-0"
        style="
          background: radial-gradient(
            ellipse 80% 60% at 50% 20%,
            rgba(201, 168, 76, 0.07) 0%,
            rgba(201, 168, 76, 0.03) 35%,
            transparent 70%
          );
        "
      />
    </div> -->

    <!-- Sipario -->
    <div
      v-if="curtainVisible"
      id="curtain"
      :class="{ open: curtainOpen }"
      aria-hidden="true"
    >
      <div class="curtain-left" />
      <div class="curtain-right" />
      <div class="curtain-title">
        <h1>IL GRANDE TEATRO</h1>
        <p>{{ $t("curtain_subtitle") }}</p>
      </div>
    </div>

    <div class="relative z-10">
      <AppHeader />
      <main>
        <slot />
      </main>
      <AppFooter />
      <ScrollToTop />
    </div>
  </div>
</template>

<script setup>
const curtainVisible = ref(true);
const curtainOpen = ref(false);

onMounted(() => {
  setTimeout(() => {
    curtainOpen.value = true;
    setTimeout(() => {
      curtainVisible.value = false;
    }, 2000);
  }, 1200);
});
</script>

<style>
#curtain {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  overflow: hidden;
}

.curtain-left,
.curtain-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 51%;
  background: linear-gradient(180deg, #4a0a0a 0%, #2d0505 40%, #1a0303 100%);
  transition: transform 1.6s cubic-bezier(0.76, 0, 0.24, 1);
}

.curtain-left {
  left: 0;
  transform-origin: left;
}

.curtain-right {
  right: 0;
  transform-origin: right;
}

.curtain-left::after,
.curtain-right::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent 0px,
    transparent 30px,
    rgba(0, 0, 0, 0.15) 30px,
    rgba(0, 0, 0, 0.15) 32px
  );
}

#curtain.open .curtain-left {
  transform: translateX(-100%);
}

#curtain.open .curtain-right {
  transform: translateX(100%);
}

.curtain-title {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem;
  opacity: 1;
  transition: opacity 0.5s;
}

#curtain.open .curtain-title {
  opacity: 0;
}

.curtain-title h1 {
  font-family: "Cinzel", serif;
  font-size: clamp(2rem, 8vw, 5rem);
  color: #c9a84c;
  text-shadow:
    0 0 60px rgba(201, 168, 76, 0.6),
    0 2px 4px rgba(0, 0, 0, 0.8);
  letter-spacing: 0.2em;
  animation: flicker 3s ease-in-out infinite;
}

.curtain-title p {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  color: #e8d9b8;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  opacity: 0.85;
}

@keyframes flicker {
  0%,
  90%,
  100% {
    opacity: 1;
  }
  92% {
    opacity: 0.85;
  }
  94% {
    opacity: 1;
  }
  96% {
    opacity: 0.9;
  }
}
</style>
