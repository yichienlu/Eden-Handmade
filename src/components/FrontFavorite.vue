<template>
  <router-link to="/favorites" class="nav-link" style="cursor: pointer">
    <i class="bi bi-heart position-relative" style="font-size: 1.5rem">
      <div v-if="favorite.length" class="bg-dark rounded-pill position-absolute top-0 start-100 translate-middle text-white text-center" style="width:20px; height:20px; font-size: 8px; font-style: normal; line-hight: 20px">
        {{ favorite.length }}
      </div>
    </i>
  </router-link>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  name: 'FrontFavorite',
  data () {
    return {
      favorite: JSON.parse(localStorage.getItem('favorite')) || []
    }
  },
  methods: {
    getFavorite () {
      this.favorite = JSON.parse(localStorage.getItem('favorite')) || []
    }
  },
  mounted () {
    emitter.on('get-favorite', () => {
      this.getFavorite()
    })
  }
}
</script>
