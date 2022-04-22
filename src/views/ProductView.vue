<template>
  <Loading-component :active="isLoading"></Loading-component>
  <div class="container py-5">
    <div class="row flex-sm-row-reverse">
      <div class="col-sm-6 position-relative">
        <div>
          <h1>{{ product.title }}</h1>
          <img :src="product.imageUrl" alt="主要商品照片" class="d-inline-block d-sm-none img-fluid my-2">
          <h5 class="mb-4 text-secondary">{{ product.description }}</h5>
          <div class="mb-2 fw-bold">成份：{{ product.ingredients }}</div>
          <div class="mb-3">{{ product.content }}</div>
          <h5 class="mb-3 text-danger" v-if="product.price==product.origin_price">{{ product.origin_price }} 元</h5>
          <h5 class="mb-3" v-else>
            <del class="h6">{{ product.origin_price }} 元</del>
            <div class="h5 text-danger">{{ product.price }} 元</div>
          </h5>
          <hr class="my-3">
          <div class="input-group input-group-sm mb-3" style="width: 120px">
            <button class="btn btn-secondary text-white" type="button" @click="changeNumber(-1)">
              <i class="bi bi-dash-lg"></i>
            </button>
            <input type="number" class="form-control text-center bg-white border-primary" v-model.number="qty" disabled>
            <button class="btn btn-secondary text-white" type="button" @click="changeNumber(1)">
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <button class="btn standardBtn w-100" type="button" @click="addToCart(product.id, qty)">加到購物車</button>
            </div>
            <div class="col-md-6 mb-3">
              <button class="btn btn-outline-primary w-100" type="button" @click="addToCart(product.id, qty)">加入收藏</button>
            </div>
          </div>
          <ul class="nav justify-content-between border" id="myTab" role="tablist">
            <li class="nav-item info-tab" role="presentation">
              <button class="btn w-100 active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" aria-controls="description" aria-selected="true">商品描述</button>
            </li>
            <li class="nav-item info-tab" role="presentation">
              <button class="btn w-100 " id="payment-tab" data-bs-toggle="tab" data-bs-target="#payment" type="button" role="tab" aria-controls="payment" aria-selected="false">付款方式</button>
            </li>
            <li class="nav-item info-tab" role="presentation">
              <button class="btn w-100" id="shipment-tab" data-bs-toggle="tab" data-bs-target="#shipment" type="button" role="tab" aria-controls="shipment" aria-selected="false">運送方式</button>
            </li>
          </ul>
          <div class="tab-content border border-top-0 p-3" id="myTabContent">
            <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="home-tab">
              <h6 class="fw-bold">產品特色</h6>
              <p>有機成分、無香料、無色素、無防腐劑、無石化成分、無界面活性劑、無動物實驗</p>
              <h6 class="fw-bold">商品規格</h6>
              <p>
                成分：{{ product.ingredients }}<br>
                重量：120g ± 5g<br>
                產地：台灣製造<br>
              </p>
              <h6 class="fw-bold">使用方式</h6>
              <p>取皂體於手心塗抹於臉部或身體肌膚，輕柔按摩，最後以清水沖洗即可。</p>
              <h6 class="fw-bold">保存方式</h6>
              <p>置於陰涼乾燥處，避免陽光直射與高溫，開封後請盡速使用。</p>
              <h6 class="fw-bold">注意事項</h6>
              <p>本產品無使用硬性油脂與化學凝固劑，遇熱產生輕微軟化與出油情形乃屬正常現象，請安心使用。</p>
            </div>
            <div class="tab-pane fade" id="payment" role="tabpanel" aria-labelledby="profile-tab">
              <ul>
                <li>
                  <h6 class="fw-bold">信用卡即時線上一次刷卡付款</h6>
                  <p>方便又好用的付款方式，當您選擇線上刷卡方式進行交易時，作業流程透過SSL加密機制，保障您的個人隱私資料。</p>
                </li>
                <li>
                  <h6 class="fw-bold">超商付款取貨</h6>
                  <p>適合不方便在家收貨或者不方便使用ATM與無信用卡的消費者。</p>
                </li>
                <li>
                  <h6 class="fw-bold">ATM付款</h6>
                  <p>適用沒有信用卡或者不方便前往超商取貨付款的消費者。使用ATM付款方式只需將訂單款項透過實體/網路ATM或者網路銀行直接匯入系統指定帳號即可完成付款。</p>
                </li>
                <li>
                  <h6 class="fw-bold">貨到付款</h6>
                  <p>適用沒有信用卡或者不方便前往超商取貨付款的客戶。使用貨到付款方式只需於配達貨物時，將訂單款項以新台幣現金的方式繳款即可完成付款。</p>
                </li>
                <li>
                  <h6 class="fw-bold">LINE Pay</h6>
                  <p>付款不需輸入信用卡資訊及3D驗證，僅需輸入專屬密碼即可使用信用卡進行付款，節省您的付款時間。</p>
                </li>
                <li>
                  <h6 class="fw-bold">街口支付</h6>
                  <p>請先備妥您行動裝置中的街口支付應用程式，可使用街口儲值帳戶/銀行帳戶，並搭配街口幣進行付款。</p>
                </li>
                <li>
                  <h6 class="fw-bold">Apple Pay</h6>
                  <p>請先備妥您行動裝置中的Apple Pay Wallet，可使用綁定的信用卡結帳，交易過程全程加密，交易安全有保障。</p>
                </li>
              </ul>
            </div>
            <div class="tab-pane fade" id="shipment" role="tabpanel" aria-labelledby="contact-tab">
              <ol>
                <li>
                  帳款確認後將立即處理您的訂單，您將於七個工作日內(不含週六日及國定例假日)收到訂購之商品。
                </li>
                <li>以 郵局/便利袋/宅配通/宅急便 寄送商品。</li>
                <li>配送範圍限台灣本島各縣市(不含郵政信箱)。</li>
                <li>
                  如本店無法接受您的訂單，將於收到您的訂單後二個工作日內通知您。但法令另有規定者除外。
                </li>
              </ol>
              <h6 class="fw-bold">注意事項</h6>
              <p>店家保留訂單接受與否權利，若因交易條件有誤或有其他情形導致商店無法接受您的訂單，將取消訂單，造成您的不便，敬請見諒。</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <img :src="product.imageUrl" alt="主要商品照片" class="d-none d-sm-inline-block img-fluid my-2">
        <template v-for="image in product.imagesUrl" :key="image">
          <img :src="image" alt="次要商品照片" class="img-fluid my-2">
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      product: {
      },
      qty: 1,
      isLoading: false
    }
  },
  methods: {
    changeNumber (num) {
      if (this.qty + num === 0) {
        return
      }
      this.qty += num
    },
    addToCart (id, qty) {
      this.isLoading = true
      const data = {
        product_id: id,
        qty
      }
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((response) => {
          this.$httpMessageState(response, '加入購物車')
          this.qty = 1
          emitter.emit('get-cart')
          this.isLoading = false
        })
        .catch((error) => {
          this.$httpMessageState(error.response, '加入購物車')
          this.isLoading = false
        })
    }
  },
  mounted () {
    document.title = 'Eden Handmade | 線上商店'
    this.isLoading = true
    this.$http
      .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.$route.params.id}`)
      .then((response) => {
        this.product = response.data.product
        this.product.shownUrl = this.product.imageUrl
        this.isLoading = false
      })
      .catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息')
        this.isLoading = false
      })
  }
}
</script>
