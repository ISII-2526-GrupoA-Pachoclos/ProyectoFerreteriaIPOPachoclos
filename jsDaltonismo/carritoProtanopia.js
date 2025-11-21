document.addEventListener('DOMContentLoaded', () => {
    // Cargar carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('duvisoCart')) || [];

    // Navegación al hacer clic en el logo
    const logo = document.getElementById('logo-link');
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = '../htmlDaltonismo/indexProtanopia.html';
        });
        logo.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = '../htmlDaltonismo/indexProtanopia.html';
            }
        });
    }

    // Navegación entre botones de acción del header
    const actionBtns = document.querySelectorAll('.btn-action');
    actionBtns.forEach(btn => {
        const text = btn.textContent.trim().toLowerCase();
        if (text.includes('crear ofertas')) {
            btn.addEventListener('click', () => {
                window.location.href = 'crearOfertasProtanopia.html';
            });
        } else if (text.includes('comprar herramientas')) {
            btn.addEventListener('click', () => {
                window.location.href = 'catalogoComprasProtanopia.html';
            });
        } else if (text.includes('reparar herramientas')) {
            btn.addEventListener('click', () => {
                window.location.href = 'repararHerramientasProtanopia.html';
            });
        }
    });

    // El icono del carrito no hace nada en esta página (ya estamos en el carrito)
    document.querySelector('.cart-icon')?.addEventListener('click', () => {
        // Ya estamos en el carrito, no hacer nada
    });

    // Abrir Mi Cuenta (overlay con iframe)
    const accountBtn = document.querySelector('.btn-account');
    let accountOverlay = null;

    function openAccount() {
        if (accountOverlay) return;
        accountOverlay = document.createElement('div');
        Object.assign(accountOverlay.style, {
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 9999
        });
        const panel = document.createElement('div');
        Object.assign(panel.style, {
            width: '94%', maxWidth: '600px', height: 'auto', maxHeight: '90vh', background: '#fff',
            borderRadius: '10px', overflow: 'auto', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        });
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        Object.assign(closeBtn.style, {
            position: 'absolute', top: '12px', right: '12px', zIndex: 2, width: '42px', height: '42px',
            borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.7)', color: '#fff', cursor: 'pointer', fontSize: '18px'
        });
        closeBtn.addEventListener('click', closeAccount);
        const iframe = document.createElement('iframe');
        iframe.src = '../htmlDaltonismo/miCuentaProtanopia.html';
        iframe.title = 'Mi Cuenta Duviso (Protanopia)';
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

    accountBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        openAccount();
    });

    // Abrir ayuda (overlay con iframe)
    const helpBtn = document.querySelector('.btn-help');
    let helpOverlay = null;

    function openHelp() {
        if (helpOverlay) return;
        helpOverlay = document.createElement('div');
        Object.assign(helpOverlay.style, {
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 9999
        });
        const panel = document.createElement('div');
        Object.assign(panel.style, {
            width: '94%', maxWidth: '1100px', height: '86vh', background: '#fff',
            borderRadius: '10px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        });
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        Object.assign(closeBtn.style, {
            position: 'absolute', top: '12px', right: '12px', zIndex: 2, width: '42px', height: '42px',
            borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.7)', color: '#fff', cursor: 'pointer', fontSize: '18px'
        });
        closeBtn.addEventListener('click', closeHelp);
        const iframe = document.createElement('iframe');
        iframe.src = '../htmlDaltonismo/ayudaProtanopia.html';
        iframe.title = 'Ayuda Duviso (Protanopia)';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
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

    helpBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        openHelp();
    });

    // Abrir idioma (overlay con iframe)
    const languageBtn = document.querySelectorAll('.btn-header');
    let languageOverlay = null;

    function openLanguage() {
        if (languageOverlay) return;
        languageOverlay = document.createElement('div');
        Object.assign(languageOverlay.style, {
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 9999
        });
        const panel = document.createElement('div');
        Object.assign(panel.style, {
            width: '94%', maxWidth: '600px', height: 'auto', maxHeight: '90vh', background: '#fff',
            borderRadius: '10px', overflow: 'auto', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        });
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        Object.assign(closeBtn.style, {
            position: 'absolute', top: '12px', right: '12px', zIndex: 2, width: '42px', height: '42px',
            borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.7)', color: '#fff', cursor: 'pointer', fontSize: '18px'
        });
        closeBtn.addEventListener('click', closeLanguage);
        const iframe = document.createElement('iframe');
        iframe.src = '../htmlDaltonismo/idiomaProtanopia.html';
        iframe.title = 'Idioma Duviso (Protanopia)';
        iframe.style.width = '100%';
        iframe.style.height = '400px';
        iframe.style.border = 'none';
        panel.appendChild(closeBtn);
        panel.appendChild(iframe);
        languageOverlay.appendChild(panel);
        document.body.appendChild(languageOverlay);
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function closeLanguage() {
        if (!languageOverlay) return;
        languageOverlay.remove();
        languageOverlay = null;
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    // Buscar el botón de idioma
    languageBtn.forEach(btn => {
        const text = btn.textContent.trim().toLowerCase();
        if (text.includes('idioma') || text.includes('🌐')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openLanguage();
            });
        }
    });

    window.addEventListener('message', (ev) => {
        if (!ev?.data) return;
        const data = ev.data;
        if (data.type === 'close-help') {
            closeHelp();
            return;
        }
        if (data.type === 'close-account' || data.type === 'close-account-protanopia') {
            closeAccount();
            return;
        }
        if (data.type === 'close-language') {
            closeLanguage();
            return;
        }
        if (data.type === 'language-changed') {
            console.log('Idioma cambiado a:', data.language);
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
            closeLanguage();
        }
    });

    // Renderizar carrito
    function renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalAmountElement = document.getElementById('total-amount');
        const btnCheckout = document.getElementById('btn-checkout');

        if (!cartItemsContainer) return;

        // Si el carrito está vacío
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <div class="empty-icon">🛒</div>
                    <h2>Tu carrito está vacío</h2>
                    <p>Añade productos para empezar tu compra</p>
                </div>
            `;
            totalAmountElement.textContent = '0,00 €';
            btnCheckout.disabled = true;
            return;
        }

        // Renderizar items del carrito
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = `cart-item ${item.type === 'repair' ? 'repair' : ''}`;
            cartItem.setAttribute('data-index', index);

            if (item.type === 'repair') {
                // Item de reparación
                cartItem.innerHTML = `
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-info">
                        <h3 class="item-name">${item.name}</h3>
                    </div>
                    <div class="item-pricing single">
                        <span class="price-repair">${item.price.toFixed(2)} €</span>
                    </div>
                    <div class="item-quantity repair-quantity">
                        <span class="quantity-label">Cantidad a reparar:</span>
                        <span class="quantity-value">${item.quantity}</span>
                    </div>
                    <div class="item-total">${itemTotal.toFixed(2)} €</div>
                    <button class="btn-trash" title="Eliminar del carrito">🗑️</button>
                `;
            } else {
                // Item de compra
                const badgeText = item.badge || '';
                const badgeClass = badgeText.toLowerCase().includes('seminuevo') ? 'seminew' : 'new';
                const hasDiscount = item.priceOld && item.priceOld > item.price;

                cartItem.innerHTML = `
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-info">
                        <h3 class="item-name">${item.name}</h3>
                        ${badgeText ? `<span class="item-badge ${badgeClass}">${badgeText}</span>` : ''}
                    </div>
                    <div class="item-pricing">
                        ${hasDiscount ? `
                            <span class="price-old">${item.priceOld.toFixed(2)} €</span>
                            <span class="discount-badge">-${item.discount || ''}%</span>
                        ` : ''}
                        <span class="price-current">${item.price.toFixed(2)} €</span>
                    </div>
                    <div class="item-quantity">
                        <span class="quantity-label">Cantidad:</span>
                        <span class="quantity-value">${item.quantity}</span>
                    </div>
                    <div class="item-total">${itemTotal.toFixed(2)} €</div>
                    <button class="btn-trash" title="Eliminar del carrito">🗑️</button>
                `;
            }

            cartItemsContainer.appendChild(cartItem);
        });

        // Añadir listeners a las papeleras
        cartItemsContainer.querySelectorAll('.btn-trash').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemEl = e.target.closest('.cart-item');
                if (!itemEl) return;
                const idx = parseInt(itemEl.getAttribute('data-index'), 10);
                if (Number.isInteger(idx) && idx >= 0 && idx < cart.length) {
                    // Eliminar item
                    cart.splice(idx, 1);
                    // Guardar cambios
                    localStorage.setItem('duvisoCart', JSON.stringify(cart));
                    // Re-renderizar
                    renderCart();
                }
            });
        });

        // Actualizar total
        totalAmountElement.textContent = `${total.toFixed(2)} €`;
        btnCheckout.disabled = false;
    }

    // Botón finalizar compra
    document.getElementById('btn-checkout')?.addEventListener('click', () => {
        if (cart.length === 0) return;
        // Navegar a la página de finalizar compra (versión protanopia)
        window.location.href = 'finalizarCompraProtanopia.html';
    });

    // Renderizar carrito al cargar la página
    renderCart();
});