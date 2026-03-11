<template>
  <div>
    <!-- Section label -->
    <div class="flex items-center gap-4" style="margin-bottom: 1.2rem">
      <span
        class="font-cinzel text-gold uppercase"
        style="font-size: 0.75rem; letter-spacing: 0.4em"
      >
        {{ $t("story") }}
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

    <!-- Atti -->
    <div style="display: flex; flex-direction: column; gap: 1.5rem">
      <div
        v-for="atto in atti"
        :key="atto.titolo"
        style="
          padding-left: 1.5rem;
          border-left: 2px solid #8b1a1a;
          position: relative;
        "
      >
        <!-- Pallino cremisi -->
        <div
          style="
            position: absolute;
            left: -5px;
            top: 0.5rem;
            width: 8px;
            height: 8px;
            background: #8b1a1a;
            border-radius: 50%;
          "
          aria-hidden="true"
        />
        <div
          class="font-cinzel uppercase"
          style="
            font-size: 0.8rem;
            letter-spacing: 0.3em;
            color: #c0392b;
            margin-bottom: 0.5rem;
          "
        >
          {{ atto.titolo }}
        </div>
        <p style="font-size: 1.05rem; line-height: 1.8; color: #f0e6cc">
          {{ atto.testo }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  atti: {
    type: Array,
    required: true,
  },
});
</script>
