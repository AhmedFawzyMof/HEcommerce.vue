import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about-us",
    name: "AboutUs",
    component: () => import("../views/Contact/AboutUs.vue"),
  },
  {
    path: "/all-products",
    name: "AllProduct",
    component: () => import("../views/AllProducts.vue"),
  },
  {
    path: "/contact/S",
    name: "contactsuccess",
    component: () => import("../views/Contact/contactsuccess.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/category/:category_slug/products/:product_slug",
    name: "Product",
    component: () => import("../views/Product.vue"),
  },
  {
    path: "/category/:category_slug",
    name: "Category",
    component: () => import("../views/Category.vue"),
  },
  {
    path: "/:tag_slug",
    name: "Tag",
    component: () => import("../views/Tag.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/log-in",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/sgin-up",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () => import("../views/Contact/FAQ.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/Contact/Contact.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/check-out",
    name: "Checkout",
    component: () => import("../views/Checkout.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/pay-pal",
    name: "Paypal",
    component: () => import("../views/Paypal.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/cart/O-S",
    name: "OS",
    component: () => import("../views/OS.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/User/order-history",
    name: "OrderHistory",
    component: () => import("../views/OrderHistory.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/User/Profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/User/Profile/password",
    name: "Password",
    component: () => import("../views/User/Password.vue"),
    meta: {
      requireLogin: true,
    },
  },
];
//EditProfile

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.state.isAuthenticated
  ) {
    next({ name: "Login", query: { to: to.path } });
  } else {
    next();
  }
});

export default router;
