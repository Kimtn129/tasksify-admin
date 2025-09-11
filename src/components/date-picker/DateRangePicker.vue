<script setup>
import { ref, watch } from 'vue'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { cn } from '@utils/ui-shadcn.util'

import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { RangeCalendar } from '@common/ui/range-calendar'
import { Button } from '@common/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@common/ui/popover'
import { getCurrentDate } from '@utils/datetime.util'

const props = defineProps({
  maxDate: { type: null, required: false }
})
const modelOpen = ref(false)
const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

const { year, month, day } = getCurrentDate()
const value = ref({
  start: new CalendarDate(year, month, day).subtract({ days: 7 }),
  end: new CalendarDate(year, month, day)
})
const model = defineModel()

watch(value, (newValue) => {
  if (newValue.start && newValue.end) {
    model.value = newValue
    modelOpen.value = false
  }
})
</script>

<template>
  <Popover v-model:open="modelOpen">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn('w-[280px] justify-start text-left font-normal', !value && 'text-muted-foreground')
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <template v-if="value.start">
          <template v-if="value.end">
            {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
            {{ df.format(value.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else>
            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else> Pick a date </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        v-model="value"
        initial-focus
        :number-of-months="2"
        :max-value="props.maxDate"
        @update:start-value="(startDate) => (value.start = startDate)"
      />
    </PopoverContent>
  </Popover>
</template>
