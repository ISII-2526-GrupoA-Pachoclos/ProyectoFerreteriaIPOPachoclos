document.addEventListener('DOMContentLoaded', () => {
    // Navegación: logo siempre a indexen.html
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.location.href = 'indexen.html';
        });
    }

    // Búsqueda básica
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const q = searchInput.value.trim();
            if (!q) { searchInput.focus(); return; }
            alert(`Search for: ${q}`);
        });
        searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchBtn.click(); });
    }

    // Placeholder carrito
    document.querySelector('.cart-icon')?.addEventListener('click', () => {
        window.location.href = '../html/carrito.html';
    });

    // Función para mostrar popup de error de administrador
    let errorAdminOverlay = null;

    function showAdminErrorPopup() {
        if (errorAdminOverlay) return;

        errorAdminOverlay = document.createElement('div');
        Object.assign(errorAdminOverlay.style, {
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        });

        const panel = document.createElement('div');
        Object.assign(panel.style, {
            width: '90%',
            maxWidth: '450px',
            background: '#fff',
            borderRadius: '10px',
            padding: '30px',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
            textAlign: 'center'
        });

        const icon = document.createElement('div');
        icon.innerHTML = '🚫';
        icon.style.fontSize = '60px';
        icon.style.marginBottom = '15px';

        const messageText = document.createElement('p');
        messageText.textContent = 'Error. You are not registered in our system as Administrator.';
        Object.assign(messageText.style, {
            fontSize: '16px',
            color: '#333',
            marginBottom: '20px',
            lineHeight: '1.5',
            fontWeight: '500'
        });

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Accept';
        Object.assign(closeBtn.style, {
            padding: '10px 30px',
            background: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
        });

        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.background = '#c82333';
        });

        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.background = '#dc3545';
        });

        closeBtn.addEventListener('click', closeAdminErrorPopup);

        panel.appendChild(icon);
        panel.appendChild(messageText);
        panel.appendChild(closeBtn);
        errorAdminOverlay.appendChild(panel);
        document.body.appendChild(errorAdminOverlay);

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function closeAdminErrorPopup() {
        if (!errorAdminOverlay) return;
        errorAdminOverlay.remove();
        errorAdminOverlay = null;
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    // Navegación entre interfaces
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        const text = btn.textContent.trim().toLowerCase();
        if (text.includes('buy tools')) {
            btn.addEventListener('click', () => {
                window.location.href = '../html/catalogoCompras.html';
            });
        } else if (text.includes('repair tools')) {
            btn.addEventListener('click', () => {
                window.location.href = '../html/repararHerramientas.html';
            });
        } else if (text.includes('create offers')) {
            btn.addEventListener('click', () => {
                // 50% de probabilidad de mostrar error de administrador
                const isAdmin = Math.random() < 0.5;

                if (isAdmin) {
                    // Usuario es administrador, puede acceder
                    window.location.href = '../html/crearOfertas.html';
                } else {
                    // Usuario no es administrador, mostrar error
                    showAdminErrorPopup();
                }
            });
        } else {
            btn.addEventListener('click', () => {
                console.log('Action selected:', text);
            });
        }
    });

    // Hacer clickeables las tarjetas de productos
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        // Agregar cursor pointer
        card.style.cursor = 'pointer';

        // Agregar evento click
        card.addEventListener('click', () => {
            const productCode = card.getAttribute('data-code');
            if (productCode) {
                window.location.href = `../html/infoCompras.html?code=${productCode}`;
            }
        });

        // Agregar efecto hover
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Abrir Mi Cuenta en overlay flotante
    const accountButton = document.querySelector('.btn-account');
    let accountOverlay = null;

    function openAccount() {
        if (accountOverlay) return;
        accountOverlay = document.createElement('div');
        accountOverlay.id = 'account-overlay';
        Object.assign(accountOverlay.style, {
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        });

        const panel = document.createElement('div');
        Object.assign(panel.style, {
            width: '94%', maxWidth: '600px', height: 'auto', maxHeight: '90vh', background: '#fff',
            borderRadius: '10px', overflow: 'auto', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        });

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        Object.assign(closeBtn.style, {
            position: 'absolute', top: '12px', right: '12px', zIndex: 2,
            width: '42px', height: '42px', borderRadius: '50%', border: 'none',
            background: 'rgba(0,0,0,0.7)', color: '#fff', cursor: 'pointer', fontSize: '18px'
        });
        closeBtn.addEventListener('click', closeAccount);

        const iframe = document.createElement('iframe');
        iframe.src = 'html/miCuenta.html';
        iframe.title = 'My Account Duviso';
        iframe.style.width = '100%';
        iframe.style.height = '600px';
        iframe.style.border = 'none';

        panel.appendChild(closeBtn);
        panel.appendChild(iframe);
        accountOverlay.appendChild(panel);
        document.body.appendChild(accountOverlay);

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function closeAccount() {
        if (!accountOverlay) return;
        accountOverlay.remove();
        accountOverlay = null;
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    accountButton?.addEventListener('click', (e) => { e.preventDefault(); openAccount(); });

    // Abrir ayuda en overlay flotante
    const helpButton = document.querySelector('.btn-help');
    let helpOverlay = null;

    function openHelp() {
        if (helpOverlay) return;
        helpOverlay = document.createElement('div');
        helpOverlay.id = 'help-overlay';
        Object.assign(helpOverlay.style, {
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        });

        const panel = document.createElement('div');
        Object.assign(panel.style, {
            width: '94%', maxWidth: '1100px', height: '86vh', background: '#fff',
            borderRadius: '10px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        });

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        Object.assign(closeBtn.style, {
            position: 'absolute', top: '12px', right: '12px', zIndex: 2,
            width: '42px', height: '42px', borderRadius: '50%', border: 'none',
            background: 'rgba(0,0,0,0.7)', color: '#fff', cursor: 'pointer', fontSize: '18px'
        });
        closeBtn.addEventListener('click', closeHelp);

        const iframe = document.createElement('iframe');
        iframe.src = 'html/ayuda.html';
        iframe.title = 'Help Duviso';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.display = 'block';

        panel.appendChild(closeBtn);
        panel.appendChild(iframe);
        helpOverlay.appendChild(panel);
        document.body.appendChild(helpOverlay);

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function closeHelp() {
        if (!helpOverlay) return;
        helpOverlay.remove();
        helpOverlay = null;
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    helpButton?.addEventListener('click', (e) => { e.preventDefault(); openHelp(); });

    // Abrir idioma en overlay flotante - Redirige a index.html para cambiar a español
    const languageButton = document.querySelector('.btn-header');

    if (languageButton) {
        languageButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../index.html';
        });
    }

    window.addEventListener('message', (ev) => {
        if (!ev?.data) return;
        const data = ev.data;
        if (data.type === 'close-help') {
            closeHelp();
            return;
        }
        if (data.type === 'close-account') {
            closeAccount();
            return;
        }
        if (data.type === 'close-language') {
            // No se necesita en indexen.js
            return;
        }
        if (data.type === 'language-changed') {
            console.log('Language changed to:', data.language);
            return;
        }
        if (data.type === 'toggle-mode') {
            const { mode, enabled } = data;
            if (mode && typeof enabled === 'boolean') {
                if (enabled) document.documentElement.classList.add(mode);
                else document.documentElement.classList.remove(mode);
            }
            return;
        }
        if (data.type === 'reset-modes') {
            document.documentElement.classList.remove('dyslexia', 'protanopia', 'tritanopia');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeHelp();
            closeAccount();
            closeAdminErrorPopup();
        }
    });
});