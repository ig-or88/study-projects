  // мутации служат единственным способом изменения состояния хранилища во Vuex
export default {
  ADD_CONTACTS_TO_STORE(state, contacts) {
    state.contacts = contacts;
  },
  ADD_CHATS_TO_STORE(state, chats) {
    state.chats = chats;
  },
  ADD_USER_TO_HEAD(state, user) {
    if (user) {
      state.currentUserChat = user;
    } else {
      state.currentUserChat = '';
    }
  },
}
