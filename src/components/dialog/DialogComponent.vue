<script setup>
import { Button } from '@common/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@common/ui/dialog'
import { DialogRoot } from 'radix-vue'

const props = defineProps({
  title: String,
  description: String,
  handleDiscardModel: Function,
  isOpen: Boolean,
  isShowFooter: { type: Boolean, default: true }
})

const emit = defineEmits(['cancel', 'confirm'])
const model = defineModel()
const handleCancel = () => {
  emit('cancel')
}

const handleConfirm = () => {
  emit('confirm')
}
</script>

<template>
  <DialogRoot v-model:open="model">
    <DialogTrigger as-child>
      <!-- <Button variant="outline"> Share </Button> -->
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle class="text-lg text-primary font-bold">{{ props.title }}</DialogTitle>
        <DialogDescription class="text-secondary mt-2 leading-6">
          {{ props.description }}
        </DialogDescription>
      </DialogHeader>
      <div>
        <slot />
      </div>
      <div class="flex justify-end items-center">
        <slot name="footer" />
      </div>
      <DialogFooter v-if="isShowFooter" class="justify-end">
        <DialogClose as-child>
          <Button type="button" class="uppercase" @click="handleCancel"> Cancel </Button>
        </DialogClose>
        <Button type="button" class="uppercase" variant="destructive" @click="handleConfirm">
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  </DialogRoot>
</template>
