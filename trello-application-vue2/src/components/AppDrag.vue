<template>
    <!-- @click.self- вызов обработчика только в случае наступления события непосредственно  на данном элементе (то есть НЕ на дочернем компоненте)-->
  <div
    class=""
    draggable
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot/>
  </div>

</template>

<script>
export default {
  props: {
    // инф, которую хотим передавать в drag'n'drop
    transferData: {
      type: Object,
      required: true
    }
  },
  methods: {
    onDrag(ev) {
      ev.dataTransfer.effectAllowed = 'move'
      ev.dataTransfer.dropEffect = 'move'

      // приводим transferData к строке, т.к. dataTransfer передает только строки
      ev.dataTransfer.setData('payload', JSON.stringify(this.transferData))
    }
  }
}
</script>
<!-- Объект DataTransfer используется для хранения данных, перетаскиваемых мышью во время операции drag and drop
effectAllowed - Определяет эффекты, которые разрешены для этого перетаскивания.
The DataTransfer.dropEffect property controls the feedback (typically visual) the user is given during a drag and drop operation
move: Элемент может быть перемещён в новое место.

DataTransfer.setData() method sets the drag operation's drag data to the specified data and type
dataTransfer.setData(format, data);
Format - DOMString representing the type of the drag data to add to the drag object.
setData - передача данных(индекс) строкой и последующ получение в getData
-->

<style>
</style>
