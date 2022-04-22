<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light position-sticky top-0" style="z-index:1000">
  <div class="container position-relative justify-content-center">
    <router-link to="/" class="navbar-brand dancing fw-bold text-secondary fs-3">Eden Handmade</router-link>
    <button
      class="navbar-toggler position-absolute top-0 end-0 me-2"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav text-center">
        <li class="nav-item">
          <router-link to="/products" class="d-lg-none nav-link position-relative navBtn">
            商品列表
            <span class="position-absolute top-0 bottom-0 start-0 end-0" data-bs-toggle="collapse" data-bs-target="#navbarNav"></span>
          </router-link>
          <router-link to="/products" class="d-none d-lg-block nav-link navBtn">商品列表</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="d-lg-none nav-link position-relative navBtn">
            關於伊登
            <span class="position-absolute top-0 bottom-0 start-0 end-0" data-bs-toggle="collapse" data-bs-target="#navbarNav"></span>
          </router-link>
          <router-link to="/about" class="d-none d-lg-block nav-link navBtn">關於伊登</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/info" class="d-lg-none nav-link position-relative navBtn">
            購物須知
            <span class="position-absolute top-0 bottom-0 start-0 end-0" data-bs-toggle="collapse" data-bs-target="#navbarNav"></span>
          </router-link>
          <router-link to="/info" class="d-none d-lg-block nav-link navBtn">購物須知</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/news" class="d-lg-none nav-link position-relative navBtn">
            最新消息
            <span class="position-absolute top-0 bottom-0 start-0 end-0" data-bs-toggle="collapse" data-bs-target="#navbarNav"></span>
          </router-link>
          <router-link to="/news" class="d-none d-lg-block nav-link navBtn">最新消息</router-link>
        </li>
      </ul>
    </div>
    <div class="d-none d-lg-flex">
      <FrontFavorite/>
      <FrontMember/>
      <FrontCart/>
    </div>
  </div>
</nav>
</template>

<script>
import FrontFavorite from '@/components/FrontFavorite.vue'
import FrontMember from '@/components/FrontMember.vue'
import FrontCart from '@/components/FrontCart.vue'

export default {
  name: 'FrontNavbar',
  components: {
    FrontFavorite,
    FrontMember,
    FrontCart
  }
}
</script>
