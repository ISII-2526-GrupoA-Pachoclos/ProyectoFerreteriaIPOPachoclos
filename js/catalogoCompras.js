document.addEventListener('DOMContentLoaded', () => {
    // Base de datos de productos
    const productsData = [
        { name: 'Juego Destornilladores', image: '../images/destornilladores.jpg', priceOld: 28.95, priceCurrent: 26.05 },
        { name: 'Martillo Bellota', image: '../images/martillo.jpg', priceOld: 12.95, priceCurrent: 12.17 },
        { name: 'Alicates', image: '../images/alicates.jpg', priceOld: 14.93, priceCurrent: 12.39 },
        { name: 'Llave Inglesa', image: '../images/llave-inglesa.jpg', priceOld: 28.95, priceCurrent: 23.16 },
        { name: 'Cutter Profesional', image: '../images/cutter.jpg', priceOld: 3.49, priceCurrent: 2.72 },
        { name: 'Juego de Llaves Allen', image: '../images/llaves.jpg', priceOld: 10.49, priceCurrent: 9.12 }
    ];

    let filteredProducts = [...productsData];
    let currentSort = 'newest'; // 'newest', 'price-asc', 'price-desc', 'rating'

    // Navegación al hacer clic en el logo
    const logo = document.getElementById('logo-link');
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = '../index.html';
        });
        logo.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = '../index.html';
            }
        });
    }

    // Navegación entre botones de acción del header
    const actionBtns = document.querySelectorAll('.btn-action');
    actionBtns.forEach(btn => {
        const text = btn.textContent.trim().toLowerCase();
        if (text.includes('crear ofertas')) {
            btn.addEventListener('click', () => {
                window.location.href = 'crearOfertas.html';
            });
        } else if (text.includes('comprar herramientas')) {
            // Ya estamos en catálogo, no hacer nada o recargar
            btn.addEventListener('click', () => {
                window.location.reload();
            });
        } else if (text.includes('reparar herramientas')) {
            btn.addEventListener('click', () => {
                window.location.href = 'repararHerramientas.html';
            });
        } else {
            btn.addEventListener('click', () => {
                console.log('Acción seleccionada:', text);
            });
        }
    });

    // Placeholder carrito
    document.querySelector('.cart-icon')?.addEventListener('click', () => {
        alert('Carrito: funcionalidad no implementada.');
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
                return sorted; // mantener orden original
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

        // Filtrar por precio
        let filtered = filterByPriceRange(productsData, priceMin, priceMax);

        // Ordenar
        filtered = sortProducts(filtered, currentSort);

        filteredProducts = filtered;
        renderProducts(filteredProducts);
    }

    // Botones de control de ordenamiento
    const btnControls = document.querySelectorAll('.btn-control');
    btnControls.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Remover active de todos
            btnControls.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Determinar tipo de ordenamiento según el texto del botón
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

    // Slider actualiza el input max
    priceSlider?.addEventListener('input', (e) => {
        if (priceMaxInput) {
            priceMaxInput.value = e.target.value;
            handlePriceChange();
        }
    });

    // Renderizado inicial
    updateProductsView();
});