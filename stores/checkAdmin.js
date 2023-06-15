import { defineStore } from "pinia";

export const useCheckAdminStore = defineStore("checkAdmin", () => {
  const config = useRuntimeConfig();
  
  let loggedIn = ref(false);
  let checkSuccess = ref(false);


  const checkAdmin = async () => {
    const token = useCookie('hexToken').value
    const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

    if (cookie) {
      // 是否為登入狀態
      await useFetch(`${config.public.URL}/api/user/check`, {
        method: "post",
        headers: { Authorization: token },
      }).then((res) => {
        if (res.error.value) {
          console.log(res.error);
          // console.log(res.error.value.data.message);
          loggedIn.value = false;
        } else {
          loggedIn.value = true;
          // console.log(res.data)
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
          // console.log(res.data);
          console.log("管理員登入");
        }
      });
    }
  };
  

return {loggedIn,checkSuccess,checkAdmin}

})
  