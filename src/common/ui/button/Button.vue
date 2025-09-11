<script setup>
import { Primitive } from 'radix-vue'
import { buttonVariants } from '.'
import { cn } from '@utils/ui-shadcn.util'
import { LoaderCircle } from 'lucide-vue-next'

const props = defineProps({
  variant: { type: null, required: false },
  size: { type: null, required: false },
  class: { type: null, required: false },
  loading: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false, default: 'button' }
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="loading"
  >
    <div v-if="loading" class="flex justify-center">
      <LoaderCircle class="animate-spin" />
    </div>

    <slot />
  </Primitive>
</template>
