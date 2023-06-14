import { defineStore } from "pinia";
export const useArticlesStore = defineStore("articles", () => {
  const config = useRuntimeConfig();
  
  const articles = ref([])
  const pagination = ref({})


  const getArticles = async (page=1) => {
    // isLoading = true
    await useFetch(`${config.public.URL}/api/${config.public.PATH}/articles?page=${page}`)
    .then((res)=>{
      if(res.error.value){
        console.log(res.error.value.data.message)
      } else {
        articles.value = res.data._rawValue.articles
        pagination.value = res.data._rawValue.pagination
      }
    })

    // .then((response) => {
    //   this.articles = response.data.articles
    //   this.pagination = response.data.pagination
    //   this.isLoading = false
    // }).catch((error) => {
    //   this.$httpMessageState(error.response, '錯誤訊息')
    //   this.isLoading = false
    // })

  }

  return { articles, pagination, getArticles }
})