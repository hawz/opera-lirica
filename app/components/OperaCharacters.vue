<template>
  <div>
    <!-- Section label -->
    <div class="flex items-center gap-4" style="margin-bottom: 1.2rem">
      <span
        class="font-cinzel text-gold uppercase"
        style="font-size: 0.75rem; letter-spacing: 0.4em"
      >
        {{ $t("characters") }}
      </span>
      <div
        style="
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(201, 168, 76, 0.3),
            transparent
          );
        "
      />
    </div>

    <!-- Grid personaggi -->
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
      "
    >
      <div
        v-for="p in personaggi"
        :key="p.nome"
        style="
          padding: 1rem 1.2rem;
          border: 1px solid rgba(201, 168, 76, 0.15);
          background: rgba(0, 0, 0, 0.3);
        "
      >
        <div
          class="font-playfair"
          style="
            font-weight: 700;
            color: #f5edd8;
            font-size: 1rem;
            margin-bottom: 0.2rem;
          "
        >
          {{ p.nome }}
        </div>
        <div
          class="font-cormorant italic text-gold"
          style="
            font-size: 0.78rem;
            letter-spacing: 0.1em;
            opacity: 0.7;
            margin-bottom: 0.4rem;
          "
        >
          {{ p.voce }}
        </div>
        <div style="font-size: 0.9rem; color: #d4c4a0; line-height: 1.5">
          {{ p.descrizione }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  personaggi: {
    type: Array,
    required: true,
  },
});
</script>
