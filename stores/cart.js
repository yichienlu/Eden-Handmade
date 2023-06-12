import { defineStore } from "pinia";

export const  useCartStore = defineStore("cart", () => {
  const config = useRuntimeConfig();

  let cart = ref([])


  const getCart = async () => {
    const response = await fetch(`${config.public.URL}/api/${config.public.PATH}/cart`)
    .then((res)=>res.json())
    .catch((err)=>err.json())

    // console.log(response)
    if(response.success){
      cart.value = response.data.carts
    } else {
      console.log(response.message)
    }

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
      console.log(res.data._rawValue.message)
      getCart()
    })
    .catch((err)=> console.log(err))

  }

  const removeCartItem = async (id) => {
    // this.isLoading = true

    await useFetch(`${config.public.URL}/api/${config.public.PATH}/cart/${id}`, {
      method: 'delete'
    })
    .then((res)=>{
      console.log(res.data._rawValue.message)
      getCart()
    })
    .catch((err)=> console.log(err))
      
  }

  const updateCartItem = async (item, num) => {

  }

  const clearCart = async () => {
    const response  = await useFetch(`${config.public.URL}/api/${config.public.PATH}/carts`, {
      method: 'delete'
    })

    console.log(response.data._rawValue.message)
    getCart()

  }


  return { cart, getCart, addToCart, removeCartItem, clearCart };
})