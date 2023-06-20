export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      currency: (num) => 
         `${parseInt(num, 10).toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`     
    }
  }
})