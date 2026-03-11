<template>
  <footer
    class="text-center"
    style="
      padding: 3rem;
      border-top: 1px solid rgba(201, 168, 76, 0.15);
      color: #d4c4a0;
      font-style: italic;
      opacity: 0.6;
      font-size: 0.95rem;
    "
  >
    <div
      style="
        width: 200px;
        height: 1px;
        background: linear-gradient(90deg, transparent, #c9a84c, transparent);
        margin: 0 auto 1.5rem;
      "
    />
    <p class="font-cormorant italic" style="font-size: 0.95rem">
      {{ $t("footer_line1") }}<br />
      <em>{{ $t("footer_line2") }}</em>
    </p>
  </footer>
</template>
