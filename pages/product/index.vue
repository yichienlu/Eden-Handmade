<script setup>
const config = useRuntimeConfig();
let products = ref([]);
let categories = ref([])
let selectedCategory = ref('')
let pagination = ref({});
let currentPage = ref(1)
let isLoading = ref(false);
let favorite = ref([])

// 取得商品資料 & 頁數資料
const getProducts = async (page=1, category='') => {
  isLoading.value = true;
  const response = await fetch(`${config.public.URL}/api/${config.public.PATH}/products?page=${page}&category=${category}`)
  .then((res)=>res.json())
  .catch((err)=>err.json())

  if(response.success){
    products.value = response.products
    pagination.value = response.pagination
    selectedCategory.value = category
    currentPage.value = page
  } else {
    console.log(response.message)
  }
  isLoading.value = false;

}

// 取得所有商品類別
const getCategories = async () => {
  const response = await fetch(`${config.public.URL}/api/${config.public.PATH}/products/all`)
  .then((res)=>res.json())
  .catch((err)=>err.json())

  if(response.success){
    categories.value = Array.from(new Set(response.products.map(i => i.category))).reverse()
  } else {
    console.log(response.message)
  }
  
}


onMounted(()=>{
  getCategories()
  getProducts()
  favorite.value = JSON.parse(localStorage.getItem('favorite'))
})

</script>

<template>
  <!-- <Loading-component :active="isLoading"></Loading-component> -->
  <div class="img-cover position-relative" style="height: 25vh; background-image:url('/images/products.png');">
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
              <nuxtLink :to="`/product/${product.id}`" class="stretched-link"></nuxtLink>
              <div class="card-img-top position-relative" :style="`height:200px; background-image: url(${product.imageUrl}); background-size: cover; background-position:center`">
                <div class="position-absolute top-0 bottom-0 start-0 end-0 product-more" style="background-color: rgba(0,0,0,0.5)">
                  <i class="fs-2 bi bi-search position-absolute top-50 start-50 translate-middle text-secondary"></i>
                  <nuxtLink :to="`/product/${product.id}`" class="stretched-link"></nuxtLink>
                </div>
              <!-- <button type="button" class="btn position-absolute top-0 end-0 border-0 favoriteBtn" @click="toggleFavorite(product.id)" style="z-index: 980">
                <i v-if="this.favorite.includes(product.id)" class="bi bi-heart-fill fs-3"></i>
                <i v-else class="bi bi-heart fs-3"></i>
              </button> -->
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

<style scoped></style>
