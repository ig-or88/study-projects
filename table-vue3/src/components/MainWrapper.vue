<template>
  <div class="main-wrapper">
    <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
    </router-view>
  </div>
</template>

<script>
  import HomePage from "./views/HomePage.vue";

  export default {
    name: 'MainWrapper',
    components: {
      HomePage
    },
    data() {
      return {}
    }
  }
</script>

<style>
  .main-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
