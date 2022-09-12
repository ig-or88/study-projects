<template>
  <!-- для внешних ссылок -->
  <a
    class="external-link"
    v-if="isExternal"
    target="_blank"
    rel="noopener"
    :href="to"><slot/>
  </a>

    <!-- для внутренних ссылок -->
  <router-link
    class="internal-link"
    v-else v-bind="$props"
    ><slot/>
  </router-link>
</template>

<script>
import {RouterLink} from 'vue-router'

export default {
  // получает все props от router
  props:{
    ...RouterLink.props
  },
  computed:{
    isExternal(){
      return typeof this.to === 'string' && this.to.startsWith('http')
    }
  }
}
</script>

<!--
  target="_blank" - открывает в новом окне
  rel="noopener" - доп безопасность
 -->
