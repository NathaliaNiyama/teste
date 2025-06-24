let currentIndex = 0;
let images = [];

// Função para atualizar a imagem principal
function updateImage() {
  const displayed = document.getElementById("displayimg");
  if (!displayed) {
    console.error("imagem não encontrada");
    return;
  }
  displayed.src = images[currentIndex];

  const thumbnails = document.querySelectorAll(".navimg");
  thumbnails.forEach((thumb, idx) => {
    thumb.classList.toggle("active", idx === currentIndex);
  });
}

// Setar imagem ao clicar na miniatura
function setImage(index) {
  currentIndex = index;
  updateImage();
}

// Avançar imagem
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
}

// Voltar imagem
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
}

// Botões de seleção
function setupToggleButtons(selector) {
  const buttons = document.querySelectorAll(selector);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

// Carregar informações do produto do JSON
fetch('produtos.json')
  .then(response => response.json())
  .then(dados => {
    const produto = dados.produtos[0]; // Carregando o primeiro produto (ajuste se quiser outro)

    // Atualizar imagens
    images = produto.imagens;
    currentIndex = 0;
    updateImage();

    // Criar miniaturas
    const imgBar = document.querySelector(".imgbar");
    imgBar.innerHTML = '';
    images.forEach((img, index) => {
      const thumb = document.createElement('img');
      thumb.src = img;
      thumb.classList.add('navimg');
      thumb.onclick = () => setImage(index);
      imgBar.appendChild(thumb);
    });

    // Atualizar texto do produto
    document.querySelector('.productinfo h1').textContent = produto.nome;
    document.querySelector('.price').textContent = `R$ ${produto.preco.toFixed(2)}`;
    document.querySelector('.tranche').textContent = `ou 3x de R$ ${(produto.preco / 3).toFixed(2)} sem juros`;
    document.querySelector('.description').textContent = produto.descricao_detalhada;

    // Atualizar tamanhos
    const medidaContainer = document.querySelector('.medida');
    medidaContainer.innerHTML = '';
    produto.tamanhos.forEach(tam => {
      const btn = document.createElement('button');
      btn.className = 'medida-btn';
      btn.textContent = tam;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.medida-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
      medidaContainer.appendChild(btn);
    });

    // Atualizar cores
    const colorContainer = document.querySelector('.coloroptions');
    colorContainer.innerHTML = '';
    produto.cores.forEach(cor => {
      const div = document.createElement('div');
      div.className = 'colorbutton';
      div.style.backgroundColor = cor;
      div.addEventListener('click', () => {
        document.querySelectorAll('.colorbutton').forEach(c => c.classList.remove('active'));
        div.classList.add('active');
      });
      colorContainer.appendChild(div);
    });

  })
  .catch(erro => {
    console.error('Erro ao carregar os produtos:', erro);
  });

// AVALIAÇÕES
// AVALIAÇÕES
fetch('comentarios.json')
  .then(response => response.json())
  .then(dados => {
    const avaliacoes = dados.avaliacoes;
    const container = document.getElementById('container-avaliacoes');
    const btnVerMais = document.getElementById('btn-ver-mais');
    const totalAvaliacoes = document.querySelector('.total-avaliacoes');

    // Atualiza o total de avaliações
    totalAvaliacoes.textContent = `Total de avaliações: ${avaliacoes.length}`;

    // Função para criar cada card de avaliação
    function criarCard(avaliacao) {
      const card = document.createElement('div');
      card.classList.add('avaliacao');

      const estrelas = '★'.repeat(avaliacao.nota);

      card.innerHTML = `
        <h3>@${avaliacao.nome}</h3>
        <p class="data">${avaliacao.data}</p>
        <p class="estrelas">${estrelas}</p>
        <p class="texto">${avaliacao.texto}</p>
        <hr>
      `;

      return card;
    }

    // Exibir os dois primeiros inicialmente
    function mostrarPrimeirasAvaliacoes() {
      container.innerHTML = '';
      const primeiras = avaliacoes.slice(0, 2);
      primeiras.forEach(avaliacao => {
        container.appendChild(criarCard(avaliacao));
      });
    }

    mostrarPrimeirasAvaliacoes();

    let verMaisAtivado = false;

    // Evento do botão
    btnVerMais.addEventListener('click', () => {
      if (!verMaisAtivado) {
        // Mostrar todas
        avaliacoes.slice(2).forEach(avaliacao => {
          container.appendChild(criarCard(avaliacao));
        });
        verMaisAtivado = true;
        btnVerMais.querySelector('img').classList.add('seta-ativa');
      } else {
        // Voltar para os dois primeiros
        mostrarPrimeirasAvaliacoes();
        verMaisAtivado = false;
        btnVerMais.querySelector('img').classList.remove('seta-ativa');
      }
    });
  })
  .catch(erro => {
    console.error('Erro ao carregar as avaliações:', erro);
  });