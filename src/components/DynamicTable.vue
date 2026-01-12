<script setup lang="ts">
import {defineProps, ref, computed} from 'vue'
import type {Transaction} from "@/types.ts";
import {Trash, Pencil, CircleX} from "lucide-vue-next";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-vue";
const {getAccessTokenSilently} = useAuth0()

const props = defineProps<{
  items: Transaction[]
  deleteTransaction: (id: number) => Promise<void>
  loadTransaction: () => Promise<void>
}>()

const descriptionFilter = ref('')

const filteredItems = computed(() => {
  if (!descriptionFilter.value) return props.items

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

const description = ref<string>("");
const amount = ref<number>(0);
const date = ref<string>("");

const errors = ref({
  description: '',
  amount: '',
  date: ''
})

function validateForm() {
  errors.value = { description: '', amount: '', date: '' }

  if (!description.value) {
    errors.value.description = 'Beschreibung ist erforderlich!'
  }

  if (amount.value === null || amount.value === 0) {
    errors.value.amount = 'Betrag muss ungleich 0 sein!'
  }

  if (!date.value) {
    errors.value.date = 'Datum ist erforderlich!'
  }

  return !errors.value.description &&
    !errors.value.amount &&
    !errors.value.date
}

function startEditing(eintrag: Transaction) {
  if (!eintrag.id) return
  editingId.value = eintrag.id
  description.value = eintrag.description
  amount.value = eintrag.amount
  date.value = eintrag.date.toISOString().slice(0, 10)
}

const editingId = ref<number | null>(null) // aktuell bearbeitete Transaktion

async function updateTransaction(id: number) {
  if (!validateForm()) return

  const token = await getAccessTokenSilently()
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = `${baseUrl}/transaction/${id}`

  const payload: Transaction = {
    description: description.value,
    amount: amount.value,
    date: new Date(date.value)
  }

  await axios.put(endpoint, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  // Reset Form & editingId
  description.value = ""
  amount.value = 0
  date.value = ""
  editingId.value = null

  await props.loadTransaction()
}
</script>

<template>
  <div>
    <div class="form-row">
      <h1 class="headline">Deine Umsatzübersicht</h1>
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
        <th>Funktionen</th>
      </tr>
        <tr v-for="(eintrag, index) in filteredItems" :key="eintrag.id">
          <td>{{ index + 1 }}</td>

          <td>
            <input v-if="editingId === eintrag.id" v-model="description">
            <span v-else>{{ eintrag.description }}</span>
          </td>

          <td>
            <input
            v-if="editingId === eintrag.id"
            type="number"
            step="0.01"
            v-model.number="amount"
          />
            <span v-else>{{ eintrag.amount }}</span>
          </td>

          <td><input
            v-if="editingId === eintrag.id"
            type="date"
            v-model="date"
          />
            <span v-else>{{ formatDate(eintrag.date) }}</span>
          </td>

          <td class="functions">
            <button v-if="editingId !== eintrag.id" class="editButton" @click="startEditing(eintrag)">
              <Pencil class="icon"/>
            </button>
            <button v-else class="cancelButton" @click="editingId = null">
              <CircleX class="icon"/>
            </button>

            <Button class="cancelButton"
              v-if="editingId === eintrag.id"
              @click="updateTransaction(eintrag.id)">
              <Pencil class="icon"/>
            </Button>

            <button class="deleteButton" @click="deleteTransaction(eintrag.id!)">
                <Trash class="icon"/>
            </button>
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

.functions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
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

.cancelButton{
  display: flex;
  width: 100%;
  max-width: 55px;
  margin: 0 auto;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: #027374;
  border: 1px solid hsla(207, 54%, 51%, 0.15);
  box-shadow: 1px 3px 4px hsla(0, 0%, 0%, 0.2);
  transition: all 0.5s ease;
  color: white;
}

.cancelButton:hover {
  text-decoration: underline;
  cursor: pointer;
  border-color: transparent;
  background: #016061;
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
  font-size: 2rem;
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
