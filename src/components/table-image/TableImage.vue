<script setup>
import Tooltip from '@components/Tooltip.vue'

defineProps({
  src: String,
  name: String
})
</script>

<template>
  <div :class="classes['wrapper']">
    <slot name="float"> </slot>
    <slot>
      <div :class="[classes['wrapper-image-style']]">
        <img :class="[classes['image-style']]" alt="image" :src="src" />
      </div>
    </slot>
  </div>
</template>

<style module="classes" lang="scss" src="./TableImage.module.scss"></style>
