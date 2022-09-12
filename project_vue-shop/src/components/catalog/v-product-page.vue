<template>
  <div class="v-product-page">
    <router-link :to="{ name: 'vCatalog'}">
      <div class="v-catalog__link_to_cart">Назад в каталог </div>
    </router-link>

    <div class="v-product-page__info">
      <img
        class="v-catalog-item__image"
        v-if="product.image"
        :src=" require('../../assets/images/' + product.image) "
        alt="img">
      <p>Название: {{ product.name }}</p>
      <p>Арт: {{ product.article }}</p>
      <p>Цена: {{ $filters.toFix(product.price) }}</p>
      <button
        class="v-catalog-item__btn btn"
        @click="addToCart">
        В корзину
      </button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex"

  export default {
    name: "v-product-page",
    components: {},
    props: {},
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'PRODUCTS'
      ]),
      product() {
        let result = {};
        this.PRODUCTS.find( (item) => {
          if (item.article === this.$route.query.product) {
            result = item;
          }
        })
        return result;
      },
    },
    methods: {
      ...mapActions([
        'GET_PRODUCTS_FROM_API',
        'ADD_TO_CART'
      ]),
      addToCart() {
        this.ADD_TO_CART(this.product)
      },
    },
    mounted() {
      this.GET_PRODUCTS_FROM_API()
    }
  }
</script>

<style lang="scss">
.v-product-page__info {
  margin: 15px auto;
}
</style>
