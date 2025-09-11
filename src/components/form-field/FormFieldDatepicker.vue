<script setup>
import { format } from 'date-fns'
import { computed, inject, toRefs } from 'vue'
import { cn } from '@utils/ui-shadcn.util'
import { Calendar, ChevronDown } from 'lucide-vue-next'

import { Button } from '@common/ui/button'
import { FormLabel } from '@common/ui/form'
import CommonCalendar from '@common/ui/calendar/Calendar.vue'
import FormDescription from '@common/ui/form/FormDescription.vue'
import { Popover, PopoverContent, PopoverTrigger } from '@common/ui/popover'
import Text from '@components/text/Text.vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  label: { type: String, default: '' },
  placeholder: { type: String, default: 'Pick a date' },
  required: { type: Boolean, default: false },
  description: { type: String, default: '' },
  error: {
    type: String,
    default: ''
  },
  errors: {
    type: Object,
    default: () => ({})
  },
  dateFormat: { type: String, default: 'dd MMMM yyyy' },
  config: { type: Object, default: () => ({}) }
})

const { error, errors, name } = toRefs(props)
const modeInjectDefault = {
  isViewMode: false,
  handleChangeMode: () => {}
}

const mode = inject('isViewMode', modeInjectDefault)
const isViewMode = mode?.isViewMode

const modelValue = defineModel({
  type: [String, Date],
  default: ''
})

const errorMessage = computed(() => error.value || errors.value[name.value])
</script>

<template>
  <div class="w-full">
    <FormLabel v-if="label" class="text-[14px]" :class="{ required: !isViewMode }">{{
      label
    }}</FormLabel>

    <div class="relative mt-2">
      <Text v-if="isViewMode" as="p" class="mt-[5px] pt-[5px] border-t border-solid w-full">{{
        modelValue ? format(modelValue, dateFormat) : '-'
      }}</Text>
      <Popover v-else>
        <PopoverTrigger as-child>
          <div class="relative">
            <Calendar size="16" class="icon-calendar opacity-50 cursor-pointer" />
            <Button
              variant="secondary"
              :class="
                cn(
                  'w-full px-3 text-left font-normal',
                  !modelValue && 'text-muted-foreground',
                  errorMessage ? 'border-destructive' : 'border-grey-400'
                )
              "
            >
              <div class="w-full pl-7 text-[13px]">
                {{ modelValue ? format(modelValue, dateFormat) : placeholder }}
              </div>
            </Button>
            <ChevronDown size="16" class="icon-dropdown opacity-50 cursor-pointer" />
          </div>
        </PopoverTrigger>
        <PopoverContent class="p-0">
          <CommonCalendar v-model="modelValue" :config="config" />
        </PopoverContent>
      </Popover>
    </div>
    <FormDescription v-if="description">
      {{ description }}
    </FormDescription>
    <div v-if="errorMessage" class="text-destructive mt-[6px] text-[13px]">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-calendar {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.icon-dropdown {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
