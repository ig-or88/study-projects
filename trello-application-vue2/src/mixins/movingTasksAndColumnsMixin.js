// Примеси (mixins) — инструмент для повторного использования кода в компонентах Vue. В объекте примеси могут содержаться любые опции компонентов. При использовании примеси в компоненте все её опции будут «подмешиваться» к опциям компонента.
export default {
  props: {
    board: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    moveTaskOrColumn(transferData) {
      // если тип данных переданный в начале перемещения = task, используме метод moveTask()
      if (transferData.type === 'task') {
        // если тип task, то передается taskIndex, если нет то columnIndex из transferData
        this.moveTask(transferData)
      } else {
        this.moveColumn(transferData)
      }
    },

    moveTask({ fromColumnIndex, fromTaskIndex}) {
      const fromTasks = this.board.columns[fromColumnIndex].tasks

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTaskIndex,
        toTasks: this.column.tasks,
        // примесь берет taskIndex из используемого компонента
        toTaskIndex: this.taskIndex
      })
    },

    // деструктуризацией получаем fromColumnIndex из transferData
    moveColumn({ fromColumnIndex }) {
      this.$store.commit('MOVE_COLUMN' , {
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      })
    },
  }
}
