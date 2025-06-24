function editarDados() {
    document.getElementById('dados-visuais').style.display = 'none';
    document.getElementById('form-edicao').style.display = 'block';
}

function validarFormulario() {
    const inputs = document.querySelectorAll('#form-edicao input');
    const valores = Array.from(inputs).map(input => input.value.trim());

    // Coleta valor do dropdown personalizado de gênero
    const generoSelecionado = document.getElementById("genero-selecionado").getAttribute("data-valor");

    const [nome, sobrenome, dataNascimento, telefone, cpf, email] = valores;

    // Validação CPF: apenas números, 11 dígitos
    const cpfValido = /^\d{11}$/.test(cpf.replace(/\D/g, ''));
    if (!cpfValido) {
        alert("CPF deve conter exatamente 11 números.");
        return false;
    }

    // Validação telefone: entre 10 e 11 dígitos, apenas números
    const telefoneNumerico = telefone.replace(/\D/g, '');
    if (!/^\d{10,11}$/.test(telefoneNumerico)) {
        alert("Telefone deve conter entre 10 e 11 dígitos e apenas números.");
        return false;
    }

    // Validação gênero: precisa estar selecionado
    if (!generoSelecionado) {
        alert("Por favor, selecione um gênero.");
        return false;
    }

    // Preencher os <p> da visualização
    const campos = document.querySelectorAll('#dados-visuais .dados-grid p');
    const dados = [nome, sobrenome, dataNascimento, telefone, cpf, generoSelecionado, email];

    campos.forEach((p, i) => {
        p.textContent = dados[i];
    });

    // Oculta o formulário e mostra os dados
    document.getElementById('form-edicao').style.display = 'none';
    document.getElementById('dados-visuais').style.display = 'block';

    return false; // Impede envio real do formulário
}

// Dropdown com efeito animado
document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.getElementById("dropdown-genero");
    const selecionado = document.getElementById("genero-selecionado");
    const opcoes = dropdown.querySelectorAll(".dropdown-opcoes li");

    dropdown.addEventListener("click", function (e) {
        dropdown.classList.toggle("ativo");
    });

    opcoes.forEach(opcao => {
        opcao.addEventListener("click", function (e) {
            selecionado.textContent = this.textContent;
            selecionado.setAttribute("data-valor", this.getAttribute("data-valor"));
        });
    });

    // Fecha dropdown se clicar fora
    document.addEventListener("click", function (e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("ativo");
        }
    });
});
