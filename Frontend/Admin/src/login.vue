<template>
  <div class="container-fluid">
    <div class="row justify-content-center align-items-center vh-100">
      <div class="col-md-4">
        <div class="card shadow  text-black" style="background-color: rgb(251, 251, 251);">
          <div class="card-body p-5">
            <h5 class="card-title text-center mb-4" style="margin-top: -15px; font-size: 24px;font-weight: bold;">ĐĂNG NHẬP</h5>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label class="form-label" style="margin-left: 3%;margin-top: 10px;">
                  Tên Tài Khoản (<span style="color: red">*</span>):
                </label>
                <input
                  v-model="username"
                  type="text"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label" style="margin-left: 3%;">
                  Mật Khẩu (<span style="color: red">*</span>):
                </label>
                <div class="input-group" style="width:80%">
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    required
                  />
                  <div class="input-group-append">
                    <span
                      class="input-group-text"
                      @click="togglePasswordVisibility"
                      style="cursor: pointer"
                    >
                      <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'" style="height: 21px;transform: translateY(2px);"></i>
                    </span>
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-secondary w-30">
                Đăng Nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { alert_error, alert_success } from "@/assets/js/common.alert";

export default {
  setup() {
    const showPassword = ref(false);
    const username = ref("");
    const password = ref("");
    const router = useRouter();

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const login = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/Accounts/login",
          {
            username: username.value,
            password: password.value,
          }
        );
        const userRole = response.data.user.role;
        if (userRole !== "Admin") {
          alert_error(
            "Truy Cập Bị Từ Chối",
            "Tài Khoản Của Bạn Không Có Quyền Truy Cập Vào Trang Web Này"
          );
          return;
        }
        if (response.data.error === false) {
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("CustomerName", response.data.user.name);
          sessionStorage.setItem("CustomerId", response.data.user._id);
          sessionStorage.setItem("roleName", response.data.user.role);
          sessionStorage.setItem("roleId", response.data.user.roleId);
          location.reload();
        } else {
          alert_error("Login", response.data.msg);
        }
      } catch (error) {
        // console.log(error);
        alert_error("Đăng nhập thất bại", "Đã xảy ra lỗi trong quá trình đăng nhập!");
      }
    };

    // Automatically redirect to qlsp if already logged in
    const checkLoggedIn = () => {
      const token = sessionStorage.getItem("token");

      if (token && token !== "undefined") {
        router.push({ name: "qlsp" });
      }
    };

    onMounted(checkLoggedIn);

    return {
      username,
      password,
      login,
      togglePasswordVisibility,
      showPassword,
    };
  },
};
</script>

<style scoped>
.input-group-append {
  position: absolute;
  right: -1px;
  top: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
}
  
.input-group {
  display: flex;
  align-items: center;
  justify-content: center;
  margin:0 auto;
}

.form-control {
  width: 80%;
  margin:0 auto
}

.btn-secondary{
  margin-left: 36%;
  margin-top: 2%;
}
.btn-secondary:hover{
  background-color: cadetblue;

}
</style>
