<script setup>
const { $currency } = useNuxtApp()

const cartStore = useCartStore()
cartStore.getCart()


</script>

<template>
  <div>
    <IsLoading :class="{'d-none':!cartStore.isLoading}" />
    <div class="container py-5">
      <div class="mb-5 row justify-content-center">
        <div class="col col-md-10 col-lg-8">
          <ul class="row justify-content-center list-unstyled">
            <li class="col text-center position-relative">
              <div class="text-primary fw-bold">購物車</div>
              <div class="step-bar bg-secondary"></div>
              <div class="step-circle bg-primary">
                <span>1</span>
              </div>
            </li>
            <li class="col text-center position-relative">
              <div class="text-secondary">建立訂單</div>
              <div class="step-bar bg-secondary"></div>
              <div class="step-circle bg-secondary mx-auto">
                <span>2</span>
              </div>
            </li>
            <li class="col text-center position-relative">
              <div class="text-secondary">付款</div>
              <div class="step-bar bg-secondary"></div>
              <div class="step-circle bg-secondary mx-auto">
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
      <div v-if="cartStore.cart.final_total == 0" class="my-5 text-center">
        <h5>購物車裡沒有東西！快去逛逛吧！！</h5>
        <nuxtLink to="/product" class="btn standardBtn">
          去逛逛
        </nuxtLink>
      </div>
      <div v-else class="my-5">
        <div class="row">
          <div class="col-lg-8 ">
            <div class="d-md-none">
              <div v-for="item in cartStore.cart.carts" :key="item.id" class="d-flex py-2 mb-4 border-bottom position-relative">
                <a href="#" class="position-absolute end-0" @click.prevent="cartStore.removeCartItem(item.id)" >
                  <i class="bi bi-x fs-2"></i>
                </a>
                <nuxtLink :to="`/product/${item.product.id}`">
                  <div class="img-cover me-3" style="width:100px; height: 120px;" :style="`background-image: url('${item.product.imageUrl}')`"></div>
                </nuxtLink>
                <div>
                  <div class="fw-bold">
                    <nuxtLink :to="`/product/${item.product.id}`">{{ item.product.title }}</nuxtLink>
                  </div>
                  <small>{{ item.product.description }}</small>
                  <div class="input-group input-group-sm my-2" style="width: 80px">
                    <button class="btn btn-secondary text-white" type="button"  @click="cartStore.updateCartItem(item, -1)">
                      -
                    </button>
                    <input
                      type="number"
                      onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                      class="form-control text-center"
                      v-model.number="item.qty"
                      @change="cartStore.updateCartItem(item, 0)"
                    />
                    <button class="btn btn-secondary text-white" type="button"  @click="cartStore.updateCartItem(item, 1)">
                      +
                    </button>
                  </div>
                  <div>
                    <div v-if="item.product.price === item.product.origin_price" class="text-danger">
                      {{ $currency(item.product.price * item.qty) }} 元
                    </div>
                    <div v-else>
                      <small>
                        <del>{{ $currency(item.product.origin_price * item.qty) }} 元</del>
                      </small>
                      <span class="text-danger ms-2">{{ $currency(item.product.price * item.qty) }} 元</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <table class="d-none d-md-table table table-responsive-md align-middle">
              <thead>
                <tr>
                  <th></th>
                  <th>品名</th>
                  <th class="text-center">單價</th>
                  <th style="width: 100px">數量</th>
                  <th class="text-end">合計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartStore.cart.carts" :key="item.id">
                  <td>
                    <button type="button" class="btn btn-sm" @click="removeCartItem(item.id)" >
                      <i class="bi bi-trash3-fill text-danger fs-5"></i>
                    </button>
                  </td>
                  <td>
                    <nuxtLink
                      :to="`/product/${item.product.id}`"
                      class="link-dark d-md-flex align-items-center"
                    >
                    <div class="img-cover me-3" style="width:100px; height: 100px;" :style="`background-image: url('${item.product.imageUrl}')`"></div>
                      <div>
                        <p class="fw-bold">{{ item.product.title }}</p>
                        <small>{{ item.product.description }}</small>
                      </div>
                    </nuxtLink>
                  </td>
                  <td class="text-center">
                    <div v-if="item.product.price === item.product.origin_price" class="text-danger">
                      {{ $currency(item.product.price) }} 元
                    </div>
                    <div v-else>
                      <small>
                        <del>{{ $currency(item.product.origin_price) }} 元</del>
                      </small>
                      <div class="text-danger">{{ $currency(item.product.price) }} 元</div>
                    </div>
                  </td>
                  <td>
                    <div class="input-group input-group-sm mb-2">
                      <button
                        class="btn btn-secondary text-white"
                        type="button"
                        @click="updateCartItem(item, -1)"
                      >
                        -
                      </button>
                      <input
                        type="number" min="0" step="1"
                        onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                        class="form-control text-center"
                        v-model.number="item.qty"
                        @change="updateCartItem(item, 0)"
                      />
                      <button
                        class="btn btn-secondary text-white"
                        type="button"
                        @click="updateCartItem(item, 1)"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td class="text-end text-danger">
                    {{ $currency(item.total) }} 元
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <button class="btn btn-outline-danger" type="button" data-bs-toggle="modal" data-bs-target="#clearCartModal">
                清空購物車
              </button>
            </div>
          </div>
          <div class="col-lg-4 mt-4 mt-lg-0">
            <div class="text-end shadow p-3 p-lg-5">
              <p class="d-flex justify-content-between">
                <span>總計：</span>
                <span>{{ $currency(cartStore.cart.total) }} 元</span>
              </p>
              <p v-if="cartStore.cart.carts?.[0].coupon" class="text-danger d-flex justify-content-between">
                <span>優惠券折扣：</span>
                <span>- {{ $currency(cartStore.cart.total - Math.floor(cartStore.cart.final_total)) }} 元</span>
              </p>
              <p v-if="cartStore.cart.carts?.[0].coupon" class="text-end">
                <small class="text-danger">
                  (已套用「{{ cartStore.cart.carts[0].coupon.title }}」優惠券：{{ cartStore.cart.carts[0].coupon.code }})
                  </small>
              </p>
              <p class="d-flex justify-content-between">
                <span>折扣價：</span>
                <span class="fw-bold">{{ $currency(cartStore.cart.final_total) }} 元</span>
              </p>
              <div class="input-group my-3 input-group-sm">
                <input
                type="text"
                class="form-control"
                v-model="cartStore.couponCode"
                placeholder="請輸入優惠碼"
                ref="couponCode"/>
                <div class="input-group-append">
                  <button class="btn standardBtn text-white" type="button" @click="cartStore.addCouponCode">
                    套用
                  </button>
                </div>
              </div>
              <nuxtLink to="/order">
                <button class="btn standardBtn w-100" type="button">填寫訂單</button>
              </nuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="clearCartModal" tabindex="-1" aria-labelledby="clearCartModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">確定清空購物車?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            清空後將無法回復喔！
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="cartStore.clearCart">忍痛清空</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
