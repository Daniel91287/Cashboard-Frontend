<script setup lang="ts">
</script>

<template>
  <section class="landing">
    <div class="welcome" aria-label="Begrüßungstext">
      <h1 class="headline">
        Willkommen auf
        <span class="brand">
          <img src="/Logo.png" alt="CashBoard Logo" />
          CashBoard
        </span>
      </h1>

      <p class="subtitle">
        Ihrem digitalen Haushaltsbuch, mit dem Sie den Überblick über<br />
        Ihre Einnahmen &amp; Ausgaben<br />
        nie verlieren.
      </p>
    </div>
  </section>
</template>

<style scoped>
.landing {
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1rem;
  text-align: center;
}

.welcome {
  max-width: 900px;
  color: white;
  padding: 2.25rem 2.5rem;
  border-radius: 18px;
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 24px;
  animation: fadeIn 0.8s ease-out both;
}

.headline {
  font-size: 2.6rem;
  font-weight: 600;
  margin: 0 0 0.9rem 0;
  line-height: 1.3;
  white-space: nowrap; /* 🔒 bleibt eine Zeile */
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-left: 0.4rem;
  font-weight: 700;
}

.brand img {
  height: 2.2rem;
  width: auto;
  filter: brightness(0) invert(1);
}

.subtitle {
  font-size: 1.15rem;
  line-height: 1.7;
  margin: 0 auto;
  opacity: 0.95;
  max-width: 640px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 700px) {
  .headline {
    font-size: 2rem;
    white-space: normal; /* auf Mobile darf umbrechen */
  }

  .brand img {
    height: 1.9rem;
  }

  .subtitle {
    font-size: 1.05rem;
  }
}
</style>
