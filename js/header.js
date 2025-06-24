document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('.menu-item');

  let submenuAberto = null;
  let timeoutEsconder = null;

  menuItems.forEach(item => {
    const submenu = item.querySelector('.submenu');

    // Mostrar submenu ao entrar no menu-item
    item.addEventListener('mouseenter', () => {
      if (submenuAberto && submenuAberto !== submenu) {
        esconderSubmenu(submenuAberto);
      }
      mostrarSubmenu(submenu);
      submenuAberto = submenu;

      // Se tiver timeout pra esconder, cancela porque voltou ao menu
      if (timeoutEsconder) {
        clearTimeout(timeoutEsconder);
        timeoutEsconder = null;
      }
    });

    // Quando sair do menu-item, espera um pouco e só esconde se não estiver no submenu
    item.addEventListener('mouseleave', () => {
      timeoutEsconder = setTimeout(() => {
        if (!submenu.matches(':hover') && !item.matches(':hover')) {
          esconderSubmenu(submenu);
          submenuAberto = null;
        }
      }, 200); // espera 200ms para evitar sumir rápido demais
    });

    // Quando o mouse sai do submenu, também espera e esconde se não estiver mais no menu-item
    submenu.addEventListener('mouseleave', () => {
      timeoutEsconder = setTimeout(() => {
        if (!submenu.matches(':hover') && !item.matches(':hover')) {
          esconderSubmenu(submenu);
          submenuAberto = null;
        }
      }, 200);
    });

    // Opcional: se o mouse sair da janela do navegador, esconde tudo
    window.addEventListener('mouseout', e => {
      if (!e.relatedTarget && !e.toElement) {
        if (submenuAberto) {
          esconderSubmenu(submenuAberto);
          submenuAberto = null;
        }
      }
    });
  });

  function mostrarSubmenu(submenu) {
    submenu.style.display = 'flex';
    setTimeout(() => {
      submenu.style.opacity = '1';
      submenu.style.visibility = 'visible';
      submenu.style.transform = 'translateY(0)';
    }, 10); // delay pra garantir a animação
  }

  function esconderSubmenu(submenu) {
    submenu.style.opacity = '0';
    submenu.style.visibility = 'hidden';
    submenu.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      submenu.style.display = 'none';
    }, 300); // tempo da animação
  }
});

//ABRIR MENU DE COMPRAS
document.addEventListener('DOMContentLoaded', function () {
    const botaoCarrinho = document.querySelector('.icone-carrinho');
    const menuLateral = document.getElementById('menuLateral');
    const overlay = document.getElementById('overlay');
    const itensContainer = document.querySelector('.itens');
    const subtotalElemento = document.querySelector('.fechar-pedido p');

    function toggleMenu() {
        menuLateral.classList.toggle('aberto');
        overlay.classList.toggle('ativo');
    }

    botaoCarrinho.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    atualizarSubtotal();
    configurarBotoes();

    function configurarBotoes() {
        const botoesAdicionar = document.querySelectorAll('.quantidade button:nth-child(3)');
        const botoesRemover = document.querySelectorAll('.quantidade button:nth-child(1)');
        const botoesExcluir = document.querySelectorAll('.excluir');

        botoesAdicionar.forEach(botao => {
            botao.addEventListener('click', () => {
                const item = botao.closest('.item');
                const quantidadeElemento = item.querySelector('.quantidade p');
                let quantidade = parseInt(quantidadeElemento.innerText);
                quantidade++;
                quantidadeElemento.innerText = `${quantidade} uni.`;
                atualizarSubtotal();
            });
        });

        botoesRemover.forEach(botao => {
            botao.addEventListener('click', () => {
                const item = botao.closest('.item');
                const quantidadeElemento = item.querySelector('.quantidade p');
                let quantidade = parseInt(quantidadeElemento.innerText);
                if (quantidade > 1) {
                    quantidade--;
                    quantidadeElemento.innerText = `${quantidade} uni.`;
                } else {
                    item.remove();
                }
                verificarSacolaVazia();
                atualizarSubtotal();
            });
        });

        botoesExcluir.forEach(botao => {
            botao.addEventListener('click', () => {
                const item = botao.closest('.item');
                item.remove();
                verificarSacolaVazia();
                atualizarSubtotal();
            });
        });
    }

    function atualizarSubtotal() {
        const itens = document.querySelectorAll('.item');
        let subtotal = 0;

        itens.forEach(item => {
            const precoTexto = item.querySelector('.detalhes-produto p').innerText;
            const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.').trim());
            const quantidade = parseInt(item.querySelector('.quantidade p').innerText);
            subtotal += preco * quantidade;
        });

        subtotalElemento.innerText = `Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    }

    function verificarSacolaVazia() {
        const itens = document.querySelectorAll('.item');
        if (itens.length === 0) {
            itensContainer.innerHTML = `<p style="text-align: center; color: #524b4b;">Você ainda não possui itens na sacola.</p>`;
            subtotalElemento.innerText = `Subtotal: R$ 0,00`;
        }
    }
});
