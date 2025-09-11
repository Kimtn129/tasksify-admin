<script setup>
import { cn } from '@utils/ui-shadcn.util'

const props = defineProps({
  class: { type: null, required: false },
  rootClass: { type: null, required: false }
})
</script>

<template>
  <div :class="cn('relative w-full', props.rootClass)">
    <table :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>
