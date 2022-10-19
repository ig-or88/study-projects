import axios from "axios";

export default {
  async getTracks({ commit }) {
    try {
      const response = await axios.get("http://localhost:3000/users");
      commit("SET_TRACKS_TO_STATE", response.data);
    } catch (error) {
      console.error(error);
    }
  },
};
