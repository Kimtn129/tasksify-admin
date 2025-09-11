<script setup>
import { FormField } from '@common/ui/form'
import FormItem from '@common/ui/form/FormItem.vue'
import FormLabel from '@common/ui/form/FormLabel.vue'
import FormMessage from '@common/ui/form/FormMessage.vue'
import MultiSelect from '@components/multi-select/MultiSelect.vue'
import TagsInputItemText from '@common/ui/tags-input/TagsInputItemText.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  description: { type: String, default: '' },
  required: { type: Boolean, default: false },
  options: { type: null, default: [] },
  valueKey: { type: String, default: '_id' },
  labelKey: { type: String, default: 'label' },
  searchKeys: { type: Array, default: () => [] },
  config: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <FormField v-slot="{ value, handleChange, errorMessage }" :name="name">
    <FormItem class="flex flex-col w-full">
      <FormLabel
        v-if="label"
        class="text-[14px]"
        :class="{
          required
        }"
        >{{ label }}</FormLabel
      >
      <MultiSelect
        :values="value"
        :options="options"
        :placeholder="placeholder"
        :value-key="valueKey"
        :label-key="labelKey"
        :is-error="!!errorMessage"
        :search-keys="searchKeys"
        is-tag-select
        v-bind="config"
        @change="handleChange"
      >
        <template #selected-item-content="{ item }">
          <slot name="selected-item-content" v-bind="{ item }">
            <TagsInputItemText
              as="p"
              :title="item[props.labelKey]"
              class="truncate max-w-full py-0 leading-[22px]"
            />
          </slot>
        </template>
        <template #option-content="{ option, ...rest }">
          <slot name="option-content" v-bind="{ option, ...rest }">
            <span :title="option[labelKey]" class="truncate">{{ option[labelKey] }}</span>
          </slot>
        </template>
      </MultiSelect>
      <FormMessage class="text-destructive" />
    </FormItem>
  </FormField>
</template>
