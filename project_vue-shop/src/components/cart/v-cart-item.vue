<template>
  <div class="v-cart-item">
    <img class="v-cart-item__image" :src=" require('../../assets/images/' + cart_item_data.image) "
    alt="img">
    <div class="v-cart-item__info">
      <p>{{ cart_item_data.name }}</p>
      <!-- применили глобальный фильтр toFix -->
      <p>{{ $filters.toFix(cart_item_data.price) }}</p>
      <p>Арт: {{ cart_item_data.article }}</p>
    </div>
    <div class="v-cart-item__quantity">
      <p>Кол-во:</p>
      <div class="quantity__wrapper">
        <div class="quantity__btn" @click="incrementItem">+</div>
        {{ cart_item_data.quantity }}
        <div class="quantity__btn" @click="decrementItem">-</div>
      </div>
    </div>
    <button class="btn" @click="deleteFromCart">Удалить</button>
    </div>
</template>

<script>

  export default {
    name: 'v-cart-item',
    props: {
      cart_item_data: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    data() {
      return {
      }
    },
    computed: {},
    methods: {
      incrementItem () {
        this.$emit('incrementItem')
      },
      decrementItem () {
        this.$emit('decrementItem')
      },
      // передали в родителя событие deleteFromCart
      deleteFromCart() {
        this.$emit('deleteFromCart')
      },
      // toFix(value) {
      //     value = parseFloat(value);
      //     return value.toFixed(2);
      // },
    },
    mounted() {
    }
  }
</script>

<style lang='scss'>
  .v-cart-item {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;
    &__image {
      max-width: 80px;
    }
    &__quantity {
      width: 100px;
    }
  }
  .quantity {
    &__wrapper {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
    &__btn {
      cursor: pointer;
      font-weight: bold;
      width: 1.5em;
      height: 1.5em;
      line-height: 1.5em;
      border: solid 1px #aeaeae;
      border-radius: 50%;
    }
    &__btn:hover {
      background-color: #e7e7e7;
    }
  }

</style>
