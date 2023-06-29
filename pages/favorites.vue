<script setup>
const config = useRuntimeConfig();
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
onMounted(()=>{
  favoriteStore.getFavorite()
})



let allProducts = ref([])
let isLoading = ref(true)
const getAllProducts = async () => {
  isLoading.value = true;
  const response = await fetch(`${config.public.URL}/api/${config.public.PATH}/products/all`)
  .then((res)=>res.json())
  .catch((err)=>err.json())

  if(response.success){
    allProducts.value = response.products

  } else {
    console.log(response.message)
  }
  isLoading.value = false;
}

onMounted(()=>{
  getAllProducts()
})
</script>

<template>
  <IsLoading :class="{'d-none':!isLoading}" />
  <div class="img-cover position-relative" style="height: 25vh; background-image:url('https://images.unsplash.com/photo-1624459311940-0137c5ae2aa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');">
    <h1 class="position-absolute top-100 start-50 translate-middle fw-bolder fst-italic dancing" style="font-size: 4rem">Favorites</h1>
  </div>
  <div class="container my-5 py-5">
    <div v-if="favoriteStore.favorite.length == 0" class="my-5 text-center">
      <h5>最愛清單裡沒有東西！快去逛逛吧！！</h5>
      <nuxtLink to="/product" class="btn btn-primary">
        去逛逛
      </nuxtLink>
    </div>
    <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gx-4 gy-5">
      <template v-for="product in allProducts" :key="product.id">
        <div class="col" v-if="favoriteStore.favorite.includes(product.id)">
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
              <button type="button" style="z-index: 980" class="btn btn-sm standardBtn" @click="cartStore.addToCart(product.id)" :disabled="isLoading">
                  加入購物車
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
