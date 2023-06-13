<template>
  <div>
    <nuxtLink
      to="/cart"
      class="d-lg-none nav-link position-relative"
      style="cursor: pointer"
    >
      <i class="bi bi-bag position-relative" style="font-size: 1.5rem">
        <div v-if="cartStore.cart.carts?.length" class="bg-dark rounded-pill position-absolute top-0 start-100 translate-middle text-white text-center" style="width:20px; height:20px; font-size: 0.5rem; font-style: normal; line-hight: 20px">
        {{ cartStore.cart.carts?.length }}
      </div>
      </i>
    </nuxtLink>
    <a
      class="d-none d-lg-block nav-link"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample"
      style="cursor: pointer"
    >
      <i class="bi bi-bag position-relative" style="font-size: 1.5rem">
      <div v-if="cartStore.cart.carts?.length" class="bg-dark rounded-pill position-absolute top-0 start-100 translate-middle text-white text-center" style="width:20px; height:20px; font-size: 8px; font-style: normal; line-hight: 20px">
        {{ cartStore.cart.carts?.length }}
      </div>
    </i>
    </a>
    <div
      v-if="!$route.meta.hideFrontCart"
      class="collapse position-absolute top-100 end-0 bg-white shadow-sm p-3"
      id="collapseExample"
    >
      <div class="d-flex justify-content-between">
        <h5>購物車</h5>
        <button
          type="button"
          class="btn btn-close"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        ></button>
      </div>
      <div v-if="cartStore.cart.carts?.length === 0" class="my-5 text-center">
        <p>購物車裡沒有東西！快去逛逛吧！！</p>
        <nuxtLink to="/product" class="btn standardBtn">
          <span data-bs-toggle="collapse" data-bs-target="#collapseExample"
            >去逛逛</span
          >
        </nuxtLink>
      </div>
      <div v-else>
        <div class="overflow-auto" style="max-height: 50vh">
          <table class="table">
            <tbody>
              <tr
                v-for="item in cartStore.cart.carts"
                :key="item.id"
                height="100"
              >
                <td>
                  <nuxtLink :to="`/product/${item.product.id}`">
                    <div
                      class="img-cover"
                      style="width: 100px; height: 100px"
                      :style="`background-image: url('${item.product.imageUrl}')`"
                    ></div>
                  </nuxtLink>
                </td>
                <td>
                  <div class="fw-bold">{{ item.product.title }}</div>
                  <div>
                    <small>{{ item.product.description }}</small>
                  </div>
                  <div>
                    價格：
                    <span
                      v-if="item.product.price === item.product.origin_price"
                      class="text-danger"
                    >
                      {{ item.product.price }} 元
                    </span>
                    <span v-else>
                      <small class="me-2">
                        <del>{{ item.product.origin_price }} 元</del>
                      </small>
                      <span class="text-danger"
                        >{{ item.product.price }} 元</span
                      >
                    </span>
                  </div>
                  <div class="d-flex">
                    <span>數量：</span>
                    <div
                      class="input-group input-group-sm mb-3"
                      style="width: 100px"
                    >
                      <button
                        class="btn btn-secondary text-white"
                        type="button"
                        :disabled="isLoading"
                        @click="cartStore.updateCartItem(item, -1)"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                        class="form-control text-center"
                        v-model.number="item.qty"
                        @change="cartStore.updateCartItem(item, 0)"
                      />
                      <button
                        class="btn btn-secondary text-white"
                        type="button"
                        :disabled="isLoading"
                        @click="cartStore.updateCartItem(item, 1)"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="cartStore.removeCartItem(item.id)"
                    :disabled="isLoading"
                  >
                    刪除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <div class="d-flex align-items-center justify-content-between m-2">
          <div class="text-end">
            總金額：<span class="text-danger fw-bold">{{
              cartStore.cart.total
            }}</span
            >元
          </div>
          <nuxtLink to="/cart" class="link-secondary px-2">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
            >
              去結帳 <i class="bi bi-arrow-right"></i>
            </button>
          </nuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cartStore = useCartStore();
cartStore.getCart();


</script>
