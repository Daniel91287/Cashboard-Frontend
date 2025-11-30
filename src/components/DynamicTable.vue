<script setup lang="ts">
import {ref, onMounted, type Ref} from 'vue'
import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type {Transaction} from "@/types.ts";

const items: Ref<Transaction[]> = ref([])

async function loadTransaction () {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/transaction'
  const response: AxiosResponse = await axios.get(endpoint);
  items.value = response.data;
}

onMounted(async () => {
  await loadTransaction()
})
</script>

<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>Umsatzübersicht</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>Nr.</th>
        <th>Bezeichnung</th>
        <th>Betrag in EUR </th>
        <th>Datum</th>
      </tr>
      <tr v-for="(eintrag, index) in items" :key="index">
        <th>{{ index + 1 }}</th>
        <td>{{ eintrag.description}}</td>
        <td>{{ eintrag.amount }}</td>
        <td>{{ eintrag.date }}</td>
        <input type="checkbox">
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
