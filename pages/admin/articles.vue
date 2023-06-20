<script setup>
definePageMeta({
  layout: 'admin'
})

const config = useRuntimeConfig();
const articles = ref([])
const tempArticle = ref({})
const pagination = ref({})
let currentPage = ref(1)
let isLoading = ref(false)

const getArticles = async (page = 1) => {
  isLoading.value = true
  currentPage.value = page
  await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/articles/?page=${page}`,
  {
    headers: { Authorization: useCookie('hexToken').value },
  })
  .then((res)=>{
    if(res.error.value){
      isLoading.value = false
      console.log(res.error.value.data.message)
    } else {
      isLoading.value = false
      articles.value = res.data.value.articles
      pagination.value = res.data.value.pagination
      // console.log(res.data)
      console.log(res.data.value.message)
    }
  })

}
onMounted(()=>{
  getArticles()
})
</script>

<template>
  <div>
    news
  </div>
</template>

<style scoped></style>
