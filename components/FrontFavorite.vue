<template>
  <nuxtLink to="/favorites" class="nav-link" style="cursor: pointer">
    <i class="bi bi-heart position-relative" style="font-size: 1.5rem">
      <div v-if="favoriteStore.favorite.length" class="bg-dark rounded-pill position-absolute top-0 start-100 translate-middle text-white text-center" style="width:20px; height:20px; font-size: 8px; font-style: normal; line-hight: 20px">
        {{ favoriteStore.favorite.length }}
      </div>
    </i>
  </nuxtLink>
</template>

<script setup>
const favoriteStore = useFavoriteStore()

onMounted(()=>{
  favoriteStore.getFavorite()
})


</script>