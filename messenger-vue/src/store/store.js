import { createApp } from "vue";
import { createStore } from "vuex";
import vContactList from "@/components/contacts/v-contact-list.vue";

import commonActions from "./actions/actions";
import apiRequests from "./actions/api-requests";
import mutations from "./mutations/mutations";
import getters from "./getters/getters";

let actions = {...commonActions, ...apiRequests};

// Хранилище
const store = createStore({
  state() {
    return {
      isAuth: false,
      contacts: [],
      chats: [],
      currentUserChat: {},
    };
  },
  mutations,
  actions,
  getters,
});

const app = createApp({ vContactList });

// Install the store instance as a plugin
app.use(store);

export default store;
