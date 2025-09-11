<script setup>
import { X } from 'lucide-vue-next'
import { computed, inject, toRefs } from 'vue'
import { FormLabel, FormField, FormItem } from '@common/ui/form'
import Input from '@common/ui/input/Input.vue'
import FormDescription from '@common/ui/form/FormDescription.vue'
import { useInputRegex } from '@composables/useInputRegex'
import { REGEX_NUMBER } from '@constants/regex.constant'
import Text from '@components/text/Text.vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  type: { type: String, default: 'text' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  description: { type: String, default: '' },
  clearable: { type: Boolean, default: false },
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

const modeInjectDefault = {
  isViewMode: false,
  handleChangeMode: () => {}
}

const mode = inject('isViewMode', modeInjectDefault)
const isViewMode = mode?.isViewMode

const { error, errors, name } = toRefs(props)

const modelValue = defineModel({
  type: String,
  default: ''
})

const { vRegex } = useInputRegex()

const handleClear = () => {
  modelValue.value = ''
}

const errorMessage = computed(() => error.value || errors.value[name.value])
</script>

<template>
  <FormField :name="name">
    <FormItem>
      <div class="input-field">
        <FormLabel
          v-if="label"
          class="text-[14px]"
          :class="{
            required: !isViewMode
          }"
          >{{ label }}</FormLabel
        >
        <div class="relative mt-2">
          <Text v-if="isViewMode" as="p" class="mt-[5px] pt-[5px] border-t border-solid w-full"
            >{{ modelValue || '-'
            }}<Text v-if="name === 'physicalWorkPercentage' && modelValue" as="span">%</Text></Text
          >
          <Input
            v-else
            v-model="modelValue"
            v-regex="REGEX_NUMBER"
            :type="type"
            :placeholder="placeholder"
            :class="[
              {
                'pr-[30px]': clearable
              },
              errorMessage ? 'border-destructive' : ''
            ]"
          />
          <X
            v-if="clearable && modelValue?.length"
            class="icon-clear"
            size="20"
            @click="handleClear"
          />
        </div>
        <FormDescription v-if="description">
          {{ description }}
        </FormDescription>
        <div v-if="errorMessage" class="text-destructive">
          {{ errorMessage }}
        </div>
      </div>
    </FormItem>
  </FormField>
</template>

<style lang="scss">
.icon-clear {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
