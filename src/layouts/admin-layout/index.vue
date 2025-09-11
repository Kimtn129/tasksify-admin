<script setup>
import { RouterView } from 'vue-router'
import NavSide from '@components/nav/NavSide.vue'
import NavHeader from '@components/nav/NavHeader.vue'
// import LoadingComponent from '@components/loading/LoadingComponent.vue'
</script>

<template>
  <div class="w-full flex flex-row">
    <div>
      <NavSide />
    </div>
    <div class="w-full h-[100vh] overflow-auto">
      <NavHeader />
      <div class="w-full px-8"><RouterView /></div>
    </div>
  </div>
  <!-- <LoadingComponent /> -->
</template>

<style scoped>
.main {
  margin-left: 280px;
  transition: 0.3s;

  &.collapsed {
    margin-left: 110px;
  }
}
</style>
