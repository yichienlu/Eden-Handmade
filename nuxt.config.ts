// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public:{
      URL: process.env.VUE_APP_API,
      PATH: process.env.VUE_APP_PATH
    }
  },
  css: ["@/assets/css/all.scss"],

  "modules": ['@pinia/nuxt'
  // ,'nuxt-swiper'
],
  // swiper: {
  //   // Swiper options
  //   //----------------------
  //   // prefix: 'Swiper',
  //   // styleLang: 'css',
  //   modules: ['navigation', 'pagination'], // all modules are imported by default
  // },
  "imports": {
      "dirs": ['stores']
   }
 
})
