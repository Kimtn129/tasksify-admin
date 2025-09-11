<script setup>
import { EllipsisVertical, Pencil, Trash2, Eye, Send, Check, X } from 'lucide-vue-next'
import { RouterLink, useRouter } from 'vue-router'
import { Button, Icon } from '@common/ui'
import Text from '@components/text/Text.vue'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@common/ui/dropdown-menu'

const emits = defineEmits(['delete', 'edit', 'view', 'approve', 'reject'])

const props = defineProps({
  isHidden: {
    type: Boolean,
    default: false
  },
  isSuperAdmin: {
    type: Boolean,
    default: false
  },
  actions: {
    type: Array,
    default: () => []
  },
  linkToDetail: {
    type: String,
    default: ''
  },
  linkToEdit: {
    type: String,
    default: ''
  },
  setId: {
    type: Function
  },
  setOpenPopup: {
    type: Function
  },
  handleApprove: {
    type: Function
  },
  setOpenSidePanel: {
    type: Function
  }
})

const router = useRouter()

const handleEdit = () => {
  emits('edit')
  props.setId?.()
  if (props.setOpenPopup) {
    props.setOpenPopup('edit')
  } else if (props.setOpenSidePanel) {
    props.setOpenSidePanel('edit')
  }
}

const handleView = () => {
  emits('view')
  props.setId?.()
  if (props.linkToDetail) {
    router.push(props.linkToDetail)
  } else if (props.setOpenSidePanel) {
    props.setOpenSidePanel('detail')
  }
}

const handleDelete = () => {
  emits('delete')
  props.setId?.()
  if (props.setOpenPopup) {
    props.setOpenPopup('confirm')
  } else if (props.setOpenSidePanel) {
    props.setOpenSidePanel('delete')
  }
}

const handleApprove = () => {
  emits('approve')
  props.setId?.()
  if (props.handleApprove) {
    props.handleApprove('approved')
  }
}

const handleReject = () => {
  emits('reject')
  props.setId?.()
  if (props.setOpenPopup) {
    props.setOpenPopup('confirm')
  }
}
</script>

<template>
  <div class="flex items-center justify-center gap-5 w-full" :class="{ hidden: isHidden }">
    <RouterLink v-if="actions.includes('detail')" :to="linkToDetail">
      <Icon icon="ic-expand" />
    </RouterLink>

    <DropdownMenu v-if="actions.length > 0 || $slots['action-group']">
      <DropdownMenuTrigger @click.prevent.stop>
        <EllipsisVertical size="19" class="text-secondary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="flex flex-col gap-2 py-[6px]">
        <DropdownMenuItem as-child>
          <Button
            v-if="actions.includes('view')"
            variant="ghost"
            class="flex gap-2 justify-start px-5 py-1 w-full text-left cursor-pointer"
            @click="handleView"
          >
            <Eye size="16" />
            <Text class="font-medium text-[12px]">{{ $t('common.table_action.view') }} </Text>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem as-child>
          <Button
            v-if="actions.includes('edit') || isSuperAdmin"
            variant="ghost"
            class="flex gap-2 justify-start px-5 py-1 w-full text-left cursor-pointer"
            @click="handleEdit"
          >
            <Pencil size="16" class="text-primary-blue" />
            <Text class="font-medium text-[12px]">{{ $t('common.table_action.edit') }} </Text>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem as-child>
          <Button
            v-if="actions.includes('delete') || isSuperAdmin"
            variant="ghost"
            class="flex gap-2 justify-start px-5 py-1 w-full cursor-pointer"
            @click="handleDelete"
          >
            <Trash2 size="16" class="text-destructive" />
            <Text class="font-medium text-[12px]"> {{ $t('common.table_action.delete') }} </Text>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem as-child>
          <Button
            v-if="actions.includes('approve') || isSuperAdmin"
            variant="ghost"
            class="flex gap-2 justify-start px-5 py-1 w-full cursor-pointer"
            @click="handleApprove"
          >
            <Check size="16" class="text-success" />
            <Text class="font-medium text-[12px]"> {{ $t('common.table_action.approve') }} </Text>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem as-child>
          <Button
            v-if="actions.includes('reject') || isSuperAdmin"
            variant="ghost"
            class="flex gap-2 justify-start px-5 py-1 w-full cursor-pointer"
            @click="handleReject"
          >
            <X size="16" class="text-destructive" />
            <Text class="font-medium text-[12px]"> {{ $t('common.table_action.reject') }} </Text>
          </Button>
        </DropdownMenuItem>
        <slot name="action-group" />
      </DropdownMenuContent>
      <slot />
    </DropdownMenu>
  </div>
</template>
