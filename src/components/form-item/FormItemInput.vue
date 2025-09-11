<script setup>
import { X, CircleAlert } from 'lucide-vue-next'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@common/ui/form'
import { Input } from '@common/ui/input'

defineProps({
  name: { type: String, required: true },
  type: { type: String, default: 'text' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  description: { type: String, default: '' },
  hideFormMessage: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false }
})
</script>

<template>
  <FormField v-slot="{ componentField, handleChange, value, errorMessage }" :name="name">
    <FormItem class="mt-3">
      <FormLabel v-if="label" class="text-primary">{{ label }}</FormLabel>
      <FormControl>
        <slot :component-field="componentField" :error-message="errorMessage">
          <div class="relative">
            <Input
              :type="type"
              :placeholder="placeholder"
              v-bind="{ ...componentField, ...$attrs }"
              :class="['pr-[30px] text-secondary border-secondary-foreground']"
            />
            <CircleAlert
              v-if="errorMessage"
              :size="16"
              class="icon-clear font-normal text-destructive"
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
      <FormMessage v-if="!hideFormMessage" />
    </FormItem>
  </FormField>
</template>

<style scoped lang="scss">
.icon-clear {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
