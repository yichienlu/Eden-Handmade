<template>
  <Loading-component :active="isLoading"></Loading-component>
  <div class="img-cover position-relative" style="height: 25vh; background-image:url('https://images.unsplash.com/photo-1624459311940-0137c5ae2aa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');">
    <h1 class="position-absolute top-100 start-50 translate-middle fw-bolder fst-italic dancing" style="font-size: 4rem">Products</h1>
  </div>
  <div class="container my-5 py-5">
    <div class="row">
      <div class="col-lg-2 position-relative">
        <ul class="list-unstyled d-none justify-content-between d-lg-block position-sticky" style="top: 100px">
          <li class="mb-3 me-3 pb-1 pb-lg-0 ps-lg-1" :class="{'bg-primary':selectedCategory==''}">
            <a href="#" @click.prevent="getProducts(1,'')" class="d-block p-2 p-lg-3 bg-white" :class="{'fw-bold':selectedCategory==''}"> 全部商品</a>
          </li>
          <li v-for="category in categories" :key="category" class="mb-3 me-3 pb-1 pb-lg-0 ps-lg-1" :class="{'bg-primary':selectedCategory==category}">
            <a href="#" @click.prevent="getProducts(1,category)" class="d-block p-2 p-lg-3 bg-white" :class="{'fw-bold':selectedCategory==category}"> {{ category }}</a>
          </li>
        </ul>
      </div>
      <div class="col-lg-10 position-relative">
        <ul class="list-unstyled bg-white d-flex justify-content-between d-lg-none position-sticky py-3" style="top: 60px; z-index: 990">
          <li class="me-3 pb-1 pb-lg-0 ps-lg-1" :class="{'bg-primary':selectedCategory==''}">
            <a href="#" @click.prevent="getProducts(1,'')" class="d-none d-sm-block p-2 p-lg-3 bg-white" :class="{'fw-bold':selectedCategory==''}"> 全部商品</a>
          </li>
          <li v-for="category in categories" :key="category" class="me-3 pb-1 pb-lg-0 ps-lg-1" :class="{'bg-primary':selectedCategory==category}">
            <a href="#" @click.prevent="getProducts(1,category)" class="d-block p-2 p-lg-3 bg-white" :class="{'fw-bold':selectedCategory==category}"> {{ category }}</a>
          </li>
        </ul>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 gx-4 gy-5">
          <div class="col" v-for="product in products" :key="product.id">
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
                <div class="fw-bold mt-2">{{ product.title }}</div>
                <small class="card-text mb-2">{{ product.description }}</small>
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
          </div>
        </div>
        <pagination-component :pages="pagination" @get-items="getProducts"></pagination-component>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  data () {
    return {
      cartData: {
        carts: []
      },
      products: [],
      product: {},
      categories: [],
      selectedCategory: '',
      pagination: {},
      currentPage: 1,
      isLoading: false,
      favorite: JSON.parse(localStorage.getItem('favorite')) || []
    }
  },
  components: {
    PaginationComponent
  },
  methods: {
    getProducts (page = 1, selectedCategory = '') {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/?page=${page}&category=${selectedCategory}`)
        .then((response) => {
          this.products = response.data.products
          this.pagination = response.data.pagination
          this.selectedCategory = selectedCategory
          this.currentPage = page
          this.isLoading = false
        })
        .catch((error) => {
          this.$httpMessageState(error.response, '錯誤訊息')
          this.isLoading = false
        })
    },
    getCategories () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((response) => {
          this.categories = Array.from(new Set(response.data.products.map(i => i.category))).reverse()
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
  watch: {
    favorite: {
      handler () {
        localStorage.setItem('favorite', JSON.stringify(this.favorite))
      },
      deep: true
    }
  },
  mounted () {
    document.title = 'Eden Handmade | 線上商店'
    this.getProducts()
    this.getCategories()
  }
}
</script>
