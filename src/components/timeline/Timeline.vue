<script setup>
import EmptyData from '@components/EmptyData.vue'
import { format } from 'date-fns'
import { LoaderCircle } from 'lucide-vue-next'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: false
  }
})
</script>

<template>
  <div :class="classes['history-container']">
    <div v-if="isLoading" class="flex justify-center">
      <LoaderCircle class="animate-spin text-destructive" />
    </div>
    <div
      v-else-if="!props?.data?.length"
      class="w-full flex flex-col items-center justify-center gap-y-[20px]"
    >
      <EmptyData
        class="h-full"
        custom-message="No Data at your selection"
        custom-search-message="Choose other date range or server"
      />
    </div>
    <div v-for="item in props?.data" v-else :key="item.id" :class="classes['time-line']">
      <div>
        <p :class="classes['time-note']"></p>
      </div>

      <div class="pt-2 w-full">
        <p class="text-lg font-medium leading-6">{{ item.title }}</p>
        <p v-if="item.created_at" class="w-full leading-6 truncate hover:text-clip">
          {{ format(item?.created_at, 'dd MMM yyyy, hh:mma') }}
        </p>
        <p class="leading-6 truncate hover:text-clip">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<style module="classes" lang="scss" src="./timeline.scss"></style>
