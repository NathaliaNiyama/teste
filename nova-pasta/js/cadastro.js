const acessoBtn = document.querySelector('.acesso');
const cadastroSteps = document.querySelector('.cadastro-steps');
const loginForm = document.querySelector('.login-form');
const titulo = document.querySelector('.titulo-form');

const stepContents = document.querySelectorAll('.step-content');
let currentStep = 0;

// Atualiza as bolinhas da progress-bar
function updateProgress() {
  stepContents.forEach((stepContent, index) => {
    const steps = stepContent.querySelectorAll('.progress-steps .step');
    steps.forEach((step, i) => {
      step.classList.toggle('active', i === currentStep);
    });
  });
}

// Clique em "Primeiro Acesso"
acessoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  cadastroSteps.classList.remove('oculto');
  cadastroSteps.classList.add('visivel');

  loginForm.classList.add('oculto');
  loginForm.classList.remove('visivel');

  titulo.classList.add('oculto');

  stepContents.forEach((step, index) => {
    step.classList.toggle('visivel', index === currentStep);
    step.classList.toggle('oculto', index !== currentStep);
  });

  updateProgress();
});

// Botão Avançar
const nextButtons = document.querySelectorAll('.next');
nextButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (currentStep < stepContents.length - 1) {
      stepContents[currentStep].classList.remove('visivel');
      stepContents[currentStep].classList.add('oculto');

      currentStep++;

      stepContents[currentStep].classList.remove('oculto');
      stepContents[currentStep].classList.add('visivel');

      updateProgress();
    }
  });
});

// Botão Voltar
const backButtons = document.querySelectorAll('.back');
backButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (currentStep > 0) {
      stepContents[currentStep].classList.remove('visivel');
      stepContents[currentStep].classList.add('oculto');

      currentStep--;

      stepContents[currentStep].classList.remove('oculto');
      stepContents[currentStep].classList.add('visivel');

      updateProgress();
    }
  });
});

// Finalizar cadastro
const finalForm = document.querySelector('.step-3 form');
finalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Cadastro realizado com sucesso!');

  // Resetar etapas
  stepContents[currentStep].classList.remove('visivel');
  stepContents[currentStep].classList.add('oculto');

  currentStep = 0;
  stepContents[currentStep].classList.remove('oculto');
  stepContents[currentStep].classList.add('visivel');

  updateProgress();

  // Voltar para o login
  cadastroSteps.classList.add('oculto');
  cadastroSteps.classList.remove('visivel');

  loginForm.classList.remove('oculto');
  loginForm.classList.add('visivel');

  titulo.classList.remove('oculto');
});
