<template>
  <div class="protected-page">
    <h1>Greetings, {{username}}</h1>
    <div class="greeting-block">
      <button class="logout-btn" @click="logout">Logout</button>
      <router-link :to="{ name: 'home' }">
        <button><i class="material-icons home-btn">home</i></button>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: window.user
      }
    },
    methods: {
      logout() {
        window.user = null;
        this.$router.push({name: "contacts"});

        // заменяет текущее вхождение в histiry stack, а не создает новое
        // this.$router.replace({name: "contacts"})
      }
    }
  }
</script>
