<script setup>
definePageMeta({
  layout: 'admin'
})
const config = useRuntimeConfig();
const orders = ref([])
const tempOrder = ref({})
const pagination = ref({})
let currentPage = ref(1)
let isLoading = ref(false)

const getOrders = async (page = 1) => {
  isLoading.value = true
  currentPage.value = page
  await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/orders/?page=${page}`,
  {
    headers: { Authorization: useCookie('hexToken').value },
  })
  .then((res)=>{
    if(res.error.value){
      isLoading.value = false
      console.log(res.error.value.data.message)
    } else {
      isLoading.value = false
      orders.value = res.data.value.orders
      pagination.value = res.data.value.pagination
      // console.log(res.data)
      console.log(res.data.value.message)
    }
  })
}
onMounted(()=>{
  getOrders()
})

const openOrderModal = (item) => {
    // this.isLoading = true
    tempOrder.value = JSON.parse(JSON.stringify(item))
    // this.isLoading = false
  }
  const openDeleteModal = (item) => {
    // this.isLoading = true
    tempOrder.value = item
    // this.isLoading = false
  }

  const editOrder = async () => {
    await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/Order/${tempOrder.value.id}`,{
      headers: { Authorization: useCookie('hexToken').value },
      method:'put',
      body:{ data: tempOrder.value }
    })
    .then((res) => {
      if(res.error.value){
        console.log("ERROR")
        console.log(res.error.value.data.message)
      }else{
        emit('get-orders', currentPage.value)
        // closeModal()
        console.log(tempOrder.value)
        console.log("SUCCESS")
      }
      
    })
  }

  const deleteOrder = async () => {
    await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/order/${tempOrder.value.id}`,{
      headers: { Authorization: useCookie('hexToken').value },
      method:'delete',
    })
    .then((res) => {
      if(res.error.value){
        console.log("ERROR")
        console.log(res.error.value.data.message)
      }else{
        emit('get-orders', currentPage.value)
        // closeModal()
        console.log(tempOrder.value)
        console.log("SUCCESS")
      }
      
    })
  }

</script>

<template>
  <Loading-component :active="isLoading"></Loading-component>
  <div class="container my-5">
    <h1 class="text-secondary">訂單管理</h1>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>
            下單時間
          </th>
          <th>email</th>
          <th>
            購買項目
          </th>
          <th>
            應付金額
          </th>
          <th>
            是否付款
          </th>
          <th>
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>
            {{ order.create_at }} <br>
            {{ order.create_at }}
            <!-- {{ $filters.date(order.create_at) }} <br>
            {{ $filters.time(order.create_at) }} -->
          </td>
          <td>{{ order.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in order.products" :key="i">
                {{ product.product.title }}：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-end">{{ order.total }}</td>
          <td>
            <input
                class="form-check-input me-2"
                type="checkbox"
                :id="`paidSwitch${order.id}`"
                v-model="order.is_paid"
                @change="editOrder(order)"
              />
              <label class="form-check-label" :for="`paidSwitch${order.id}`">
                <span v-if="order.is_paid">已付款</span>
                <span class="text-danger" v-else>未付款</span>
              </label>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal"
                data-bs-target="#orderModal" @click="openOrderModal(order)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal"
                data-bs-target="#deleteModal" @click="openDeleteModal(order)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-component :pages="pagination" @get-items="getOrders"></pagination-component>
  </div>
  <!-- 訂單modal -->
  <order-modal :order="tempOrder" ref="orderModal" @edit-order="editOrder"></order-modal>
  <!-- 刪除modal -->
  <delete-modal :item="tempOrder" ref="deleteModal" @delete-item="deleteOrder"></delete-modal>
</template>

<style scoped></style>
