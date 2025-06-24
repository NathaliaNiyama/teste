document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.carrossel-wrapper');
  const totalSlides = document.querySelectorAll('.carrossel-item').length;
  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');
  const indicators = document.querySelectorAll('.indicator');
  let currentIndex = 0;

  function updateSlide() {
    slides.style.transform = `translateX(-${currentIndex * 100}vw)`;
    indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === currentIndex);
    });
  }

  btnNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
  });

  btnPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateSlide();
    });
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
  }, 15000);
});
