document.addEventListener('DOMContentLoaded', () => {
    // Base de datos de productos
    const productsData = [
        { code: '00001', name: 'Juego Destornilladores', image: '../images/destornilladores.jpg', priceOld: 28.95, priceCurrent: 26.05 },
        { code: '00002', name: 'Martillo Bellota', image: '../images/martillo.jpg', priceOld: 12.95, priceCurrent: 12.17 },
        { code: '00003', name: 'Alicates', image: '../images/alicates.jpg', priceOld: 14.93, priceCurrent: 12.39 },
        { code: '00004', name: 'Llave Inglesa', image: '../images/llave-inglesa.jpg', priceOld: 28.95, priceCurrent: 23.16 },
        { code: '00005', name: 'Cutter Profesional', image: '../images/cutter.jpg', priceOld: 3.49, priceCurrent: 2.72 },
        { code: '00006', name: 'Juego de Llaves Allen', image: '../images/llaves.jpg', priceOld: 10.49, priceCurrent: 9.12 }
    ];

    let filteredProducts = [...productsData];
    let currentSort = 'newest'; // 'newest', 'price-asc', 'price-desc', 'rating'
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

            // Al hacer clic en la tarjeta, ir a la página de información del producto
            card.addEventListener('click', () => {
                window.location.href = `infoCompras.html?code=${product.code}`;
            });

            // Efecto hover para indicar que es clickeable
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
    function updateProductsView(showPopup = false) {
        const priceMin = parseFloat(document.getElementById('price-min')?.value) || null;
        const priceMax = parseFloat(document.getElementById('price-max')?.value) || null;

        // Filtrar por precio
        let filtered = filterByPriceRange(productsData, priceMin, priceMax);

        // Ordenar
        filtered = sortProducts(filtered, currentSort);

        filteredProducts = filtered;
        renderProducts(filteredProducts);

        // Mostrar popup solo si se solicita explícitamente
        if (showPopup) {
            showFilterAppliedPopup();
        }
    }

    // Botones de control de ordenamiento CON POPUP
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

            // MOSTRAR POPUP al ordenar
            updateProductsView(true);
        });
    });

    // Inputs de rango de precio
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const priceSlider = document.querySelector('.price-slider');

    function handlePriceChange(showPopup = true) {
        updateProductsView(showPopup);
    }

    priceMinInput?.addEventListener('input', () => handlePriceChange(false)); // No mostrar popup mientras escribe
    priceMaxInput?.addEventListener('input', () => handlePriceChange(false)); // No mostrar popup mientras escribe

    // Mostrar popup cuando se suelta el input (blur)
    priceMinInput?.addEventListener('blur', () => {
        if (priceMinInput.value) handlePriceChange(true);
    });

    priceMaxInput?.addEventListener('blur', () => {
        if (priceMaxInput.value) handlePriceChange(true);
    });

    // Slider actualiza el input max
    priceSlider?.addEventListener('input', (e) => {
        if (priceMaxInput) {
            priceMaxInput.value = e.target.value;
            handlePriceChange(false);
        }
    });

    priceSlider?.addEventListener('change', () => {
        handlePriceChange(true); // Mostrar popup al soltar el slider
    });

    // Renderizado inicial (sin popup)
    updateProductsView(false);
});