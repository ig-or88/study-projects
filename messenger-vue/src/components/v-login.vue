<template>
  <div class="login-page">
    <form @submit.prevent="login">
      <h1>Login</h1>
      <div class="login-form_wrapper">
        <div class="username-block">
          <label for="username">username</label>
          <input v-model="username" type="text" name="username">
        </div>
        <div class="password-block">
          <label for="password">password</label>
          <input v-model="password" type="text" name="password">
        </div>
      </div>
      <button class="login-btn">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login(){
      window.user = this.username;
      const redirectPath = this.$route.query.redirect || '/protected';
      this.$router.push(redirectPath)
    }
  }
}

</script>
