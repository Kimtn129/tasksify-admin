<script setup>
import { typeOfValue } from '@utils/value.util'
import { computed, ref } from 'vue'

const props = defineProps({})

const selectedValue = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])

const handleChange = (event) => {
  const newValue = event.target.value
  selectedValue.value = newValue
  emit('update:modelValue', newValue)
}

const displayLabel = computed(() => {
  if (typeOfValue(props.label) === 'string') {
    return props.label
  } else {
    return null
  }
})

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <label :class="classes['radio-wrapper']">
    <input
      type="radio"
      :id="id"
      :value="value"
      v-bind="$attrs"
      v-model="selectedValue"
      @change="handleChange"
    />
    <div :class="classes['mark']" v-if="!props.isHidden">
      <Icon :class="classes['icon']" icon="ic-round-circle" color="#FF5156" :size="24" />
    </div>
    <span v-html="displayLabel"></span>
  </label>
</template>

<style module="classes" lang="scss" src="./radio.module.scss"></style>
