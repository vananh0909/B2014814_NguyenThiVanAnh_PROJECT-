
<template>
  <h3 class="text">Chi tiết đơn hàng</h3>
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
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Size</th>
          <th>Màu sắc</th>
          <th>Tổng đơn</th>
        </tr>
        <tr>
          <td>1</td>
          <td>0910</td>
          <td>DC x GAM Worlds 23</td>
          <td>690000</td>
          <td>1</td>
          <td>M</td>
          <td>Đen</td>
          <td>690000</td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
export default {};
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
</style>