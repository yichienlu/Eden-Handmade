export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      time: (time) => 
         `${(new Date(time * 1000)).toLocaleTimeString()}`     
    }
  }
})