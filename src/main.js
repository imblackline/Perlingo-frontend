import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "material-icons/iconfont/material-icons.css";
import router from "./router";
import store from "./store";
import ClickOutSide from "./directives/ClickOutSide";

createApp(App)
    .use(store)
    .use(router)
    .directive("click-outside", ClickOutSide)
    .mount("#app");
