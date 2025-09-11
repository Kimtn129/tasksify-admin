<script setup>
import { RouterLink } from 'vue-router'

import Tab from '@components/tab/Tab.vue'
import TabItem from '@components/tab/TabItem.vue'

defineProps({
  option: { type: Array, required: false },
  selected: { type: Number }
})

const emit = defineEmits(['clickItem'])

const handleSelect = (value) => {
  emit('clickItem', value)
}
</script>

<template>
  <div>
    <div class="mt-2">
      <h2>Users Management</h2>

      <Tab class="mb-20px" :option="option" :selected="selected" @clickItem="handleSelect">
        <RouterLink v-for="item in option" :key="item.id" :to="`?tab=${item?.param}`">
          <TabItem
            :class="'w-229px'"
            :key="item.id"
            :id="item.id"
            :name="item.name"
            :icon="item.icon"
            :isSelected="selected === item.id"
            @clickItem="handleSelect"
          />
        </RouterLink>
      </Tab>
    </div>

    <slot></slot>
  </div>
</template>
