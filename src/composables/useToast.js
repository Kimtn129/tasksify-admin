import { h, markRaw } from 'vue'
import { toast } from 'vue-sonner'
import CustomToast from '@components/toast/CustomToast.vue'
import { TOAST_TYPE } from '@constants/common.constant'

const createToast = (props, slot) => markRaw(h(CustomToast, props, slot))

export const useToast = () => {
  const success = (message, { config, slot } = {}) => {
    toast.custom(createToast({ message, type: TOAST_TYPE.SUCCESS }, slot), config)
  }

  const danger = (message, { config, slot } = {}) => {
    toast.custom(createToast({ message, type: TOAST_TYPE.DANGER }, slot), config)
  }

  const info = (message, { config, slot } = {}) => {
    toast.custom(createToast({ message, type: TOAST_TYPE.INFO }, slot), config)
  }

  return {
    success,
    danger,
    info
  }
}
