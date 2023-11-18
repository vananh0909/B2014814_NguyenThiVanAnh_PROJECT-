<template>
  <h3 class="text">Liệt kê đơn hàng</h3>
  <div class="d-flex align-items-center justify-content-center vh-30">
    <div class="container text-center">
      <table
        class="table table-striped"
        style="width: 100%; border-collapse: collapse; margin: 0 auto"
        border="1"
      >
        <tr>
          <th>STT</th>
          <th>Mã đơn hàng</th>
          <th>Tên khách hàng</th>
          <th>Địa chỉ</th>
          <th>Số điện thoại</th>
          <th>Ngày đặt</th>
          <th>Quản lý</th>
        </tr>
        <tr>
          <td>1</td>
          <td>0910</td>
          <td>Vân Anh</td>
          <td>Long Mỹ, Hậu Giang</td>
          <td>0924555555</td>
          <td>14/10/2023</td>
          <td>
            <router-link to="chitietdon" class="show">Xem chi tiết</router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import chitietdon from "./chitietdon.vue";
export default {
  components: {
    chitietdon,
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  height: auto;
  margin: 0 auto;
  color: rgb(76, 76, 76);
  font-family: "Helvetica, Arial", sans-serif;
}

.text {
  margin-left: 11%;
  color: rgb(76, 76, 76);
  font-family: "Helvetica, Arial", sans-serif;
  font-size: 25px;

}
.show {
  color: blue;
}
</style>