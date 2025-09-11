<script setup>
import { RouterLink } from 'vue-router'
import Icon from '@components/Icon.vue'

defineProps({
  icon: { type: String, required: false },
  to: { type: String, required: true },
  title: { type: String, required: false },
  isShowSidebar: { type: Boolean, required: false }
})
</script>

<template>
  <li>
    <RouterLink
      :to="to"
      class="w-full text-primary h-[46px] flex items-center pl-4 transition group rounded-[8px] hover:bg-border"
      activeClass="!bg-destructive !text-background "
    >
      <slot name="icon">
        <Icon
          :icon="icon"
          :size="24"
          class="text-inherit grow-0 shrink-0 basis-24px group-hover:text-gray-900 transition duration-25"
        />
      </slot>

      <span v-if="isShowSidebar" class="ml-4 text-lg text-inherit">
        {{ title }}
      </span>
    </RouterLink>
  </li>
</template>
