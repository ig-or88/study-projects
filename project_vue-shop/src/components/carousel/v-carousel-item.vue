<template>
  <div class="v-carousel-item" :style="{ 'min-width': width + 'px' }">
    <img
      class="v-carousel-img"
      :src=" require('../../assets/images/' + item_data.img)"
      alt=""
      v-if="imageSlide">
    <div class="item__content" v-else>
      <!-- <p>{{ item_data.name }}</p>
      <p>{{ item_data.id }}</p> -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-carousel-item",
  props: {
    item_data: {
      type: Object,
      default: () => {}
    },
    imageSlide: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.v-carousel-item {
  max-height: 700px;
}
.v-carousel-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
