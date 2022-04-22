<template>
  <div class="position-relative home-header">
    <swiper
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :modules="modules"
    >
      <swiper-slide>
        <div class="img-cover" style="height: 80vh; background-image:url('https://images.unsplash.com/photo-1620567782734-7db77bf90550?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80');">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-cover" style="height: 80vh; background-image:url('https://images.unsplash.com/photo-1624459404124-9e9542567bb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80');">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-cover" style="height: 80vh; background-image:url('https://images.unsplash.com/photo-1620567838237-8ecbb896fc88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80');">
        </div>
      </swiper-slide>
    </swiper>
    <div class="position-absolute top-50 start-50 translate-middle home-header-link" style=" z-index: 980; min-width:200px">
      <router-link to="/products" class="d-block p-3 p-lg-5 border text-primary rounded-3 wow animate__animated animate__fadeIn">
      <h1 class="dancing fw-bold text-center">Eden Handmade</h1>
      <h3 class="text-center">聆聽肌膚的渴望</h3>
      </router-link>
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
      <div class="col img-cover wow animate__animated animate__slideInUp" style="height: 280px; background-image:url('https://images.unsplash.com/photo-1605264964528-06403738d6dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80');"></div>
      <div class="col py-4 py-md-5 text-center">
        <h2 class="dancing wow animate__animated animate__slideInUp">Warmth</h2>
        <h3 class="text-secondary fw-bold wow animate__animated animate__slideInUp">
          手作溫度
        </h3>
        <p class=" wow animate__animated animate__slideInUp">
          純手工製作，心與心之間的暖流，<br class="d-none d-sm-block">
          是機器無法替代的溫度
        </p>
        <router-link to="/products" class="btn btn-sm standardBtn wow animate__animated animate__slideInUp">看更多</router-link>
      </div>
    </div>
    <div class="row flex-row-reverse text-center">
      <div class="col img-cover wow animate__animated animate__slideInUp" style="height: 280px;background-image:url('https://images.unsplash.com/photo-1536882240095-0379873feb4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');"></div>
      <div class="col py-4 py-md-5 text-center">
        <h2 class="dancing wow animate__animated animate__slideInUp">Natural</h2>
        <h3 class="text-secondary fw-bold wow animate__animated animate__slideInUp">
          純淨天然
        </h3>
        <p class=" wow animate__animated animate__slideInUp">
          選用純天然成份，無添加防腐劑，<br class="d-none d-sm-block">
          給肌膚最純粹、細緻的呵護
        </p>
         <router-link to="/products" class="btn btn-sm standardBtn wow animate__animated animate__slideInUp">看更多</router-link>
      </div>
    </div>
    <div class="row position-relative text-center">
      <div class="col img-cover wow animate__animated animate__slideInUp" style="height: 280px;background-image:url('https://images.unsplash.com/photo-1590541576391-dfc42314a7ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');"></div>
      <div class="col py-4 py-md-5 text-center">
        <h2 class="dancing wow animate__animated animate__slideInUp">Organic</h2>
        <h3 class="text-secondary fw-bold wow animate__animated animate__slideInUp">
          有機環保
        </h3>
        <p class=" wow animate__animated animate__slideInUp">
          有機成分 100% 可被水分解，<br class="d-none d-sm-block">
          不會對水源及環境造成傷害
        </p>
         <router-link to="/products" class="btn btn-sm standardBtn wow animate__animated animate__slideInUp">看更多</router-link>
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
        <swiper-slide v-for="product in products" :key="product.id">
          <div class="card border-0 h-100 product-card position-relative">
            <router-link :to="`/product/${product.id}`" class="stretched-link"></router-link>
            <div class="card-img-top position-relative" :style="`height:200px; background-image: url(${product.imageUrl}); background-size: cover; background-position:center`">
              <div class="position-absolute top-0 bottom-0 start-0 end-0 product-more" style="background-color: rgba(0,0,0,0.5)">
                <i class="fs-2 bi bi-search position-absolute top-50 start-50 translate-middle text-secondary"></i>
                <router-link :to="`/product/${product.id}`" class="stretched-link"></router-link>
              </div>
              <button type="button" class="btn position-absolute top-0 end-0 border-0 favoriteBtn" @click="toggleFavorite(product.id)" style="z-index: 980">
                <i v-if="this.favorite.includes(product.id)" class="bi bi-heart-fill fs-3"></i>
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
              <button type="button" style="z-index: 980" class="btn btn-sm standardBtn" @click="addToCart(product.id)" :disabled="isLoading">
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
            <tr v-for="article in articles" :key="article.id">
              <th scope="row">{{ $filters.date(article.create_at) }}</th>
              <td>
                <router-link
                  :to="`/news/${article.id}`"
                  v-if="article.isPublic" class="text-decoration-underline">
                  {{ article.description }}
                </router-link>
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
        <router-link to="/products" class="home-product-box">
          <div class="home-product-bg" style="background-image: url('https://images.unsplash.com/photo-1624459404847-5ad5f6a09246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80')"></div>
          <h3 class="position-absolute bottom-0 end-0 fw-bold m-2">手工皂系列</h3>
        </router-link>
      </div>
      <div class="col flex-fill position-relative" style="height:200px; overflow: hidden;">
        <router-link to="/products" class="home-product-box">
          <div class="home-product-bg" style="background-image: url('https://images.unsplash.com/photo-1618840313388-80cf273ee00c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')"></div>
          <h3 class="position-absolute bottom-0 end-0 fw-bold m-2">禮盒系列</h3>
        </router-link>
      </div>
      <div class="col flex-fill position-relative" style="height:200px; overflow: hidden;">
        <router-link to="/products" class="home-product-box">
          <div class="home-product-bg" style="background-image: url('https://images.unsplash.com/photo-1623316162710-fff35db05790?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80')"></div>
          <h3 class="position-absolute bottom-0 end-0 fw-bold m-2">送禮首選</h3>
        </router-link>
      </div>
      <div class="col flex-fill position-relative" style="height:200px; overflow: hidden;">
        <router-link to="/products" class="home-product-box">
          <div class="home-product-bg" style="background-image: url('https://images.unsplash.com/photo-1622116579714-9e25f3a3a1b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80')"></div>
          <h3 class="position-absolute bottom-0 end-0 fw-bold m-2">特惠商品</h3>
        </router-link>
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

