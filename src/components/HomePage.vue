<script setup lang="ts">
const emit = defineEmits(["navigate"]);
import { UmsatzErfassen } from '@/utils/services';
import { UmsatzUebersicht } from "@/utils/services";
</script>

<template>
  <button class="back" @click="emit('navigate', 1)">Zurück [Du bist auf der HomePage]</button>
  <h1>Hier kommt ein Chart |/</h1>
  <h3>Füge einen Zugang oder Abfluss hinzu</h3>
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
  <div>
    <button>Eintrag Speichern</button>
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
</template>

<style scoped>
.table {
  display: flex;
}

.back {
  background: #3F88C5;
}
</style>
