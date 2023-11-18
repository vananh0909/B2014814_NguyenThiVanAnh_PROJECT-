<template>
  <div class="d-flex align-items-center justify-content-center vh-30">
    <div class="container text-center">
      <p
        style="
          float: left;
          margin-top: 2%;
          color: rgb(76, 76, 76);
          font-family: Helvetica, Arial, sans-serif;
          font-size: 25px;
        "
      >
        Thêm danh mục
      </p>
      <table class="table table-striped" style="width: 100%" border="1">
        <tr>
          <td style="font-size: 20px;float: left; margin-left: 15px;margin-top: 20px;">Tên danh mục</td>
          <td>
            <input
              type="text"
              name="name"
              id="name"
              class="form-control form-control-lg"
              v-model="data.itemAdd.name"
            />
          </td>
        </tr>

        <!-- <tr>
          <td>Thứ tự</td>
          <td><input type="text" name="thutu" /></td>
        </tr> -->
        <!-- {{ data.itemAdd }} -->
        <tr>
          <td colspan="2">
            <button
              class="btn btn-secondary"
              id="button"
              type="submit"
              @click="create"
            >
              Thêm danh mục sản phẩm
            </button>
          </td>
        </tr>
      </table>

      <div class="gach-ngang"></div>

      <p
        style="
          float: left;
          margin-top: 2%;
          color: rgb(76, 76, 76);
          font-family: Helvetica, Arial, sans-serif;
          font-size: 25px;
        "
      >
        Liệt kê danh mục sản phẩm
      </p>
      <table class="table table-striped" style="width: 100%" border="1">
        <tr>
          <th>STT</th>
          <th>Tên danh mục</th>
          <th>Quản lý</th>
        </tr>

        <tr v-for="(item, index) in data.items" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>
            <a
              style="margin-right: 10px;"
              class="thea"
              @click="deleteCategory(item)"
              ><i style="margin-bottom: 4%;" class="fas fa-trash"></i
            ></a>
            <a class="thea" @click="editCategory(item._id)"
              ><i class="fas fa-edit"></i
            ></a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Category from "../../services/category.service";
import {
  http_getOne,
  http_getAll,
  http_create,
  http_deleteOne,
} from "../../assets/js/common.http";
import { onMounted, reactive } from "vue";
import { alert_success, alert_error } from "../../assets/js/common.alert";
import { useRouter } from 'vue-router';
export default {
  // name: "Headerad",
  setup() {
    const data = reactive({
      items: [],
      itemAdd: {},
    });

    const router = useRouter();
    const editCategory = (categoryId) => {
      // Navigate to the edit page with the product ID
      router.push({ name: 'editcategory', params: { categoryId } });
    };

    const create = async () => {
      const createCategory = await http_create(Category, data.itemAdd);
      console.log(createCategory);
      if(createCategory){
        alert_success("Thông báo", "Bạn đã tạo thành công danh mục sản phẩm");
        await refresh();
      }else{
        alert_error("Lỗi", "Tạo danh mục sản phẩm không thành công");
      }
    }
    const deleteCategory = async (item) => {
      // console.log(item);
      const dltCategory = await http_deleteOne(Category, item._id);
      if (dltCategory) {
        alert_success(
          "Xóa Thành Công",
          "Bạn đã xóa thành công danh mục sản phẩm"
        );
        await refresh();
      } else {
        alert_error("Lỗi", "Xóa danh mục sản phẩm thất bại");
      }
    };
    const refresh = async () => {
      data.items = await http_getAll(Category);
      // console.log(data.items);
    };
    onMounted(async () => {
      await refresh();
    });
    return {
      data,
      deleteCategory,
      create,
      editCategory
    };
  },
};
</script>

<style scoped>
.container {
  width: 70%;
  height: auto;
  margin: 0 auto;
  color: rgb(76, 76, 76);
  font-family: "Helvetica, Arial", sans-serif;
}
.gach-ngang {
  border-top: 1px solid #bdbdbd; /* Màu và chiều dày của đường kẻ ngang */
  width: 100%;
  margin-top: 8%;
  margin-bottom: 8%;
}
.btn-secondary {
  margin-left: 9%;
  margin-top: 20px;
  margin-bottom: 3%;
}
.btn-secondary:hover{
  background-color: cadetblue;
  color:black;
}
.thea:hover {
  color: red;
  cursor: pointer;
}
.thea{
  margin-bottom: 3%;
}

.form-control-lg{
  margin-left: 5%;
  margin-top: 20px;
  width:200px;
}
.table-striped{
  background-color: rgb(255, 255, 255);
}
</style>
