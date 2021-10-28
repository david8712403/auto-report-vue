import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requireAuth: true },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("../components/Dashboard.vue"),
        exact: true,
      },
      {
        path: "/daily_report",
        name: "daily_report",
        component: () => import("../components/DailyReport.vue"),
        exact: true,
      },
      {
        path: "/daily_report/new_report",
        name: "new_report",
        component: () => import("../components/AddDailyReport.vue"),
        props: {
          action: "create",
        },
        exact: true,
      },
    ],
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("refreshToken");
  const isLogin = token !== null && token !== "";
  if (to.path === "/login") {
    if (isLogin) next("/");
  } else if (to.path !== "/login") {
    if (!isLogin) next("/login");
  }
  next();
});

export default router;
