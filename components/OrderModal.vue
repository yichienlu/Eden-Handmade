<script setup>

  const props = defineProps(['order'])
  const { order } = toRefs(props)
  const emit = defineEmits(['edit-order'])

  let tempOrder = ref({})
  let due_date = ref('')

  watch(order, ()=>{
    tempOrder.value = order.value

  })


</script>

<template>
  <div id="orderModal" ref="orderModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 id="orderModalLabel" class="modal-title">
            <span>修改訂單</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4" v-if="tempOrder.user">
              <h3>用戶資料</h3>
              <div class="mb-3">
                <label for="name" class="form-label">姓名</label>
                <input id="name" type="text" class="form-control" v-model="tempOrder.user.name">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">email</label>
                <input id="email" type="email" class="form-control" v-model="tempOrder.user.email">
              </div>
              <div class="mb-3">
                <label for="tel" class="form-label">電話</label>
                <input id="tel" type="tel" class="form-control" v-model="tempOrder.user.tel">
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">地址</label>
                <input id="address" type="text" class="form-control" v-model="tempOrder.user.address">
              </div>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ new Date(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder.paid_date">
                        {{ tempOrder.paid_date }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="tempOrder.is_paid" class="text-success">已付款</strong>
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      {{ tempOrder.total }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <th>
                      {{ item.product.title }}
                    </th>
                    <td>${{ item.product.price }} x {{ item.qty }} {{ item.product.unit }}</td>
                    <td class="text-end">
                      {{ item.final_total }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    v-model="tempOrder.is_paid"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span v-if="tempOrder.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="this.$emit('edit-order', tempOrder)">
            確認修改
          </button>
        </div>
      </div>
    </div>
  </div>
</template>