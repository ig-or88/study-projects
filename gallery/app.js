function slidesPlugin(activeSlide = 2){
  const slides = document.querySelectorAll('.slide');

  slides[activeSlide].classList.add('slide-active')

  for (const slide of slides) {
    slide.addEventListener('click', () => {
      clearActiveClasses();
      slide.classList.add('slide-active')
    })
  }

  function clearActiveClasses() {
    slides.forEach((slide) => {
        slide.classList.remove('slide-active')
    })
  }
}

slidesPlugin()

// (activeSlide = 2) - значение по умолчанию
