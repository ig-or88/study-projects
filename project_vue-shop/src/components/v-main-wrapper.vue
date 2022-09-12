<template>
  <div class="v-main-wrapper">
    <v-header/>
    <!-- keep-alive - кеширование состояния компонента -->
    <!-- component - «Мета-компонент» для отрисовки динамических компонентов -->
    <!-- <keep-alive><router-view></router-view></keep-alive> -->
    <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
    </router-view>
      <!-- <p>{{title}}</p>
    <v-catalog/>
    <v-cart
      v-if="CART.length"
      :cart_data="CART"
    /> -->
  </div>
</template>

<script>
  import vHeader from "./layouts/v-header.vue";

  export default {
    name: 'v-main-wrapper',
    components: {
      vHeader
    },
    props: {},
    data() {
      return {
        title: 'Main wrapper'
      }
    },
    computed: {},
    methods: {},
    watch: {}
  }
</script>

<style>
  .v-main-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
