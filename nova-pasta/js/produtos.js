document.addEventListener('DOMContentLoaded', () => {
    const paletaDeCores = {
        '#dc143c': 'Coral',
        '#992e04': 'Canela',
        '#720c2e': 'Vinho',
        '#ffa500': 'Laranja',
        '#ffff00': 'Narciso',
        '#32cd32': 'Lima',
        '#006400': 'Musgo',
        '#0c6f72': 'Piscina',
        '#00bfff': 'Azul',
        '#191970': 'Marine',
        '#4B0082': 'Roxo',
        '#9370DB': 'Lilás',
        '#ff69b4': 'Rosa',
        '#f5f5dc': 'Bege',
        '#392620': 'Marrom',
        '#696969': 'Cinza',
        '#000000': 'Preto',
        '#ffffff': 'Branco'
    };

    const btnFiltrar = document.getElementById('btn-filtrar');
    const dropdown = document.getElementById('dropdown-filtros');

    // ⭐ Evento para abrir e fechar o dropdown com animação
    btnFiltrar.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
        btnFiltrar.classList.toggle('ativo');
    });
    
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !btnFiltrar.contains(e.target)) {
            dropdown.classList.remove('show');
            btnFiltrar.classList.remove('ativo');
        }
    });

    // 🎨 Gerar filtro de cores
    const corUl = document.getElementById('cor-ul');

    Object.entries(paletaDeCores).forEach(([hex, nome]) => {
        const li = document.createElement('li');
        const corDiv = document.createElement('div');

        corDiv.classList.add('cor-item');
        corDiv.style.backgroundColor = hex;
        corDiv.title = nome;

        // Borda para branco
        if (hex === '#ffffff') {
            corDiv.style.border = '1px solid #999';
        }

        corDiv.addEventListener('click', () => {
            corDiv.classList.toggle('selecionado');
        });

        li.appendChild(corDiv);
        corUl.appendChild(li);
    });
});




document.addEventListener('DOMContentLoaded', () => {
    // Verifica se está na página produtos.html
    if (!window.location.pathname.endsWith('produtos.html')) return;

    const container = document.getElementById('produtos-container');
    const btnVerMais = document.getElementById('ver-mais');
    const spanCategoria = document.querySelector('.colecoes-title span');
    const h1Categoria = document.querySelector('.colecoes-title h1');

    let todosProdutos = [];

    function formatarCategoria(nome) {
        if (!nome) return '';
        return nome.charAt(0).toUpperCase() + nome.slice(1) + (nome.endsWith('s') ? '' : 's');
    }

    function exibirProdutos(categoriaSelecionada) {
        container.innerHTML = '';
        const cards = [];

        const produtosFiltrados = todosProdutos.filter(
            produto => produto.categoria.toLowerCase() === categoriaSelecionada
        );

        produtosFiltrados.forEach(produto => {
            const card = document.createElement('div');
            card.classList.add('produto-card');

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

        cards.forEach((card, index) => {
            if (index < 8) {
                container.appendChild(card);
            } else {
                card.style.display = 'none';
                container.appendChild(card);
            }
        });

        spanCategoria.textContent = formatarCategoria(categoriaSelecionada);
        h1Categoria.textContent = formatarCategoria(categoriaSelecionada);

        let mostrandoMais = false;

        btnVerMais.onclick = () => {
            const escondidos = cards.filter((_, index) => index >= 8);
            const setaImg = btnVerMais.querySelector('img');

            if (!mostrandoMais) {
                escondidos.forEach(card => card.style.display = 'block');
                setaImg.classList.add('aberta');
            } else {
                escondidos.forEach(card => card.style.display = 'none');
                setaImg.classList.remove('aberta');

                const primeiroProduto = container.querySelector('.produto-card');
                if (primeiroProduto) {
                    primeiroProduto.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }

            mostrandoMais = !mostrandoMais;
        };
    }

    function getCategoriaFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('categoria')?.toLowerCase() || 'vestido';
    }

    // Carrega os produtos
    fetch('../produtos.json')
        .then(response => response.json())
        .then(dados => {
            todosProdutos = dados.produtos;
            const categoria = getCategoriaFromURL();
            exibirProdutos(categoria);
        })
        .catch(error => {
            console.error('Erro ao carregar os produtos', error);
        });
});
