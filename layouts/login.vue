<script setup>
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} | Eden Handmade` : 'Eden Handmade';
    }
  })

  const config = useRuntimeConfig();
  const router = useRouter()
  const route = useRoute()
</script>
<template>
  <div>
    <slot />
    
  </div>
</template>