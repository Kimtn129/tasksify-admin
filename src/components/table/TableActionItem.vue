<script setup>
import Text from '@components/text/Text.vue'
import Button from '@common/ui/button/Button.vue'
import { DropdownMenuItem } from '@common/ui/dropdown-menu'
defineProps({
  title: { type: String, default: 'View' },
  titleConfig: { type: Object, default: () => ({}) }
})
</script>

<template>
  <DropdownMenuItem as-child>
    <Button variant="ghost" class="flex gap-2 justify-start px-5 py-1 w-full cursor-pointer">
      <slot name="icon" />
      <Text class="font-medium text-[12px]" v-bind="titleConfig"> {{ title }} </Text>
    </Button>
  </DropdownMenuItem>
</template>
