<script setup>
import Icon from '@components/Icon.vue'
import Tooltip from '@components/Tooltip.vue'

defineProps({
  src: String,
  name: String,
  iconSrc: String
})

const emit = defineEmits(['clickIcon'])
</script>

<template>
  <div :class="classes['wrapper']">
    <slot name="float">
      <Icon
        :class="classes['remove-icon-style']"
        :icon="iconSrc"
        :size="24"
        @click.stop="emit('clickIcon')"
        v-if="iconSrc"
      />
    </slot>
    <slot>
      <div :class="[classes['wrapper-image-style']]">
        <img :class="[classes['image-style']]" alt="image" :src="src" />
        <Tooltip trigger-class="max-w-full min-w-0">
          <p class="text-0.75rem color-gamuda-subtext text-center truncate">
            {{ name }}
          </p>
          <template #popper>
            <div class="p-4px bg-gray-100">
              <p class="text-0.75rem color-gamuda-subtext text-center">
                {{ name }}
              </p>
            </div>
          </template>
        </Tooltip>
      </div>
    </slot>
  </div>
</template>

<style module="classes" lang="scss" src="./CardImage.module.scss"></style>
