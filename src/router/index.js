import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import HomeRoutes from "../views/Home.routes";
import Account from "../views/Account.vue";
import AccountRoutes from "../views/Account.routes";

import store from "../store/index";

function guardUser(to, from, next) {
    var isAuthenticated = false;
    console.log(store.state.me);
    if (store.state.me.token) isAuthenticated = true;
    else isAuthenticated = false;
    if (isAuthenticated) {
      next(); // allow to enter route
    } else {
      next("/account/login"); // go to '/login';
    }
  }
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        children: HomeRoutes,
        beforeEnter: guardUser,
    },
    {
        path: "/account",
        name: "Account",
        component: Account,
        children: AccountRoutes,
        redirect: { name: 'login' } 
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
