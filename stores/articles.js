import { defineStore } from "pinia";

export const useArticlesStore = defineStore("articles", () => {
  const config = useRuntimeConfig();
  
  const articles = ref([])
  const pagination = ref({})
  let currentPage = ref(1)
  let isLoading = ref(true);


  const getArticles = async (page=1) => {
    isLoading.value = true
    await useFetch(`${config.public.URL}/api/${config.public.PATH}/articles?page=${page}`)
    .then((res)=>{
      if(res.error.value){
        console.log(res.error.value.data.message)
      } else {
        articles.value = res.data._rawValue.articles
        pagination.value = res.data._rawValue.pagination
        currentPage.value = page
      }


    })

    isLoading.value = false;
  
  }

  return { articles, pagination, isLoading, getArticles }
})