<script setup>
import { inject, toRefs } from 'vue'
import { FormLabel, FormField, FormItem } from '@common/ui/form'
import FormDescription from '@common/ui/form/FormDescription.vue'

import { FormMessage } from '@common/ui/form'
import SingleSelect from '@components/single-select/SingleSelect.vue'
import Text from '@components/text/Text.vue'

const props = defineProps({
  options: { type: null, default: [] },
  name: {
    type: String,
    default: ''
  },
  type: { type: String, default: 'text' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  description: { type: String, default: '' },
  required: { type: Boolean, default: false },
  error: {
    type: String,
    default: ''
  },
  errors: {
    type: Object,
    default: () => ({})
  }
})

const { name } = toRefs(props)

const modelValue = defineModel({
  type: String,
  default: ''
})

const handleChange = (value) => {
  modelValue.value = value
}

const modeInjectDefault = {
  isViewMode: false,
  handleChangeMode: () => {}
}

const mode = inject('isViewMode', modeInjectDefault)
const isViewMode = mode?.isViewMode
const handleInputChange = (val, handleChange) => {
  handleChange(val)
}
const findItem = (id) => {
  if (!Array.isArray(props?.options)) return ''
  return props?.options?.filter((item) => item?._id === id)[0]?.name || ''
}
</script>

<template>
  <FormField v-slot="{ errorMessage }" :name="name">
    <FormItem>
      <div>
        <FormLabel v-if="label" class="text-[14px]" :class="{ required: !isViewMode }">{{
          label
        }}</FormLabel>
        <div class="relative mt-2">
          <Text v-if="isViewMode" as="p" class="mt-[5px] pt-[5px] border-t border-solid w-full">{{
            findItem(modelValue) || '-'
          }}</Text>

          <SingleSelect
            v-else
            :value="modelValue"
            :options="options"
            :placeholder="placeholder || $t('common.select_option')"
            value-key="_id"
            label-key="name"
            :is-error="!!errorMessage"
            width="100%"
            list-width="400px"
            popover-trigger-class="min-h-[35px]"
            @change="(val) => handleInputChange(val, handleChange)"
          />
          <FormMessage />
        </div>
        <FormDescription v-if="description">
          {{ description }}
        </FormDescription>
      </div>
    </FormItem>
  </FormField>
</template>
