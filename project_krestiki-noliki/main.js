let move = 0;
let result = '';
let area = document.querySelector('#area');
let currentPlayer = document.querySelector('#currPlayer');
let contentWrapper = document.querySelector('#content');
let modalResult = document.querySelector('.modal-result-wrapper');
let overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('#btn-close');
const btnReset = document.querySelector('#btn-reset');
let boxes = document.querySelectorAll('.box');

area.addEventListener('click', (e) =>{
  if(!e.target.innerHTML) {
    e.target.innerHTML = currentPlayer;
  } else {
    alert("Эта ячейка занята! Выберите пустую.")
    return;
  }

  if(currentPlayer.innerHTML === 'Х') {
    currentPlayer.innerHTML = '0';}
    else {
      currentPlayer.innerHTML = 'Х'
    }

  if(e.target.className == 'box') {
    move % 2 === 0 ? e.target.innerHTML = 'Х' : e.target.innerHTML = '0';
    move % 2 === 0 ? e.target.style.backgroundColor = 'rgba(161, 12, 233, 0.4)' : e.target.style.backgroundColor = 'rgba(210, 155, 67, 0.4)';
    move++;
    check();
  }
});

function check() {
  const arr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(i = 0; i < arr.length; i++) {
    if(
      boxes[arr[i][0]].innerHTML == 'Х' &&
      boxes[arr[i][1]].innerHTML == 'Х' &&
      boxes[arr[i][2]].innerHTML == 'Х'
    ) {
        result = 'Победили крестики!';
        stat.x++;
        prepareResult(result);
      }

    else if (
      boxes[arr[i][0]].innerHTML == '0' &&
      boxes[arr[i][1]].innerHTML == '0' &&
      boxes[arr[i][2]].innerHTML == '0'
    ) {
        result = 'Победили нолики!';
        stat.o++;
        prepareResult(result);
    }

    else if (move == 9) {
        result = 'Ничья !';
        stat.d++;
        prepareResult(result);
    }
  }
}

const prepareResult = result => {
  contentWrapper.innerHTML = `${result}`;
  modalResult.style.display = 'block';
  updateStat();
  move = 0;
  currentPlayer.innerHTML = 'Х'
}

const closeModal = () => {
  modalResult.style.display = 'none';
  for(let i = 0; i < boxes.length; i++) {
      boxes[i].innerHTML = '';
      boxes[i].style.backgroundColor = '#e6f1f4';
      }
}

overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);
btnReset.addEventListener('click', reload_func);

function reload_func() {
  if(confirm('Вы действительно хотите обновить страницу?')){
    setTimeout(() => location.reload(), 500)
  }
}

let stat = {
  'x': 0,
  'o': 0,
  'd': 0
}
function updateStat() {
    document.getElementById('statX').innerHTML = stat.x;
    document.getElementById('statO').innerHTML = stat.o;
    document.getElementById('statD').innerHTML = stat.d;
}
