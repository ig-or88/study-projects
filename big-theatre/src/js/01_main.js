// СЛАЙДЕРЫ

$('.afisha__slider').slick({
  infinite: false,
  variableWidth: true,
  prevArrow:'<button class="afisha__slider-btn afisha__slider-btnprev"><svg class="btn-icon"><use xlink:href="img/sprite.svg#arrow-left"></use></svg>пред</button>'
  ,
  nextArrow:'<button class="afisha__slider-btn afisha__slider-btnnext">след<svg class="btn-icon"><use xlink:href="img/sprite.svg#arrow-right"></use></svg></button>'
});

$('.product-section__slider').slick({
  arrows: false,
  infinite: true,
  variableWidth: true,
  mobileFirst: true,
})

//progress bar прокрутки
window.onscroll = () => scrollBar();

function scrollBar() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

// открытие/закрытие окна
let openBtn = document.querySelector('.open-menu-btn');
let closeBtn = document.querySelector('.close-menu-btn');
let menuMobile = document.querySelector('.menu-mobile');

function openMenu() {
  menuMobile.classList.add('menu-mobile--active');
};

function closeMenu() {
  menuMobile.classList.remove('menu-mobile--active');
};

openBtn.addEventListener('click', () => {
  openMenu();
});

closeBtn.addEventListener('click', () => {
  closeMenu();
});

document.addEventListener('click', function(e) {
  let target = e.target;
  let targetMenu = target == menuMobile || menuMobile.contains(target);
  let targetBtn = target == openBtn;
  let menuIsActive = menuMobile.classList.contains('menu-mobile--active');

  if (!targetMenu && !targetBtn && menuIsActive) {
    closeMenu();
  }
});


// якорные ссылки
const anchors = document.querySelectorAll('a.scroll-to')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute('href');

    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    closeMenu();
  });
}

// кнока наверх
const arrowTop = document.querySelector('.arrowTop');
arrowTop.onclick = function() {
  window.scrollTo(pageXOffset, 0);
  // после scrollTo возникнет событие "scroll", так что стрелка автоматически скроется
};

window.addEventListener('scroll', function() {
  arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight/2);
});
