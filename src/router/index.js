import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import HomeRoutes from "../views/Home.routes";
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        children: HomeRoutes,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
