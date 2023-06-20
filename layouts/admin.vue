<script setup>
  const route = useRoute()
  const router = useRouter()
  const checkAdminStore = useCheckAdminStore()

  onMounted(()=>{
  checkAdminStore.checkAdmin()
  })

</script>
<template>
  <Head>
    <Title>{{ route.name }}</Title>
  </Head>
  <div v-if="checkAdminStore.checkSuccess && checkAdminStore.loggedIn">
    <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div class="container-fluid">
        <nuxtLink to="/admin" class="navbar-brand fw-bold">
          <span class="dancing text-white">Eden Handmade</span> 後台管理
        </nuxtLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <nuxtLink to="/admin/products" class="nav-link link-light">商品管理</nuxtLink>
            </li>
            <li class="nav-item">
              <nuxtLink to="/admin/orders" class="nav-link link-light">訂單管理</nuxtLink>
            </li>
            <li class="nav-item">
              <nuxtLink to="/admin/coupons" class="nav-link link-light">優惠券管理</nuxtLink>
            </li>
            <li class="nav-item">
              <nuxtLink to="/admin/articles" class="nav-link link-light">文章管理</nuxtLink>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <nuxtLink to="/" class="nav-link">回前台</nuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>