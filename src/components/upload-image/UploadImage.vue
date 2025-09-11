<script setup>
import { useField } from 'vee-validate'
import Lightbox from '@components/lightbox/Lightbox.vue'
import DropZone from '@components/dropzone/DropZone.vue'
import CardImage from '@components/card-image/CardImage.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  isMultiple: { type: Boolean, required: false, default: false }
})
const { value, errorMessage, handleChange, setErrors } = useField(props.name)

const limit = 10
const lsImages = ref([])

watch(
  value,
  (value) => {
    if (value?.length) {
      lsImages.value = value
    }
  },
  {
    once: true,
    deep: true
  }
)

const handleEmitValue = (value, validate = true) => {
  // Check if isMultiple is false; if so, pass an object instead of an array
  if (!props.isMultiple && value?.length > 0) {
    handleChange(value[0], validate)
  } else if (value?.length > 0) {
    handleChange([...value], validate)
  } else {
    handleChange(null, validate)
  }
}

const handleUploadImage = (value) => {
  if (value?.length) {
    const validArr = value.filter((item) => !item.error) || []
    const limitErr = lsImages.value.length + validArr.length <= limit

    if (limitErr) {
      let newArr

      if (props.isMultiple) {
        // If multiple images are allowed, concatenate the new valid images
        newArr = [...lsImages.value, ...validArr] || []
      } else {
        // If single image only, replace the existing array with the new image
        newArr = validArr.length ? [validArr[0]] : []
      }

      lsImages.value = [...newArr] || []

      if (props.isMultiple && validArr.length < value.length) {
        handleEmitValue(newArr, false)
        setErrors('notify.systems.error_image_file')
      } else {
        handleEmitValue(newArr)
      }
    } else {
      setErrors('notify.systems.error_image_limit')
    }
  }
}

const handleRemoveImage = (removeIndex) => {
  const newArr = lsImages.value.filter((_, index) => index !== removeIndex) || []
  lsImages.value = [...newArr] || []
  handleEmitValue(newArr)
}
</script>

<template>
  <div class="h-100% flex flex-col" :class="'upload-image-style'">
    <div class="flex justify-center gap-13px h-100% px-16px py-20px bg-upload rounded-8px">
      <Lightbox :items="lsImages">
        <template #default="{ show }">
          <div
            class="flex justify-center min-h-[48px]"
            :class="'gap-24px w-full h-full max-h-550px overflow-y-auto'"
          >
            <DropZone
              :class="'w-full h-[42px] '"
              :isMultiple="isMultiple"
              @emitChanges="handleUploadImage"
              v-if="lsImages.length < limit && (isMultiple || lsImages.length === 0)"
            />
            <div
              class="flex justify-center"
              v-for="(item, index) in lsImages"
              :key="index"
              @click="show(index)"
            >
              <CardImage
                :name="item.name"
                :src="item.url"
                iconSrc="remove-image-icon"
                @clickIcon="handleRemoveImage(index)"
              />
            </div>
          </div>
        </template>
      </Lightbox>
      <div v-if="isMultiple" class="flex-self-end">
        <p class="text-1rem color-upload-subtext text-right">{{ lsImages.length }}/{{ limit }}</p>
      </div>
    </div>
  </div>
  <p class="mt-2 text-destructive" v-if="errorMessage">{{ errorMessage }}</p>
</template>

<style lang="scss" scoped>
.upload-image-style {
  padding-left: 20px;
  margin-top: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
}

/* Define the scrollbar style */
.uploadImageScroll::-webkit-scrollbar {
  width: 8px;
}

/* Define the thumb style */
.uploadImageScroll::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 5px;
}

/* Define the track style */
.uploadImageScroll::-webkit-scrollbar-track {
  background: unset;
}
</style>
