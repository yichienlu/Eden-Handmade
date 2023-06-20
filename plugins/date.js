export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      date: (time) => 
         `${(new Date(time * 1000)).toLocaleDateString()}`     
    }
  }
})