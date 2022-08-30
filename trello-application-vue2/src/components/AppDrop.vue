<template>
    <!-- @drop.stop - останавливаем всплытие события -->
  <div
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot/>
  </div>
</template>

<script>
export default {
  methods: {
    onDrop(ev) {
      // трансформируем в объект полученную в процессе drag'n'drop строку
      const transferData = JSON.parse(ev.dataTransfer.getData('payload'))

      // передаем родителю событие drop с нагрузкой
      this.$emit('drop', transferData)
    }
  }
}
</script>

<style>
</style>
