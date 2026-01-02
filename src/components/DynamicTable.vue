<script setup lang="ts">
import {ref, onMounted, type Ref} from 'vue'
import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type {Transaction} from "@/types.ts";
import {useAuth0} from "@auth0/auth0-vue";
import {Trash} from "lucide-vue-next";

const items: Ref<Transaction[]> = ref([])
const { getAccessTokenSilently } = useAuth0()

async function loadTransaction () {
  const token = await getAccessTokenSilently()

  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/transaction'

  const response: AxiosResponse = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  items.value = response.data;
}

onMounted(async () => {
  await loadTransaction()
})

async function deleteTransaction (id: number) {
  const token = await getAccessTokenSilently()

  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + `/transaction/${id}`

  await axios.delete(endpoint, {
    headers: { Authorization: `Bearer ${token}`}
  })
await loadTransaction();
}

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
      <tr v-for="(eintrag, index) in items" :key="eintrag.id">
        <th>{{ index + 1 }}</th>
        <td>{{ eintrag.description}}</td>
        <td>{{ eintrag.amount }}</td>
        <td>{{ eintrag.date }}</td>
        <div class="deleteButton" @click="deleteTransaction(eintrag.id)">
          <div class="icon-wrappter">
            <Trash class="icon" />
          </div>
        </div>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.deleteButton {
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

.deleteButton:hover {
  text-decoration: underline;
  cursor: pointer;
  border-color: transparent;
  background: hsla(207, 54%, 51%, 0.25);
}
</style>
