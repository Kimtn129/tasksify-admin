<script setup>
import { computed } from 'vue'
import { AccordionHeader, AccordionTrigger } from 'radix-vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@utils/ui-shadcn.util'

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  showDropdown: { type: Boolean, required: false }
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AccordionHeader class="flex items-center">
    <AccordionTrigger
      v-bind="delegatedProps"
      :class="
        cn(
          'flex flex-1 items-center justify-between py-4 font-normal md:font-medium transition-all hover:bg-accent rounded-[10px] [&[data-state=open]>div>svg:nth-child(1)]:rotate-180',
          props.class
        )
      "
    >
      <slot />
      <slot v-if="showDropdown" name="icon">
        <div>
          <ChevronDown
            class="h-6 w-6 text-secondary self-end shrink-0 transition-transform duration-200"
          />
        </div>
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
