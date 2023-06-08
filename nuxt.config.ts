// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public:{
      URL: process.env.VUE_APP_API,
      PATH: process.env.VUE_APP_PATH
    }
  },
  app:{
    head:{
      script:[
        // {
        //   src: "popper.js/dist/popper.min.js",
        //   crossorigin: "anonymous"
        // },
        // {
        //   src: "bootstrap/bootstrap.js",
        //   crossorigin: "anonymous"
        // },
        // {
        //   src: "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js",
        //   integrity:"sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r",
        //   crossorigin: "anonymous"
        // },
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js",
          integrity:"sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS",
          crossorigin: "anonymous"
        }
      ]
    }
  },
  css: ["@/assets/css/all.scss"],
})
