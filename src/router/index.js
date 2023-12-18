import Vue from "vue";
import VueRouter from "vue-router";
// Auth Routes
import Login from "@/views/login.vue";

// Dasboard Routes

import Dashboard from "@/views/Dashboard/dashboard.vue";
import Transaction from "@/views/Dashboard/transactions.vue";
import UserDetails from "@/views/Dashboard/userdetails.vue";
import CRDR from "@/views/Dashboard/CRDR.vue";
import Index from "@/views/Dashboard/index.vue";

import store from "@/store";

const routeGuard = (to, from, next) => {
  const { isLoggedIn } = store.getters.data;
  if (to.matched.some((record) => record.meta.requiresLogin) && isLoggedIn) {
    next();
  } else {
    next("/");
  }
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "dashboard",
    component: Index,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
      {
        path: "/transactions",
        name: "transactions",
        component: Transaction,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
      {
        path: "/user/:id",
        name: "UserDetails",
        component: UserDetails,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
      {
        path: "/admin/crdr",
        name: "CRDR",
        component: CRDR,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
