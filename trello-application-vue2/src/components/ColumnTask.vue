<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="task"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex
      }"

    >
      <div class="w-full" @click="goToTask(task)">
        <span class="w-full flex-no-shrink font-bold">
          {{ task.name }}

        </span>
        <p
          v-if="task.description"
          class="w-full flex-no-shrink mt-1 text-sm">
          {{ task.description }}
        </p>
      </div>
      <div>
        <button
          type="button"
          name="button"
          @click="delTask($event, column.tasks)">
          <svg width="16px" height="16px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="close"><rect width="18" height="18" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" fill="grey"/></g></g></svg>
        </button>
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin.js'
import AppDrag from './AppDrag.vue'
import AppDrop from './AppDrop.vue'

export default {
  components: {
    AppDrag,
    AppDrop
  },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    },
    // используем в Примеси
    // board: {
    //   type: Object,
    //   required: true
    // },
    // column: {
    //   type: Object,
    //   required: true
    // },
    // columnIndex: {
    //   type: Number,
    //   required: true
    // }
  },
  methods: {
    // переход к модальному окну с задачей
    goToTask(task) {
      this.$router.push({ name: 'task', params: { id: task.id} })
    },
    delTask($event, tasks) {
      this.$store.commit('DEL_TASK', {
        tasks,
        taskDel: this.task
      })
    },

    // pickupTask(ev, taskIndex, fromColumnIndex) {
    //   ev.dataTransfer.effectAllowed = 'move'
    //   ev.dataTransfer.dropEffect = 'move'
    //
    //   // записали индекс задча и колонок для идентификации в getData
    //   ev.dataTransfer.setData('from-task-index', taskIndex)
    //   ev.dataTransfer.setData('from-column-index', fromColumnIndex)
    //
    //   // записали тип данных для перемещения задач дл идентификации
    //   ev.dataTransfer.setData('type', 'task')
    //   // ev.dataTransfer.setData('text/plain', taskIndex)
    //   // ev.dataTransfer.setData('text/plain', fromColumnIndex)
    // },

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
  }
}
</script>

<style>
.task {
  @apply flex items-center justify-between shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
