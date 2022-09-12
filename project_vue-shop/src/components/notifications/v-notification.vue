<template>
  <div class="v-notification">

    <transition-group
      name="v-transition-animate"
      class="v-notification__messages_list"
      tag="span">
      <div
        class="v-notification__content"
        v-for="message in messages"
        :key="message.id"
        :class="message.icon"
      >
        <div class="content__text">
          Товар
          <span class="content__name">{{ message.name }}</span>
          добавлен в корзину
          <i class="material-icons">{{ message.icon }}</i>
        </div>
        <div class="content__buttons">
            <button v-if="rigthButton.length">{{ rigthButton }}</button>
            <button v-if="leftButton.length">{{ leftButton }}</button>
        </div>
      </div>
    </transition-group>

  </div>
</template>

<script>
export default {
  name: "v-notification",
  props: {
    messages: {
      type: Array,
      default: () => {
        return []
      }
    },
    rigthButton: {
      type: String,
      default: ''
    },
    leftButton: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      // notifMessages: this.messages
    }
  },
  // methods: {
  //   hideNotifications() {
  //     if (this.notifMessages.length) {
  //       setTimeout( () => {
  //         this.notifMessages.splice(this.notifMessages.length - 1, 1);
  //       }, 10000)
  //     }
  //   },
  // },
  // наблюдение за состоянием notifMessages с последующим вызовом функции
  // watch: {
  //   notifMessages:{
  //     handler(){
  //         this.hideNotifications()
  //     },
  //     deep: true
  //   }
  // },
  // mounted() {
  //   // вызываем hideNotifications() при появлении компонента
  //   this.hideNotifications()
  // }

}
</script>

<style lang="scss">
.v-notification {
  position: fixed;
  top: 120px;
  right: 16px;
  z-index: 10;
  &__content {
    padding: 16px;
    border-radius: 4px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    margin-bottom: 16px;
    width: 400px;
  }
  // &__messages_list {
  //   display: flex;
  //   flex-direction: column-reverse;
  // }
  & .error {
    background: red;
  }
  & .warning {
    background: orange;
  }
  & .done {
    background: #d9d73f;
  }
}
.content {
  &__text {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__name {
    padding: 0 5px;
    color: rgb(193, 32, 27);
    font-weight:bold;
  }

}
// .material-icons {
//   margin-left: 16px;
// }
.v-transition-animate {
  &-enter-from {
    transform: translateX(120px);
    opacity: 0;
  }
  &-enter-active {
    transition: all .6s ease;
  }
  &-enter-to {
    opacity: 1;
  }
  &-leave-from {
    height: 50px;
    opacity: 1;
  }
  &-leave-active {
    /* Применить к 3 свойствам.
    height .6s .2s - имя свойства | длительность | задержка */
    transition: transform .6s ease, opacity .6s, height .6s .2s;
  }
  &-leave-to {
    height: 0;
    transform: translateX(120px);
    opacity: 0;
  }
  &-move {
    transition: transform 0.6s ease;
  }
}
</style>
