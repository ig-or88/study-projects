<template>
  <div class="v-users-list">
    <!-- <router-link :to="{ name: 'chats' }">
      <i class="material-icons">chat</i>
    </router-link> -->
    <v-user
      v-for="chat in chats"
      :key="chat.id"
      :user_data="chat"
    />
  </div>
</template>

<script>
  import vUser from './v-user';

  export default {
    name: "v-users-list",
    props: {},
    components: {
      vUser
    },
    data() {
      return {}
    },
    methods: {
    },
    computed: {
      // вычисляемое свойство вместо ...mapState
      chats() {
        return this.$store.state.chats
      }
    },
    created() {
      // dispatch вместо ...mapActions. может напрямую вызывать action или mutation
      this.$store.dispatch('FETCH_CHATS').catch(error => {
        this.$router.push({
          name: 'ErrorDisplay',
          params: { error: error }
        })
      })
    },
  }

</script>

<style lang="scss">
</style>
