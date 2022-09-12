<template>
  <div class="v-main-wrapper">
    <v-header/>
    <!-- <router-view :key="$route.path"></router-view> -->
    <router-view v-slot="{Component}">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>
    <v-bottom-nav/>
  </div>
</template>

<script>
  import vHeader from './layouts/v-header.vue'
  import vBottomNav from './layouts/v-bottom-nav.vue'

  export default {
    name: "v-main-wrapper",
    components: {
      vHeader,
      vBottomNav
    },
    data() {
      return {}
    }
  }
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
