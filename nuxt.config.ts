// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // app: {
  //   baseURL: '/Eden-Handmade-Soap/' // baseURL: '/<repository>/'
  // },
  runtimeConfig: {
    public: {
      URL: process.env.VUE_APP_API,
      PATH: process.env.VUE_APP_PATH,
    },
  },
  css: ["@/assets/css/all.scss"],
  plugins: [
    '@/plugins/bootstrap.client.js'
  ],
  modules: [
    "@pinia/nuxt",
    "@vee-validate/nuxt",
  ],
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'FormComponent',
      Field: 'FieldComponent',
      ErrorMessage: 'ErrorMessage',
    },
  },
  imports: {
    dirs: ["stores"],
  },
  
});
