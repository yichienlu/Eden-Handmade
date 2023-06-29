import { defineStore } from "pinia";

export const  useCartStore = defineStore("cart", () => {
  const config = useRuntimeConfig();

  let cart = ref([])
  let isLoading = ref(true)
  const getCart = async () => {
    isLoading.value = true
    const response = await fetch(`${config.public.URL}/api/${config.public.PATH}/cart`)
    .then((res)=>res.json())
    .catch((err)=>err.json())

    // console.log(response)
    if(response.success){
      cart.value = response.data
    } else {
      console.log(response.message)
    }
    isLoading.value = false
  }

  const addToCart = async (id, qty=1) => {
    if (qty < 1 || qty % 1 !== 0) {
      // this.emitter.emit('push-message', {
      //   style: 'success',
      //   title: '錯誤訊息',
      //   content: '輸入數量錯誤'
      // })
      return
    }
    const data = {
      product_id: id,
      qty
    }

    await useFetch(`${config.public.URL}/api/${config.public.PATH}/cart`, {
      method: 'post', 
      body: { data }
    })
    .then((res)=>{
      if(res.error.value){
        console.log(res.error.value.data.message)
      } else {
        console.log(res.data.value.message)
        getCart()
      }
    })

  }

  const removeCartItem = async (id) => {
    // this.isLoading = true

    await useFetch(`${config.public.URL}/api/${config.public.PATH}/cart/${id}`, {
      method: 'delete'
    })
    .then((res)=>{
      if(res.error.value){
        console.log(res.error.value.data.message)
      } else {
        console.log(res.data.value.message)
        getCart()
      }
    })
      
  }

  const updateCartItem = async (item, num) => {
    if (item.qty + num === 0) {
      removeCartItem(item.id)
      return
    }

    // this.isLoading = true

    await useFetch(`${config.public.URL}/api/${config.public.PATH}/cart/${item.id}`, {
      method: 'put',
      body: {
        data:{
          product_id: item.id,
          qty: item.qty + num
        }
      }
    }).then((res)=>{
      // isLoading = false
      if(res.error.value){
        console.log(res.error.value.data.message)
      } else {
        console.log(res.data.value.message)
        getCart()
      }
    })


  }

  const clearCart = async () => {
    const response  = await useFetch(`${config.public.URL}/api/${config.public.PATH}/carts`, {
      method: 'delete'
    })

    console.log(response.data._rawValue.message)
    getCart()

  }


  // 折價券
  let couponCode = ref('')
  const addCouponCode = async () => {
    // isLoading = true
    await useFetch(`${config.public.URL}/api/${config.public.PATH}/coupon`, {
      method: 'post',
      body: {data:{code: couponCode}}
    }).then((res)=>{
      if(res.error.value){
        console.log(res.error.value.data.message)
      } else {
        console.log(res.data.value.message)
        getCart()
      }
          // isLoading = false

    })

  }

  return { cart, isLoading, getCart, addToCart, removeCartItem, clearCart, updateCartItem, addCouponCode, couponCode };
})