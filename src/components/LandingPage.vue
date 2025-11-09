<script setup lang="ts">
const emit = defineEmits(["navigate"]);
</script>

<template>
    <section id="landingpage">
      <div>
        <h1 class="headerText">Willkommen beim Cashboard</h1>
        <h3 class="subHeaderText">Bekomme einen umfassenden Überblick über deine Finanzen</h3>
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

      <div class="passwortVergessen">
        <small @click="emit('navigate', 3)">Passwort vergessen?</small>
      </div>

      <div class="loginButton">
        <button>
          <p @click="emit('navigate', 4)">Anmelden</p>
        </button> <button>
        <p @click="emit('navigate', 2)">Registrieren</p>
      </button>
      </div>
    </section>
</template>

<style scoped>
section {
  max-width: 400px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 0 14px;
}
.LoginEmail,
.LoginPassword {
  display: flex;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  gap: 14px;
  padding: 14px;
  border-radius: 12px;
  background: hsla(207, 54%, 51%, 0.2);
}

@media (min-width: 1024px) {
  .LoginEmail:hover,
  .LoginPassword:hover{
    border-color: transparent;
    background: hsla(207, 54%, 51%, 0.25);
  }
}

input {
  background: transparent;
  outline: none;
  border: unset;
  color: white;
  flex: 1;
}

.passwortVergessen {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 600px;
  margin-top: -0.5rem;
}
.passwortVergessen:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>

