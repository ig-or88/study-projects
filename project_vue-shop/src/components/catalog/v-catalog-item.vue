<template>
  <div class="v-catalog-item">

    <v-popup
      v-if="isInfoPopupVisible"
      leftBtnTitle="В корзину"
      :popupTitle="product_data.name"
      @closePopup="closeInfoPopup"
      @leftBtnAction="addToCart"
      >
      <img
        class="v-popup__image"
        :src=" require('../../assets/images/' + product_data.image) "
        alt="img">
        <div>
          <p class="v-catalog-item__name">{{product_data.name}}</p>
          <p class="v-catalog-item__price">Price: {{ $filters.toFix(product_data.price) }} Р</p>
          <p class="v-catalog-item__price">{{product_data.category}}</p>
        </div>
    </v-popup>

    <img
      class="v-catalog-item__image"
      :src=" require('../../assets/images/' + product_data.image) "
      alt="img"
      @click="productClick">
    <p class="v-catalog-item__name">{{product_data.name}}</p>
    <p class="v-catalog-item__price">Цена: {{ $filters.toFix(product_data.price) }} Р</p>
    <div class="btn-block">
      <button
        class="btn"
        id="show-info"
        @click="showPopupInfo"
        >
        Информация
      </button>
      <button
        class="btn"
        @click="addToCart"
        >В корзину
      </button>
    </div>
  </div>
</template>

<script>
import vPopup from '../popup/v-popup'

  export default {
    name: 'v-catalog-item',
    components: {
      vPopup
    },
    //  получение данных из родителя
    props: {
      product_data: {
        type: Object,
        //  состояние до получения данных:
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        isInfoPopupVisible: false
      }
    },
    // filters: {
    //   toFix
    // },
    computed: {},
    methods: {
      productClick() {
        this.$emit('productClick', this.product_data.article)
      },
      showPopupInfo() {
        this.isInfoPopupVisible = true;
      },
      closeInfoPopup() {
        this.isInfoPopupVisible = false;
      },
      addToCart() {
        //генерируем событие и передаем данные в родительский компонент с помощю this.$emit
        this.$emit( 'addToCart', this.product_data )
      },
      // toFix(value) {
      //     value = parseFloat(value); // преобразовываем строку в число
      //     return value.toFixed(2); // обрезается до 2-х знаков после запятой
      // },
    },
  }
</script>

<style lang="scss">
  .v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;
    &__image {
      width: 140px;
    }
  }
  .btn-block {
    display: flex;
    justify-content: space-around;
  }
  #show-info {
    background-color: rgb(84, 199, 140);
  }
</style>

<!-- :src=" require('../assets/images/' + product_data.image) "
alt="img"> - без require картинки не отображаются-->
