<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
    <!-- <div
      class="column"
      draggable
      @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
      @dragover.prevent
      @dragenter.prevent
      @dragstart.self="pickupColumn($event, columnIndex)"
    > -->
      <div class="flex justify-between items-center mb-2 font-bold">
        {{ column.name }}
        <button
          type="button"
          name="button"
          @click="delColumn(columnIndex)">
          <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" fill="rgba(204, 32, 32, 0.88)"/></g></g></svg>
        </button>
      </div>
      <div class="list-reset">

        <ColumnTask
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :task="task"
          :taskIndex="$taskIndex"
          :column="column"
          :columnIndex="columnIndex"
          :board="board"
        />

        <input
          class="block p-2 w-full bg-transparent"
          type="text"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
        >
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import ColumnTask from './ColumnTask.vue'
import AppDrag from './AppDrag.vue'
import AppDrop from './AppDrop.vue'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin.js'

export default {
  components: {
    ColumnTask,
    AppDrag,
    AppDrop
  },
  mixins: [movingTasksAndColumnsMixin],
  // используем в Примеси
  // props: {
  //   board: {
  //     type: Object,
  //     required: true
  //   },
  //   column: {
  //     type: Object,
  //     required: true
  //   },
  //   columnIndex: {
  //     type: Number,
  //     required: true
  //   }
  // },
  methods: {
    // используем в Примеси
    // moveTaskOrColumn(ev, toTasks, toColumnIndex, toTaskIndex) {
    //   const type = ev.dataTransfer.getData('type')
    //   // если тип данных переданный в начале перемещения = task, используме метод moveTask()
    //   if (type === 'task') {
    //     // если toTaskIndex известен, то передаем его, но если перетаскиваем task просто на колонку, тогда передаем длину списка задач и task добавляется в конец
    //     this.moveTask(ev, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length )
    //   } else {
    //     this.moveColumn(ev, toColumnIndex)
    //   }
    // },
    // moveTask(ev, toTasks, toTaskIndex) {
    //   const fromColumnIndex = ev.dataTransfer.getData('from-column-index')
    //   const fromTasks = this.board.columns[fromColumnIndex].tasks
    //   const fromTaskIndex = ev.dataTransfer.getData('from-task-index')
    //   this.$store.commit('MOVE_TASK', {
    //     fromTasks,
    //     fromTaskIndex,
    //     toTasks,
    //     toTaskIndex
    //   })
    // },
    // moveColumn(ev, toColumnIndex) {
    //   const fromColumnIndex = ev.dataTransfer.getData('from-column-index')
    //
    //   this.$store.commit('MOVE_COLUMN' , {
    //     fromColumnIndex,
    //     toColumnIndex
    //   })
    // },
    pickupColumn(ev, fromColumnIndex) {
      ev.dataTransfer.effectAllowed = 'move'
      ev.dataTransfer.dropEffect = 'move'

      ev.dataTransfer.setData('from-column-index', fromColumnIndex)
      ev.dataTransfer.setData('type', 'column')
    },
    createTask(ev, tasks, taskIndex) {
      // вызов мутации напрямую, без action
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: ev.target.value
      })
      ev.target.value = ''
    },
    delColumn(columnIndex) {
      this.$store.commit('DEL_COLUMN', { columnIndex })
    }
  }
}
</script>

<style>
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

</style>
