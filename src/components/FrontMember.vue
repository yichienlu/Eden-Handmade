<template>
  <div class="d-flex align-items-center nav-item dropdown">
    <a class="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="bi bi-person translate-middle" style="font-size: 1.5rem"></i>
    </a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
      <li v-if="loggedIn && checkSuccess">
        <router-link to="/admin" class="dropdown-item">後台</router-link>
      </li>
      <li>
        <router-link v-if="loggedIn" to="/orders" class="dropdown-item">我的訂單</router-link>
      </li>
      <li v-if="!loggedIn">
        <router-link to="/Login" class="dropdown-item">登入</router-link>
      </li>
      <li v-if="loggedIn">
        <a href="#" class="dropdown-item" @click.prevent="logOut">登出</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loggedIn: false,
      checkSuccess: false
    }
  },
  inject: ['emitter'],
  methods: {
    checkAdmin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1'
      )
      if (token) {
        this.$http.defaults.headers.common.Authorization = token
        this.$http
          .post(`${process.env.VUE_APP_API}/api/user/check`)
          .then(() => {
            this.loggedIn = true
          })
          .catch((error) => {
            this.$httpMessageState(error.response, '錯誤訊息')
          })

        this.$http
          .get(
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products`
          )
          .then(() => {
            this.checkSuccess = true
          })
          .catch(() => {
            this.checkSuccess = false
          })
      }
    },
    logOut () {
      document.cookie = 'hexToken=;expires=;'
      this.emitter.emit('push-message', {
        style: 'success',
        title: '已登出'
      })
      this.loggedIn = false
      this.checkSuccess = false
      window.location.href = '/'
    }
  },
  mounted () {
    this.checkAdmin()
  }
}
</script>
