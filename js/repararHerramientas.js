document.addEventListener('DOMContentLoaded', () => {
    // Base de datos de productos para reparación
    const productsData = [
        { code: '00001', name: 'Juego Destornilladores', image: '../images/destornilladores.jpg', repairPrice: 5.45, days: '1 a 3 días' },
        { code: '00002', name: 'Martillo Bellota', image: '../images/martillo.jpg', repairPrice: 9.75, days: '1 a 5 días' },
        { code: '00003', name: 'Alicates', image: '../images/alicates.jpg', repairPrice: 11.89, days: '1 a 3 días' },
        { code: '00004', name: 'Llave Inglesa', image: '../images/llave-inglesa.jpg', repairPrice: 14.37, days: '1 a 3 días' },
        { code: '00005', name: 'Cutter Profesional', image: '../images/cutter.jpg', repairPrice: 2.95, days: '1 a 3 días' },
        { code: '00006', name: 'Juego de Llaves Allen', image: '../images/llaves.jpg', repairPrice: 8.69, days: '1 a 3 días' }
    ];

    let filteredProducts = [...productsData];
    let filterAppliedOverlay = null;

    // Función para mostrar popup de filtros aplicados correctamente
    function showFilterAppliedPopup() {
        if (filterAppliedOverlay) return;

        filterAppliedOverlay = document.createElement('div');
        Object.assign(filterAppliedOverlay.style, {
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 10000,
            animation: 'fadeIn 0.2s ease-in-out'
        });

        const panel = document.createElement('div');
        Object.assign(panel.style, {
            width: '90%', maxWidth: '450px', background: '#fff',
            borderRadius: '12px', padding: '40px 32px', position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)', textAlign: 'center',
            animation: 'slideIn 0.3s ease-out'
        });

        const icon = document.createElement('div');
        icon.innerHTML = '✓';
        Object.assign(icon.style, {
            width: '72px', height: '72px', background: '#4caf50', color: '#fff',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '42px', fontWeight: '700', margin: '0 auto 20px'
        });

        const messageText = document.createElement('p');
        messageText.textContent = 'Los filtros se han aplicado correctamente.';
        Object.assign(messageText.style, {
            fontSize: '18px', color: '#333', marginBottom: '28px',
            lineHeight: '1.5', fontWeight: '500'
        });

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Aceptar';
        Object.assign(closeBtn.style, {
            padding: '12px 32px', background: '#4caf50', color: '#fff',
            border: 'none', borderRadius: '25px', fontSize: '16px',
            fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
        });

        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.background = '#45a049';
            closeBtn.style.transform = 'translateY(-2px)';
            closeBtn.style.boxShadow = '0 6px 16px rgba(76, 175, 80, 0.4)';
        });

        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.background = '#4caf50';
            closeBtn.style.transform = 'translateY(0)';
            closeBtn.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)';
        });

        closeBtn.addEventListener('click', closeFilterAppliedPopup);

        panel.appendChild(icon);
        panel.appendChild(messageText);
        panel.appendChild(closeBtn);
        filterAppliedOverlay.appendChild(panel);
        document.body.appendChild(filterAppliedOverlay);

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        // Auto cerrar después de 2 segundos
        setTimeout(() => {
            closeFilterAppliedPopup();
        }, 2000);
    }

    // Función para cerrar popup de filtros aplicados
    function closeFilterAppliedPopup() {
        if (!filterAppliedOverlay) return;
        filterAppliedOverlay.remove();
        filterAppliedOverlay = null;
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

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
            btn.addEventListener('click', () => {
                window.location.href = 'catalogoCompras.html';
            });
        } else if (text.includes('reparar herramientas')) {
            // Ya estamos en reparación, no hacer nada o recargar
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
            closeFilterAppliedPopup();
        }
    });

    // Filtros pills toggle con popup de confirmación
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            pill.classList.toggle('active');
            showFilterAppliedPopup();
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
          <div class="product-repair-price">${product.repairPrice.toFixed(2)} €</div>
          <div class="product-days">${product.days}</div>
        </div>
      `;

            // Al hacer clic, ir a la página de información del producto
            card.addEventListener('click', () => {
                window.location.href = `infoReparacion.html?code=${product.code}`;
            });

            grid.appendChild(card);
        });

        if (products.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#999; padding:40px;">No se encontraron productos.</p>';
        }
    }

    // Filtrar por rango de precio
    function filterByPriceRange(products, min, max) {
        if (min === null && max === null) return products;
        return products.filter(p => {
            const price = p.repairPrice;
            const meetsMin = min === null || price >= min;
            const meetsMax = max === null || price <= max;
            return meetsMin && meetsMax;
        });
    }

    // Filtrar por nombre
    function filterByName(products, searchName) {
        if (!searchName) return products;
        return products.filter(p => p.name.toLowerCase().includes(searchName.toLowerCase()));
    }

    // Filtrar por código
    function filterByCode(products, searchCode) {
        if (!searchCode) return products;
        return products.filter(p => p.code.toLowerCase().includes(searchCode.toLowerCase()));
    }

    // Actualizar vista de productos
    function updateProductsView(showPopup = false) {
        const priceMin = parseFloat(document.getElementById('price-min')?.value) || null;
        const priceMax = parseFloat(document.getElementById('price-max')?.value) || null;
        const searchName = document.getElementById('search-name')?.value || '';
        const searchCode = document.getElementById('search-code')?.value || '';

        // Aplicar filtros
        let filtered = [...productsData];
        filtered = filterByPriceRange(filtered, priceMin, priceMax);
        filtered = filterByName(filtered, searchName);
        filtered = filterByCode(filtered, searchCode);

        filteredProducts = filtered;
        renderProducts(filteredProducts);

        // Mostrar popup solo si se solicita explícitamente
        if (showPopup) {
            showFilterAppliedPopup();
        }
    }

    // Inputs de rango de precio
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const priceSlider = document.querySelector('.price-slider');

    function handlePriceChange(showPopup = true) {
        updateProductsView(showPopup);
    }

    // NO mostrar popup mientras se escribe
    priceMinInput?.addEventListener('input', () => handlePriceChange(false));
    priceMaxInput?.addEventListener('input', () => handlePriceChange(false));

    // Mostrar popup al soltar el input (blur) solo si tiene valor
    priceMinInput?.addEventListener('blur', () => {
        if (priceMinInput.value) handlePriceChange(true);
    });

    priceMaxInput?.addEventListener('blur', () => {
        if (priceMaxInput.value) handlePriceChange(true);
    });

    // Slider: NO mostrar popup mientras se arrastra
    priceSlider?.addEventListener('input', (e) => {
        if (priceMaxInput) {
            priceMaxInput.value = e.target.value;
            handlePriceChange(false);
        }
    });

    // Mostrar popup al soltar el slider
    priceSlider?.addEventListener('change', () => {
        handlePriceChange(true);
    });

    // Búsqueda por nombre: NO mostrar popup mientras se escribe
    const searchNameInput = document.getElementById('search-name');
    searchNameInput?.addEventListener('input', () => updateProductsView(false));

    // Búsqueda por código: NO mostrar popup mientras se escribe
    const searchCodeInput = document.getElementById('search-code');
    searchCodeInput?.addEventListener('input', () => updateProductsView(false));

    // Búsqueda por fabricante: NO mostrar popup mientras se escribe
    const searchManufacturerInput = document.getElementById('search-manufacturer');
    searchManufacturerInput?.addEventListener('input', () => updateProductsView(false));

    // Botones de búsqueda: MOSTRAR POPUP solo al hacer clic
    document.querySelectorAll('.btn-search-filter').forEach(btn => {
        btn.addEventListener('click', () => updateProductsView(true));
    });

    // Renderizado inicial (sin popup - primera carga de la página)
    updateProductsView(false);
});