<template>
  <div class="select">
    <p
      class="select__title"
      @click="areOptionsVisible = !areOptionsVisible"
      >{{ selected }}
    </p>
    <div
      class="select__options"
      v-if="areOptionsVisible || isExpended"
      >
      <p
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)">
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name:"OptionSelection",
  props: {
    options: {
      type: Array,
      default: () => []
    },
    selected: {
      type: String,
      default: ''
    },
    isExpended: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      areOptionsVisible: false
    }
  },
  methods: {
    selectOption(option) {
      this.$emit('select', option);
      this.areOptionsVisible = false;
    },
    hideSelect() {
      this.areOptionsVisible = false;
    }
  },
  mounted() {
    document.addEventListener('click', this.hideSelect.bind(this), true)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.hideSelect.bind(this), true)
  }
}
</script>

<style lang="scss">
  .select {
    top: 50px;
    width: 200px;
    cursor: pointer;
      p {
        margin: 0;
      }
      &__title {
        border: solid 1px #aeaeae;
        height: 30px;
        font-size: 24px;
        width: 100%;
        background-color: #e7e7e7;
      }
      &__options p {
        border: solid 1px #aeaeae;
        position: relative;
        right: 0;
        width: 100%;
        margin: 5px 0;
      }
      &__options p:hover {
        background: #e7e7e7;
      }
  }
</style>

    <!-- document.addEventListener('click', this.hideSelect.bind(this), true)
метод Function.prototype.bind() , который позволяет указать значение, которое должно быть использовано для всех вызовов данной функции.
useCapture Необязательный
Если равно true, useCapture указывает, что пользователь желает начать захват. После инициализации захвата все события указанного типа будут отправлены в зарегистрированный listener перед отправкой в какой-либо EventTarget под ним в дереве DOM -->
