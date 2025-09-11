<script setup>
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { cn } from '@utils/ui-shadcn.util'

import { Calendar as CalendarIcon, CircleAlert, X } from 'lucide-vue-next'
import { Calendar } from '@common/ui/calendar'
import { Button } from '@common/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@common/ui/popover'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@common/ui/form'

defineProps({
  name: { type: String, required: true },
  type: { type: String, default: 'text' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  description: { type: String, default: '' },
  hideFormMessage: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false }
})

const df = new DateFormatter('en-US', {
  dateStyle: 'long'
})
</script>

<template>
  <FormField v-slot="{ componentField, handleChange, value, errorMessage }" :name="name">
    <FormItem class="w-full">
      <FormLabel v-if="label" class="text-[14px] text-primary">{{ label }}</FormLabel>
      <FormControl>
        <slot :component-field="componentField" :error-message="errorMessage">
          <div class="relative mt-2">
            <Popover>
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  :class="
                    cn(
                      'w-[180px] justify-start text-left font-normal',
                      !value && 'text-muted-foreground'
                    )
                  "
                >
                  <CalendarIcon class="mr-2 h-4 w-4" />
                  {{ value ? df.format(value?.toDate?.(getLocalTimeZone())) : 'Pick a date' }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar v-bind="componentField" initial-focus />
              </PopoverContent>
            </Popover>

            <CircleAlert
              :size="16"
              v-if="errorMessage"
              class="icon-clear font-normal text-destructive absolute top-[40%] right-[10px]"
            />
            <X
              v-if="clearable && value?.length && !errorMessage"
              class="icon-clear text-[#666666]"
              size="20"
              @click="handleChange('')"
            />
          </div>
        </slot>
      </FormControl>
      <FormDescription v-if="description">
        {{ description }}
      </FormDescription>
      <div v-if="errorMessage" class="text-destructive text-sm">
        {{ errorMessage }}
      </div>
    </FormItem>
  </FormField>
</template>
