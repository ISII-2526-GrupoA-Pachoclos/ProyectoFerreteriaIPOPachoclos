document.addEventListener('DOMContentLoaded', () => {
    // Base de datos de productos para compra - VERSIÓN PROTANOPIA
    const productsData = {
        '00001': {
            name: 'Juego Destornilladores',
            image: '../imagesDaltonismo/destornilladoresProtanopia.png',
            priceOld: 28.95,
            priceCurrent: 26.05,
            discount: 10,
            badge: 'Producto nuevo',
            description: [
                'Vástago aislado fabricado en cromo-vanadio',
                'Punta plana endurecida, templada y lacada en negro para mayor precisión',
                'Mango ergonómico y engomado bicolor para mayor comodidad y rendimiento',
                'Mango fabricado en dos materiales diferentes para mayor adherencia y control',
                'Certificado por vde y protección eléctrica hasta 1.000 v ca; resistente hasta 10.000 v'
            ]
        },
        '00002': {
            name: 'Martillo Bellota',
            image: '../imagesDaltonismo/martilloProtanopia.png',
            priceOld: 12.95,
            priceCurrent: 12.17,
            discount: 6,
            badge: 'Producto seminuevo',
            description: [
                'Cabeza forjada en acero de alta calidad',
                'Mango de madera de nogal, resistente y duradero',
                'Peso equilibrado para mayor precisión en el golpe',
                'Acabado pulido y cromado',
                'Ideal para trabajos de carpintería y construcción'
            ]
        },
        '00003': {
            name: 'Alicates',
            image: '../imagesDaltonismo/alicatesProtanopia.png',
            priceOld: 14.93,
            priceCurrent: 12.39,
            discount: 17,
            badge: 'Producto nuevo',
            description: [
                'Fabricados en acero al cromo-vanadio',
                'Mangos ergonómicos con recubrimiento antideslizante',
                'Mordazas dentadas para mejor agarre',
                'Cuchillas de corte endurecidas',
                'Articulación reforzada para mayor durabilidad'
            ]
        },
        '00004': {
            name: 'Llave Inglesa',
            image: '../images/llave-inglesa.jpg',
            priceOld: 28.95,
            priceCurrent: 23.16,
            discount: 20,
            badge: 'Producto nuevo',
            description: [
                'Fabricada en acero al cromo-vanadio forjado',
                'Mecanismo de ajuste suave y preciso',
                'Mordazas endurecidas con acabado cromado',
                'Mango ergonómico con superficie antideslizante',
                'Apertura máxima de hasta 30mm'
            ]
        },
        '00005': {
            name: 'Cutter Profesional',
            image: '../imagesDaltonismo/cutterProtanopia.png',
            priceOld: 3.49,
            priceCurrent: 2.72,
            discount: 22,
            badge: 'Producto seminuevo',
            description: [
                'Cuerpo metálico resistente',
                'Cuchilla de acero inoxidable de alta calidad',
                'Sistema de bloqueo de seguridad',
                'Cuchilla retráctil con múltiples posiciones',
                'Incluye 3 cuchillas de repuesto'
            ]
        },
        '00006': {
            name: 'Juego de Llaves Allen',
            image: '../imagesDaltonismo/llavesProtanopia.png',
            priceOld: 10.49,
            priceCurrent: 9.12,
            discount: 13,
            badge: 'Producto seminuevo',
            description: [
                'Set de 9 llaves hexagonales',
                'Acero al cromo-vanadio endurecido',
                'Medidas: 1.5mm a 10mm',
                'Acabado cromado anticorrosión',
                'Estuche organizador incluido'
            ]
        }
    };

    // Obtener el código del producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productCode = urlParams.get('code') || '00001';

    // Cargar datos del producto
    const product = productsData[productCode] || productsData['00001'];

    // Actualizar la interfaz con los datos del producto
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('price-old').textContent = `${product.priceOld.toFixed(2)} €`;
    document.getElementById('discount-badge').textContent = `-${product.discount}%`;
    document.getElementById('product-price').textContent = `${product.priceCurrent.toFixed(2)} €`;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-image').alt = product.name;
    document.getElementById('product-badge').textContent = product.badge;

    // Renderizar descripción del producto
    const productDetailsList = document.getElementById('product-details');
    productDetailsList.innerHTML = '';

    product.description.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        productDetailsList.appendChild(li);
    });

    // Control de cantidad
    let quantity = 0;
    const quantityInput = document.getElementById('quantity-input');
    const btnDecrease = document.getElementById('btn-decrease');
    const btnIncrease = document.getElementById('btn-increase');

    function updateQuantity(newQuantity) {
        quantity = Math.max(0, newQuantity);
        quantityInput.value = quantity;
    }

    btnDecrease.addEventListener('click', () => {
        updateQuantity(quantity - 1);
    });

    btnIncrease.addEventListener('click', () => {
        updateQuantity(quantity + 1);
    });

    // Añadir al carrito
    document.getElementById('btn-add-cart').addEventListener('click', () => {
        if (quantity === 0) {
            alert('Por favor, selecciona una cantidad mayor a 0');
            return;
        }

        // Cargar carrito existente
        let cart = JSON.parse(localStorage.getItem('duvisoCart')) || [];

        // Buscar si el producto ya existe en el carrito
        const existingItemIndex = cart.findIndex(item =>
            item.code === productCode && item.type === 'purchase'
        );

        if (existingItemIndex >= 0) {
            // Si existe, actualizar cantidad
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Si no existe, agregar nuevo item
            cart.push({
                code: productCode,
                name: product.name,
                image: product.image,
                price: product.priceCurrent,
                priceOld: product.priceOld,
                discount: product.discount,
                badge: product.badge,
                quantity: quantity,
                type: 'purchase'
            });
        }

        // Guardar en localStorage
        localStorage.setItem('duvisoCart', JSON.stringify(cart));

        // Redirigir al carrito (versión protanopia)
        window.location.href = 'carritoProtanopia.html';
    });

    // Navegación al hacer clic en el logo - VERSIÓN PROTANOPIA
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

    // Navegación entre botones de acción del header - VERSIONES PROTANOPIA
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

    // Placeholder carrito - VERSIÓN PROTANOPIA
    document.querySelector('.cart-icon')?.addEventListener('click', () => {
        window.location.href = 'carritoProtanopia.html';
    });

    // Abrir Mi Cuenta (overlay con iframe) - VERSIÓN PROTANOPIA
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
        iframe.src = 'miCuentaProtanopia.html';
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

    // Abrir ayuda (overlay con iframe) - VERSIÓN PROTANOPIA
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
        iframe.src = 'ayudaProtanopia.html';
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

    // Abrir idioma (overlay con iframe) - VERSIÓN PROTANOPIA
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
        iframe.src = 'idiomaProtanopia.html';
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
});