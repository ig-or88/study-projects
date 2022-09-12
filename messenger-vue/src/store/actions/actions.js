// вызываем мутации в actions
export default{
  SET_USER_TO_HEADER({ commit }, user) {
    commit('ADD_USER_TO_HEAD', user);
  },
};
