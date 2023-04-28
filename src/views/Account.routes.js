import SmartLogin from "@/components/Account/SmartLogin.vue";
import SmartSignup from "@/components/Account/SmartSignup.vue";

const routes = [
    {
        path: "login",
        name: "login",
        component: SmartLogin,
    },
    {
        path: "signup",
        name: "signup",
        component: SmartSignup,
    },
];

export default routes;
