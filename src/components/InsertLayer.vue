<script setup lang="ts">
import {ref, defineProps} from 'vue';
import axios from 'axios'
import type {Transaction} from "@/types.ts";
import {Plus} from "lucide-vue-next";
import {useAuth0} from "@auth0/auth0-vue";

const {getAccessTokenSilently} = useAuth0()

const description = ref<string>("");
const amount = ref<number>(0);
const date = ref<string>("");

const props = defineProps<{
  loadTransaction: () => Promise<void>
}>()

async function saveTransaction() {
  const token = await getAccessTokenSilently()

  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/transaction'

  const payload: Transaction = {
    description: description.value,
    amount: amount.value,
    date: new Date(date.value)
  }

  await axios.post(endpoint, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  description.value = "";
  amount.value = 0;
  date.value = "";

  await props.loadTransaction()
}


</script>

<template>
  <div class="form">
    <h1>Trage hier den zu erfassenden Umsatz ein</h1>

    <div class="form-row">
      <label for="description">Beschreibung</label>
      <input
        id="description"
        type="text"
        v-model="description"
      />
    </div>

    <div class="form-row">
      <label for="amount">Betrag</label>
      <input
        id="amount"
        type="number"
        step="0.01"
        v-model="amount"
      />
    </div>

    <div class="form-row">
      <label for="date">Datum</label>
      <input
        id="date"
        type="date"
        v-model="date"
      />
    </div>

    <Button @click="saveTransaction" class="btn">
      <Plus class="icon"/>
      Eintrag speichern
    </Button>
  </div>
</template>

<style scoped>
.form {
  padding: 1.5rem;
  border-radius: 6px;
}

h1 {
  margin-bottom: 2rem;
  color: white;
}

.form-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  gap: 0.25rem;
  color: white;
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

.btn {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
