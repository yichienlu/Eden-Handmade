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
      <li v-if="loggedIn && checkSuccess">
        <nuxtLink to="/admin" class="dropdown-item">後台</nuxtLink>
      </li>
      <li>
        <nuxtLink v-if="loggedIn" to="/orders" class="dropdown-item"
          >我的訂單</nuxtLink
        >
      </li>
      <li v-if="!loggedIn">
        <nuxtLink to="/login" class="dropdown-item">登入</nuxtLink>
      </li>
      <li v-if="loggedIn">
        <a href="#" class="dropdown-item" @click.prevent="logOut">登出</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
// const headers = useRequestHeaders()

const loggedIn = ref(false);
const checkSuccess = ref(false);

const checkAdmin = async () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  if (token) {
    // 是否為登入狀態
    await useFetch(`${config.public.URL}/api/user/check`, {
      method: "post",
    }).then((res) => {
      if (res.error.value) {
        console.log(res.error.value.data.message);
        loggedIn.value = false;
      } else {
        loggedIn.value = true;
        // console.log(res.data.value?.message)
      }
    });

    // 是否為管理者
    await useFetch(
      `${config.public.URL}/api/${config.public.PATH}/admin/coupons`,
      {
        headers: { Authorization: token },
      }
    ).then((res) => {
      if (res.error.value) {
        if (
          res.error.value.data.message ==
          "禁止使用, 請確認 api_path 是否為本人使用。"
        ) {
          console.log("普通會員登入");
        } else {
          console.log(res.error.value.data.message);
        }
        checkSuccess.value = false;
      } else {
        checkSuccess.value = true;
        console.log(res.data.value?.message);
        console.log("管理員登入");
      }
    });
  }
};

const logOut = () => {
  document.cookie = "hexToken=;expires=;";
  // this.emitter.emit('push-message', {
  //   style: 'success',
  //   title: '已登出'
  // })

  loggedIn.value = false;
  checkSuccess.value = false;

  console.log("已登出");

  window.location.href = "/";
  // router.go(-1)
};

onMounted(() => {
  checkAdmin();
});

</script>
