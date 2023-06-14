<script setup>
import $ from 'jquery'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper'

const modules = [Autoplay, Pagination, Navigation]
const swiperOptions = ref({
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    320: {
      slidesPerView: 1.25,
      spaceBetween: 16
    },
    540: {
      slidesPerView: 2.5,
      spaceBetween: 16
    },
    720: {
      slidesPerView: 3.5,
      spaceBetween: 16
    }
  }
})

const productsStore = useProductsStore()
productsStore.getProducts()

const articlesStore = useArticlesStore()
articlesStore.getArticles()

const news = ref(articlesStore.articles.splice(0,3))

const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()

const isLoading = ref(true)


const goNext = () => {
  const headerHeight = $('.home-header').outerHeight()
  const bannerHeight = $('.home-banner').outerHeight()
  $('body, html').animate({
    scrollTop: headerHeight + bannerHeight
  }, 500)
}



onMounted(()=>{
  setTimeout(()=>{
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <Is-loading :class="{'d-none':!isLoading}"></Is-loading>
  <div class="position-relative home-header">
    <swiper
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :modules=modules
    >
      <swiper-slide>
        <div class="img-cover" style="height: 80vh; background-image:url('/images/home-banner_01.png');">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-cover" style="height: 80vh; background-image:url('/images/home-banner_02.png');">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-cover" style="height: 80vh; background-image:url('/images/home-banner_03.png');">
        </div>
      </swiper-slide>
    </swiper>
    <div class="position-absolute top-50 start-50 translate-middle home-header-link" style=" z-index: 980; min-width:200px">
      <nuxtLink to="/product" class="d-block p-3 p-lg-5 border text-primary rounded-3 wow animate__animated animate__fadeIn">
      <h1 class="dancing fw-bold text-center">Eden Handmade</h1>
      <h3 class="text-center">聆聽肌膚的渴望</h3>
      </nuxtLink>
    </div>
    <div class="position-absolute bottom-0 start-50 translate-middle-x p-3 " style="z-index: 980">
      <div class="wow animate__animated animate__bounce rollToBtn">
        <a href="#" class="" @click.prevent="goNext()">
          <i class="bi bi-arrow-down-circle fs-1"></i>
        </a>
      </div>
    </div>
  </div>
  <div class="py-5 text-center bg-secondary position-relative home-banner">
    <p class="h5 text-light wow animate__animated animate__slideInUp">純手工、純天然</p>
    <p class="h5 text-light wow animate__animated animate__slideInUp">每一顆手工皂，都飽含Eden真摯的誠意</p>
  </div>
  <div class="my-5 pb-5 container roll-to-target">
    <div class="row text-center">
      <div class="col img-cover wow animate__animated animate__slideInUp" style="height: 280px; background-image:url('/images/about-01.png');"></div>
      <div class="col py-4 py-md-5 text-center">
        <h2 class="dancing wow animate__animated animate__slideInUp">Warmth</h2>
        <h3 class="text-secondary fw-bold wow animate__animated animate__slideInUp">
          手作溫度
        </h3>
        <p class=" wow animate__animated animate__slideInUp">
          純手工製作，心與心之間的暖流，<br class="d-none d-sm-block">
          是機器無法替代的溫度
        </p>
        <nuxtLink to="/product" class="btn btn-sm standardBtn wow animate__animated animate__slideInUp">看更多</nuxtLink>
      </div>
    </div>
    <div class="row flex-row-reverse text-center">
      <div class="col img-cover wow animate__animated animate__slideInUp" style="height: 280px;background-image:url('/images/about-02.png');"></div>
      <div class="col py-4 py-md-5 text-center">
        <h2 class="dancing wow animate__animated animate__slideInUp">Natural</h2>
        <h3 class="text-secondary fw-bold wow animate__animated animate__slideInUp">
          純淨天然
        </h3>
        <p class=" wow animate__animated animate__slideInUp">
          選用純天然成份，無添加防腐劑，<br class="d-none d-sm-block">
          給肌膚最純粹、細緻的呵護
        </p>
         <nuxtLink to="/product" class="btn btn-sm standardBtn wow animate__animated animate__slideInUp">看更多</nuxtLink>
      </div>
    </div>
    <div class="row position-relative text-center">
      <div class="col img-cover wow animate__animated animate__slideInUp" style="height: 280px;background-image:url('/images/about-03.png');"></div>
      <div class="col py-4 py-md-5 text-center">
        <h2 class="dancing wow animate__animated animate__slideInUp">Organic</h2>
        <h3 class="text-secondary fw-bold wow animate__animated animate__slideInUp">
          有機環保
        </h3>
        <p class=" wow animate__animated animate__slideInUp">
          有機成分 100% 可被水分解，<br class="d-none d-sm-block">
          不會對水源及環境造成傷害
        </p>
         <nuxtLink to="/product" class="btn btn-sm standardBtn wow animate__animated animate__slideInUp">看更多</nuxtLink>
      </div>
    </div>
  </div>
  <div class="container my-5 pb-5 swiper-custom">
    <h2 class="fw-bold text-center mb-3">熱銷商品<span class="dancing h3 text-secondary fw-bold ms-3">Best Sellers</span></h2>
      <swiper
        :navigation="true"
        :loop="true"
        :modules="modules"
        :breakpoints="swiperOptions.breakpoints"
      >
        <swiper-slide v-for="product in productsStore.products" :key="product.id">
          <div class="card border-0 h-100 product-card position-relative">
            <nuxtLink :to="`/product/${product.id}`" class="stretched-link"></nuxtLink>
            <div class="card-img-top position-relative" :style="`height:200px; background-image: url(${product.imageUrl}); background-size: cover; background-position:center`">
              <div class="position-absolute top-0 bottom-0 start-0 end-0 product-more" style="background-color: rgba(0,0,0,0.5)">
                <i class="fs-2 bi bi-search position-absolute top-50 start-50 translate-middle text-secondary"></i>
                <nuxtLink :to="`/product/${product.id}`" class="stretched-link"></nuxtLink>
              </div>
              <button type="button" class="btn position-absolute top-0 end-0 border-0 favoriteBtn" @click="favoriteStore.toggleFavorite(product.id)" style="z-index: 980">
                <i v-if="favoriteStore.favorite.includes(product.id)" class="bi bi-heart-fill fs-3"></i>
                <i v-else class="bi bi-heart fs-3"></i>
              </button>
            </div>
            <div class="card-body p-0">
              <div class="fw-bold mt-2 text-truncate">{{ product.title }}</div>
              <div class="card-text mb-2 text-truncate">
                <small>{{ product.description }}</small>
              </div>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between mt-2 p-0 bg-transparent border-0">
              <div>
                <div class="text-primary" v-if="product.price===product.origin_price">
                    $ {{ product.origin_price }}
                </div>
                <div v-else>
                  <span class="text-danger me-1">$ {{ product.price }} </span>
                  <del class="text-muted" style="font-size: 0.5rem">$ {{ product.origin_price }} </del>
                </div>
              </div>
              <button type="button" style="z-index: 980" class="btn btn-sm standardBtn" @click="cartStore.addToCart(product.id)">
                  加入購物車
              </button>
            </div>
          </div>
        </swiper-slide>
    </swiper>
  </div>
  <div class="container-md my-5 pb-5">
    <h2 class="fw-bold text-center mb-3">最新消息<span class="dancing h3 text-secondary fw-bold ms-3">News</span></h2>
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">日期</th>
              <th scope="col">說明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in news" :key="article.id">
              <th scope="row">{{ article.create_at }}</th>
              <td>
                <nuxtLink
                  :to="`/news/${article.id}`"
                  v-if="article.isPublic" class="text-decoration-underline">
                  {{ article.description }}
                </nuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="container my-5 pb-5">
    <h2 class="fw-bold text-center mb-4">精選商品<span class="dancing h3 text-secondary fw-bold ms-3">Products</span></h2>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
      <div class="col flex-fill position-relative" style="height:200px; overflow: hidden;">
        <nuxtLink to="/product" class="home-product-box">
          <div class="home-product-bg" style="background-image: url('/images/home-products_01.png')"></div>
          <h3 class="position-absolute bottom-0 end-0 fw-bold m-2">手工皂系列</h3>
        </nuxtLink>
      </div>
      <div class="col flex-fill position-relative" style="height:200px; overflow: hidden;">
        <nuxtLink to="/product" class="home-product-box">
          <div class="home-product-bg" style="background-image: url('/images/home-products_02.png')"></div>
          <h3 class="position-absolute bottom-0 end-0 fw-bold m-2">禮盒系列</h3>
        </nuxtLink>
      </div>
      <div class="col flex-fill position-relative" style="height:200px; overflow: hidden;">
        <nuxtLink to="/product" class="home-product-box">
          <div class="home-product-bg" style="background-image: url('/images/home-products_03.png')"></div>
          <h3 class="position-absolute bottom-0 end-0 fw-bold m-2">送禮首選</h3>
        </nuxtLink>
      </div>
      <div class="col flex-fill position-relative" style="height:200px; overflow: hidden;">
        <nuxtLink to="/product" class="home-product-box">
          <div class="home-product-bg" style="background-image: url('/images/home-products_04.png')"></div>
          <h3 class="position-absolute bottom-0 end-0 fw-bold m-2">特惠商品</h3>
        </nuxtLink>
      </div>
    </div>
  </div>
  <div class="py-4 bg-secondary">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 d-flex align-items-center justify-content-center">
          <div class="fs-4 text-white mb-3 mb-lg-0">搶先獲得優惠訊息！</div>
        </div>
        <div class="col-lg-6 text-center">
          <div class="input-group">
            <input type="email" class="form-control" placeholder="請輸入 Email" aria-label="Email" aria-describedby="button-addon">
            <button class="btn btn-dark" type="button" id="button-addon2">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped></style>
