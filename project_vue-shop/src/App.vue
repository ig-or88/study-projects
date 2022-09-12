<template>
  <div id="app">
  </div>
  <v-main-wrapper/>
</template>

<script>
import vMainWrapper from './components/v-main-wrapper.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "App",
  components: {
    vMainWrapper
  },
  computed: {
    ...mapGetters([
      'IS_MOBILE',
      'IS_DESKTOP'
    ])
  },
  methods: {
    ...mapActions([
      'SET_MOBILE',
      'SET_DESKTOP'
    ])
  },
  mounted() {
    window.addEventListener( 'resize', () => {
      if(window.innerWidth > 767) {
        this.SET_DESKTOP();
        console.log('Desktop', this.IS_DESKTOP)
      } else {
        this.SET_MOBILE();
        console.log('Mobile', this.IS_MOBILE)
      }
    })
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 140px;
}
</style>
