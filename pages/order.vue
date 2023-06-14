<script setup>
// import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate' // 匯入 vee-validate 主套件
// import { required, email, min } from '@vee-validate/rules' // 匯入 vee-validate 相關規則
// import { localize, setLocale } from '@vee-validate/i18n' // 匯入多國語系的功能
// import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json' // 匯入繁體中文語系檔案

// 定義驗證規則
// defineRule('required', required)
// defineRule('email', email)
// defineRule('min', min)
// configure({
//   generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
//   validateOnInput: true // 當輸入任何內容直接進行驗證
// })
// 設定預設語系
// setLocale('zh_TW')

// 註冊 vee-validate 三個全域元件
// app.component('FormComponent', Form)
// app.component('FieldComponent', Field)
// app.component('ErrorMessage', ErrorMessage)




const cartStore = useCartStore()
cartStore.getCart()




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
            <div class="text-primary fw-bold">建立訂單</div>
            <div class="step-bar bg-secondary"></div>
            <div class="step-circle bg-primary mx-auto">
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
    <div class="row row-cols-1 row-cols-lg-2">
      <div class="col-lg-6 p-2 p-md-3">
        <div class="d-sm-none">
          <div v-for="item in cartStore.cart.carts" :key="item.id" class="d-flex py-2 border-top">
            <nuxtLink :to="`/product/${item.product.id}`">
              <div class="img-cover me-3" style="width:80px; height: 80px;" :style="`background-image: url('${item.product.imageUrl}')`"></div>
            </nuxtLink>
            <div>
              <div class="fw-bold">
                <nuxtLink :to="`/product/${item.product.id}`">{{ item.product.title }}</nuxtLink>
              </div>
              <small>{{ item.product.description }}</small>
              <div>
                <span v-if="item.product.price === item.product.origin_price" class="text-danger">
                  {{ item.product.price * item.qty }} 元
                </span>
                <span v-else>
                  <small>
                    <del>{{ item.product.origin_price * item.qty }} 元</del>
                  </small>
                  <span class="text-danger ms-2">{{ item.product.price * item.qty }} 元</span>
                </span> x {{item.qty}} {{ item.product.unit }}
              </div>
            </div>
            <div class="ms-auto">
              {{ item.total }} 元
            </div>
          </div>
          <div class="text-end border-top border-2 border-primary pt-2">總計：{{ cartStore.cart.total }} 元</div>
          <div class="text-danger text-end pt-2">折扣價：{{ Math.floor(cartStore.cart.final_total) }} 元</div>
          <div class="text-end">
            <small v-if="cartStore.cart.carts?.[0]?.coupon" class="text-danger">(已套用「{{ cartStore.cart.carts?.[0].coupon.title }}」優惠券：{{ cartStore.cart.carts?.[0].coupon.code }})</small>
          </div>
        </div>
        <table class="d-none d-sm-table table align-middle">
          <thead>
            <tr>
              <th style="width: 100px">品名</th>
              <th></th>
              <th class="text-end">數量</th>
              <th class="text-end">合計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartStore.cart.carts" :key="item.id">
              <td>
                <nuxtLink  :to="`/product/${item.product.id}`" class="link-dark d-flex align-items-center">
                  <div class="img-cover" style="width:100px; height: 100px;" :style="`background-image: url('${item.product.imageUrl}')`"></div>
                </nuxtLink>
              </td>
              <td>
                <div>
                    <div class="fw-bold">{{ item.product.title }}</div>
                    <small>{{ item.product.description }}</small>
                    <div v-if="item.product.price===item.product.origin_price">
                      {{ item.product.price }} 元
                    </div>
                    <div v-else>
                      <small><del>{{ item.product.origin_price }} 元</del></small>
                      <span class="ms-2">{{ item.product.price }} 元</span>
                    </div>
                  </div>
              </td>
              <td class="text-end">
                {{ item.qty }} {{ item.product.unit }}
              </td>
              <td class="text-end">
                {{ item.total }} 元
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="text-end">總計</td>
              <td colspan="3" class="text-end">{{ cartStore.cart.total }}</td>
            </tr>
            <tr>
              <td class="text-end text-success">折扣價</td>
              <td colspan="3" class="text-end text-success">
                {{ Math.floor(cartStore.cart.final_total) }} <br>
                <small v-if="cartStore.cart.carts?.[0]?.coupon" class="text-mute">(已套用「{{ cartStore.cart.carts?.[0].coupon.title }}」優惠券：{{ cartStore.cart.carts?.[0].coupon.code }})</small>
              </td>
            </tr>
          </tfoot>
        </table>
        <nuxtLink to="/cart">
          <button type="button" class="btn btn-outline-primary mt-5">
            <i class="bi bi-arrow-left"></i>
            回購物車
          </button>
        </nuxtLink>
      </div>
      <div class="col-lg-6 p-3">
        <div class="p-4 shadow">
            <!-- <form-component ref="form" v-slot="{ errors }" @submit="createOrder">
              <div class="mb-3">
                <label for="email" class="form-label">Email<span class="text-danger">*</span></label>
                <field-component id="email" name="email" type="email" class="form-control" rules="email|required"
                      :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email"
                      v-model="form.user.email"></field-component>
                <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="row">
                <div class="col-lg-6 mb-3">
                  <label for="name" class="form-label">收件人姓名<span class="text-danger">*</span></label>
                  <field-component id="name" name="姓名" type="text" class="form-control"
                          :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入姓名" rules="required"
                          v-model="form.user.name"></field-component>
                  <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-lg-6 mb-3">
                  <label for="tel" class="form-label">收件人電話<span class="text-danger">*</span></label>
                  <field-component id="tel" name="電話" type="tel" class="form-control"
                          :class="{ 'is-invalid': errors['電話'] }" placeholder="請輸入電話" :rules="isPhone"
                          v-model="form.user.tel"></field-component>
                  <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">收件人地址<span class="text-danger">*</span></label>
                <field-component id="address" name="地址" type="text" class="form-control"
                        :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required"
                        v-model="form.user.address"></field-component>
                <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">留言</label>
                <textarea id="message" class="form-control" cols="30" rows="3" v-model="form.message"></textarea>
              </div>
              <button type="submit" class="btn standardBtn w-100"
                      :disabled="Object.keys(errors).length > 0 || cartStore.cart.carts.length === 0">
                      送出訂單
              </button>
            </form-component> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
