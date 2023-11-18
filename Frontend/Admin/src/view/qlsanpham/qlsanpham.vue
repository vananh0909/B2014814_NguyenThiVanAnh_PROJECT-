<template>
  <h3 class="text1">Thêm sản phẩm</h3>
  <form
    style="
      border: 2px solid rgb(194, 193, 193);
      border-radius: 10px;
      margin: 0px 100px;
    "
    enctype="multipart/form-data"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="name">Tên sản phẩm</label>
            <input
              class="form-control"
              type="text"
              id="name"
              name="name"
              v-model="data.itemAdd.name"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="price">Giá sản phẩm</label>
            <input
              class="form-control"
              type="text"
              name="price"
              id="price"
              v-model="data.itemAdd.price"
            />
          </div>
        </div>
      </div>
      <!-- Add this select element to display categories -->
      <div class="form-group">
        <label for="category">Danh mục</label>
        <select
          style="width: 20%"
          class="form-control"
          v-model="data.itemAdd.category"
        >
          <option
            v-for="category in data.itemCategory"
            :key="category._id"
            :value="category._id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="size">Size</label>
            <div v-for="(size, index) in data.itemAdd.sizes" :key="index">
              <input
                class="form-control"
                type="text"
                :name="'sizes[' + index + ']'"
                :id="'size_' + index"
                v-model="data.itemAdd.sizes[index]"
              />
              <button
                type="button"
                class="btn btn-danger"
                @click="removeSize(index)"
              >
                <i class="fas fa-minus"></i>
              </button>
            </div>
            <button
              style="margin-left: 1px; margin-top: 4px"
              type="button"
              class="btn btn-success"
              @click="addSize"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="color">Màu Sắc</label>
            <div v-for="(color, index) in data.itemAdd.colors" :key="index">
              <input
                class="form-control"
                type="text"
                :name="'colors[' + index + ']'"
                :id="'color_' + index"
                v-model="data.itemAdd.colors[index]"
              />
              <button
                type="button"
                class="btn btn-danger"
                @click="removeColor(index)"
              >
                <i class="fas fa-minus"></i>
              </button>
            </div>
            <button
              style="margin-left: 1px; margin-top: 4px"
              type="button"
              class="btn btn-success"
              @click="addColor"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <label for="avatar">Ảnh</label>
          <input
            type="file"
           
            class="form-control"
            name="file"
            id="imageUpload"
            accept=".png, .jpg, jpeg"
            :maxFileSize="1000000"
            ref="fileInput"
            @change="onFileChange"
            multiple
          />
          
        </div>
        <div class="col">
          <img :src="data.imgSrc" alt="" height="100" />
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="material">Chất Liệu</label>
            <input
              class="form-control"
              rows="4"
              name="material"
              style="resize: none; width: 40%"
              id="material"
              v-model="data.itemAdd.material"
            />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="description">Mô tả</label>
        <textarea
          class="form-control"
          rows="4"
          name="description"
          id="description"
          style="resize: none; width: 90%"
          v-model="data.itemAdd.description"
        ></textarea>
      </div>

      <div class="form-group">
        <button
          class="btn btn-secondary"
          type="button"
          id="add"
          @click="Create()"
        >
          Thêm Sản Phẩm
        </button>
      </div>
    </div>
  </form>

  <div class="gach-ngang"></div>
  <div>
    <h3 class="text">Liệt kê sản phẩm</h3>
    <table
      class="table table-striped"
      style="
        width: 95%;
        border: 2px solid rgb(194, 193, 193);
        border-radius: 10px;
        margin-bottom: 2%;

      "
    >
      <tr>
        <th>STT</th>
        <th>Tên sản phẩm</th>
        <th>Mã sản phẩm</th>
        <th>Danh mục</th>
        <th>Hình ảnh</th>
        <th>Giá</th>
        <th>Size</th>
        <th>Màu</th>
        <th>Chất Liệu</th>
        <th>Mô Tả</th>
        <th>Quản lý</th>
      </tr>
      <tr v-for="(product, index) in data.items" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product._id }}</td>
        <td>{{ product.category?.name }}</td>
        <!-- <td>{{ product.images }}</td> -->
        <td>
          <img :src="product.images" style="width: 100px" />
        </td>
        <td>{{ product.price }}</td>
        <td>{{ parseAndJoin(product.sizes) }}</td>
        <td>{{ parseAndJoin(product.colors) }}</td>
        <td>{{ product.material }}</td>
        <td>{{ product.description }}</td>
        <td>
          <button
            class="thea"
            style="margin-right: 10px"
            @click="deleteProduct(product)"
          >
            <i class="fas fa-trash"></i>
          </button>
          <button
            type="button"
            class="thea"
            @click="editProduct(product._id)"
          >
            <i class="fas fa-edit"></i>
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Product from "../../services/product.service";
import { useRouter } from "vue-router";
import {
  http_create,
  http_getAll,
  http_deleteOne,
} from "../../assets/js/common.http";
import { alert_success, alert_error } from "../../assets/js/common.alert";
import { onMounted, reactive } from "vue";
import Category from "../../services/category.service";
export default {
  components: {},
  setup() {
    const data = reactive({
      items: [],
      itemAdd: {
        name: "",
        price: "",
        sizes: [],
        colors: [],
        images: [],
        material: "",
        description: "",
      },
      // itemedit: {},
      // editValue: {
      //   _id: "",
      //   name: "",
      //   price: "",
      //   sizes: [],
      //   colors: [],
      //   images: "",
      //   material: "",
      //   description: "",
      // },
      itemCategory: [],
      imgSrc: null,
    });
    const onFileChange = (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          data.imgSrc = e.target.result; // Set the image source for preview
        };

        reader.readAsDataURL(file);
        data.itemAdd.images = file; // Save the file in the itemAdd object
        console.log(file);
      }
    };
    const router = useRouter();
    const editProduct = (productId) => {
      // Navigate to the edit page with the product ID
      router.push({ name: "edit", params: { productId } });
    };
    const addSize = () => {
      data.itemAdd.sizes.push(""); // Add an empty string for a new size
    };

    const removeSize = (index) => {
      data.itemAdd.sizes.splice(index, 1); // Remove the size at the given index
    };
    const addColor = () => {
      data.itemAdd.colors.push(""); // Add an empty string for a new color
    };

    const removeColor = (index) => {
      data.itemAdd.colors.splice(index, 1); // Remove the color at the given index
    };
    const Create = async () => {
      const formData = new FormData();

      // Append form data
      formData.append("name", data.itemAdd.name);
      formData.append("price", data.itemAdd.price);
      formData.append("category", data.itemAdd.category);
      formData.append("sizes", JSON.stringify(data.itemAdd.sizes));
      formData.append("colors", JSON.stringify(data.itemAdd.colors));
      formData.append("images", data.itemAdd.images);
      formData.append("material", data.itemAdd.material);
      formData.append("description", data.itemAdd.description);

      const createProduct = await http_create(Product, formData);

      if (createProduct) {
        alert_success("Thông báo", "Bạn đã tạo thành công sản phẩm");
        await refresh();
      } else {
        alert_error("Lỗi", "Tạo sản phẩm không thành công");
      }
    };
    const deleteProduct = async (product) => {
      const dltPro = await http_deleteOne(Product, product._id);
      if (dltPro) {
        alert_success("Xóa Thành Công", "Bạn đã xóa thành công sản phẩm");
        await refresh();
      } else {
        alert_error("Lỗi", "Xóa sản phẩm thất bại");
      }
    };
    const refresh = async () => {
      data.items = await http_getAll(Product);
      console.log("dataProduct:", data.items);
      data.itemCategory = await http_getAll(Category);
      // console.log("dataCatagory", data.itemCategory);
    };
    onMounted(async () => {
      await refresh();
    });
    const parseAndJoin = (obj) => {
      if (Array.isArray(obj)) {
        // Nếu là mảng, thực hiện xử lý cho từng phần tử trong mảng
        return obj.map(parseAndJoin);
      } else if (typeof obj === "object" && obj !== null) {
        // Nếu là đối tượng, thực hiện đệ quy cho từng thuộc tính của đối tượng
        for (let key in obj) {
          obj[key] = parseAndJoin(obj[key]);
        }
        return obj;
      } else if (typeof obj === "string") {
        // Nếu là chuỗi, loại bỏ dấu ngoặc vuông và dấu ngoặc kép
        return obj.replace(/[\[\]\"\\]/g, "");
      } else {
        // Trường hợp khác, giữ nguyên giá trị
        return obj;
      }
    };
    return {
      data,
      Create,
      addSize,
      removeSize,
      addColor,
      removeColor,
      deleteProduct,
      editProduct,
      onFileChange,
      parseAndJoin,
    };
  },
};
</script>

