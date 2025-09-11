<script setup>
import { CircleCheck, Info, TriangleAlert, X } from 'lucide-vue-next'
import Button from '@common/ui/button/Button.vue'
import { TOAST_TYPE } from '@constants/common.constant'
import Text from '@components/text/Text.vue'

const emits = defineEmits(['closeToast'])

defineProps({
  message: { type: String, required: true },
  type: { type: String, default: 'NONE' },
  hidePreIcon: { type: Boolean, default: false }
})

const toastCustom = {
  [TOAST_TYPE.SUCCESS]: {
    preIcon: CircleCheck,
    preIconClass: 'text-success',
    class: 'border-success bg-foreground text-primary'
  },
  [TOAST_TYPE.DANGER]: {
    preIcon: TriangleAlert,
    preIconClass: 'text-destructive',
    class: 'border-destructive bg-foreground text-destructive'
  },
  [TOAST_TYPE.INFO]: {
    preIcon: Info,
    preIconClass: 'text-info',
    class: 'border-info bg-info-foreground text-info'
  },
  [TOAST_TYPE.NONE]: {
    preIcon: null,
    class: 'border-grey-400 bg-grey-100'
  }
}
</script>

<template>
  <div class="toast relative w-[360px] rounded">
    <div
      class="border-l-[4px] p-[15px] pl-[10px] pr-[30px] rounded"
      :class="toastCustom[type].class"
    >
      <div class="flex items-center gap-2">
        <component
          :is="toastCustom[type].preIcon"
          v-if="!hidePreIcon"
          class="flex-0"
          :class="toastCustom[type].preIconClass"
        />

        <slot>
          <Text>
            {{ message }}
          </Text>
        </slot>
      </div>
    </div>
    <Button variant="ghost" class="p-0 icon-close" @click="emits('closeToast')">
      <X size="16" />
    </Button>
  </div>
</template>

<style lang="scss" scoped>
.toast {
  box-shadow: 0px 4px 6px 0px #00000017;
}

.icon-close {
  position: absolute;
  right: 10px;
  top: 18px;
}
</style>
