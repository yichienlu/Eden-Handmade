<script setup>

  const config = useRuntimeConfig();
  
  const props = defineProps(['product', 'currentPage'])
  const { product, currentPage } = toRefs(props)
  const emit = defineEmits(['get-products'])
  
  let tempProduct = ref({})
  const images = ref([])
  let formData = ref('')
  let imgData = ref(null)
  const imgsData = ref([])

  watch(product, ()=>{
    tempProduct.value = product.value
  })


  // const file = ref(null)
  const clearRefs = () => {
  //   file.value = null
  //   if (Array.isArray(tempProduct.imagesUrl)) {
  //     images = [...document.querySelectorAll('[data-images]')]
  //     images.forEach(function (item) {
  //       item.value = null
  //     })
  //   }
  }
   const addProduct = async () => {
    await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/product`,{
      headers: { Authorization: useCookie('hexToken').value },
      method:'post',
      body:{ data: tempProduct }
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
  const editProduct = async () => {
    await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/product/${tempProduct.value.id}`,{
      headers: { Authorization: useCookie('hexToken').value },
      method:'put',
      body:{ data: tempProduct.value }
    })
    .then((res) => {
      if(res.error.value){
        console.log("ERROR")
        console.log(res.error.value.data.message)
      }else{
        emit('get-products', currentPage.value)
        // closeModal()
        console.log(tempProduct.value)
        console.log("SUCCESS")

      }
      
    })
  }

  const deleteProduct = async () => {
    await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/product/${tempProduct.value.id}`,{
      headers: { Authorization: useCookie('hexToken').value },
      method:'delete',
      body:{ data: tempProduct.value }
    })
    .then((res) => {
      if(res.error.value){
        console.log("ERROR")
        console.log(res.error.value.data.message)
      }else{
        emit('get-products', currentPage.value)
        // closeModal()
        console.log(tempProduct.value)
        console.log("SUCCESS")

      }
      
    })
  }

  // const adminProductModal = ref(null)
  onMounted(() => {
    
    
  })

</script>
<template>
  <div id="adminProductModal" ref="adminProductModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="tempProduct.id">編輯產品</span>
            <span v-else>新增產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearRefs()"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProduct.title">
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="tempProduct.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"  v-model.number="tempProduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價" v-model.number="tempProduct.price">
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="mb-3 col-md-6">
                <label for="description" class="form-label">產品描述</label>
                  <input id="description" type="text" class="form-control" placeholder="請輸入產品描述" v-model="tempProduct.description">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="ingredients" class="form-label">成份</label>
                  <input id="ingredients" type="text" min="0" class="form-control" placeholder="請輸入成份" v-model="tempProduct.ingredients">
                </div>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容" v-model="tempProduct.content">
                  </textarea>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="stock" class="form-label">庫存</label>
                  <input id="stock" type="number" min="0" class="form-control" placeholder="請輸入庫存"  v-model.number="tempProduct.stock">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="sold" class="form-label">售出</label>
                  <input id="sold" type="number" min="0" class="form-control" placeholder="請輸入售出數量" v-model.number="tempProduct.sold">
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="tempProduct.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
            <div class="col-lg-4 mt-5 mt-lg-0">
              <h3 class="mb-2">主要圖片</h3>
              <div class="mb-4">
                <label for="imageUrl" class="form-label">圖片網址</label>
                <input id="imageUrl" v-model="tempProduct.imageUrl" type="text" class="form-control form-control-sm mb-2" placeholder="請輸入圖片連結">
                <div class="input-group input-group-sm mb-2">
                  <input type="file" class="form-control" id="input-imageUrl" aria-label="Upload" ref="file" @change="getImgData">
                  <button class="btn btn-outline-secondary" :disabled="!imgData" type="button" id="upload-imageUrl" @click="uploadImage">上傳</button>
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="主要圖片">
              </div>
              <h3 class="mb-2">次要圖片</h3>
              <!-- 網址+圖片 -->
              <div class="mb-3" v-for="(image, key) in tempProduct.imagesUrl" :key="key">
                  <label :for="`imageUrl${key}`" class="form-label">圖片網址</label>
                  <input :id="`imageUrl${key}`" v-model="tempProduct.imagesUrl[key]" type="text" class="form-control form-control-sm mb-2"
                    placeholder="請輸入圖片連結">
                <div class="input-group input-group-sm mb-2">
                  <input type="file" class="form-control" id="`input-imagesUrl${key}`" aria-label="Upload" :ref="`file${key}`" data-images="imagesUrl" @change="getImgsData(key)">
                  <button class="btn btn-outline-secondary" :disabled="!imgsData[key]" type="button" id="`upload-imagesUrl${key}`" @click="uploadImages(key)">上傳</button>
                </div>
                <img class="img-fluid" :src="image" :alt="`次要圖片${key+1}`">
              </div>
              <!-- 按鍵 -->
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <button type="button" class="btn btn-outline-primary btn-sm d-block w-100 mb-1"
                  @click="tempProduct.imagesUrl.push(''); imgsData.push('')">
                  新增圖片
                </button>
              </div>
              <div v-else>
                <button type="button" class="btn btn-primary btn-sm d-block w-100 mb-1"
                  @click="createImages">
                  新增圖片
                </button>
              </div>
              <button type="button" class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.pop(); imgsData.pop('')">
                    刪除圖片
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal" @click="clearRefs()">
            取消
          </button>
          <button type="button" class="btn btn-primary"  v-if="tempProduct.id" @click="editProduct">
            確認編輯
          </button>
          <button type="button" class="btn btn-primary" v-else @click="addProduct">
            確認新增
          </button>
        </div>
      </div>
    </div>
  </div>
</template>