<script setup lang="ts">
const emit = defineEmits(["navigate"]);
import { Mail, KeyRound, EyeOff } from "lucide-vue-next";
</script>

<template>
    <section id="landingpage">
      <div>
        <h1 class="headerText">Willkommen beim Cashboard</h1>
        <h3 class="subHeaderText">Bekomme einen umfassenden Überblick über deine Finanzen</h3>
      </div>

      <div class="LoginEmail">
        <div class="icon-wrapper">
          <Mail class="icon" />
        </div>
        <input placeholder="Email" />
      </div>

      <div class="LoginPassword">
        <div class="icon-wrapper">
          <KeyRound class="icon" />
        </div>
        <input placeholder="Passwort" />
        <div class="icon-wrapper">
          <EyeOff class="icon" />
        </div>
      </div>

      <div class="passwortVergessen">
        <small @click="emit('navigate', 3)">Passwort vergessen?</small>
      </div>

      <div class="buttons">
        <button class="loginButton" @click="emit('navigate', 4)">
          <p>Anmelden</p>
        </button> <button class="registerButton" @click="emit('navigate', 2)">
        <p>Registrieren</p>
      </button>
      </div>
    </section>
</template>

<style scoped>
section {
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 0 24px;
  padding-bottom: 1rem;
  padding-top: 1rem;
  border: 3px solid hsla(207, 54%, 51%, 0.15);
  box-shadow: 3px 5px 15px hsla(0,0%,0%,0.2);
  border-radius: 24px;
}
#landingpage {
  width: 100%;
  display: flex;             /* wir machen das ganze Ding zur Flexbox */
  flex-direction: column;    /* Inhalt bleibt untereinander (h1, form etc.) */
  justify-content: center;   /* vertikal zentrieren */
  align-items: center;       /* horizontal zentrieren */
  text-align: center;        /* optional: Texte auch mittig */
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
  border: 1px solid hsla(207, 54%, 51%, 0.15);
  box-shadow: 1px 3px 4px hsla(0,0%,0%,0.2);
  transition: all 0.5s ease;
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
  border: none;
  color: black;
  flex: 3;
}
input::placeholder {
  opacity: 5;
  font-size: 1rem;
  color: black;
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

.buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 700px;
}

.loginButton,
.registerButton {
  display: flex;
  width: 100%; /* Volle Breite des Containers */
  padding: 14px;
  border-radius: 12px;
  border: 1px solid hsla(207, 54%, 51%, 0.15);
  box-shadow: 1px 3px 4px hsla(0,0%,0%,0.2);
  transition: all 0.5s ease;
}

.loginButton {
  background: hsla(207, 54%, 51%, 0.5);
}
.loginButton:hover {
  cursor: pointer;
  box-shadow: 1px 1px 1px hsla(0,0%,0%,0.2);
  background: hsla(207, 54%, 51%, 0.75);
}

.registerButton {
  background: hsla(207, 54%, 51%, 0.25);
}
.registerButton:hover {
  cursor: pointer;
  box-shadow: 1px 1px 1px hsla(0,0%,0%,0.2);
  background: hsla(207, 54%, 51%, 0.75);
}
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 20px;
  height: 20px;
}

</style>

