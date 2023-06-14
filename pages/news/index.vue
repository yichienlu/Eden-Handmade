<script setup>
  const config = useRuntimeConfig();

  const articlesStore = useArticlesStore()


    articlesStore.getArticles()


</script>

<template>
 <div class="container">
    <div class="row justify-content-around">
      <div class="col-md-4 border img-cover" style="background-image:url('https://images.unsplash.com/photo-1612800083273-24ea5c80313d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80')">
        <div class="d-block d-lg-none" style="height: 200px"></div>
      </div>
      <div class="col-md-8 col-lg-6 my-4 my-lg-5">
        <h1 class="fw-bold text-center mb-4 mb-lg-5">最新消息 <span class="dancing h2 text-secondary fw-bold">News</span></h1>
        <div class="accordion" id="accordionExample">
          <template v-for="article in articlesStore.articles" :key="article.id">
            <div class="accordion-item">
              <h2 class="accordion-header" :key="article.id">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${article.id}`" aria-expanded="true" :aria-controls="`collapse${article.id}`">
                  <small class="me-3">{{ article.create_at }}</small>
                  <!-- <small class="me-3">{{ new Intl.DateTimeFormat('zh-TW', {dateStyle: 'medium'}).format(article.create_at *1000) }}</small> -->
                  <span>{{ article.title }}</span>
                </button>
              </h2>
              <div
                :id="`collapse${article.id}`" class="accordion-collapse collapse show" :aria-labelledby="`heading${article.id}`" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <p>{{ article.description }}</p>
                  <router-link
                  :to="`/news/${article.id}`"
                  v-if="article.isPublic">
                  <small>詳細內容</small>
                </router-link>
                </div>
              </div>
            </div>
          </template>
        </div>
        <pagination-component :pages="articlesStore.pagination" @get-items="articlesStore.getArticles"></pagination-component>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
