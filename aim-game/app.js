const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const btnNewGame = document.querySelector('#btn-new-game');
let currentCountNumber = document.querySelector('#currentCountNumber');
let currentCount = document.querySelector('.currentCount');
let time = 0;
let score = 0;

// по клику на startBtn переходим на след экран
startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
})

// по клику на timeList переходим на след экран и вызываем startGame()
timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time')); // получаем целое число из атрибута data-time
    screens[1].classList.add('up');
    startGame();
  }
})

// при клике по объекту с классом circle увеличиватся счет, создается новая мишень
board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  } else {
    score--;
  }
  currentCountNumber.innerHTML = score;
})

// запускаем функции установки времени, создания мишени, отсчитывания времени
function startGame() {
  setTime(time);
  createRandomCircle();
  setInterval(decreaseTime, 1000);
  }

// устанавливаем время
  function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
  }

// отсчитываем секунды
function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function finishGame() {
  timeEl.parentNode.classList.add('hide'); // удаляем родителя timeEl
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
  btnNewGame.style.display = 'block';
  currentCount.style.display = 'none';
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const {width, height} = board.getBoundingClientRect(); // деструктуризация объекта в переменные width и height  const x = 150;
  const x = getRandomNumber(0, width - size); // чтобы элемент не вываливался за границы board
  const y = getRandomNumber(0, height - size);
  const circleColor = getRandomColor();

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${x}px`;
  circle.style.left = `${y}px`;
  circle.style.background = circleColor;
  circle.style.boxShadow = `0 0 2px ${circleColor}, 0 0 10px ${circleColor}`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min); // Math.random - Возвращает псевдослучайное число в диапазоне от 0 (включительно) до 1 (но не включая 1)
}

function getRandomColor() {
  // const randomColor = '#'+ Math.floor(Math.random()*16777215).toString(16);
  // return randomColor;
  const colors = ['rgb(46, 223, 48)', 'rgb(45, 221, 168)', 'rgb(14, 102, 194)', 'rgb(36, 77, 130)', 'rgb(221, 108, 235)', 'rgb(173, 47, 108)'];
  const index = Math.floor(Math.random() * colors.length); //получаем случайное число
  return colors[index]; // возвращаем цвет из массива colors в соответв со сгенерированным числом
}

//чит
// function winTheGame() {
//   function kill() {
//     const circle = document.querySelector('circle');
//
//     if(circle) {
//       circle.click();
//     }
//   }
//   setInterval(kill, 75);
// }


// getBoundingClientRect() возвращает координаты в контексте окна для минимального по размеру прямоугольника, который заключает в себе элемент elem, в виде объекта встроенного класса DOMRect
