<template>
  <div class="wrapper">
    <div
      class="v-carousel"
      :style="{ 'margin-left': '-' + (100 * currentSlideIndex) + '%' }"
    >
      <v-carousel-item
        v-for="item in carousel_data"
        :key="item.id"
        :item_data="item"
        :imageSlide="true"
        :width="slideWidth"
        >
        <!-- передаем в slot: -->
        <p>{{ item.name }}</p>
        <p>{{ item.id }}</p>
        </v-carousel-item>
    </div>
    <button class="btn-slider btn-prevSlide" @click="prevSlide">
      <img src="../../assets/arrow-black-left.svg" alt="">
    </button>
    <button class="btn-slider btn-nextSlide" @click="nextSlide">
      <img src="../../assets/arrow-black-right.svg" alt="">
    </button>
  </div>
</template>

<script>
  import vCarouselItem from "./v-carousel-item.vue";

  export default {
    name: "v-carousel",
    components: {
      vCarouselItem
    },
    props: {
      carousel_data: {
        type: Array,
        default() {
          return []
        }
      },
      interval: {
        type: Number,
        default: 0
      },
      slideWidth: {
        type: Number,
        default: 300,
      }
    },
    data() {
      return {
        currentSlideIndex: 0
      }
    },
    methods: {
      prevSlide() {
        if (this.currentSlideIndex > 0) {
          this.currentSlideIndex--
        }
      },
      nextSlide() {
        if (this.currentSlideIndex >= this.carousel_data.length - 1) {
          this.currentSlideIndex = 0;
        } else {
          this.currentSlideIndex++
        }
      },
    },
    mounted() {
      if (this.interval > 0) {
        setInterval( () => this.nextSlide(), this.interval)
      }
    }
  }
</script>

<style lang="scss">
  .wrapper {
    max-width: 450px;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
  .v-carousel {
    display: flex;
    transition: all ease .5s;
  }
  .btn-slider {
    position: absolute;
    top: 50%;
    background-color: transparent;
    border-style: none;
    margin: 0;
    padding: 0;
    z-index: 5;
    cursor: pointer;
  }
  .btn-prevSlide {
    left: 0;
  }
  .btn-nextSlide {
    right: 0;
  }
</style>
