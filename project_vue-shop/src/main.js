import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import toFix from "./filters/toFix";
// import formattedPrice from "./filters/priceFormat";
import "material-design-icons-iconfont";

const app = createApp(App);

app.use(store).use(router).mount("#app");

// определили глобальные свойства $filters доступные во всех компонентах
app.config.globalProperties.$filters = {
  toFix: toFix,
  // formattedPrice: formattedPrice,
};
