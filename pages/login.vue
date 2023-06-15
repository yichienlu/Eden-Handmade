<script setup>
  const config = useRuntimeConfig();
  const router = useRouter()
  const checkAdminStore = useCheckAdminStore()
  const user = ref({
    username:'',
    password:''
  })

  const login = async () => {
    await useFetch(`${config.public.URL}/admin/signin`, {
      method: 'post',
      body: user.value
    })
    .then((res)=>{
      if(res.error.value){
        console.log(res.error.value.data.message)
      } else {
        const { token, expired } = res.data.value
        document.cookie = `hexToken = ${token}; expires=${new Date(expired)}`
        
        console.log(res.data.value.message)

        redirect()

      }
    })
    
  }

  const redirect = async () =>{
      await checkAdminStore.checkAdmin();
      console.log(checkAdminStore.loggedIn)
      console.log(checkAdminStore.checkSuccess)
      // window.location.href = '/'
      router.push({ path: "/" })
    }

</script>

<template>
  <div class="bg-light d-flex justify-content-center align-items-center" style="height: 100vh">
    <div>
      <router-link to="/">
        <h1 class="text-center dancing fw-bold text-secondary mb-5">Eden Handmade</h1>
      </router-link>
      <h2 class="text-center mb-3">請登入帳號</h2>
      <form id="form" class="form-signin mx-auto" @submit.prevent="login" style="width: 240px">
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="username" placeholder="name@example.com" required autofocus
            v-model="user.username">
          <label for="username">電子信箱</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="password" placeholder="Password" required
            v-model="user.password">
          <label for="password">密碼</label>
        </div>
        <button class="btn btn-lg btn-secondary text-white w-100 mt-3" type="submit" id="loginBtn">
          登入
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
