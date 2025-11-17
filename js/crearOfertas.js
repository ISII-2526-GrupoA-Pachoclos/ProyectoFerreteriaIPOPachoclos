document.addEventListener('DOMContentLoaded', () => {
    // Base de datos de productos con ofertas - AÑADIDO FABRICANTE
    const productsData = [
        { code: '00001', name: 'Juego Destornilladores', manufacturer: 'Leroy Merlin', image: '../images/destornilladores.jpg', priceOriginal: 28.95, discount: 10 },
        { code: '00002', name: 'Martillo Bellota', manufacturer: '3M', image: '../images/martillo.jpg', priceOriginal: 12.95, discount: 6 },
        { code: '00003', name: 'Alicates', manufacturer: '3M', image: '../images/alicates.jpg', priceOriginal: 14.93, discount: 17 },
        { code: '00004', name: 'Llave Inglesa', manufacturer: 'Cadena88', image: '../images/llave-inglesa.jpg', priceOriginal: 28.95, discount: 20 },
        { code: '00005', name: 'Cutter Profesional', manufacturer: 'Cadena88', image: '../images/cutter.jpg', priceOriginal: 3.49, discount: 22 },
        { code: '00006', name: 'Juego de Llaves Allen', manufacturer: 'Leroy Merlin', image: '../images/llaves.jpg', priceOriginal: 10.49, discount: 13 }
    ];

    let filteredProducts = [...productsData];

    // Navegación: logo → index
    const logo = document.getElementById('logo-link');
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = '../index.html';
        });
    }

    // Navegación entre botones de acción del header
    const actionBtns = document.querySelectorAll('.btn-action');
    actionBtns.forEach(btn => {
        const text = btn.textContent.trim().toLowerCase();
        if (text.includes('comprar herramientas')) {
            btn.addEventListener('click', () => {
                window.location.href = 'catalogoCompras.html';
            });
        } else if (text.includes('reparar herramientas')) {
            btn.addEventListener('click', () => {
                window.location.href = 'repararHerramientas.html';
            });
        } else if (text.includes('crear ofertas')) {
            // Ya estamos en crear ofertas, no hacer nada o recargar
            btn.addEventListener('click', () => {
                window.location.reload();
            });
        }
    });

    // Placeholder carrito
    document.querySelector('.cart-icon')?.addEventListener('click', () => {
        window.location.href = 'carrito.html';
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
        iframe.src = 'miCuenta.html';
        iframe.title = 'Mi Cuenta Duviso';
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

    // Abrir Ayuda (overlay con iframe)
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
        iframe.src = 'ayuda.html';
        iframe.title = 'Ayuda Duviso';
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
        iframe.src = 'idioma.html';
        iframe.title = 'Idioma Duviso';
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

    // Buscar el botón de idioma (no es .btn-help ni .btn-account)
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
        if (data.type === 'close-account') {
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

    // Renderizar tabla de ofertas - AÑADIDA COLUMNA FABRICANTE
    function renderOffers(products) {
        const tbody = document.getElementById('offers-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';

        products.forEach(product => {
            const priceFinal = product.priceOriginal * (1 - product.discount / 100);
            const row = document.createElement('div');
            row.className = 'table-row';
            row.innerHTML = `
        <div class="col-code">${product.code}</div>
        <div class="col-image"><img src="${product.image}" alt="${product.name}"></div>
        <div class="col-product">${product.name}</div>
        <div class="col-manufacturer">${product.manufacturer}</div>
        <div class="col-price">${product.priceOriginal.toFixed(2)}€</div>
        <div class="col-discount">${product.discount}%</div>
        <div class="col-final">${priceFinal.toFixed(2)}€</div>
        <div class="col-action">
          <button class="btn-goto" data-code="${product.code}">›</button>
        </div>
      `;
            tbody.appendChild(row);
        });

        // Botones ">" → ir a catalogoCompras
        document.querySelectorAll('.btn-goto').forEach(btn => {
            btn.addEventListener('click', () => {
                window.location.href = 'catalogoCompras.html';
            });
        });

        if (products.length === 0) {
            tbody.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:#999">No se encontraron productos.</div>';
        }
    }

    // Búsqueda y filtrado
    function filterProducts() {
        const searchCode = document.getElementById('search-code')?.value.toLowerCase() || '';
        const searchName = document.getElementById('search-name')?.value.toLowerCase() || '';
        const searchManufacturer = document.getElementById('search-manufacturer')?.value.toLowerCase() || '';

        filteredProducts = productsData.filter(p => {
            const matchCode = !searchCode || p.code.toLowerCase().includes(searchCode);
            const matchName = !searchName || p.name.toLowerCase().includes(searchName);
            const matchManufacturer = !searchManufacturer || p.manufacturer.toLowerCase().includes(searchManufacturer);
            return matchCode && matchName && matchManufacturer;
        });

        sortProducts();
        renderOffers(filteredProducts);
    }

    // Ordenamiento
    function sortProducts() {
        const sortBy = document.getElementById('sort-by')?.value || '';
        switch (sortBy) {
            case 'name':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price-asc':
                filteredProducts.sort((a, b) => a.priceOriginal - b.priceOriginal);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.priceOriginal - a.priceOriginal);
                break;
            case 'discount-desc':
                filteredProducts.sort((a, b) => b.discount - a.discount);
                break;
            case 'discount-asc':
                filteredProducts.sort((a, b) => a.discount - b.discount);
                break;
            default:
            // mantener orden original
        }
    }

    // Event listeners de búsqueda
    document.getElementById('search-code')?.addEventListener('input', filterProducts);
    document.getElementById('search-name')?.addEventListener('input', filterProducts);
    document.getElementById('search-manufacturer')?.addEventListener('input', filterProducts);
    document.getElementById('sort-by')?.addEventListener('change', filterProducts);

    document.querySelectorAll('.btn-search, .btn-sort').forEach(btn => {
        btn.addEventListener('click', filterProducts);
    });

    // Render inicial
    renderOffers(filteredProducts);
});