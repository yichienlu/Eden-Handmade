<script setup>
  import 'popper.js'
  // import 'bootstrap/dist/js/bootstrap.min.js'
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