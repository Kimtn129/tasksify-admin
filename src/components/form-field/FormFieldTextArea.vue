<script setup>
import { inject } from 'vue'

import Textarea from '@common/ui/textarea/Textarea.vue'
import { FormLabel, FormField, FormItem, FormControl } from '@common/ui/form'
import FormDescription from '@common/ui/form/FormDescription.vue'
import { CircleAlert, X } from 'lucide-vue-next'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  type: { type: String, default: 'text' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  description: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  error: {
    type: String,
    default: ''
  },
  errors: {
    type: Object,
    default: () => ({})
  },
  config: {
    type: Object,
    default: () => ({})
  },
  maxlength: {
    type: Number,
    default: null
  },
  clearable: { type: Boolean, default: false }
})

const modeInjectDefault = {
  isViewMode: false,
  handleChangeMode: () => {}
}

const mode = inject('isViewMode', modeInjectDefault)
const isViewMode = mode?.isViewMode
</script>

<template>
  <FormField v-slot="{ componentField, handleChange, value, errorMessage }" :name="name">
    <FormItem class="w-full mt-3">
      <FormLabel
        v-if="label"
        class="text-[14px] text-primary"
        :class="{
          required: !isViewMode && required
        }"
        >{{ label }}</FormLabel
      >
      <FormControl>
        <slot :component-field="componentField" :error-message="errorMessage">
          <div class="relative">
            <Textarea
              :type="type"
              :placeholder="placeholder"
              :class="['pr-[30px] text-primary border-secondary-foreground']"
              v-bind="componentField"
              :disabled="disabled"
              :maxlength="maxlength"
            />
            <CircleAlert
              v-if="errorMessage"
              :size="16"
              class="icon-clear font-normal text-destructive absolute top-[45%] right-[10px]"
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
