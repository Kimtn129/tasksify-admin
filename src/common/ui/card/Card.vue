<script setup>
import { cn } from '@utils/ui-shadcn.util'

const props = defineProps({
  title: { type: String, required: false },
  description: { type: String, required: false },
  class: { type: null, required: false }
})
</script>

<template>
  <div :class="cn('rounded-lg bg-background text-primary shadow-card p-4', props.class)">
    <p v-if="title" class="text-xl font-bold mb-3">{{ title }}</p>
    <p v-if="description" class="text-secondary text-sm">{{ description }}</p>
    <slot />
  </div>
</template>
