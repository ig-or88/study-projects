<template>
  <div class="v-header">
    <div class="v-header__wrapper">
      <div
        class="v-header__back"
        v-if="!isCoreRoute"
        @click="goBack"
        >
        <i class="material-icons">keyboard_arrow_left</i>
        <span>Back</span>
      </div>
      <div class="v-header__login">
        <router-link :to="{ name: 'protected' }">
          <i class="material-icons">login</i>
        </router-link>
      </div>
    </div>

    <div
      class="v-header__user-info"
      v-if="!isCoreRoute && this.$route.path != '/login'"
      >
      <span>{{ currentUserChat.name }}</span>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: "v-header",
    data() {
      return {}
    },
    methods: {
      // возвращение на позицию назад в роутере
      goBack() {
        this.$router.go(-1);
        // this.currentUserChat.name = ''
      }
    },
    computed: {
      ...mapState([
        'currentUserChat'
      ]),
      isCoreRoute() {
        return this.$route.path === '/' || this.$route.path === '/chats'
      }
    },
  }
</script>
<style lang="scss">
//
</style>
