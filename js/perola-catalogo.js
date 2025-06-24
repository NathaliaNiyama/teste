fetch('produtos.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('produtos-container');
        const produtos = data.produtos;

        // Filtrar apenas os produtos da coleção "perola-salgada"
        const produtosFiltrados = produtos.filter(produto => produto.colecao === 'perola-salgada');

        produtosFiltrados.forEach(produto => {
            const card = document.createElement('div');
            card.classList.add('card-produto');

            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');

            // 🔗 Criar o link
            const link = document.createElement('a');
            link.href = 'produto.html';

            // 🖼️ Criar a imagem do produto
            const img = document.createElement('img');
            img.src = produto.imagens[0];
            img.alt = produto.nome;

            // Inserir a imagem dentro do link
            link.appendChild(img);

            // Inserir o link dentro do container da imagem
            imgContainer.appendChild(link);

            // Badge de novidade (se houver)
            if (produto.novidade) {
                const badgeNovidade = document.createElement('img');
                badgeNovidade.src = 'img/simbolo-novidade.png';
                badgeNovidade.alt = 'Novidade';
                badgeNovidade.classList.add('novidade-badge');
                imgContainer.appendChild(badgeNovidade);
            }

            card.appendChild(imgContainer);

            const nome = document.createElement('h3');
            nome.textContent = produto.nome;
            card.appendChild(nome);

            const descricao = document.createElement('p');
            descricao.textContent = produto.descricao;
            card.appendChild(descricao);

            // Preço
            const preco = document.createElement('p');
            preco.textContent = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;
            preco.style.fontWeight = 'bold';

            // Bolinhas de cores
            const coresDiv = document.createElement('div');
            coresDiv.classList.add('cores');

            produto.cores.forEach(cor => {
                const corDiv = document.createElement('div');
                corDiv.classList.add('cor-bolinha');
                corDiv.style.backgroundColor = cor;
                corDiv.title = cor;

                if (cor.toLowerCase() === '#ffffff') {
                    corDiv.style.border = '1px solid #999';
                }

                coresDiv.appendChild(corDiv);
            });

            // Agrupar preço e cores
            const precoCoresDiv = document.createElement('div');
            precoCoresDiv.classList.add('preco-cores');

            precoCoresDiv.appendChild(preco);
            precoCoresDiv.appendChild(coresDiv);

            card.appendChild(precoCoresDiv);

            container.appendChild(card);
        });
    })
    .catch(error => console.error('Erro ao carregar os produtos:', error));
