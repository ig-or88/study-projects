import { createApp } from "vue";
import App from "./App.vue";
import vAppLink from "./components/v-app-link.vue";
import store from "./store/store.js";
import router from "./router/router.js";
import "material-design-icons-iconfont";

const app = createApp(App);

app
.component('vAppLink', vAppLink)
.use(store)
.use(router)
.mount("#app");
