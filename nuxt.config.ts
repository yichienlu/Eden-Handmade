// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public:{
      URL: process.env.VUE_APP_API,
      PATH: process.env.VUE_APP_PATH
    }
  },
  css: ["@/assets/css/all.scss"],
})
