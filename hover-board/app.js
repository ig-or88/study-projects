const board = document.querySelector('#board');
const colors = ['rgb(46, 223, 48)', 'rgb(45, 221, 168)', 'rgb(14, 102, 194)', 'rgb(36, 77, 130)', 'rgb(221, 108, 235)', 'rgb(173, 47, 108)'];
const SQUARES_NUMBER = 600;

for (let i = 0; i < SQUARES_NUMBER; i++) {
  const square = document.createElement('div'); // создаем элемент div
  square.classList.add('square'); // добавляем к созданному элементу класс square

  square.addEventListener('mouseover', () => setColor(square));

  square.addEventListener('mouseleave', () => removeColor(square));

  board.append(square); // добаялвем в board
}

function setColor(element) {
  const squareColor = getRandomColor(); // записываем в const squareColor результат getRandomColor()
  element.style.backgroundColor = squareColor;
  element.style.boxShadow = `0 0 2px ${squareColor}, 0 0 10px ${squareColor}`
}

function removeColor (element) {
  element.style.backgroundColor = '#1d1d1d';
  element.style.boxShadow = `0 0 2px #000`;
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
  // const index = Math.floor(Math.random() * colors.length); // получаем случайное число
  // return colors[index]; // возвращаем цвет из массива colors в соответв со сгенерированным числом
}

// Альтернативное решение

// for (let i = 0; i < SQUARES_NUMBER; i++) {
//   const square = document.createElement('div'); // создаем элемент div
//   square.classList.add('square'); // добавляем к созданному элементу класс square
//
//   square.addEventListener('mouseover', setColor);
//
//   square.addEventListener('mouseleave', removeColor);
//
//   board.append(square); // добаялвем в board
// }
//
// function setColor(event) {
//   const element = event.target;
//   const squareColor = getRandomColor(); //записываем в const squareColor результат getRandomColor()
//   element.style.backgroundColor = squareColor;
//   element.style.boxShadow = `0 0 2px ${squareColor}, 0 0 10px ${squareColor}`
// }
//
// function removeColor (event) {
//   const element = event.target;
//   element.style.backgroundColor = '#1d1d1d';
//   element.style.boxShadow = `0 0 2px #000`;
// }
//
// function getRandomColor() {
//   return colors[Math.floor(Math.random() * colors.length)];
//   // const index = Math.floor(Math.random() * colors.length); //получаем случайное число
//   // return colors[index]; // возвращаем цвет из массива colors в соответв со сгенерированным сичлом
// }
