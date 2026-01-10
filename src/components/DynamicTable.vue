<script setup lang="ts">
import {defineProps} from 'vue'
import type {Transaction} from "@/types.ts";
import {Trash, Pencil} from "lucide-vue-next";

const props = defineProps<{
  items: Transaction[]
  deleteTransaction: (id: number) => Promise<void>
}>()


</script>

<template>
  <div>
    <h1 class="headline">Umsatzübersicht</h1>
    <table>
      <tbody>
      <tr>
        <th>Nr.</th>
        <th>Bezeichnung</th>
        <th>Betrag in EUR</th>
        <th>Datum</th>
        <th>Eintrag bearbeiten</th>
        <th>Eintrag Löschen</th>
      </tr>
      <tr v-for="(eintrag, index) in props.items" :key="eintrag.id">
        <th>{{ index + 1 }}</th>
        <td>{{ eintrag.description }}</td>
        <td>{{ eintrag.amount }}</td>
        <td>{{ eintrag.date }}</td>
        <td>
          <div class="editButton">
            <div class="icon-wrappter">
              <Pencil class="icon"/>
            </div>
          </div>
        </td>
        <td>
          <div class="deleteButton" @click="deleteTransaction(eintrag.id!)">
            <div class="icon-wrappter">
              <Trash class="icon"/>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
h1 {
  width: 100%;
  padding: 1rem;
  border-top: 1px solid rgba(200, 255, 244, 0.5);
}

table {
  width: 95%;
  border-collapse: collapse;
  margin: 0 auto 2rem auto;
}

tbody tr td,
tbody tr th {
  padding: 6px 10px;
}

.deleteButton {
  display: flex;
  width: 100%;
  max-width: 55px;
  margin: 0 auto;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: #E44545;
  border: 1px solid hsla(207, 54%, 51%, 0.15);
  box-shadow: 1px 3px 4px hsla(0, 0%, 0%, 0.2);
  transition: all 0.5s ease;
  color: white;
}

.deleteButton:hover {
  text-decoration: underline;
  cursor: pointer;
  border-color: transparent;
  background: #7D2020;
}

.editButton {
  display: flex;
  width: 100%;
  max-width: 55px;
  margin: 0 auto;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: #1D4975;
  border: 1px solid hsla(207, 54%, 51%, 0.15);
  box-shadow: 1px 3px 4px hsla(0, 0%, 0%, 0.2);
  transition: all 0.5s ease;
  color: white;
}

.editButton:hover {
  text-decoration: underline;
  cursor: pointer;
  border-color: transparent;
  background: #48787e;
}

th, tr, td {
  text-align: left;
  border-bottom: 1px solid #ddd;
  color: white;
}

th {
  font-size: 1.2rem;
}

.headline {
  font-size: 1.8rem;
  padding: 1rem 0;
  color: white;
}
</style>
