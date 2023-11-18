<template>
  <div>
    <!-- Các phần khác của trang edit.vue -->
    <h1 class="mt-4"> Sửa sản phẩm:  {{ productId }}</h1>


    <div class="container" >
    <table class="table table-bordered mt-5">
      <thead class="thead-dark">
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tên sản phẩm :</td>
          <td><input v-model="data.items.name" class="form-control" /></td>
        </tr>
        <tr>
          <td>Giá :</td>
          <td><input v-model="data.items.price" class="form-control" /></td>
        </tr>
        <tr>
          <td>Danh mục :</td>
          <td>
            <select v-model="data.items.category" class="form-control">
              <option
                v-for="category in categories"
                :key="category._id"
                :value="category._id"
              >
                {{ category.name }}
              </option>
            </select>
          </td>
        </tr>

        <tr>
          <td>Màu sắc :</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(color, index) in data.items.colors" :key="index">
                <div class="input-group mb-2">
                  <input
                    v-model="data.items.colors[index]"
                    class="form-control"
                  />
                  <div class="input-group-append">
                    <button
                      @click="removeColor(index)"
                      class="btn btn-danger"
                      type="button"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            <button @click="addColor" class="btn btn-success">Thêm</button>
          </td>
        </tr>
        <tr>
          <td>Sizes</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(size, index) in data.items.sizes" :key="index">
                <div class="input-group mb-2">
                  <input
                    v-model="data.items.sizes[index]"
                    class="form-control"
                  />
                  <div class="input-group-append">
                    <button
                      @click="removeSize(index)"
                      class="btn btn-danger"
                      type="button"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            <button @click="addSize" class="btn btn-success">Thêm</button>
          </td>
        </tr>
        <tr>
          <td>Chất liệu</td>
          <td><input v-model="data.items.material" class="form-control" /></td>
        </tr>
        <tr>
          <td>Mô tả</td>
          <td>
            <input v-model="data.items.description" class="form-control" />
          </td>
        </tr>
        <div class="row">
          <div class="col">
            <label for="images">Ảnh</label>
            <input
              type="file"
              class="form-control"
              name="file"
              id="imageUpload"
              accept=".png, .jpg, .jpeg"
              :maxFileSize="1000000"
              ref="fileInput"
              @change="onFileChange"
            />
          </div>
          <div class="col">
            <img
              v-if="!data.imgSrc"
              :src="data.items.images"
              alt="Ảnh cũ"
              height="100"
            />
            <img :src="data.imgSrc" alt="" height="100" />
          </div>
        </div>
      </tbody>
    </table>

    <!-- Update button -->
    <button @click="updateProduct()" class="btn btn-secondary">
      Cập nhật
    </button>
    </div>
    <!-- Các thành phần khác của trang edit.vue -->
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import {
  http_getOne,
  http_update,
  http_getAll,
} from "../../assets/js/common.http";
import Product from "../../services/product.service";
import { alert_success, alert_error } from "../../assets/js/common.alert";
import { useRouter } from "vue-router";
import Category from "../../services/category.service";
export default {
  setup() {
    const data = reactive({
      items:[],
      imgSrc: null,
    });
    const productId = ref(null);
    const route = useRoute();

    const fetchProductData = async () => {
      productId.value = route.params.productId;
      data.items = await http_getOne(Product, productId.value);
      console.log(data.items);
    };
    const categories = ref([]); // Add this line

    const fetchCategories = async () => {
      categories.value = await http_getAll(Category);
      data.items.category = data.items.category._id;
    };
    onMounted(async () => {
      await fetchProductData();
      await fetchCategories();
    });
    const router = useRouter();
    const isImageUploaded = ref(false);
    const onFileChange = (event) => {
      console.log("qua met moi");
      data.items.images = event.target.files[0];

      // handle display img
      const files = event.target.files[0];
      if (files && files.length > 0) {
        isImageUploaded.value = true;
      } else {
        isImageUploaded.value = false;
      }
      // console.log(data.items.images);
      const reader = new FileReader();

      console.log("qua met moi1");

      reader.onload = (event) => {
        data.imgSrc = event.target.result;
      };

      console.log("qua met moi2");

      reader.readAsDataURL(files);
    };

    const updateProduct = async (event) => {
      const formData = new FormData();
      if (isImageUploaded.value == false) {
        console.log("true rồi", data.items.images);
        formData.append("images", data.items.images);
      } else {
        console.log("Không có thay đổi");
      }
      formData.append("name", data.items.name);
      formData.append("price", data.items.price);
      formData.append("category", data.items.category);
      formData.append("sizes", JSON.stringify(data.items.sizes));
      formData.append("colors", JSON.stringify(data.items.colors));
      // formData.append("images", data.items.images);
      formData.append("material", data.items.material);
      formData.append("description", data.items.description);

      const res = await http_update(Product, productId.value, formData);
      if (res) {
        alert_success("Success", "Product updated successfully");
        router.push({ name: "qlsp" });
      } else {
        alert_error("Error", "Failed to update product");
      }
    };

    const addSize = () => {
      data.items.sizes.push("");
    };

    const removeSize = (index) => {
      data.items.sizes.splice(index, 1);
    };

    const addColor = () => {
      data.items.colors.push("");
    };

    const removeColor = (index) => {
      data.items.colors.splice(index, 1);
    };
    return {
      productId,
      data,
      updateProduct,
      addSize,
      removeSize,
      addColor,
      removeColor,
      categories,
      onFileChange,
      isImageUploaded,
    };
  },
};
</script>

<style scoped>
.mt-4{
  font-size: 20px;
  color: rgb(76, 76, 76);
  font-family: "Helvetica, Arial", sans-serif;
 
  margin-left: 7.3%;
}
.thead-dark{
  font-size: 18px;
}
.btn-secondary{
  margin-left: 50%;
  margin-top: 2%;
  margin-bottom: 2%;
}
.btn-secondary:hover{
  background-color: cadetblue;
  color:black
}
</style>