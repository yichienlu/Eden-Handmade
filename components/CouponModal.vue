<script setup>
  const config = useRuntimeConfig();
  const props = defineProps(['coupon'])
  const { coupon } = toRefs(props)
  const emit = defineEmits(['get-coupons'])

  let tempCoupon = ref({})
  let due_date = ref('')

  watch(coupon, ()=>{
    tempCoupon.value = coupon.value
    const dateAndTime = new Date(tempCoupon.value.due_date * 1000)
        .toISOString().split('T');
        [due_date.value] = dateAndTime
  })
  watch(due_date, ()=>{
    tempCoupon.value.due_date = Math.floor(new Date(due_date.value) / 1000)
  })

const addCoupon = async () => {
  await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/coupon`,{
    headers: { Authorization: useCookie('hexToken').value },
    method:'post',
    body:{ data: tempCoupon.value }
  })
  .then((res) => {
    console.log(res)
    if(res.error.value){
      console.log(res.error)
    }else{
    //   emit('get-products', currentPage)
      // closeModal()
    }
    // this.clearRefs()
    // this.$httpMessageState(response, '新增商品')
  })
}

  const editCoupon = async () => {
    await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/coupon/${tempCoupon.value.id}`,{
      headers: { Authorization: useCookie('hexToken').value },
      method:'put',
      body:{ data: tempCoupon.value }
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
  <div class="modal fade" id="couponModal" tabindex="-1" ref="couponModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="tempCoupon.id">編輯優惠券</span>
            <span v-else>新增優惠券</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input type="text" class="form-control" id="title" v-model="tempCoupon.title" placeholder="請輸入標題">
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code" placeholder="請輸入優惠碼">
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input type="date" class="form-control" id="due_date" v-model="due_date">
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input type="number" class="form-control" id="price"
            min="0" v-model.number="tempCoupon.percent" placeholder="請輸入折扣百分比">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="tempCoupon.is_enabled">
              <label class="form-check-label" for="is_enabled">是否啟用</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-if="tempCoupon.id" @click="editCoupon">
            確認編輯
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-else @click="addCoupon">
            確認新增
          </button>
        </div>
      </div>
    </div>
  </div>
</template>