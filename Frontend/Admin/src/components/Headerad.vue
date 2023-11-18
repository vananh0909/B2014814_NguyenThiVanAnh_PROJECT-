<template>
  <div class="dx">
    <button class="btn btn-light" id="btn-light" @click="logout">Đăng xuất</button>
  </div>
  <div class="d-flex align-items-center justify-content-center ">
    <div
   
      class="container text-center"
    >
      <ul class="admin-list">
        <router-link to="/" type="button" class="btn btn-light">
          <a class="danhmuc">Quản lý danh mục</a>
        </router-link>
        <router-link to="/qlsanpham" type="button" class="btn btn-light">
          <a class="danhmuc">Quản lý sản phẩm</a>
        </router-link>
        <router-link to="/qldonhang" type="button" class="btn btn-light">
          <a class="danhmuc">Quản lý đơn hàng</a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
// import qldanhmuc from '../view/qldanhmuc.vue'
// import qlsanpham from '../view/qlsanpham.vue'
export default {
  // name: "Headerad",
  setup () {
    const router = useRouter();
    const logout = () => {
    // Clear session storage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('CustomerName');
    sessionStorage.removeItem('CustomerId');
    sessionStorage.removeItem('roleName');
    sessionStorage.removeItem('roleId');

    // Redirect to the login page
    router.push('/loginadmin');
  };

  return { logout };
  }
};
</script>

<style scoped>
.container {
  width: 70%;
  height: auto;
  margin: 0 auto;
  color: rgb(40, 40, 40);
  margin-top:2%;
  font-family: "Helvetica, Arial", sans-serif;
}
.btn-light{
  font-size: 20px;
margin-top:3%;
  margin-right: 2%;
}
#btn-light{
  float:right;
  margin:10px;
 font-size: 16px;
 font-weight: bold;
 color: rgb(40, 40, 40);
  margin-top:1%;
  font-family: "Helvetica, Arial", sans-serif;
}
#btn-light:hover{
  background-color: cadetblue;
  color:black;
}
.btn-light:hover{
  background-color: cadetblue;
}
.danhmuc:hover{
  color: black;
}
.danhmuc{
  text-decoration: none;
  font-weight: bold;
}
</style>
