<script setup lang="ts">

import DynamicTable from "@/components/DynamicTable.vue";
import InsertLayer from "@/components/InsertLayer.vue";
import { useAuth0 } from '@auth0/auth0-vue'
import axios, {type AxiosResponse} from "axios";
import {onMounted, ref, type Ref} from "vue";
import type {Transaction} from "@/types.ts";
import TransactionChart from "@/components/TransactionChart.vue";

const { getAccessTokenSilently } = useAuth0()

const items: Ref<Transaction[]> = ref([])

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

async function deleteTransaction(id: number) {
  const token = await getAccessTokenSilently()

  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + `/transaction/${id}`

  await axios.delete(endpoint, {
    headers: { Authorization: `Bearer ${token}`}
  })

  await loadTransaction();
}

onMounted(async () => {
  await loadTransaction()
})

</script>

<template>
    <div class="chart-card">
      <div>
      <TransactionChart
        :items="items"
        class="transactionChart"
      />
      </div>

      <div>
        <InsertLayer
          :loadTransaction="loadTransaction"
          class="insertLayer"
        />
      </div>

      <div class="table-wrapper">
        <DynamicTable
          :items="items"
          :deleteTransaction="deleteTransaction"
          class="dynamicTable"
        />
      </div>
    </div>
</template>

<style scoped>
.chart-card {
  min-height: 70vh;
  width: 100%;
  padding: 2rem;

  /* Abgerundete Ecken */
  border-radius: 12px;

  /* Hintergrundverlauf */
  background: #292929;

  /* Soft Glow unten */
  box-shadow:
    0 20px 40px rgba(0,0,0,0.05),
    0 10px 30px rgba(129, 90, 255, 0.15);

  /* Feiner innerer Rand */
  border: 1px solid rgba(200, 255, 244, 0.5);

  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.table-wrapper {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
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
</style>
