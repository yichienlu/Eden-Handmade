import { defineStore } from "pinia";
export const useProductsStore = defineStore("products", () => {
  const config = useRuntimeConfig();

  const products = ref([]);
  const categories = ref([])
  let selectedCategory = ref('')
  const pagination = ref({});
  let currentPage = ref(1)
  let isLoading = ref(true);


  // 取得商品資料 & 頁數資料
  const getProducts = async (page=1, category='') => {
    isLoading.value = true;
    const response = await fetch(`${config.public.URL}/api/${config.public.PATH}/products?page=${page}&category=${category}`)
    .then((res)=>res.json())
    .catch((err)=>err.json())

    if(response.success){
      products.value = response.products
      pagination.value = response.pagination
      selectedCategory.value = category
      currentPage.value = page
    } else {
      console.log(response.message)
    }

      isLoading.value = false;

  }

  // 取得所有商品類別
  const getCategories = async () => {
    const response = await fetch(`${config.public.URL}/api/${config.public.PATH}/products/all`)
    .then((res)=>res.json())
    .catch((err)=>err.json())

    if(response.success){
      categories.value = Array.from(new Set(response.products.map(i => i.category))).reverse()
    } else {
      console.log(response.message)
    }
    
  }


  return { products, categories, selectedCategory, pagination, currentPage, isLoading, getProducts, getCategories }
})