import { createApp } from "vue";
import { createStore } from "vuex";
import MainTable from "../components/table/MainTable.vue";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const store = createStore({
  state() {
    return {
      tracks: [],
    };
  },
  mutations,
  actions,
  getters,
});

const app = createApp({ MainTable });

app.use(store);

export default store;
