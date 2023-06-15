<template>
  <div class="d-flex align-items-center nav-item dropdown">
    <a
      class="nav-link"
      href="#"
      id="navbarDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="bi bi-person translate-middle" style="font-size: 1.5rem"></i>
    </a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
      <li v-show="checkAdminStore.loggedIn && checkAdminStore.checkSuccess">
        <nuxtLink to="/admin" class="dropdown-item">後台</nuxtLink>
      </li>
      <li>
        <nuxtLink v-show="checkAdminStore.loggedIn" to="/orders" class="dropdown-item"
          >我的訂單</nuxtLink
        >
      </li>
      <li v-show="!checkAdminStore.loggedIn">
        <nuxtLink to="/login" class="dropdown-item">登入</nuxtLink>
      </li>
      <li v-show="checkAdminStore.loggedIn">
        <a href="#" class="dropdown-item" @click.prevent="logOut">登出</a>
      </li>
    </ul>
  </div>
</template>

<script setup>

const checkAdminStore = useCheckAdminStore()

const logOut = () => {
  document.cookie = "hexToken=;expires=;";
  // this.emitter.emit('push-message', {
  //   style: 'success',
  //   title: '已登出'
  // })

  checkAdminStore.loggedIn = false;
  checkAdminStore.checkSuccess = false;

  console.log("已登出");

  window.location.href = "/";
  // router.go(-1)
};


</script>
