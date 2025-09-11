<script setup>
import { computed, toRefs } from 'vue'

import { RadioGroup, RadioGroupItem } from '@common/ui/radio-group'
import { FormLabel, FormDescription, FormItem, FormField } from '@common/ui/form'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  label: { type: String, default: '' },
  description: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  error: {
    type: String,
    default: ''
  },
  errors: {
    type: Object,
    default: () => ({})
  }
})

const { error, errors, name } = toRefs(props)

const modelValue = defineModel({
  type: String || Number,
  default: ''
})

const errorMessage = computed(() => error.value || errors.value[name.value])
</script>

<template>
  <FormField :name="name">
    <FormItem>
      <FormLabel
        v-if="label"
        :class="{
          required
        }"
      >
        {{ label }}
      </FormLabel>
      <RadioGroup v-model="modelValue" class="flex flex-wrap gap-10">
        <slot>
          <div v-for="option in options" :key="option.value" class="flex items-center gap-2">
            <RadioGroupItem :value="option.value" :disabled="disabled" />
            <FormLabel class="font-normal"> {{ option.label }} </FormLabel>
          </div>
        </slot>
      </RadioGroup>
      <FormDescription v-if="description">
        {{ description }}
      </FormDescription>
      <div v-if="errorMessage" class="text-destructive">
        {{ errorMessage }}
      </div>
    </FormItem>
  </FormField>
</template>
