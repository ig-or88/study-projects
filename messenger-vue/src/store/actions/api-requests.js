import axios from "axios";
// вызываем мутации в actions
export default{
  // получаем данные с помощью метода GET axios, вызываем мутацию commit и передаем в state: products
  FETCH_CONTACTS({ commit }) {
    return axios.get( 'http://localhost:3000/contacts' )
    .then((contacts) => {
      commit('ADD_CONTACTS_TO_STORE', contacts.data)
    })
    .catch(error => {
      throw error
    })
  },
  FETCH_CHATS({ commit }) {
    return axios.get( 'http://localhost:3000/chats' )
    .then((chats) => {
      commit('ADD_CHATS_TO_STORE', chats.data)
    })
    .catch(error => {
      throw error
    })
  },

}
