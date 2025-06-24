// ==================== MODAL ENDEREÇO ====================
const btnAbrir = document.querySelector('.add-endereco');
const modal = document.getElementById('modalEndereco');
const btnFechar = document.getElementById('cancelar-endereco');

btnAbrir.addEventListener('click', () => {
    modal.style.display = 'flex';
});

btnFechar.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// ==================== BUSCAR CEP ====================
const inputCep = document.getElementById('cep');

function buscarCep() {
    const cep = inputCep.value.replace(/\D/g, '');
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('rua').value = data.logradouro;
                    document.getElementById('estado').value = data.uf;
                } else {
                    alert('CEP não encontrado.');
                }
            })
            .catch(() => {
                alert('Erro ao buscar CEP.');
            });
    } else {
        alert('CEP incompleto.');
    }
}

inputCep.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        buscarCep();
    }
});

// ==================== ENDEREÇOS ====================
const listaEnderecos = [];
const containerEnderecos = document.querySelector('.dados-usuario2');

function renderizarEnderecos() {
    const divAntiga = containerEnderecos.querySelector('.endereco-cadastrado');
    if (divAntiga) divAntiga.remove();

    const enderecoDiv = document.createElement('div');
    enderecoDiv.className = 'endereco-cadastrado';

    listaEnderecos.forEach((end, index) => {
        const bloco = document.createElement('div');
        bloco.className = 'endereco';

        bloco.innerHTML = `
            <h3>${end.bairro} - ${end.cidade}, ${end.estado}</h3>
            <h2>${end.rua}, ${end.numero}</h2>
            <h2>Complemento: ${end.complemento || '-'}</h2>
            <div class="cep">
                <h3>CEP: ${end.cep}</h3>
            </div>
            <div class="botoes-endereco">
                <button class="button" onclick="editarEndereco(${index})">Editar</button>
                <button class="button" onclick="deletarEndereco(${index})">Deletar</button>
            </div>
        `;

        enderecoDiv.appendChild(bloco);
    });

    containerEnderecos.insertBefore(enderecoDiv, containerEnderecos.querySelector('.novo-endereço'));
}


function enderecoExiste(novoEndereco) {
    return listaEnderecos.some(end =>
        end.bairro === novoEndereco.bairro &&
        end.cidade === novoEndereco.cidade &&
        end.estado === novoEndereco.estado &&
        end.rua === novoEndereco.rua &&
        end.numero === novoEndereco.numero &&
        end.cep === novoEndereco.cep
    );
}

document.querySelector('.endereco-formulario').addEventListener('submit', function (e) {
    e.preventDefault();

    const novoEndereco = {
        bairro: document.getElementById('bairro').value.trim(),
        cidade: document.getElementById('cidade').value.trim(),
        estado: document.getElementById('estado').value.trim(),
        rua: document.getElementById('rua').value.trim(),
        numero: document.getElementById('numero').value.trim(),
        complemento: document.getElementById('complemento').value.trim(),
        cep: document.getElementById('cep').value.trim()
    };

    if (enderecoExiste(novoEndereco)) {
        alert('Endereço já cadastrado!');
        return;
    }

    listaEnderecos.push(novoEndereco);
    renderizarEnderecos();
    this.reset();
    modal.style.display = 'none';
});

function deletarEndereco(index) {
    listaEnderecos.splice(index, 1);
    renderizarEnderecos();
}

function editarEndereco(index) {
    const end = listaEnderecos[index];

    document.getElementById('bairro').value = end.bairro;
    document.getElementById('cidade').value = end.cidade;
    document.getElementById('estado').value = end.estado;
    document.getElementById('rua').value = end.rua;
    document.getElementById('numero').value = end.numero;
    document.getElementById('complemento').value = end.complemento;
    document.getElementById('cep').value = end.cep;

    deletarEndereco(index);
    modal.style.display = 'flex';
}

// ==================== QUANTIDADE E ATUALIZA TOTAL ====================
function alterarQuantidade(button, delta) {
    const span = button.parentElement.querySelector("span");
    let quantidade = parseInt(span.innerText);
    quantidade += delta;

    if (quantidade <= 0) {
        const linhaProduto = button.closest('tr');
        linhaProduto.remove();
    } else {
        span.innerText = quantidade;
    }

    atualizarResumo();
    verificarSacolaVazia();
}

