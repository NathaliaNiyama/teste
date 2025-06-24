document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const progressBars = document.querySelectorAll(".progress-bar");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentSlide = 0;
  let interval;

  function showSlide(index) {
    // Remove "active" das barras e slides imediatamente
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      progressBars[i].classList.remove("active");
  
      // Força o reset imediato
      progressBars[i].classList.remove("reset");
      void progressBars[i].offsetWidth; // ← Força reflow
      progressBars[i].classList.add("reset");
    });
  
    // Ativa o slide e a barra correta
    slides[index].classList.add("active");
    progressBars[index].classList.remove("reset");
    progressBars[index].classList.add("active");
  
    currentSlide = index;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function startSlideshow() {
    showSlide(currentSlide);
    interval = setInterval(nextSlide, 5000);
  }

  // Inicializa todas as barras com "reset" para começar zeradas
  progressBars.forEach((bar) => {
    bar.classList.add("reset");
  });

  // Evento nas barras de progresso (clique direto na barra)
  progressBars.forEach((bar, index) => {
    bar.addEventListener("click", () => {
      clearInterval(interval);
      showSlide(index);
      startSlideshow();
    });
  });

  // Botão anterior
  prevBtn.addEventListener("click", () => {
    clearInterval(interval);
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    startSlideshow();
  });

  // Botão próximo
  nextBtn.addEventListener("click", () => {
    clearInterval(interval);
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    startSlideshow();
  });

  // Inicia o slideshow
  startSlideshow();
});
