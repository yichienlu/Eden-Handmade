<script setup>
definePageMeta({
  layout: 'admin'
})
const config = useRuntimeConfig();

const coupons = ref([])
const tempCoupon = ref({})
const pagination = ref({})
let currentPage = ref(1)
let isLoading = ref(false)


const getCoupons = async (page = 1) => {
  isLoading.value = true
  currentPage.value = page
  await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/coupons/?page=${page}`,
  {
    headers: { Authorization: useCookie('hexToken').value },
  })
  .then((res)=>{
    if(res.error.value){
      isLoading.value = false
      console.log(res.error.value.data.message)
    } else {
      isLoading.value = false
      coupons.value = res.data.value.coupons
      pagination.value = res.data.value.pagination
      // console.log(res.data)
      console.log(res.data.value.message)
    }
  })
}
onMounted(()=>{
  getCoupons()
})

const openCouponModal = (item) => {
    // this.isLoading = true
    tempCoupon.value = JSON.parse(JSON.stringify(item))
    // this.isLoading = false
  }
  const openDeleteModal = (item) => {
    // this.isLoading = true
    tempCoupon.value = item
    // this.isLoading = false
  }
  const deleteCoupon = async () => {
    await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/coupon/${tempCoupon.value.id}`,{
      headers: { Authorization: useCookie('hexToken').value },
      method:'delete',
    })
    .then((res) => {
      if(res.error.value){
        console.log("ERROR")
        console.log(res.error.value.data.message)
      }else{
        emit('get-coupons', currentPage.value)
        // closeModal()
        console.log(tempCoupon.value)
        console.log("SUCCESS")
      }
      
    })
  }

</script>

<template>
 <!-- <Loading-component :active="isLoading"></Loading-component> -->
  <div class="container my-5">
    <h1 class="text-secondary">優惠券管理</h1>
    <div class="text-end mt-3">
      <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#couponModal" @click="tempCoupon={due_date: new Date().getTime() / 1000, is_enabled:0}">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(coupon, key) in coupons" :key="key">
        <td>{{ coupon.title }}</td>
        <td>{{ coupon.percent }}%</td>
        <td>{{ coupon.due_date }}
        <!-- <td>{{ $filters.date(coupon.due_date) }} -->
        </td>
        <td>
          <span v-if="coupon.is_enabled === 1" class="text-success">啟用</span>
          <span v-else class="text-muted">未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#couponModal" @click="openCouponModal(coupon)">
              編輯
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal"
              data-bs-target="#deleteModal" @click="openDeleteModal(coupon)">
              刪除
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <pagination-component :pages="pagination" @get-items="getCoupons"></pagination-component>
  </div>
  <!-- 產品modal -->
  <coupon-modal :coupon="tempCoupon" :current-page="currentPage" ref="CouponModal" @get-coupons="getCoupons"></coupon-modal>
  <!-- 刪除modal -->
  <delete-modal :item="tempCoupon" ref="deleteModal" @delete-item="deleteCoupon"></delete-modal>
</template>

<style scoped></style>