function atualizarResumo() {
    const linhas = document.querySelectorAll('tbody tr');
    let subtotal = 0;

    linhas.forEach(linha => {
        const precoTexto = linha.querySelectorAll('td')[2].innerText;
        const quantidade = parseInt(linha.querySelector("span").innerText);

        const preco = parseFloat(precoTexto.replace("R$ ", "").replace(",", "."));
        const total = preco * quantidade;

        linha.querySelectorAll('td')[4].innerText = `R$ ${total.toFixed(2).replace(".", ",")}`;
        subtotal += total;
    });

    document.querySelectorAll('.valores span')[0].innerText = `R$ ${subtotal.toFixed(2).replace(".", ",")}`;
    document.querySelectorAll('.valores span')[1].innerText = `R$ ${subtotal.toFixed(2).replace(".", ",")}`;
}

// ==================== FECHAR PEDIDO ====================
const btnFecharPedido = document.querySelector('.fechar');
const modalConfirmacao = document.getElementById('modalConfirmacao');
const btnCancelarPedido = document.getElementById('cancelar-pedido');
const btnConfirmarPedido = document.getElementById('confirmar-pedido');

btnFecharPedido.addEventListener('click', () => {
    // Verifica se há produtos na tabela (sacola)
    const linhasProdutos = document.querySelectorAll('tbody tr');
    if (linhasProdutos.length === 0) {
        alert('Você não possui produtos na sacola.');
        return; // Não abre modal
    }

    if (listaEnderecos.length === 0) {
        alert('Cadastre um endereço antes de finalizar o pedido.');
        return; // Não abre modal
    }

    const nome = 'Nome do Usuário'; // Substituir pelo nome salvo no login futuramente
    document.getElementById('nome-usuario').innerText = `Nome: ${nome}`;

    const lista = document.getElementById('lista-enderecos');
    lista.innerHTML = '';
    listaEnderecos.forEach((end, i) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <input type="radio" name="endereco" value="${i}" ${i === 0 ? 'checked' : ''}>
            ${end.bairro} - ${end.cidade}, ${end.estado} | ${end.rua}, ${end.numero} | CEP: ${end.cep}
        `;
        lista.appendChild(div);
    });

    const subtotalTexto = document.querySelectorAll('.valores span')[1].innerText;
    const subtotal = parseFloat(subtotalTexto.replace("R$ ", "").replace(",", "."));
    document.getElementById('valor-total').innerText = `Total: R$ ${subtotal.toFixed(2).replace(".", ",")}`;

    const parcelas = document.getElementById('parcelas');
    parcelas.innerHTML = '';
    for (let i = 1; i <= 12; i++) {
        const valorParcela = (subtotal / i).toFixed(2).replace(".", ",");
        const option = document.createElement('option');
        option.value = i;
        option.innerText = `${i}x de R$ ${valorParcela}`;
        parcelas.appendChild(option);
    }

    modalConfirmacao.style.display = 'flex';
});

btnCancelarPedido.addEventListener('click', () => {
    modalConfirmacao.style.display = 'none';
});

btnConfirmarPedido.addEventListener('click', () => {
    alert('Pedido confirmado! Obrigado pela compra!');
    modalConfirmacao.style.display = 'none';
});

// ==================== TIRA SE É IGUAL A 0 ====================
function verificarSacolaVazia() {
    const linhas = document.querySelectorAll('tbody tr');
    const tabela = document.querySelector('table');
    const conteudoPrincipal = document.querySelector('.conteudo-principal');

    let mensagemVazia = document.getElementById('mensagem-vazia');

    if (linhas.length === 0) {
        if (!mensagemVazia) {
            mensagemVazia = document.createElement('div');
            mensagemVazia.id = 'mensagem-vazia';
            mensagemVazia.innerText = 'Você ainda não possui itens na sacola.';
            mensagemVazia.style.fontSize = '20px';
            mensagemVazia.style.color = '#555';
            mensagemVazia.style.textAlign = 'center';
            mensagemVazia.style.margin = '40px 0';
            tabela.insertAdjacentElement('afterend', mensagemVazia);
        }
        tabela.style.display = 'none';
        // conteudoPrincipal.style.display = 'none';
    } else {
        if (mensagemVazia) {
            mensagemVazia.remove();
        }
        tabela.style.display = 'table';
        conteudoPrincipal.style.display = 'flex';
    }
}

// ==================== FECHAR MODAL CLICANDO FORA ====================
window.addEventListener('click', (e) => {
    if (e.target === modalConfirmacao) {
        modalConfirmacao.style.display = 'none';
    }
});

window.onload = () => {
    atualizarResumo();
    verificarSacolaVazia();
};
