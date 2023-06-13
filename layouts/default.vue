<script setup>
  import 'popper.js'
  import 'bootstrap-icons/font/bootstrap-icons.css'

  const config = useRuntimeConfig();
  const router = useRouter()
  
</script>
<template>
  <div>
    <FrontNavbar />
    <slot />
    <FrontFooter />
  </div>
</template>
<style lang="scss">
  // @import "./assets/all";
</style>