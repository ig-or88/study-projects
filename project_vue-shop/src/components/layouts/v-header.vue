<template>
  <div class="v-header">
    <router-link :to="{ name: 'mainPage' }" class="home-link">
      <img src="../../assets/home.svg" alt="">
    </router-link>

    <h1 class="title">МАГАЗИН</h1>

    <div class="search-field">
      <input
        class="search-input"
        type="text"
        v-model="searchValue"
        @keypress.enter="search(searchValue)">
        <!-- передаем значение searchValue из инпута в метод search  -->
      <button class="search-btn">
        <i class="material-icons" @click="search(searchValue)">search</i>
      </button>
      <button class="search-btn">
        <i class="material-icons" @click="clearSearch">cancel</i>
      </button>
    </div>

    <router-link class="v-header__link" :to="{ name: 'vCart' }">
      <div class="v-header__link_to_cart">
        <i class="material-icons cart_icon">shopping_cart</i> {{ CART.length }}
      </div>
    </router-link>
  </div>

</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "v-header",
    props: {},
    data() {
      return {
        searchValue: ''
      }
    },

    computed: {
      ...mapGetters([
        'SEARCH_VALUE',
        'CART'
      ])
    },

    methods: {
      ...mapActions([
        'GET_SEARCH_VALUE_TO_VUEX',
      ]),

      search(value) {
        this.GET_SEARCH_VALUE_TO_VUEX(value);
        // переход в catalog
        if (this.$router.path !== '/catalog') {
          this.$router.push('/catalog');
        }
      },

      clearSearch() {
        this.searchValue = '';
        this.GET_SEARCH_VALUE_TO_VUEX();
        if (this.$router.path !== '/catalog') {
          this.$router.push('/catalog');
        }
      }
    }
  }
</script>

<style lang="scss">
  .v-header {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(26, 203, 221, 0.7);
    padding: 16px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    img {
      width: 50px;
    }
    &__link {
      text-decoration: none;
    }
    &__link_to_cart {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 60px;
      padding: 12px;
      border: solid 1px #aeaeae;
      font-weight: bold;
    }
  }
  .search-field, .title, .home-link {
    flex-basis: 350px;
  }
  .search-field {
    padding: 16px;
    color: #fff;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-btn {
    background: transparent;
    border: none;
  }
  .search-input {
    border-radius: 3px;
    border-style: none;
    padding: 5px;
  }
  .cart_icon {
    color: #000000;
  }
</style>
