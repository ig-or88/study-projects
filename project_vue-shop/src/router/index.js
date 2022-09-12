import { createRouter, createWebHistory } from "vue-router";

import mainPage from "../components/main-page/v-main-page";
// import vCatalog from "../components/catalog/v-catalog";
// import vCart from "../components/cart/v-cart";
// import vProductPage from "../components/catalog/v-product-page"

const routes = [
  {
    path: '/',
    name: "mainPage",
    component: mainPage,
  },
  {
    path: '/catalog',
    name: "vCatalog",
    // Lazy Loading Routes + magic comment /**/
    component: () => import(/* webpackChunkName: "vCatalog" */ "../components/catalog/v-catalog.vue"),
  },
  {
    path: '/product',
    name: 'product',
    component: () => import(/* webpackChunkName: "product" */ "../components/catalog/v-product-page.vue"),
  },
  {
    path: '/cart',
    name: "vCart",
    component: () => import(/* webpackChunkName: "vCart" */ "../components/cart/v-cart.vue"),
    // props: true, //для передачи входных параметров компоненту
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes, // short for `routes: routes`
})

export default router;
