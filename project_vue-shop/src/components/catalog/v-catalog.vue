<template>
  <div class="v-catalog">

    <v-notification
      :messages="messages"
    />

    <h1>Каталог</h1>

    <div class="v-catalog__wrapper">

        <div class="filters">
          <v-select
            :selected="selected"
            :options="categories"
            @select="sortByCategories"
            :isExpended="IS_DESKTOP"
          ></v-select>

          <div class="range-slider">
            <input
              class="slider-min"
              type="range"
              min="0"
              max="10000"
              step="100"
              v-model.number="minPrice"
              @change="setRangeSlider"
              >
            <input
              class="slider-max"
              type="range"
              min="0"
              max="10000"
              step="100"
              v-model.number="maxPrice"
              @change="setRangeSlider"
              >
          </div>
          <div class="range-values">
            <p>Min: {{minPrice}}</p>
            <p>Max: {{maxPrice}}</p>
          </div>
        </div>

      <div class="v-catalog__list">
        <v-catalog-item
          class="v-catalog__item"
          v-for="product in filteredProducts"
          :key="product.article"
          :product_data="product"
          @addToCart="addToCart"
          @productClick="productClick"
          />
      </div>

    </div>
  </div>
</template>

<script>
  // пробрасываем в компонент v-catalog actions и getters из store
  import {mapActions, mapGetters} from 'vuex';
  import vCatalogItem from './v-catalog-item.vue';
  import vSelect from '../v-select.vue'
  import vNotification from '../notifications/v-notification.vue'

  export default {
    name: 'v-catalog',
    components: {
      vCatalogItem,
      vSelect,
      vNotification,
    },
    props: {},
    data() {
      return {
        categories: [
          {name: 'Все', value: 'ALL' },
          {name: 'Мужская', value: 'м' },
          {name: 'Женская', value: 'ж' },
        ],
        selected: 'Все',
        sortedProducts: [],
        minPrice: 0,
        maxPrice: 10000,
        messages: [],
      }
    },
    computed: {
      // Функция mapGetters проксирует геттеры хранилища в локальные вычисляемые свойства компонента. Получили нужный геттер
      ...mapGetters([
        'PRODUCTS',
        // 'CART',
        'IS_DESKTOP',
        'SEARCH_VALUE'
      ]),
      filteredProducts() {
        if (this.sortedProducts.length) {
          return this.sortedProducts
        } else {
          // return this.PRODUCTS
          return []
        }
      }
    },
    methods: {
      //  Диспетчеризация действий в компонентах, чтобы можно было использ this.GET_PRODUCTS_FROM_API()
      ...mapActions([
        'GET_PRODUCTS_FROM_API',
        'ADD_TO_CART'
      ]),
      productClick(article) {
        // передаем в путь роутера объект с ключом product и значением article
        this.$router.push({name: 'product', query: { 'product': article } })
      },
      setRangeSlider() {
        if(this.minPrice > this.maxPrice) {
          let tmp = this.maxPrice;
          this.maxPrice = this.minPrice;
          this.minPrice = tmp;
        }
        this.sortByCategories();
      },
      sortByCategories(category) {
        this.sortedProducts = [...this.PRODUCTS];
        if(category) {
          this.selected = category.name;
        }
        this.sortedProducts = this.sortedProducts.filter( item => {
          return item.price >= this.minPrice && item.price <= this.maxPrice;
        })
        if (this.selected !== 'Все') {
          this.sortedProducts = this.sortedProducts.filter((product) => {
          return product.category === this.selected;
          })
        }
      },
      sortBySearch(value) {
        this.sortedProducts = [...this.PRODUCTS];
        if (value) {
          this.sortedProducts = this.sortedProducts.filter( item => {return item.name.toLowerCase().includes(value.toLowerCase())
          })
        } else {
          this.sortedProducts = this.PRODUCTS;
        }

      },
      addToCart(data) {
        this.ADD_TO_CART(data)
        .then(() => {
          // let timeStamp = Date.now().toLocaleString();
          this.messages.unshift(
            // { name: timeStamp, icon: 'done', id: timeStamp }
            { name: data.name, icon: 'done' }
          )
        });
        this.hideNotifications()
      },
      hideNotifications() {
          setTimeout( () => {
            this.messages.splice(this.messages.length - 1, 1)
          }, 5000)
      },
      // sortByCategories(category) {
      //   this.sortedProducts = [];
      //   this.PRODUCTS.map((item) => {
      //     if(item.category === category.name) {
      //       this.sortedProducts.push(item);
      //     }
      //   })
      //   this.selected = category.name;
      // }
    },
    watch: {
      SEARCH_VALUE: {
        handler(){
            this.sortBySearch(this.SEARCH_VALUE)
        }
      }
    },
    mounted() {
      this.GET_PRODUCTS_FROM_API()
      .then((response) => {
        if(response.data) {
          console.log('Data arrived!');
          this.sortByCategories();
          this.sortBySearch(this.SEARCH_VALUE);
        }
      })
    }
  }
</script>

<style lang="scss">
.v-catalog {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  &__item {
    margin: 20px;
  }
  &__wrapper {
    display: flex;
  }
}
.filters {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 250px;
}
.range-slider {
  width: 100%;
  margin: auto 16px;
  text-align: center;
  position: relative;
}
.range-slider svg, .range-slider input[type=range] {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 200px;
}
.range-values {
  display: flex;
  justify-content: space-around;
  width: 200px;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  z-index: 2;
  position: relative;
  top: 2px;
  margin-top: -7px;
  cursor: pointer;
}
// input[type=range]::-webkit-slider-runnable-track {
  // background: rgb(170, 217, 92);
// }
input[type=range]::-moz-range-thumb {
  z-index: 10;
  position: relative;
  top: 2px;
  margin-top: -7px;
  cursor: pointer;
}
input[type=range]::-moz-range-track {
  z-index: 1;
}
</style>

<!-- this$store.state.products - доступ к хранилищу через this$store -->
