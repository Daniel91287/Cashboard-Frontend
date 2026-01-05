<script setup lang="ts">
import {defineProps, nextTick, onBeforeUnmount, onMounted, ref, watch} from 'vue'
import type {Transaction} from "@/types.ts";
import {Chart, type ChartConfiguration} from "chart.js/auto"

const props = defineProps<{
  items: Transaction[]
}>()

const chartInstance = ref<Chart | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

function destroyChart() {
  if (chartInstance.value) {
    chartInstance.value.destroy()
    chartInstance.value = null
  }
}

async function createChart() {
  await nextTick() // Warten bis DOM aktualisiert ist

  if (!canvasRef.value || props.items.length === 0) {
    return
  }

  destroyChart()

  const config: ChartConfiguration = {
    type: 'line',
    data: {
      labels: getLabels(),
      datasets: [{
        label: 'Kontosaldo',
        data: getAmounts(),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }

  chartInstance.value = new Chart(canvasRef.value, config)
}

function getLabels(): Date[] {
  return props.items
    .map(item => item.date)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
}

function getAmounts(): number[] {
  let saldo = 0
  return props.items.map(item => {
    saldo += item.amount
    return saldo
  })
}

// Watcher mit nextTick
watch(
  () => props.items,
  async (newItems) => {
    if (newItems && newItems.length > 0) {
      await createChart()
    } else {
      destroyChart()
    }
  },
  { deep: true, immediate: true }
)

onMounted(async () => {
  if (props.items && props.items.length > 0) {
    await createChart()
  }
})

onBeforeUnmount(() => {
  destroyChart()
})
</script>

<template>
  <div class="chart-container">
    <div v-if="items.length === 0" class="no-data-message">
      Keine Transaktionsdaten vorhanden oder konnten nicht geladen werden
    </div>
    <div v-else class="chart-wrapper">
      <canvas ref="canvasRef" :key="items.length"></canvas>
    </div>
  </div>
</template>

<style scoped>

</style>
