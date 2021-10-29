import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store/index";
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
  const { refreshToken } = store.getters.cache;
  const isLogin = refreshToken !== undefined;
  if (to.path === "/login") {
    if (isLogin) {
      next("/");
      return;
    }
  } else if (to.path !== "/login") {
    if (!isLogin) {
      next("/login");
      return;
    }
  }
  next();
});

export default router;
