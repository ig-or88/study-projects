<template>
  <div class="table-row">
    <div class="row row__name">{{ row_data.name }}</div>
    <div class="row row__quantity">{{ row_data.quantity }}</div>
    <div class="row row__distance">{{ row_data.distance }}</div>
    <div class="row row__date">{{ row_data.date }}</div>
  </div>
</template>

<script>
export default {
  name: "TableRow",
  props: {
    row_data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
.table-row {
  display: flex;
  justify-content: space-around;
}
.row {
  flex-basis: 25%;
  padding: 8px 16px;
  text-align: center;
  border-bottom: solid 1px #e7e7e7;
}
</style>