<style scoped>
.table-striped {
  margin: 0 auto;
  color: rgb(76, 76, 76);
  font-family: "Helvetica, Arial", sans-serif;
}
.text {
  margin-left: 43px;
  font-size: 24px;
  color: rgb(76, 76, 76);
  font-family: "Helvetica, Arial", sans-serif;
  margin-top: 2%;
}
.text1 {
  margin-left: 6.5%;
  font-size: 24px;
  color: rgb(76, 76, 76);
  font-family: "Helvetica, Arial", sans-serif;
}
.form-group {
  font-size: 18px;
  margin-bottom: 5px;
}
.gach-ngang {
  border-top: 1px solid #9d9999; /* Màu và chiều dày của đường kẻ ngang */
  width: 80%;
  margin-left: 10%;
  margin-top: 8%;
  margin-bottom: 8%;
}
.btn-secondary {
  margin-left: 45%;
  margin-top: 2%;
  margin-bottom: 1%;
}
.btn-secondary:hover{
  background-color: cadetblue;
  color:black;
}
.thea:hover {
  color: red;
}
.form-group {
  margin-top: 2%;
}
.form-control{
  width:40%;
  margin-top: 1%;
  margin-bottom: 1%;
}

.btn-danger {
  font-size: 10px;
}
.btn-success {
  margin-left: 7px;
  font-size: 10px;
}
</style>