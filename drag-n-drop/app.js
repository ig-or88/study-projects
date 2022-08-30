const task = document.querySelector('.task');
const placeholders = document.querySelectorAll('.placeholder')

task.addEventListener('dragstart', dragstart);
task.addEventListener('dragend', dragend);

function dragstart(event) {
  event.target.classList.add('hold');
  setTimeout(() => event.target.classList.add('hide'), 0);
}

function dragend() {
  event.target.classList.remove('hold', 'hide');
  // event.target.className = 'item' //перезаписывает все классы классом item
}

for (const placeholder of placeholders) {

  placeholder.addEventListener('dragover', (event) => event.preventDefault()); // выбранный элемент находится над placeholder

  placeholder.addEventListener('dragenter', function dragenter (event) { event.target.classList.add('hovered');
  });

  placeholder.addEventListener('dragleave', (event) => event.target.classList.remove('hovered'));

  placeholder.addEventListener('drop', function dragdrop(event) {
    event.target.classList.remove('hovered');
    event.target.append(task);
  });

}

// function dragover(event) {
//   event.preventDefault();
// // console.log('drag over')
// }

// function dragenter(event) {
//   event.target.classList.add('hovered');
// }
//
// function dragleave(event) {
//   event.target.classList.remove('hovered');
// }
//
// function dragdrop(event) {
//   event.target.classList.remove('hovered');
//   event.target.append(item);
// }

// placeholder.addEventListener('dragover', (event) => event.preventDefault()) - разрешает перетаскивание

// setTimeout(() => event.target.classList.add('hide'), 0);  планирует вызов func настолько быстро, насколько это возможно. Но планировщик будет вызывать функцию только после завершения выполнения текущего кода.
