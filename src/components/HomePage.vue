<script setup lang="ts">
import { useRouter } from 'vue-router'
import { UmsatzErfassen } from '@/utils/services';
import { UmsatzUebersicht } from "@/utils/services";
import {KeyRound} from "lucide-vue-next";
const router = useRouter()
</script>

<template>
  <section id="homepage">
    <div class="chart-card">
      <div>
        <button class="back" @click="router.go(-1)">Zurück [Du bist auf der HomePage]</button>
        <h1 class="headerText">Hier kommt ein Chart</h1>
        <h3 class="subHeaderText">Füge einen Zugang oder Abfluss hinzu</h3>
      </div>


      <div class="table">
        <table>
          <thead>
          <tr>
            <th>Umsatz</th><th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(beschreibung, index) in UmsatzErfassen" :key="index"> {{ beschreibung }}
            <th></th>
            <td><input type="text"></td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="EintragSpeichern">
        <div class="icon-wrapper">
          <KeyRound class="icon" />
        </div>
        <input placeholder="Eintrag Speichern" />
      </div>

      <div>
        <table>
          <thead>
          <tr>
            <th>Umsatzübersicht</th><th></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>Nr.</th>
            <th>Bezeichnung</th>
            <th>Betrag</th>
            <th>Datum</th>
          </tr>
          <tr v-for="(eintrag, index) in UmsatzUebersicht" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ eintrag.bezeichnung}}</td>
            <td>{{ eintrag.Betrag }}</td>
            <td>{{ eintrag.Datum }}</td>
            <input type="checkbox">
          </tr>
          </tbody>
        </table>
      </div>

      <div>
        <button>Markierten Eintrag löschen</button>
      </div>
      <div class="MarkiertenEintragLoeschen">
        <div class="icon-wrapper">
          <KeyRound class="icon" />
        </div>
        <input placeholder="Markierten Eintrag löschen" />
      </div>
    </div>
  </section>
</template>

<style scoped>

.chart-card {
  width: 100%;
  max-width: 420px;
  padding: 2rem;

  /* Abgerundete Ecken */
  border-radius: 24px;

  /* Hintergrundverlauf */
  background: linear-gradient(
    to bottom,
    rgba(173, 216, 255, 0.35) 0%,    /* leichtes Blau oben */
    rgba(255, 255, 255, 0.9) 35%,    /* fast weiß */
    rgba(255, 255, 255, 1) 100%      /* voll weiß */
  );

  /* Glassmorphism light */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  /* Soft Glow unten */
  box-shadow:
    0 20px 40px rgba(0,0,0,0.05),
    0 10px 30px rgba(129, 90, 255, 0.15);

  /* Feiner innerer Rand */
  border: 1px solid rgba(255, 255, 255, 0.4);

  display: flex;
  flex-direction: column;
  gap: 1rem;
}


.table {
  display: flex;
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

.EintragSpeichern,
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
  .EintragSpeichern:hover,
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


.back {
  background: #3F88C5;
}
</style>
