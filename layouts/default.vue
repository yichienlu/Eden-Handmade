<script setup>
  import 'popper.js'
  import 'bootstrap-icons/font/bootstrap-icons.css'
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