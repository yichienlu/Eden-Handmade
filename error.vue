<template>
  <div class="bg-light d-flex justify-content-center align-items-center" style="height: 100vh">
    <div class=" text-center">
      <h1 class="dancing">Eden Handmade</h1>
      <div class="d-sm-flex align-items-center">
        <div class="dancing text-secondary" style="font-size: 10rem">404</div>
        <div class="fs-3 mb-5 mb-sm-0 ms-lg-5">找不到這個頁面耶！</div>
        <!-- <div class="fs-6 mb-5 mb-sm-0 ms-lg-5">{{ error.message }}</div> -->
      </div>
      <nuxtLink to="/" class="d-block">
        <button type="button" class="btn btn-secondary text-white px-4 py-2">去首頁</button>
      </nuxtLink>
    </div>
  </div>
</template>

<script setup>
  defineProps(['error'])
</script>