<script setup>
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} | Eden Handmade` : 'Eden Handmade';
    }
  })

  import 'popper.js'
  import 'bootstrap-icons/font/bootstrap-icons.css'

  const config = useRuntimeConfig();
  const router = useRouter()
  const route = useRoute()
</script>
<template>
  <Head>
    <!-- <Title>{{ route.name }}</Title> -->
  </Head>
  
  <div class="position-relative">
    <FrontNavbar />
    <slot />
    <FrontFooter />
  </div>
</template>
<style lang="scss">
  // @import "./assets/all";
</style>