<script>
import $ from 'jquery'
import emitter from '@/libs/emitter'
import { WOW } from 'wowjs'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper'

export default {
  name: 'HomeView',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      products: [],
      product: {},
      isLoading: false,
      articles: [],
      favorite: JSON.parse(localStorage.getItem('favorite')) || [],
      swiperOptions: {
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
      }
    }
  },
  setup () {
    return {
      modules: [Autoplay, Pagination, Navigation]
    }
  },
  methods: {
    goNext () {
      const headerHeight = $('.home-header').outerHeight()
      const bannerHeight = $('.home-banner').outerHeight()
      $('body, html').animate({
        scrollTop: headerHeight + bannerHeight
      }, 500)
    },
    getProducts () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((response) => {
          this.products = response.data.products
        })
        .catch((error) => {
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    },
    addToCart (id, qty = 1) {
      if (qty < 1 || qty % 1 !== 0) {
        this.emitter.emit('push-message', {
          style: 'success',
          title: '錯誤訊息',
          content: '輸入數量錯誤'
        })
        return
      }
      const data = {
        product_id: id,
        qty
      }
      this.isLoading = true
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((response) => {
          this.$httpMessageState(response, '加入購物車')
          emitter.emit('get-cart')
          this.isLoading = false
        })
        .catch((error) => {
          this.$httpMessageState(error.response, '加入購物車')
          this.isLoading = false
        })
    },
    getArticles () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles`
      this.$http.get(api).then((response) => {
        this.articles = response.data.articles.slice(0, 3)
      }).catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息')
      })
    },
    toggleFavorite (id) {
      const favoriteIndex = this.favorite.findIndex(item => item === id)
      if (favoriteIndex === -1) {
        this.favorite.push(id)
      } else {
        this.favorite.splice(favoriteIndex, 1)
      }
      localStorage.setItem('favorite', JSON.stringify(this.favorite))
      emitter.emit('get-favorite')
    }
  },
  mounted () {
    document.title = 'Eden Handmade 伊登手作'
    this.getProducts()
    this.getArticles()
    new WOW({ live: false }).init()
  }
}
</script>
