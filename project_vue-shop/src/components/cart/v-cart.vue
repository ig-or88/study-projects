<template>
  <div class="v-cart">
    <router-link :to="{ name: 'vCatalog'}">
      <div class="v-catalog__link_to_cart">Назад в каталог </div>
    </router-link>

    <h1>Корзина</h1>
    <p v-if="!CART.length">В корзине пока ничего нет...</p>
    <!-- связываем v-cart с v-cart-item -->
    <v-cart-item
      :cart_item_data="item"
      v-for="(item, index) in CART"
      :key="item.article"
      @deleteFromCart="deleteFromCart(index)"
      @incrementItem="incrementItem(index)"
      @decrementItem="decrementItem(index)"
    />
    <div class="v-cart__total">
      <p class="total__name">Итого:</p>
      <p>{{ $filters.toFix(cartTotalCost) }} Р.</p>
    </div>
  </div>
</template>

<script>
  import vCartItem from "./v-cart-item.vue"
  import {mapActions, mapGetters} from "vuex"

  export default {
    name: 'v-cart',
    components: {
      vCartItem
    },
    props: {
      cart_data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return { }
    },
    computed: {
      ...mapGetters([
        'CART'
      ]),
      cartTotalCost() {
        let result = [];

        for (let item of this.CART) {
          result.push(item.price * item.quantity);
        };
        // получаем сумму элементов массива
        result = result.reduce(function(sum, el) {
          return sum + el;
        }, 0);

        return result;
      }
    },
    methods: {
      ...mapActions([
        'DELETE_FROM_CART',
        'INCREMENT_CART_ITEM',
        'DECREMENT_CART_ITEM'
      ]),
      incrementItem(index) {
        this.INCREMENT_CART_ITEM(index)
      },
      decrementItem(index) {
        this.DECREMENT_CART_ITEM(index)
      },
      deleteFromCart(index) {
        this.DELETE_FROM_CART(index)
      },
      // toFix(value) {
      //     value = parseFloat(value);
      //     return value.toFixed(2);
      // },
    }
  }
</script>

<style lang="scss">
  .v-cart {
    margin-bottom: 100px;
      &__total {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      padding: $padding*2 $padding*3;
      display: flex;
      justify-content: center;
      background: rgb(199, 141, 227);
      color: $btn-txt-clr;
      font-size: 20px;
    }
  }
  .total__name {
    padding-right: 15px;
  }
</style>
  <!-- v-for="(item, index) in cart_data" - получаем индекс во время рендеринга-->
