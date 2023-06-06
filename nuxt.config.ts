// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      script:[
        {
          src: "bootstrap/popper.min.js",
          crossorigin: "anonymous"
        }
      ]
    }
  },
  css: ["@/assets/css/all.scss"],
})
