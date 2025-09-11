<script setup>
import Icon from '@components/Icon.vue'
import Spinner from '@components/spinner/Spinner.vue'
import { splitImageName } from '@utils/file.util'
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  cells: {
    type: Number,
    default: 5
  },
  showPreview: {
    type: Boolean,
    default: true
  }
})

const src = ref('')
const index = ref(-1)
const loading = ref(false)
const events = ref([])

const callMyFunction = (imageName) => {
  return splitImageName(imageName)
}

const bind = () => {
  if (events.value.length > 0) return

  events.value.push([
    'keydown',
    (e) => {
      if (index.value < 0) return
      if (e.keyCode === 37) {
        prev()
      } else if (e.keyCode === 39) {
        next()
      } else if (e.keyCode === 27) {
        close()
      }
    }
  ])
  events.value.forEach((e) => {
    window.addEventListener(e[0], e[1])
  })
}

const show = (i) => {
  if (!props.showPreview) return
  if (i >= props.items.length) {
    i = 0
  }
  if (i < 0) {
    i = props.items.length - 1
  }
  loading.value = true
  bind()
  index.value = i
  const srcValue = props.items[i].url
  const img = new Image()
  img.src = srcValue
  img.onload = () => {
    setTimeout(() => {
      loading.value = false
      src.value = srcValue
    }, 400)
  }
}

const next = () => {
  show(index.value + 1)
}

const prev = () => {
  show(index.value - 1)
}

const close = () => {
  index.value = -1
  events.value.forEach((e) => {
    window.removeEventListener(e[0], e[1])
  })
  events.value = []
}

const bg = (i) => {
  return i && i.length > 0 ? `background-image: url('${i}')` : ''
}
</script>
<template>
  <div>
    <slot :show="show">
      <div class="lb" v-if="items.length > 0">
        <div
          class="lb-grid h-9.625rem"
          md:h-240px
          :class="[
            items.length > cells ? 'lb-grid-' + cells : 'lb-grid-' + items.length,
            !props.showPreview && 'lb-item--no-event'
          ]"
        >
          <div
            class="lb-item"
            v-for="(src, i) in items.slice(0, cells)"
            :key="i"
            @click="show(i)"
            :style="bg(src.url)"
          >
            <p class="title-image max-w-90% truncate" truncate>{{ callMyFunction(src?.name) }}</p>
            <span class="lb-more" v-if="i == cells - 1 && items.length - cells > 0"
              >{{ items.length - cells }}+</span
            >
          </div>
        </div>
      </div>
    </slot>

    <Transition name="fade">
      <div class="lb-modal" v-if="index >= 0">
        <button class="btn btn-close lb-modal-close" @click="close">
          <Icon icon="remove-image-icon" :size="24" />
        </button>
        <button class="btn lb-modal-prev" @click="prev">
          <Icon icon="icon-chevron-back" :size="24" color="none" />
        </button>
        <button class="btn lb-modal-next" @click="next" style="transform: rotate(180deg)">
          <Icon icon="icon-chevron-back" :size="24" color="none" />
        </button>

        <div class="lb-modal-img" @click="close">
          <Transition name="fade"
            ><Spinner v-show="loading" class="spinner mr-2" :size="40"
          /></Transition>
          <Transition name="fade"><img :src="src" v-show="!loading" /></Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style module="classes" lang="scss" src="./lightbox.scss"></style>
