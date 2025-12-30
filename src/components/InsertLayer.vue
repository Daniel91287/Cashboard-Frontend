<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios'
import type {Transaction} from "@/types.ts";
import {Plus} from "lucide-vue-next";
import {useAuth0} from "@auth0/auth0-vue";

const { getAccessTokenSilently } = useAuth0()

const description = ref<string>("");
const amount = ref<number>(0);
const date = ref<string>("");

async function saveTransaction () {
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
}


</script>

<template>

  <div class="table">
    <table>
      <thead>
      <tr>
        <th colspan="2">Trage hier den zu erfassenden Umsatz ein</th>
      </tr>
      </thead>

      <tbody>
      <tr>
        <td>Beschreibung</td>
        <td><input type="text" v-model="description"></td>
      </tr>

      <tr>
        <td>Betrag</td>
        <td><input type="number" step="0.01" v-model="amount"></td>
      </tr>

      <tr>
        <td>Datum</td>
        <td><input type="date" v-model="date"></td>
      </tr>
      </tbody>
    </table>
  </div>

  <div class="EintragSpeichern">
    <Button @click="saveTransaction">
      <div class="icon-wrapper">
        <Plus class="icon" />
      </div>
      Eintrag speichern
    </Button>
  </div>

</template>

<style scoped>
input {
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
</style>
