<script setup>
import { FILE_SIZE_10MB, FILE_TYPE } from '@constants/image.constant.js'
import { handleExtensionFile } from '@utils/file.util'
import { ImageUp } from 'lucide-vue-next'
import { ref } from 'vue'

const { limitSize, limitType, isMultiple } = defineProps({
  limitSize: { type: Number, default: FILE_SIZE_10MB },
  limitType: { type: Array, default: FILE_TYPE },
  isMultiple: { type: Boolean, default: false }
})

const emits = defineEmits(['emitChanges'])
const active = ref(false)
const userAgent = ref(window?.navigator?.userAgent)

const handleValidateFile = (arr) => {
  if (arr?.length) {
    const files = handleExtensionFile(arr) || []
    let newArr = []

    files.forEach((item) => {
      const isTypeSupport =
        item.type === FILE_TYPE[0] || item.type === FILE_TYPE[1] || item.type === FILE_TYPE[2]
      if (
        (isTypeSupport && limitSize >= item.size) ||
        (isTypeSupport && limitSize >= item.size && userAgent.value.includes('Mobile'))
      ) {
        newArr.push({
          file: item,
          name: item.name,
          url: URL.createObjectURL(item),
          error: null
        })
      } else {
        newArr.push({
          file: null,
          name: null,
          url: null,
          error: true
        })
      }
    })
    emits('emitChanges', newArr)
  }
}

const handleDropFiles = (event) => {
  toggleActive()
  const files = Object.values(event.dataTransfer.files)
  handleValidateFile(files)
  handleClearInput()
}

const handleSelectFiles = (event) => {
  const files = Object.values(event.target.files)
  handleValidateFile(files)
  handleClearInput()
}

const handleDragFiles = () => {
  toggleActive()
}

const handleClearInput = () => {
  const ref = document.querySelector('#dropzoneFile')
  if (ref) ref.value = ''
}

const toggleActive = () => {
  active.value = !active.value
}
</script>

<template>
  <label
    for="dropzoneFile"
    :class="{ 'dropzone-active': active }"
    class="dropzone"
    @dragenter.prevent="handleDragFiles"
    @dragleave.prevent="handleDragFiles"
    @dragover.prevent
    @drop.prevent="handleDropFiles"
    @change="handleSelectFiles"
    v-bind="$attrs"
  >
    <slot>
      <ImageUp class="text-primary" />
      <span>Choose photo</span>
    </slot>
    <input :multiple="isMultiple" :accept="limitType.toString()" type="file" id="dropzoneFile" />
  </label>
</template>

<style scoped>
#dropzoneFile {
  display: none;
}

.dropzone {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--input-border);
  border-radius: 10px;
}

.dropzone-active {
  opacity: 0.5;
}
</style>
