const hamburguer = document.querySelector('.hamburguer');
const menu = document.querySelector('.menu');

hamburguer.addEventListener('click', () => {
  menu.classList.toggle('active');
});


const slider = document.querySelector('.slider');
const images = document.querySelectorAll('.slider img');
const prevButton = document.querySelector('.prev-slide');
const nextButton = document.querySelector('.next-slide');
const indicators = document.querySelectorAll('.indicator');

let currentIndex = 0;
let autoSlideInterval = setInterval(nextSlide, 3000);

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlider();
  updateIndicators();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlider();
  updateIndicators();
}

function updateIndicators() {
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

prevButton.addEventListener('click', () => {
  prevSlide();
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 3000);
});

nextButton.addEventListener('click', () => {
  nextSlide();
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 3000);
});

function changeSlide(index) {
  currentIndex = index;
  updateSlider();
  updateIndicators();
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 3000);
}

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    changeSlide(index);
  });
});

updateSlider();
updateIndicators();










