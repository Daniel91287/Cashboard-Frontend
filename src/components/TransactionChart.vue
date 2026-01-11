<script setup lang="ts">
import {defineProps, nextTick, onBeforeUnmount, onMounted, ref, watch} from 'vue'
import type {Transaction} from "@/types.ts";
import {Chart, type ChartConfiguration} from "chart.js/auto"
import type { ScriptableContext } from 'chart.js'

const props = defineProps<{
  items: Transaction[]
}>()

const chartInstance = ref<Chart | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
let resizeTimeout: number | null = null

function destroyChart() {
  if (chartInstance.value) {
    chartInstance.value.destroy()
    chartInstance.value = null
  }
}

async function createChart() {
  await nextTick()

  if (!canvasRef.value || props.items.length === 0) {
    return
  }

  destroyChart()

  const config: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: getLabels(),
      datasets: [{
        label: 'Kontosaldo',
        data: getAmounts(),
        borderWidth: 1,
        tension: 0.3,
        borderColor: '#c8fff4',
        pointBackgroundColor: '#c8fff4',

        fill: true,
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const chart = context.chart
          const { ctx, chartArea } = chart

          if (!chartArea) {
            return undefined
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          )

          gradient.addColorStop(0, 'rgba(200,255,244,0.3)')
          gradient.addColorStop(1, 'rgba(200,255,244,0)')

          return gradient
        }
      }]
    },
    options: {
      responsive: true,
      animation: {
        easing: 'easeInOutQuad',
        duration: 520
      },
      scales: {
        x: {
          ticks: {
            color: '#ffffff'
          },
          grid: {
            color: 'rgba(255,255,255,0.2)'
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#ffffff'
          },
          grid: {
            color: 'rgba(255,255,255,0.2)'
          }
        }
      }
    }
  }


  chartInstance.value = new Chart(canvasRef.value, config)
}

function getLabels(): string[] {
  const formatter = new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return props.items
    .map(item => new Date(item.date))
    .sort((a, b) => a.getTime() - b.getTime())
    .map(date => {
      const parts = formatter.formatToParts(date)

      const day = parts.find(p => p.type === 'day')?.value
      const month = parts.find(p => p.type === 'month')?.value.replace('.', '')
      const year = parts.find(p => p.type === 'year')?.value

      return `${day}. ${month!.toUpperCase()} ${year}`
    })
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

function handleResize() {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }

  resizeTimeout = setTimeout(() => {
    if (chartInstance.value) {
      chartInstance.value.resize()
    }
  }, 150) as unknown as number
}

onMounted(async () => {
  window.addEventListener('resize', handleResize)
  if (props.items.length > 0) {
    await createChart()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (resizeTimeout) clearTimeout(resizeTimeout)
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
.chart-container {
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(200, 255, 244, 0.5);
}
</style>
