<script setup>
const config = useRuntimeConfig();


  const props = defineProps(['article', 'currentPage'])

  const { article, currentPage } = toRefs(props)
  const emit = defineEmits(['get-articles'])

let tempArticle = ref({})
let create_at = ref('')

watch(article, ()=>{
  tempArticle.value = article.value
  const dateAndTime = new Date(tempArticle.value.create_at * 1000)
    .toISOString().split('T');
    [create_at.value] = dateAndTime
})

watch(create_at, ()=>{
  tempArticle.value.create_at = Math.floor(new Date(create_at) / 1000)
})

const addArticle = async () => {
  await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/article`,{
      headers: { Authorization: useCookie('hexToken').value },
      method:'post',
      body:{ data: tempArticle.value }
    })
    .then((res) => {
      console.log(res)
      if(res.error.value){
        console.log(res.error.value.message)
      }else{
        
      }


    })
}
const editArticle = async () => {
  await useFetch(`${config.public.URL}/api/${config.public.PATH}/admin/article/${tempArticle.value.id}`,{
      headers: { Authorization: useCookie('hexToken').value },
      method:'put',
      body:{ data: tempArticle.value }
    })
    .then((res) => {
      console.log(res)
      if(res.error.value){
        console.log(res.error)
      }else{
        
      }

    })
}
const createTags = () => {
  tempArticle.value.tags = []
  tempArticle.value.tags.push('')
}

// 編輯器
import Editor from '@tinymce/tinymce-vue'
const init = {
  skin: 'oxide',
  language: 'zh_TW',
  menubar: false,
  branding: false,
  toolbar: 'undo redo | forecolor backcolor bold italic underline | alignleft aligncenter alignright'
}

</script>

<template>
  <div id="adminArticleModal" ref="adminArticleModal" class="modal fade" tabindex="-1" >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="articleModalLabel" class="modal-title">
            <span v-if="tempArticle.id">編輯貼文</span>
            <span v-else>新增貼文</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempArticle.title"
                  placeholder="請輸入標題"
                />
              </div>
              <!-- <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="tempArticle.image"
                  placeholder="請輸入圖片連結"
                />
              </div> -->
              <div class="mb-3">
                <label for="author" class="form-label">作者</label>
                <input
                  type="text"
                  class="form-control"
                  id="author"
                  v-model="tempArticle.author"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="mb-3">
                <label for="create_at">文章建立日期</label>
                <input type="date" class="form-control" id="create_at" v-model="create_at"
                />
              </div>
            </div>
            <div class="col-sm-8">
              <label for="tags" class="form-label">標籤</label>
              <div class="row gx-1 mb-3">
                <div class="col-md-2 mb-1" v-for="(tag, key) in tempArticle.tags" :key="key">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control form-control" :id="tag" v-model="tempArticle.tags[key]" placeholder="請輸入標籤"/>
                    <button type="button" class="btn btn-outline-danger" @click="tempArticle.tags.splice(key, 1)">
                      <i class="bi bi-x"></i>
                    </button>
                  </div>
                </div>
                <div class="col-md-2 mb-1">
                  <button type="button"
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempArticle.tags.push('')" v-if="Array.isArray(tempArticle.tags)">
                    新增標籤
                  </button>
                  <button type="button"
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="createTags" v-else>
                    新增標籤
                  </button>
                </div>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">文章描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="tempArticle.description"
                  placeholder="請輸入文章描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">文章內容</label>
                <!-- <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  v-model="tempArticle.content"
                ></ckeditor> -->


                <Editor v-model="tempArticle.content" :init="init"/>

              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempArticle.isPublic"
                    id="isPublic"
                  />
                  <label class="form-check-label" for="isPublic">
                    是否公開
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-if="tempArticle.id" @click="editArticle">
            確認編輯
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-else @click="addArticle">
            確認新增
          </button>
        </div>
      </div>
    </div>
  </div>
</template>