<script setup>
import { cn } from '@utils/ui-shadcn.util'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { LoaderCircle } from 'lucide-vue-next'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  data: { type: Object, required: false },
  isLoading: { type: Boolean, required: false },
  class: { type: null, required: false }
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  radius: '60%',

  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 15,
        font: {
          size: 13
        },
        padding: 5
      }
    }
  },
  title: {
    display: true,
    text: 'Chart.js Doughnut Chart'
  }
}
</script>
<template>
  <div class="flex flex-cols justify-center items-center">
    <slot />
    <div v-if="isLoading" class="flex justify-center items-center">
      <LoaderCircle class="animate-spin" />
    </div>
    <Doughnut v-else :data="data" :options="options" :class="cn('w-full h-full', props.class)" />
  </div>
</template>
