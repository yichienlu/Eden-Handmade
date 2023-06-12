<template>
  <nav class="m-5">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{disabled: !pages.has_pre}">
        <a href="#" class="page-link" @click.prevent="updatePage(pages.current_page - 1)">
          <span aria-hidden="true"><i class="bi bi-caret-left-fill"></i></span>
        </a>
      </li>
      <li class="page-item"
      :class="{active: page===pages.current_page}"
      v-for="page in pages.total_pages"
      :key="page + 'page'">
          <a href="#" class="page-link" @click.prevent="updatePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{disabled: !pages.has_next}">
        <a href="#" class="page-link" @click.prevent="updatePage(pages.current_page + 1)">
          <span aria-hidden="true"><i class="bi bi-caret-right-fill"></i></span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
  defineProps(['pages'])
  const emit = defineEmits(['get-Items'])
  
  const updatePage = function(page){
    emit('get-Items', page)
  }

</script>