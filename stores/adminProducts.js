import { defineStore } from "pinia";
export const useAdminProductsStore= defineStore("adminProducts", () => {
  const config = useRuntimeConfig();

  const modal = ref({})
  const tempProduct = ref({})
  const images = ref([])
  let formData = ref('')
  let imgData = ref(null)
  const imgsData = ref([])

  return {tempProduct}
})