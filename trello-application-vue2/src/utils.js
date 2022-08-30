export function uuid () {
  return Math.random().toString(16).slice(2)
}

// плагин для сохранения состояния
// Хранилища Vuex принимают опцию plugins, предоставляющую хуки для каждой мутации. Vuex-плагин — это просто функция, получающая хранилище в качестве единственного параметра.
// вызывается после инициализации хранилища
export function saveStatePlugin (store) {
  // вызывается после каждой мутации
  // мутация передаётся в формате `{ type, payload }`.
  store.subscribe(
    (mutation, state) => {
      localStorage.setItem(
        'board',
        JSON.stringify(state.board)
      )
    }
  )
}

// localStorage.setItem() - Если методу setItem() интерфейса Storage передать ключ и значение, то в хранилище будет добавлено соответствующее ключу значение, либо, если запись уже есть в хранилище, то значение по ключу будет обновлено. запись в локальное хранилище. Ключи и значения всегда строки (так же, как и объекты, целочисленные ключи автоматически будут преобразованы в строки).
// !!! При сохранении в localStorage при перезагрузке браузера, данные остаются

// subscribe - Отслеживание вызова мутаций хранилища. Обработчик handler вызывается после каждой мутации и получает в качестве параметров дескриптор мутации и состояние после мутации.

// Плагинам не разрешается напрямую изменять состояние приложения — как и компоненты, они могут только вызывать изменения опосредованно, используя мутации. Вызывая мутации, плагин может синхронизировать источник данных с хранилищем данных в приложении.
// Например, для синхронизации хранилища с веб-сокетом (пример намеренно упрощён, в реальной ситуации у createWebSocketPlugin были бы дополнительные опции):
//
// export default function createWebSocketPlugin(socket) {
//   return store => {
//     socket.on('data', data => {
//       store.commit('receiveData', data);
//     });
//     store.subscribe(mutation => {
//       if (mutation.type === 'UPDATE_DATA') {
//         socket.emit('update', mutation.payload);
//       }
//     });
//   };
// }
// const plugin = createWebSocketPlugin(socket);
//
// const store = new Vuex.Store({
//   state,
//   mutations,
//   plugins: [plugin]
// });