import { createApp } from "vue";
import { createStore } from "vuex";
import vCatalog from "@/components/catalog/v-catalog.vue";

import commonActions from "./actions/actions";
import apiRequests from "./actions/api-requests";
import mutations from "./mutations/mutations";
import getters from "./getters/getters";

let actions = {...commonActions, ...apiRequests};

const store = createStore({
  state() {
    return {
      searchValue: '',
      isMobile: false,
      isDesktop: true,
      products: [],
      cart: [],
    };
  },
  mutations,
  actions,
  getters,
});

const app = createApp({ vCatalog });

app.use(store);

export default store;
