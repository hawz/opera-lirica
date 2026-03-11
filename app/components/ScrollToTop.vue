<!-- app/components/ScrollToTop.vue -->
<template>
  <Transition name="fade">
    <button
      v-if="visible"
      @click="scrollToTop"
      aria-label="Torna in cima"
      style="
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 100;
        width: 44px;
        height: 44px;
        border: 1px solid rgba(201, 168, 76, 0.4);
        background: rgba(13, 10, 7, 0.9);
        color: #c9a84c;
        font-size: 1.1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
          border-color 0.3s,
          color 0.3s;
      "
      @mouseover="
        $event.currentTarget.style.borderColor = 'rgba(201,168,76,0.9)'
      "
      @mouseleave="
        $event.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
      "
    >
      ↑
    </button>
  </Transition>
</template>

<script setup>
const visible = ref(false);

const onScroll = () => {
  const scrolled = window.scrollY + window.innerHeight;
  const total = document.documentElement.scrollHeight;
  visible.value = scrolled >= total - 100;
};

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
