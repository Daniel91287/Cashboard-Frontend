<script setup lang="ts">
import {defineProps, ref, computed} from 'vue'
import type {Transaction} from "@/types.ts";
import {Trash, Pencil} from "lucide-vue-next";

const props = defineProps<{
  items: Transaction[]
  deleteTransaction: (id: number) => Promise<void>
}>()

const descriptionFilter = ref('')

const filteredItems = computed(() => {
  // wenn Filter leer → alle Items anzeigen
  if (!descriptionFilter.value) return props.items

  // sonst: nur Items, die den Filter-Text enthalten (case-insensitive)
  return props.items.filter(item =>
    item.description.toLowerCase().includes(descriptionFilter.value.toLowerCase())
  )
})

function formatDate(dateStr: string | Date): string {
  const date = new Date(dateStr)

  const formatter = new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  const parts = formatter.formatToParts(date)

  const day = parts.find(p => p.type === 'day')?.value
  const month = parts.find(p => p.type === 'month')?.value.replace('.', '')
  const year = parts.find(p => p.type === 'year')?.value

  return `${day}. ${month!.toUpperCase()} ${year}`
}
</script>

<template>
  <div>
    <div class="form-row">
      <h1 class="headline">Umsatzübersicht</h1>
      <label for="description">Filtere die Umsätze nach der Bezeichnung</label>
      <input
        id="descriptionFilter"
        type="text"
        v-model="descriptionFilter"
      />
    </div>
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
        <tr v-for="(eintrag, index) in filteredItems" :key="eintrag.id">
          <th>{{ index + 1 }}</th>
          <td>{{ eintrag.description }}</td>
          <td>{{ eintrag.amount }}</td>
          <td>{{ formatDate(eintrag.date) }}</td>
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
  background: #b7393b;
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
  background: #183c60;
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

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: white;
  width: 95%;
  margin: 0 auto 2rem auto;
}

.form-row input {
  width: 100%;
  padding: 0.8rem 0.6rem;
  border: 2px solid #555;
  border-radius: 8px;
  font-size: 0.95rem;
  color: white;

  background-color: #373737;
}

.form-row label {
  font-weight: 900;
  font-size: 1.1rem;
}

.form-row input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

.form-row label {
  font-weight: 500;
}

.form-row input {
  padding: 0.6rem 1rem;
}
</style>
