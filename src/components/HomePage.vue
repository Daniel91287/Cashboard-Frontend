<script setup lang="ts">

import { useRouter } from 'vue-router'
import { UmsatzErfassen } from '@/utils/services';
import { UmsatzUebersicht } from "@/utils/services";
import {Plus, StepBack, Trash} from "lucide-vue-next";
import DynamicTable from "@/components/DynamicTable.vue";

const router = useRouter()
</script>

<template>
  <section id="homepage">
    <div class="chart-card">

    <!-- Zurück-Button -->
      <div class="ZurueckButton" @click="router.go(-1)">
        <div class="icon-wrapper">
          <StepBack class="icon" />
        </div>
        <!--span>Zurück</span-->
      </div>

      <div>
        <h1 class="headerText">Hier kommt ein Chart</h1>
        <h3 class="subHeaderText">Füge einen Zugang oder Abfluss hinzu</h3>
      </div>


      <div class="table">
        <table>
          <thead>
          <tr>
            <th>Umsatz</th>
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
          <Plus class="icon" />
        </div>
        <input placeholder="Eintrag Speichern" />
      </div>

      <div>
        <DynamicTable/>
      </div>

      <div class="MarkiertenEintragLoeschen">
        <div class="icon-wrapper">
          <Trash class="icon" />
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
.ZurueckButton,
.MarkiertenEintragLoeschen {
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
  .ZurueckButton:hover,
  .MarkiertenEintragLoeschen:hover {
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

.ZurueckButton {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: fit-content;      /* Passt sich dem Inhalt an */
  max-width: none;         /* Keine harte 50px-Grenze mehr */
  margin: 0;               /* Nicht mehr mittig schieben */
  padding: 8px 14px;       /* Gleiches Feeling wie die anderen Buttons */
}

.ZurueckButton:hover {
  text-decoration: underline;
  cursor: pointer;
}

.loginButton,
.registerButton
.ZurueckButton{
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
