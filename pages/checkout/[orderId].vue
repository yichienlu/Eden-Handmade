<script setup>
  const config = useRuntimeConfig();
  const { $currency } = useNuxtApp()

  const order = ref({user:{}})
  const { orderId } = useRoute().params

  const getOrder = async () => {
    await useFetch(`${config.public.URL}/api/${config.public.PATH}/order/${orderId}`)
    .then((res)=>{
      if(res.error.value){
        console.log(res.error.value.data.message)
      }else{
        order.value = res.data.value.order
        // console.log(res.data.value)
      }
    })
  }
  getOrder()

  const payOrder = async () => {
    await useFetch(`${config.public.URL}/api/${config.public.PATH}/pay/${orderId}`,{method:'post'})
    .then((res)=>{
      if(res.error.value){
        console.log(res.error.value.data.message)
      }else{
        order.value = res.data.value.order
        // console.log(res.data.value)
      }
    })
  }

</script>

<template>
  <!-- <Loading-component :active="isLoading"></Loading-component> -->
  <div class="container py-5">
    <div class="mb-5 row justify-content-center">
      <div class="col col-md-10 col-lg-8">
        <ul class="d-flex justify-content-center list-unstyled">
          <li class="col text-center position-relative">
            <div class="text-primary">購物車</div>
            <div class="step-bar bg-primary"></div>
            <div class="step-circle bg-primary">
              <span>1</span>
            </div>
          </li>
          <li class="col text-center position-relative">
            <div class="text-primary">建立訂單</div>
            <div class="step-bar bg-primary"></div>
            <div class="step-circle bg-primary mx-auto">
              <span>2</span>
            </div>
          </li>
          <li class="col text-center position-relative">
            <div class="text-primary fw-bold">付款</div>
            <div class="step-bar bg-secondary"></div>
            <div class="step-circle bg-primary mx-auto">
              <span>3</span>
            </div>
          </li>
          <li class="col text-center">
            <div class="text-secondary">付款完成</div>
            <div class="step-circle bg-secondary mx-auto">
              <span>4</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <h1 class="mb-5">訂單已建立！</h1>
    <div class="my-3 row justify-content-center">
      <form class="col-md-6">
        <table class="table align-middle">
          <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
          </thead>
          <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }} {{ item.product.unit }}</td>
            <td class="text-end">{{ $currency(item.final_total) }}</td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td class="text-end">{{ $currency(order.total) }}</td>
          </tr>
          </tfoot>
        </table>
        <table class="table">
          <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between">
          <nuxtLink to="/orders">
            <button type="button" class="btn btn-outline-primary">回訂單列表</button>
          </nuxtLink>
          <nuxtLink to="/checkout-success">
            <button type="button" v-if="order.is_paid === false" class="btn standardBtn" @click="payOrder">確認付款</button>
          </nuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
