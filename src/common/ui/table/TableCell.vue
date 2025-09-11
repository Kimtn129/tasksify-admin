<script setup>
import { cn } from '@utils/ui-shadcn.util'

const props = defineProps({
  class: { type: null, required: false },
  align: { type: String, default: 'left' }
})
</script>

<template>
  <td :class="cn('p-3 align-middle [&:has([role=checkbox])]:pr-0', props.class)" :align="align">
    <slot />
  </td>
</template>
