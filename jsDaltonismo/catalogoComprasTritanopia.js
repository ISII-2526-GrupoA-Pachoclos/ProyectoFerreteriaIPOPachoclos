document.addEventListener('DOMContentLoaded', () => {
    // Base de datos de productos para tritanopia
    const productsData = [
        { code: '00001', name: 'Juego Destornilladores', image: '../imagesDaltonismo/destornilladoresTritanopia.png', priceOld: 28.95, priceCurrent: 26.05 },
        { code: '00002', name: 'Martillo Bellota', image: '../imagesDaltonismo/martilloTritanopia.png', priceOld: 12.95, priceCurrent: 12.17 },
        { code: '00003', name: 'Alicates', image: '../imagesDaltonismo/alicatesTritanopia.png', priceOld: 14.93, priceCurrent: 12.39 },
        { code: '00004', name: 'Llave Inglesa', image: '../images/llave-inglesa.jpg', priceOld: 28.95, priceCurrent: 23.16 },
        { code: '00005', name: 'Cutter Profesional', image: '../imagesDaltonismo/cutterTritanopia.png', priceOld: 3.49, priceCurrent: 2.72 },
        { code: '00006', name: 'Juego de Llaves Allen', image: '../imagesDaltonismo/llavesTritanopia.png', priceOld: 10.49, priceCurrent: 9.12 }
    ];

    let filteredProducts = [...productsData];
    let currentSort = 'newest'; // 'newest', 'price-asc', 'price-desc', 'rating'

    // Navegación al hacer clic en el logo - VERSIÓN TRITANOPIA
    const logo = document.getElementById('logo-link');
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = '../htmlDaltonismo/indexTritanopia.html';
        });
        logo.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = '../htmlDaltonismo/indexTritanopia.html';
            }
        });
    }

    // Navegación entre botones de acción del header - VERSIONES TRITANOPIA
    const actionBtns = document.querySelectorAll('.btn-action');
    actionBtns.forEach(btn => {
        const text = btn.textContent.trim().toLowerCase();
        if (text.includes('crear ofertas')) {
            btn.addEventListener('click', () => {
                window.location.href = 'crearOfertasTritanopia.html';
            });
        } else if (text.includes('comprar herramientas')) {
            btn.addEventListener('click', () => {
                window.location.reload();
            });
        } else if (text.includes('reparar herramientas')) {
            btn.addEventListener('click', () => {
                window.location.href = 'repararHerramientasTritanopia.html';
            });
        }
    });

    // Placeholder carrito - VERSIÓN TRITANOPIA
    document.querySelector('.cart-icon')?.addEventListener('click', () => {
        window.location.href = 'carritoTritanopia.html';
    });
    
    // Abrir Mi Cuenta (overlay con iframe) - VERSIÓN TRITANOPIA
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
        iframe.src = 'miCuentaTritanopia.html';
        iframe.title = 'Mi Cuenta Duviso (Tritanopia)';
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

    // Abrir ayuda (overlay con iframe) - VERSIÓN TRITANOPIA
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
        iframe.src = 'ayudaTritanopia.html';
        iframe.title = 'Ayuda Duviso (Tritanopia)';
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

    // Abrir idioma (overlay con iframe) - VERSIÓN TRITANOPIA
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
        iframe.src = 'idiomaTritanopia.html';
        iframe.title = 'Idioma Duviso (Tritanopia)';
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
        if (data.type === 'close-account' || data.type === 'close-account-tritanopia') {
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

    // Filtros pills toggle
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            pill.classList.toggle('active');
        });
    });

    // Renderizar productos
    function renderProducts(products) {
        const grid = document.querySelector('.products-grid');
        if (!grid) return;

        grid.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.cursor = 'pointer';
            card.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <div class="product-prices">
            <span class="price-old">${product.priceOld.toFixed(2)} €</span>
            <span class="price-current">${product.priceCurrent.toFixed(2)} €</span>
          </div>
        </div>
      `;

            // Al hacer clic en la tarjeta, ir a la página de información del producto (tritanopia)
            card.addEventListener('click', () => {
                window.location.href = `infoComprasTritanopia.html?code=${product.code}`;
            });

            // Efecto hover
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.transition = 'transform 0.3s ease';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });

            grid.appendChild(card);
        });

        if (products.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#999; padding:40px;">No se encontraron productos en este rango de precio.</p>';
        }
    }

    // Ordenar productos
    function sortProducts(products, sortType) {
        const sorted = [...products];
        switch (sortType) {
            case 'price-asc':
                return sorted.sort((a, b) => a.priceCurrent - b.priceCurrent);
            case 'price-desc':
                return sorted.sort((a, b) => b.priceCurrent - a.priceCurrent);
            case 'newest':
            case 'rating':
            default:
                return sorted;
        }
    }

    // Filtrar por rango de precio
    function filterByPriceRange(products, min, max) {
        if (min === null && max === null) return products;
        return products.filter(p => {
            const price = p.priceCurrent;
            const meetsMin = min === null || price >= min;
            const meetsMax = max === null || price <= max;
            return meetsMin && meetsMax;
        });
    }

    // Actualizar vista de productos
    function updateProductsView() {
        const priceMin = parseFloat(document.getElementById('price-min')?.value) || null;
        const priceMax = parseFloat(document.getElementById('price-max')?.value) || null;

        let filtered = filterByPriceRange(productsData, priceMin, priceMax);
        filtered = sortProducts(filtered, currentSort);

        filteredProducts = filtered;
        renderProducts(filteredProducts);
    }

    // Botones de control de ordenamiento
    const btnControls = document.querySelectorAll('.btn-control');
    btnControls.forEach((btn) => {
        btn.addEventListener('click', () => {
            btnControls.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const text = btn.textContent.trim().toLowerCase();
            if (text.includes('más nuevo')) {
                currentSort = 'newest';
            } else if (text.includes('ascendente')) {
                currentSort = 'price-asc';
            } else if (text.includes('descendente')) {
                currentSort = 'price-desc';
            } else if (text.includes('valorado')) {
                currentSort = 'rating';
            }

            updateProductsView();
        });
    });

    // Inputs de rango de precio
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const priceSlider = document.querySelector('.price-slider');

    function handlePriceChange() {
        updateProductsView();
    }

    priceMinInput?.addEventListener('input', handlePriceChange);
    priceMaxInput?.addEventListener('input', handlePriceChange);

    priceSlider?.addEventListener('input', (e) => {
        if (priceMaxInput) {
            priceMaxInput.value = e.target.value;
            handlePriceChange();
        }
    });

    // Renderizado inicial
    updateProductsView();
});
