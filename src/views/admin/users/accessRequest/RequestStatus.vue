<script setup>
import Text from '@components/text/Text.vue'
import Button from '@common/ui/button/Button.vue'
import { REQUEST_STATUS } from '@constants/common.constant'

defineProps({
  status: {
    type: String,
    required: true
  }
})

const statusAtt = {
  [REQUEST_STATUS.APPROVED]: {
    type: 'success',
    content: 'Approved'
  },
  [REQUEST_STATUS.PENDING]: {
    type: 'warning',
    content: 'Pending'
  },
  [REQUEST_STATUS.REJECTED]: {
    type: 'error',
    content: 'Rejected'
  }
}
</script>

<template>
  <Button
    :class="[
      statusAtt[status].type === 'success'
        ? 'bg-success'
        : statusAtt[status].type === 'warning'
          ? 'bg-warning'
          : 'bg-error'
    ]"
    class="w-[88px] h-6 flex justify-center items-center cursor-default"
  >
    <Text v-bind="statusAtt[status]" class="text-xs text-background" />
  </Button>
</template>
