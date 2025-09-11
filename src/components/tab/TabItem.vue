<script setup>
defineProps({
  id: { type: Number },
  name: { type: String },
  icon: { type: null },
  isSelected: { type: Boolean }
})

const emit = defineEmits(['clickItem'])

const handleSelect = (value) => {
  emit('clickItem', value)
}
</script>

<template>
  <div
    :class="[classes['tab-item-style'], isSelected && classes['active']]"
    @click="handleSelect(id)"
  >
    <component :is="icon" :class="[classes['icon-style'], isSelected && classes['active']]" />
    <p :class="[classes['text-style'], isSelected && classes['active']]">{{ name }}</p>
  </div>
</template>

<style module="classes" lang="scss" src="./tab.module.scss"></style>
