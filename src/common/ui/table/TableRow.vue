<script setup>
import { cn } from '@utils/ui-shadcn.util'

const props = defineProps({
  class: { type: null, required: false }
})
</script>

<template>
  <tr :class="cn('transition-colors data-[state=selected]:bg-muted', props.class)">
    <slot />
  </tr>
</template>
