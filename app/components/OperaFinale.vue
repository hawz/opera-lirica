<template>
  <div
    style="
      margin-top: 2rem;
      padding: 1.5rem;
      background: linear-gradient(
        135deg,
        rgb(var(--color-accent-2) / 0.15),
        rgb(var(--color-accent) / 0.05)
      );
      border: 1px solid rgb(var(--color-accent) / 0.2);
      border-left: 3px solid rgb(var(--color-accent));
    "
  >
    <!-- Section label -->
    <div class="flex items-center gap-4" style="margin-bottom: 0.8rem">
      <span
        class="font-cinzel text-accent uppercase"
        style="font-size: 0.75rem; letter-spacing: 0.4em"
      >
        {{ $t("finale") }}
      </span>
      <div
        style="
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgb(var(--color-accent) / 0.3),
            transparent
          );
        "
      />
    </div>

    <p
      class="font-cormorant italic"
      style="color: rgb(var(--color-text-dim)); font-size: 1.05rem; line-height: 1.8"
    >
      {{ testo }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  testo: {
    type: String,
    required: true,
  },
});
</script>
