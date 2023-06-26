<script setup>
definePageMeta({
  layout: 'admin'
})
const config = useRuntimeConfig();
const products = ref([])
let tempProduct = ref({
  imagesUrl:[]
})
const pagination = ref({})
let currentPage = ref(1)
let isLoading = ref(false)


const getProducts = async (page=1) => {
  isLoading.value = true
  currentPage.value = page
  await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/products/?page=${page}`,
  {
    headers: { Authorization: useCookie('hexToken').value },
  })
  .then((res)=>{
    if(res.error.value){
      isLoading.value = false
      console.log(res.error.value.data.message)
    } else {
      isLoading.value = false
      products.value = res.data.value.products
      pagination.value = res.data.value.pagination
      // console.log(pagination.value)
      // console.log(res.data.value.message)
    }
  })
}

  const openAdminProductModal = (item) => {
    // this.isLoading = true
    tempProduct.value = JSON.parse(JSON.stringify(item))
    // this.isLoading = false
  }
  const openDeleteModal = (item) => {
    // this.isLoading = true
    tempProduct.value = item
    // this.isLoading = false
  }
  const deleteProduct = async () => {
    await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/product/${tempProduct.value.id}`,{
      headers: { Authorization: useCookie('hexToken').value },
      method:'delete',
    })
    .then((res) => {
      if(res.error.value){
        console.log("ERROR")
        console.log(res.error.value.data.message)
      }else{
        getProducts(currentPage.value)
        // closeModal()
        console.log("SUCCESS")
      }
      
    })

  }




onMounted(()=>{
  getProducts()
})
</script>

<template>
<!-- <Loading-component :active="isLoading"></Loading-component> -->
  <div class="container my-5">
    <h1 class="text-secondary">商品管理</h1>
    <div class="text-end mt-3">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#adminProductModal" @click="tempProduct={imagesUrl:[],is_enabled:0}">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-secondary" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal"
                data-bs-target="#adminProductModal" @click="openAdminProductModal(item)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal"
                data-bs-target="#deleteModal" @click="openDeleteModal(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-component :pages="pagination" @get-items="getProducts"></pagination-component>
  </div>
  <!-- 產品modal -->
  <admin-product-modal :product="tempProduct" :current-page="currentPage" ref="adminProductModal" @get-products="getProducts"></admin-product-modal>
  <!-- 刪除modal -->
  <delete-modal :item="tempProduct" ref="deleteModal" @delete-item="deleteProduct"></delete-modal>
</template>

<style scoped></style>
