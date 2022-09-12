<template>
  <!-- <router-link :to="{ name: 'user', params: {id: user_data.id}}"> -->
    <div class="v-user" @click="toUserChat">

      <div class="v-user__avatar"></div>
      <div class="v-user__name">
        <p class="info__name">{{ user_data.name }}</p>
        <p class="info__last-message">{{ user_data.chat[user_data.chat.length-1].text }}</p>
      </div>
      <div class="v-user__time">{{ user_data.chat[user_data.chat.length-1].time }}</div>

    </div>
  <!-- </router-link> -->
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: "v-user",
    components: {},
    props: {
      user_data: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {}
    },
    methods: {
      ...mapActions([
        'SET_USER_TO_HEADER'
      ]),
      toUserChat() {
        this.SET_USER_TO_HEADER(this.user_data);
        // переход на маршрут с именем user с передачей параметров
        this.$router.push({
          name: 'user',
          params: {
            id: this.user_data.id,
            login: this.user_data.name
          },
          // query: { 'id': this.user_data.id }
        })
      }
    },
    computed: {},
  }

</script>

<style lang="scss">
</style>
