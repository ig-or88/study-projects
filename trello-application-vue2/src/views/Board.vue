<template>
  <div class="board">
    <div class="flex flex-row items-start">

      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
      />

      <div class="column flex">
        <input
          type="text"
          class="p-2 mr-2 flex-grow"
          placeholder="New Column Name"
          v-model="newColumnName"
          @keyup.enter="createColumn"
        >
      </div>

    </div>
    <!-- @click.self- вызов обработчика только в случае наступления события непосредственно  на данном элементе (то есть не на дочернем компоненте)-->
    <div
      class="task-bg"
      v-if="isTaskOpen"
      @click.self="close"
    >
      <router-view/>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '@/components/BoardColumn.vue'

export default {
  components: { BoardColumn },
  data() {
    return {
      newColumnName: ''
    }
  },
  computed: {
    ...mapState(['board']),
    // возвращает название маршрута, если равно task
    isTaskOpen() {
      return this.$route.name === 'task'
    }
  },
  methods: {
    close() {
      this.$router.push({ name: 'board' })
    },
    createColumn() {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName
      })

      this.newColumnName = ''
    }
  }
  // beforeCreate() {
  //     localStorage.clear()
  // }
}
</script>

<style>
.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
