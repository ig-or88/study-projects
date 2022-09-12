<template>
  <div class="v-main-page">
    <p class="v-main-page_title">
      <router-link :to="{ name: 'vCatalog' }">
        Каталог
      </router-link>
    </p>

    <v-carousel
      :carousel_data="sliderItem"
      :interval="3000"
      :slideWidth="450"
    />
  </div>
</template>

<script>
  import vCarousel from "../carousel/v-carousel.vue";
  export default {
    name: "v-main-page",
    components: {
      vCarousel
    },
    data() {
      return {
        sliderItem: [
          { id: 1, name: 'img1', img: '1.jpg'},
          { id: 2, name: 'img2', img: '2.jpg'},
          { id: 3, name: 'img3', img: '3.jpg'},
          { id: 4, name: 'img4', img: '4.jpg'},
          { id: 5, name: 'img5', img: '5.jpg'},
        ]
      }
    },
  }
</script>

<style lang="scss">
.v-main-page_title {
  font-size: 24px;
}
</style>
