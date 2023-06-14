<template>
  <div class="position-fixed top-0 bottom-0 start-0 end-0 bg-primary d-flex justify-content-center align-items-center" style="z-index:9000" >
    <div class="text-center">
      <img class="logo" src="../public/favicon.ico" alt="">
      <h2 class="text-white dancing py-3">
        <span>Loading</span>
      </h2>
    </div>
    
    
  </div>
</template>

<style scoped>
.logo {
  animation: logo-animation 1s linear infinite
}
@keyframes logo-animation {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>