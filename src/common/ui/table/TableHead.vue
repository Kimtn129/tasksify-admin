<script setup>
import { cn } from '@utils/ui-shadcn.util'

const props = defineProps({
  class: { type: null, required: false },
  align: { type: String, default: 'left' }
})
</script>

<template>
  <th
    :class="
      cn(
        'px-3 py-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        props.class
      )
    "
    :align="align"
  >
    <slot />
  </th>
</template>
