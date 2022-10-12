<template>
  <div class="home-page">
    <h1>Home Page</h1>
    <p>
      <router-link :to="{ name: 'table' }">
        <i class="material-icons table-icon">table_rows</i>
      </router-link>
    </p>
  </div>

</template>

<script>

  export default {
    name: "HomePage",
    components: {
    },
    data() {
      return {}
    }
  }
</script>

<style lang="scss">
.material-icons.table-icon {
  font-size: 32px;
  color: black;
}

</style>
