<template>
  <div class="v-bottom-nav">
    <!-- использование компонента vAppLink в качестве замены для router-link при навигации по внутренним и внешним ссылкам -->
    <vAppLink :to="{ name: 'contacts' }">
      <i class="material-icons">person_pin</i>
    </vAppLink>
    <vAppLink :to="{ name: 'chats' }">
      <i class="material-icons">chat</i>
    </vAppLink>

    <!-- <vAppLink to="https://vueschool.io">Vue School
    </vAppLink> -->

    <!-- <router-link :to="{ name: 'settings' }">
      <i class="material-icons">settings</i>
    </router-link>
    <router-link :to="{ name: 'call' }">
      <i class="material-icons">call</i>
    </router-link>
    <router-link :to="{ name: 'home' }">
      <i class="material-icons">home</i>
    </router-link> -->
  </div>
</template>

<script>
export default {
  name: "v-bottom-nav",
  data() {
    return {}
  }
}
</script>
<style lang="scss">
</style>
