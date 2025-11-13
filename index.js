// Versión extendida de index.js que incluye la apertura de la interfaz de ayuda en un overlay iframe.
// Mantiene las funcionalidades previas (búsqueda, carrito, cuenta).
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');
    const cartIcon = document.querySelector('.cart-icon');
    const accountBtn = document.querySelector('.btn-account');
    const actionBtns = document.querySelectorAll('.action-btn');

    // --- búsqueda básica ---
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (!query) {
                searchInput.focus();
                return;
            }
            console.log('Buscar:', query);
            alert(`Buscar: ${query}`);
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') searchBtn.click();
        });
    }

    // --- carrito / cuenta (placeholders) ---
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            alert('Carrito: funcionalidad no implementada todavía.');
        });
    }

    if (accountBtn) {
        accountBtn.addEventListener('click', () => {
            alert('Mi cuenta: funcionalidad no implementada todavía.');
        });
    }

    actionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Acción seleccionada:', btn.textContent.trim());
        });
    });

    // --- FUNCIONALIDAD DE AYUDA: abrir ayuda.html en overlay iframe ---
    const helpButton = Array.from(document.querySelectorAll('.btn-header'))
        .find(b => b.textContent && b.textContent.toLowerCase().includes('ayuda'));

    let helpOverlay = null;

    function openHelpOverlay() {
        if (helpOverlay) return; // ya abierto

        // crear overlay
        helpOverlay = document.createElement('div');
        helpOverlay.style.position = 'fixed';
        helpOverlay.style.inset = '0';
        helpOverlay.style.background = 'rgba(0,0,0,0.45)';
        helpOverlay.style.display = 'flex';
        helpOverlay.style.alignItems = 'stretch';
        helpOverlay.style.justifyContent = 'center';
        helpOverlay.style.zIndex = '9999';
        helpOverlay.id = 'help-overlay';

        // contenedor para iframe y botón cerrar
        const frameWrap = document.createElement('div');
        frameWrap.style.width = '100%';
        frameWrap.style.maxWidth = '1200px';
        frameWrap.style.height = '100%';
        frameWrap.style.borderRadius = '6px';
        frameWrap.style.overflow = 'hidden';
        frameWrap.style.background = '#fff';
        frameWrap.style.position = 'relative';
        frameWrap.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        frameWrap.style.margin = '12px';

        // botón cerrar
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✖';
        closeBtn.setAttribute('aria-label', 'Cerrar ayuda');
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '10px';
        closeBtn.style.right = '10px';
        closeBtn.style.zIndex = '10001';
        closeBtn.style.border = 'none';
        closeBtn.style.background = 'rgba(0,0,0,0.7)';
        closeBtn.style.color = '#fff';
        closeBtn.style.width = '40px';
        closeBtn.style.height = '40px';
        closeBtn.style.borderRadius = '999px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.fontSize = '18px';

        closeBtn.addEventListener('click', closeHelpOverlay);

        // iframe con la ayuda
        const iframe = document.createElement('iframe');
        iframe.src = 'ayuda.html';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.display = 'block';
        iframe.setAttribute('title', 'Ayuda Ferretería Duviso');

        frameWrap.appendChild(closeBtn);
        frameWrap.appendChild(iframe);
        helpOverlay.appendChild(frameWrap);
        document.body.appendChild(helpOverlay);

        // bloquear scroll del body
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function closeHelpOverlay() {
        if (!helpOverlay) return;
        helpOverlay.remove();
        helpOverlay = null;
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    // abrir al hacer click en el botón de Ayuda
    helpButton?.addEventListener('click', (e) => {
        e.preventDefault();
        openHelpOverlay();
    });

    // Escuchar mensajes desde help iframe para cerrarlo (ayuda usa postMessage)
    window.addEventListener('message', (ev) => {
        if (!ev.data) return;
        if (ev.data.type === 'close-help') {
            closeHelpOverlay();
        }
    }, false);

    // cerrar overlay con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeHelpOverlay();
    });
});