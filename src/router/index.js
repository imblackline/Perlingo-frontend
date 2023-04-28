import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import HomeRoutes from "../views/Home.routes";
import Account from "../views/Account.vue";
import AccountRoutes from "../views/Account.routes";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        children: HomeRoutes,
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
