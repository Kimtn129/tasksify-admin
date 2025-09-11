<script setup>
import { MultiSelect } from '@components/multi-select'
import { FormField, FormItem, FormMessage } from '@common/ui/form'
import { Text } from '@components/text'
import { joinArray } from '@utils/common.util'

const props = defineProps({
  isViewMode: { type: Boolean, default: false },
  options: { type: null, default: [] },
  name: { type: String, default: '' },
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

const handleInputChange = (val, handleChange) => {
  handleChange(val)
}
</script>

<template>
  <FormField v-slot="{ value, handleChange, errorMessage }" :name="name">
    <FormItem class="flex flex-col mt-4">
      <Text font="semi" class="!text-[14px]"
        >{{ label }} <span v-if="!isViewMode" class="text-red-700">*</span></Text
      >
      <Text
        v-if="isViewMode"
        :title="joinArray(value, 'name')"
        as="p"
        class="mt-[5px] pt-[5px] border-t border-solid truncate"
        >{{ joinArray(value, 'name') || '-' }}</Text
      >
      <MultiSelect
        v-else
        :options="options"
        :values="value"
        label-key="label"
        value-key="id"
        :is-error="!!errorMessage"
        :placeholder="placeholder"
        @change="(val) => handleInputChange(val, handleChange)"
      />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
