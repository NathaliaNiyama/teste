document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const secao = params.get('secao');

    if (secao) {
        showContent(secao);

        // Abre automaticamente o menu correto, se estiver dentro de uma categoria com submenu
        const botaoCorrespondente = Array.from(document.querySelectorAll('.menu-coluna ul button'))
            .find(btn => btn.getAttribute('onclick')?.includes(`'${secao}'`));

        if (botaoCorrespondente) {
            const ul = botaoCorrespondente.closest('ul');
            const parentButton = ul.previousElementSibling;
            if (parentButton) {
                toggleMenu(parentButton);
            }
        }
    }
});