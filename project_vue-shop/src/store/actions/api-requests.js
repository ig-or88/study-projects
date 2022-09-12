import axios from "axios";
// вызываем мутации в actions
export default{
  // получаем данные с помощью метода GET axios, вызываем мутацию commit и передаем в state: products
  GET_PRODUCTS_FROM_API({ commit }) {
    return axios("http://localhost:3000/products", {
      method: "GET",
    })
      .then((products) => {
        commit("SET_PRODUCTS_TO_STATE", products.data);
        return products;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}
