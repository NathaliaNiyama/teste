document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('produtos-container');
    const btnVerMais = document.getElementById('ver-mais');

    fetch('../produtos.json') // <- caminho atualizado
        .then(response => response.json())
        .then(dados => {
            const produtos = dados.produtos;
            const cards = [];

            // FILTRA SOMENTE PRODUTOS COM CATEGORIA "vestidos"
            produtos
                .filter(produto => produto.categoria.toLowerCase() === 'camiseta')
                .forEach(produto => {
                    const card = document.createElement('div');
                    card.classList.add('produto-card');

                    const imgContainer = document.createElement('div');
                    imgContainer.classList.add('img-container');

                    const img = document.createElement('img');
                    img.src = produto.imagens[0];
                    img.alt = produto.nome;
                    imgContainer.appendChild(img);

                    if (produto.novidade === true) {
                        const novidadeBadge = document.createElement('img');
                        novidadeBadge.src = '../img/simbolo-novidade.png';
                        novidadeBadge.alt = 'Novidade';
                        novidadeBadge.classList.add('novidade-badge');
                        imgContainer.appendChild(novidadeBadge);
                    }

                    card.appendChild(imgContainer);

                    const nome = document.createElement('h3');
                    nome.textContent = produto.nome;
                    card.appendChild(nome);

                    const descricao = document.createElement('p');
                    descricao.textContent = produto.descricao;
                    card.appendChild(descricao);

                    const preco = document.createElement('p');
                    preco.textContent = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;
                    preco.style.fontWeight = 'bold';

                    const coresDiv = document.createElement('div');
                    coresDiv.classList.add('cores');

                    produto.cores.forEach(cor => {
                        const corDiv = document.createElement('div');
                        corDiv.style.backgroundColor = cor;
                        corDiv.title = cor;
                        corDiv.classList.add('cor-bolinha');

                        if (cor.toLowerCase() === '#ffffff') {
                            corDiv.style.border = '1px solid #999';
                        }

                        coresDiv.appendChild(corDiv);
                    });

                    const precoCoresDiv = document.createElement('div');
                    precoCoresDiv.classList.add('preco-cores');
                    precoCoresDiv.appendChild(preco);
                    precoCoresDiv.appendChild(coresDiv);

                    card.appendChild(precoCoresDiv);

                    cards.push(card);
                });

            // Mostrar apenas as 2 primeiras fileiras (8 itens)
            cards.forEach((card, index) => {
                if (index < 8) {
                    container.appendChild(card);
                } else {
                    card.style.display = 'none';
                    container.appendChild(card);
                }
            });

            let mostrandoMais = false;

            btnVerMais.addEventListener('click', () => {
                const escondidos = cards.filter((_, index) => index >= 8);
                const setaImg = btnVerMais.querySelector('img');

                if (!mostrandoMais) {
                    escondidos.forEach(card => {
                        card.style.display = 'block';
                    });
                    setaImg.classList.add('aberta');
                } else {
                    escondidos.forEach(card => {
                        card.style.display = 'none';
                    });
                    setaImg.classList.remove('aberta');

                    const primeiroProduto = container.querySelector('.produto-card');
                    if (primeiroProduto) {
                        primeiroProduto.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }

                mostrandoMais = !mostrandoMais;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar produtos.json:', error);
        });

});
