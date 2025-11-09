<script setup lang="ts">
const emit = defineEmits(["navigate"]);
</script>

<template>
  <section>
    <div>
      <h1>Willkommen beim Cashboard</h1>
      <h3>Bekomme einen umfassenden Überblick über deine Finanzen</h3>
    </div>

    <div class="LoginEmail">
      <div><i class="fa-solid fa-envelope"></i> Email</div>
      <input type="email" />
    </div>

    <div class="LoginPassword">
      <div><i class="fa-solid fa-key"></i> Passwort</div>
      <input type="password" />
      <div><i class="fa-solid fa-eye-low-vision"></i></div>
    </div>

    <div>
      <small @click="emit('navigate', 3)">Passwort vergessen?</small>
    </div>

    <div>
      <button>
        <p @click="emit('navigate', 4)">Anmelden</p>
      </button> <button>
      <p @click="emit('navigate', 2)">Registrieren</p>
    </button>
    </div>
  </section>
</template>

<style scoped>

</style>

