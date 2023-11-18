import { createRouter, createWebHistory } from "vue-router";
import qldanhmuc from "../view/qldanhmuc/qldanhmuc.vue";
import qlsanpham from "../view/qlsanpham/qlsanpham.vue";
import qldonhang from "../view/qldonhang.vue";
import chitietdon from "../view/chitietdon.vue";
import editproduct from "../view/qlsanpham/edit.vue";
import editcategory from "../view/qldanhmuc/edit.vue";
import login from "../login.vue";
const routes = [
  {
    path: "/loginadmin",
    name: "LoginAdmin",
    component: login,
  },
  {
    // path: "/",
    // component: () => import("../../src/App.vue"),
    meta: { requiresAuth: true }, //đánh dấu các trang yêu cầu xác thực
    children: [
      {
        path: "/",
        component: qldanhmuc,
      },
      {
        path: "/qlsanpham",
        name: "qlsp",
        component: qlsanpham,
      },
      {
        path: "/qldonhang",
        component: qldonhang,
      },
      {
        path: "/chitietdon",
        component: chitietdon,
      },
      {
        path: "/edit/:productId",
        name: "edit",
        component: editproduct,
      },
      {
        path: "/editcategory/:categoryId",
        name: "editcategory",
        component: editcategory,
      },
    ]
  }
  ];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem("token"); // Kiểm tra xem người dùng đã đăng nhập hay chưa
  // console.log(`isAuthenticated `, isAuthenticated);
  // const customerId = sessionStorage.getItem("customerId");
  // const customerName = sessionStorage.getItem("customerName");
  // const role = sessionStorage.getItem("role");
  // console.log(customerId, customerName, role);
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    // Nếu trang yêu cầu xác thực và người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    next({ name: "LoginAdmin" });
  } else {
    next();
  }
});
export default router;
