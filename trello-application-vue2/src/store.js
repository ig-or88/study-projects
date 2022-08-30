import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils' // <-- Import saveStatePlugin, uuid

Vue.use(Vuex)

// записываем в board данные из localStorage или, если их там нет, из defaultBoard
const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin], // используем плагин
  state: {
    board
  },
  // add a getter to our Vuex store so we can search for the task based on the ID from the url
  getters: {
    getTask (state) {
      // получаем task  с соответствующим id из state
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    // It will receive the lists of tasks within a column, the task name/title and simply push a new task into the list of tasks. We will also use uuid that we import from our utils, to create unique IDs.
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    DEL_TASK (state, { tasks, taskDel }) {
      for (const column of state.board.columns) {
        for (const task of column.tasks) {
          if (task.id === taskDel.id) {
            tasks.splice(taskDel.id, 1);
          }
        }
      }
    },
    CREATE_COLUMN (state, { name }) {
      state.board.columns.push({
        name,
        tasks:[]
      })
    },
    DEL_COLUMN (state, { columnIndex }) {
      state.board.columns.splice(columnIndex, 1);
    },
    UPDATE_TASK (state, { task, key, value }) {
      // в зависимости от того что передается в key(name или description), обновляется соответствующее св-во
      task[key] = value
      // Vue 2!!? Vue.set( target, propertyName/index, value ) Добавление свойства к реактивному объекту, гарантируя, что новое свойство также будет реактивным и будет вызвано обновление представления
      // Vue.set(task, key, value)
    },
    MOVE_TASK (state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      // в taskMove получеам массив удаленных элементов, т.е. 1 элем
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns

      // получаем по индексу колонку, которую хотим передвинуть
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]

      // начиная с позиции toColumnIndex(куда хотим переместить), удалить 0 элем, добавить нужную колонку
      columnList.splice(toColumnIndex, 0, columnToMove)
    }
  }
})
