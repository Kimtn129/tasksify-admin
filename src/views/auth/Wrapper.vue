<template>
  <div class="w-[100%] max-w-full max-h-full relative flex items-center justify-center main-bg">
    <!-- <div class="w-[60%] max-w-full h-screen relative flex flex-col items-center pt-[150px]">
      <img
        src="@assets/images/world-flag.jpeg"
        class="absolute bottom-[-144px] left-[-80px] max-h-[80vh]"
        alt=""
      />
    </div> -->
    <div class="w-[40%] flex justify-center min-w-[520px] max-h-full">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style>
.main-bg {
  background-position: center;
  background-size: cover;
}

.custom-box {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
</style>
