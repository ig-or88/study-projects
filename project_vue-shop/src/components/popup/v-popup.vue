<template>
  <div class="popup_wrapper" ref="popup_wrapper">
    <div class="v-popup">
      <span class="close-icon">
        <i
        class="material-icons"
        @click="closePopup"
        >close</i>
      </span>
        <div class="v-popup__content">
          <slot></slot>
        </div>
      <div class="v-popup__footer">
        <button
          class="submit__btn btn"
          @click="leftBtnAction"
        >{{ leftBtnTitle }}</button>
        <button
          class="btn"
          id="close_modal"
          @click="closePopup"
        >Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref, onMounted } from 'vue'

export default {
  name: 'v-popup',
  props: {
    popupTitle: {
      type: String,
      default: 'Popup name'
    },
    leftBtnTitle: {
      type: String,
      default: 'Ok'
    }
  },
  data() {
    return {}
  },
  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
    leftBtnAction() {
      this.$emit('leftBtnAction')
    }
  },
  mounted() {
    document.addEventListener('click', item => {
      if (item.target === this.$refs['popup_wrapper']) {
        this.closePopup()
      }
    })
  }

  // ?:
  // setup() {
  //      const root = ref(null)
  //
  //      mounted(() => {
  //        document.addEventListener('click', item => {
  //            if (item.target !== root.value) {
  //              this.closePopup()
  //            }
  //          })
  //      })
  //      return {
  //        root
  //      }
  //    }
}
</script>

<style lang="scss">
.popup_wrapper {
  background: rgba(64,64,64, .4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}
.v-popup {
  padding: 16px;
  position: fixed;
  width: 500px;
  height: 500px;
  background: #fff;
  box-shadow: 0 0 17px 0 #e7e7e7;
  z-index: 5;
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px;
  }
  &__content {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  &__image {
    width: 270px;
  }
}
#close_modal {
  background: red;
}
.close-icon {
  position: absolute;
  right: 2px;
  top: 2px;
}
</style>
