<script setup>
definePageMeta({
  layout: 'admin'
})

const config = useRuntimeConfig();
const { $date } = useNuxtApp()

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
    }
  })

}

const getArticle = async (id) => {
  await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/article/${id}`,
  {
    headers: { Authorization: useCookie('hexToken').value },
  })
  .then((res)=>{
    if(res.error.value){
      isLoading.value = false
      console.log(res.error.value.data.message)
    } else {
      isLoading.value = false
      tempArticle.value = JSON.parse(JSON.stringify(res.data.value.article))
    }
  })
}
const openDeleteModal = (item) => {
  tempArticle.value = item
}
const deleteArticle = () => {
  // this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`)
  //   .then((response) => {
  //     this.$httpMessageState(response, '刪除貼文')
  //     this.getArticles()
  //     this.isLoading = false
  //   })
  //   .catch((error) => {
  //     this.$httpMessageState(error.response, '刪除貼文')
  //     this.isLoading = false
  //   })
}

onMounted(()=>{
  getArticles()
})
</script>

<template>
  <div>
    <!-- <Loading-component :active="isLoading"></Loading-component> -->
  <div class="container my-5">
    <h1 class="text-secondary">文章管理</h1>
    <div class="text-end mt-3">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#adminArticleModal" @click="tempArticle={isPublic:false,tags:[],create_at: new Date().getTime() / 1000}">
        建立新的貼文
      </button>
    </div>
    <table class="table my-4">
      <thead>
        <tr>
          <th style="width: 200px">標題</th>
          <th style="width: 200px">作者</th>
          <th>描述</th>
          <th style="width: 100px">建立時間</th>
          <th style="width: 100px">是否上架</th>
          <th style="width: 120px">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>{{ article.description }}</td>
          <td>{{ $date(article.create_at) }}</td>
          <td>
            <span v-if="article.isPublic">已上架</span>
            <span v-else>未上架</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal"
                data-bs-target="#adminArticleModal" @click="getArticle(article.id)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal"
                data-bs-target="#deleteModal" @click="openDeleteModal(article)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-component :pages="pagination" @get-items="getArticles"></pagination-component>
  </div>
  <!-- modal -->
  <admin-article-modal :article="tempArticle" :current-page="currentPage" ref="adminArticleModal" @get-articles="getArticles"></admin-article-modal>
  <!-- 刪除modal -->
  <delete-modal :item="tempArticle" ref="deleteModal" @delete-item="deleteArticle"></delete-modal>
  </div>
</template>

<style scoped></style>
