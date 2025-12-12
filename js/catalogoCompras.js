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

    // ========================================
    // FUNCIONALIDAD DE VOZ (Speech Recognition & Synthesis)
    // ========================================

    // Verificar compatibilidad del navegador
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechSynthesis = window.speechSynthesis;
    let recognition = null;
    let isListening = false;
    let voiceIndicator = null;
    let recognitionTimeout = null;

    // Inicializar reconocimiento de voz
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 3;

        // Crear indicador visual de micrófono activo
        voiceIndicator = document.createElement('div');
        voiceIndicator.id = 'voice-indicator';
        Object.assign(voiceIndicator.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.5)',
            zIndex: 10001,
            animation: 'pulse 1.5s ease-in-out infinite'
        });

        const micIcon = document.createElement('div');
        micIcon.innerHTML = '🎤';
        micIcon.style.fontSize = '36px';
        voiceIndicator.appendChild(micIcon);

        const voiceText = document.createElement('div');
        voiceText.id = 'voice-text';
        Object.assign(voiceText.style, {
            position: 'fixed',
            bottom: '120px',
            right: '30px',
            background: 'rgba(0, 0, 0, 0.85)',
            color: '#fff',
            padding: '15px 20px',
            borderRadius: '10px',
            display: 'none',
            maxWidth: '300px',
            fontSize: '14px',
            zIndex: 10001,
            fontWeight: '500',
            textAlign: 'center'
        });
        voiceText.textContent = 'Escuchando...';

        document.body.appendChild(voiceIndicator);
        document.body.appendChild(voiceText);

        // Agregar animación de pulso al CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
                }
                50% {
                    transform: scale(1.1);
                    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Función de síntesis de voz (Text-to-Speech)
    function speak(text) {
        if (!SpeechSynthesis) {
            console.warn('Síntesis de voz no soportada');
            return;
        }

        SpeechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        SpeechSynthesis.speak(utterance);
    }

    // Función para procesar comandos de voz en catálogo de compras
    // Función para procesar comandos de voz en catálogo de compras
    function processVoiceCommand(command) {
        const lowerCommand = command.toLowerCase().trim();
        console.log('Comando recibido en Catálogo:', lowerCommand);

        // Comandos de navegación
        if (lowerCommand.includes('inicio') || lowerCommand.includes('principal') || lowerCommand.includes('home')) {
            speak('Volviendo a la página principal');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 800);
        } else if (lowerCommand.includes('reparar')) {
            speak('Navegando a reparar herramientas');
            setTimeout(() => {
                window.location.href = 'repararHerramientas.html';
            }, 800);
        } else if (lowerCommand.includes('ofertas') || lowerCommand.includes('crear ofertas')) {
            speak('Navegando a crear ofertas');
            setTimeout(() => {
                window.location.href = 'crearOfertas.html';
            }, 800);
        } else if (lowerCommand.includes('carrito') || lowerCommand.includes('carro')) {
            speak('Abriendo carrito de compras');
            setTimeout(() => {
                window.location.href = 'carrito.html';
            }, 800);
        } else if (lowerCommand.includes('cuenta') || lowerCommand.includes('mi cuenta')) {
            speak('Abriendo tu cuenta');
            setTimeout(() => {
                openAccount();
            }, 800);
        } else if (lowerCommand.includes('ayuda')) {
            speak('Abriendo la ayuda');
            setTimeout(() => {
                openHelp();
            }, 800);
        } else if (lowerCommand.includes('idioma')) {
            speak('Abriendo configuración de idioma');
            setTimeout(() => {
                openLanguage();
            }, 800);
        }
        // Comandos de ordenamiento
        else if (lowerCommand.includes('más nuevo') || lowerCommand.includes('mas nuevo') || lowerCommand.includes('nuevos')) {
            speak('Ordenando por más nuevos');
            currentSort = 'newest';
            btnControls.forEach(b => b.classList.remove('active'));
            btnControls[0]?.classList.add('active');
            updateProductsView(true);
        } else if (lowerCommand.includes('precio ascendente') || lowerCommand.includes('menor precio') || lowerCommand.includes('más barato') || lowerCommand.includes('mas barato')) {
            speak('Ordenando por precio ascendente');
            currentSort = 'price-asc';
            btnControls.forEach(b => b.classList.remove('active'));
            btnControls[1]?.classList.add('active');
            updateProductsView(true);
        } else if (lowerCommand.includes('precio descendente') || lowerCommand.includes('mayor precio') || lowerCommand.includes('más caro') || lowerCommand.includes('mas caro')) {
            speak('Ordenando por precio descendente');
            currentSort = 'price-desc';
            btnControls.forEach(b => b.classList.remove('active'));
            btnControls[2]?.classList.add('active');
            updateProductsView(true);
        } else if (lowerCommand.includes('mejor valorado') || lowerCommand.includes('valoración') || lowerCommand.includes('valoracion')) {
            speak('Ordenando por mejor valorados');
            currentSort = 'rating';
            btnControls.forEach(b => b.classList.remove('active'));
            btnControls[3]?.classList.add('active');
            updateProductsView(true);
        }
        // COMANDOS PARA FILTRO DE PRECIO POR VOZ (CON CONVERSIÓN DE PALABRAS A NÚMEROS)
        else if (lowerCommand.includes('filtrar precio') || lowerCommand.includes('filtro de precio') || lowerCommand.includes('precio entre')) {
            // Extraer números del comando (dígitos o palabras)
            const numbers = extractNumbers(lowerCommand);
            if (numbers && numbers.length >= 2) {
                const min = numbers[0];
                const max = numbers[1];

                if (priceMinInput) priceMinInput.value = min;
                if (priceMaxInput) priceMaxInput.value = max;
                if (priceSlider) priceSlider.value = max;

                speak(`Filtrando productos entre ${min} y ${max} euros`);
                updateProductsView(true);
            } else if (numbers && numbers.length === 1) {
                const price = numbers[0];
                if (priceMaxInput) priceMaxInput.value = price;
                if (priceSlider) priceSlider.value = price;

                speak(`Filtrando productos hasta ${price} euros`);
                updateProductsView(true);
            } else {
                speak('Por favor, especifica un rango de precio. Por ejemplo: filtrar precio entre diez y cincuenta');
            }
        } else if (lowerCommand.includes('precio máximo') || lowerCommand.includes('precio maximo') || lowerCommand.includes('hasta')) {
            const numbers = extractNumbers(lowerCommand);
            if (numbers && numbers.length > 0) {
                const max = numbers[0];
                if (priceMaxInput) priceMaxInput.value = max;
                if (priceSlider) priceSlider.value = max;

                speak(`Filtrando productos hasta ${max} euros`);
                updateProductsView(true);
            } else {
                speak('Por favor, especifica un precio máximo. Por ejemplo: precio máximo cincuenta');
            }
        } else if (lowerCommand.includes('precio mínimo') || lowerCommand.includes('precio minimo') || lowerCommand.includes('desde')) {
            const numbers = extractNumbers(lowerCommand);
            if (numbers && numbers.length > 0) {
                const min = numbers[0];
                if (priceMinInput) priceMinInput.value = min;

                speak(`Filtrando productos desde ${min} euros`);
                updateProductsView(true);
            } else {
                speak('Por favor, especifica un precio mínimo. Por ejemplo: precio mínimo diez');
            }
        } else if (lowerCommand.includes('quitar filtro') || lowerCommand.includes('limpiar filtro') || lowerCommand.includes('borrar filtro') || lowerCommand.includes('resetear filtro')) {
            if (priceMinInput) priceMinInput.value = '';
            if (priceMaxInput) priceMaxInput.value = '';
            if (priceSlider) priceSlider.value = 100;

            speak('Filtros de precio eliminados');
            updateProductsView(true);
        } else if (lowerCommand.includes('productos baratos') || lowerCommand.includes('más baratos') || lowerCommand.includes('mas baratos')) {
            if (priceMinInput) priceMinInput.value = '';
            if (priceMaxInput) priceMaxInput.value = '15';
            if (priceSlider) priceSlider.value = 15;

            speak('Mostrando productos hasta 15 euros');
            updateProductsView(true);
        } else if (lowerCommand.includes('productos caros') || lowerCommand.includes('más caros') || lowerCommand.includes('mas caros')) {
            if (priceMinInput) priceMinInput.value = '20';
            if (priceMaxInput) priceMaxInput.value = '';
            if (priceSlider) priceSlider.value = 100;

            speak('Mostrando productos desde 20 euros');
            updateProductsView(true);
        } else if (lowerCommand.includes('rango medio') || lowerCommand.includes('precio medio')) {
            if (priceMinInput) priceMinInput.value = '10';
            if (priceMaxInput) priceMaxInput.value = '25';
            if (priceSlider) priceSlider.value = 25;

            speak('Mostrando productos entre 10 y 25 euros');
            updateProductsView(true);
        }
        // Comandos de productos específicos
        else if (lowerCommand.includes('destornillador')) {
            speak('Abriendo información del juego de destornilladores');
            setTimeout(() => {
                window.location.href = 'infoCompras.html?code=00001';
            }, 800);
        } else if (lowerCommand.includes('martillo')) {
            speak('Abriendo información del martillo');
            setTimeout(() => {
                window.location.href = 'infoCompras.html?code=00002';
            }, 800);
        } else if (lowerCommand.includes('alicate')) {
            speak('Abriendo información de los alicates');
            setTimeout(() => {
                window.location.href = 'infoCompras.html?code=00003';
            }, 800);
        } else if (lowerCommand.includes('llave inglesa') || lowerCommand.includes('inglesa')) {
            speak('Abriendo información de la llave inglesa');
            setTimeout(() => {
                window.location.href = 'infoCompras.html?code=00004';
            }, 800);
        } else if (lowerCommand.includes('cutter')) {
            speak('Abriendo información del cutter profesional');
            setTimeout(() => {
                window.location.href = 'infoCompras.html?code=00005';
            }, 800);
        } else if (lowerCommand.includes('llaves allen') || lowerCommand.includes('allen')) {
            speak('Abriendo información del juego de llaves Allen');
            setTimeout(() => {
                window.location.href = 'infoCompras.html?code=00006';
            }, 800);
        } else if (lowerCommand.includes('comandos') || lowerCommand.includes('qué puedo decir') || lowerCommand.includes('que puedo decir')) {
            speak('Puedes decir: precio máximo quince, filtrar precio entre diez y treinta, productos baratos, o buscar productos por nombre');
        } else {
            speak('Comando no reconocido. Intenta con: precio máximo quince, o filtrar precio entre diez y treinta');
        }
    }

    // Función para iniciar reconocimiento de voz
    function startVoiceRecognition() {
        if (!recognition) {
            alert('El reconocimiento de voz no está disponible en tu navegador. Prueba con Chrome, Edge o Safari.');
            return;
        }

        if (isListening) {
            stopVoiceRecognition();
            return;
        }

        isListening = true;
        voiceIndicator.style.display = 'flex';
        document.getElementById('voice-text').style.display = 'block';
        document.getElementById('voice-text').textContent = '🎤 Preparando micrófono...';

        if (recognitionTimeout) {
            clearTimeout(recognitionTimeout);
        }

        speak('Te escucho. ¿Qué quieres hacer?');

        setTimeout(() => {
            try {
                recognition.start();
                console.log('Reconocimiento de voz iniciado en Catálogo');
                document.getElementById('voice-text').textContent = '🎤 ¡Habla ahora!';

                recognitionTimeout = setTimeout(() => {
                    if (isListening) {
                        console.log('Timeout alcanzado en Catálogo');
                        stopVoiceRecognition();
                        speak('Tiempo de espera agotado');
                    }
                }, 10000);
            } catch (error) {
                console.error('Error al iniciar reconocimiento en Catálogo:', error);
                stopVoiceRecognition();
            }
        }, 2000);
    }

    // Función para detener reconocimiento de voz
    function stopVoiceRecognition() {
        if (recognition && isListening) {
            recognition.stop();
        }
        isListening = false;
        voiceIndicator.style.display = 'none';
        document.getElementById('voice-text').style.display = 'none';

        if (recognitionTimeout) {
            clearTimeout(recognitionTimeout);
            recognitionTimeout = null;
        }

        console.log('Reconocimiento de voz detenido en Catálogo');
    }

    // Eventos del reconocimiento de voz
    if (recognition) {
        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            const displayText = finalTranscript || interimTranscript;
            if (displayText) {
                console.log('Transcripción en tiempo real (Catálogo):', displayText);
                document.getElementById('voice-text').textContent = `🎤 "${displayText}"`;
            }

            if (finalTranscript) {
                console.log('Transcripción final (Catálogo):', finalTranscript);

                if (recognitionTimeout) {
                    clearTimeout(recognitionTimeout);
                }

                setTimeout(() => {
                    processVoiceCommand(finalTranscript);
                    stopVoiceRecognition();
                }, 300);
            }
        };

        recognition.onerror = (event) => {
            console.error('Error en reconocimiento de voz (Catálogo):', event.error);

            if (recognitionTimeout) {
                clearTimeout(recognitionTimeout);
            }

            if (event.error === 'no-speech') {
                document.getElementById('voice-text').textContent = '⚠️ No se detectó voz';
                speak('No se detectó ningún comando. Intenta de nuevo.');
            } else if (event.error === 'not-allowed') {
                alert('Permiso de micrófono denegado. Por favor, permite el acceso al micrófono.');
            } else if (event.error === 'aborted') {
                console.log('Reconocimiento abortado');
            } else {
                document.getElementById('voice-text').textContent = '❌ Error al reconocer';
                speak('Error al reconocer el comando');
            }

            setTimeout(() => {
                stopVoiceRecognition();
            }, 2000);
        };

        recognition.onend = () => {
            console.log('Evento onend disparado (Catálogo)');
            if (isListening) {
                console.log('Reconocimiento terminó inesperadamente (Catálogo)');
                stopVoiceRecognition();
            }
        };

        recognition.onstart = () => {
            console.log('Reconocimiento iniciado exitosamente (Catálogo)');
            document.getElementById('voice-text').textContent = '🎤 ¡Habla ahora!';
        };

        recognition.onaudiostart = () => {
            console.log('Audio detectado (Catálogo)');
            document.getElementById('voice-text').textContent = '🎤 Escuchando...';
        };

        recognition.onspeechstart = () => {
            console.log('Voz detectada (Catálogo)');
            document.getElementById('voice-text').textContent = '🎤 Te escucho...';
        };
    }

    // Detectar tecla V para activar reconocimiento de voz
    document.addEventListener('keydown', (e) => {
        if (e.key === 'v' || e.key === 'V') {
            const activeElement = document.activeElement;
            if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                startVoiceRecognition();
            }
        }

        if (e.key === 'Escape') {
            stopVoiceRecognition();
            closeHelp();
            closeAccount();
            closeLanguage();
            closeFilterAppliedPopup();
        }
    });

    // ========================================
    // FIN FUNCIONALIDAD DE VOZ
    // ========================================

    // Renderizado inicial (sin popup)
    updateProductsView(false);
        // Función para convertir números en palabras a números
        function wordsToNumber(text) {
            const numberWords = {
                // Números básicos
                'cero': 0, 'uno': 1, 'dos': 2, 'tres': 3, 'cuatro': 4,
                'cinco': 5, 'seis': 6, 'siete': 7, 'ocho': 8, 'nueve': 9,
                'diez': 10, 'once': 11, 'doce': 12, 'trece': 13, 'catorce': 14,
                'quince': 15, 'dieciséis': 16, 'dieciseis': 16, 'diecisiete': 17, 
                'dieciocho': 18, 'diecinueve': 19,
                // Decenas
                'veinte': 20, 'veintiuno': 21, 'veintidós': 22, 'veintidos': 22,
                'veintitrés': 23, 'veintitres': 23, 'veinticuatro': 24,
                'veinticinco': 25, 'veintiséis': 26, 'veintiseis': 26,
                'veintisiete': 27, 'veintiocho': 28, 'veintinueve': 29,
                'treinta': 30, 'cuarenta': 40, 'cincuenta': 50,
                'sesenta': 60, 'setenta': 70, 'ochenta': 80, 'noventa': 90,
                // Centenas
                'cien': 100, 'ciento': 100, 'doscientos': 200, 'trescientos': 300,
                'cuatrocientos': 400, 'quinientos': 500, 'seiscientos': 600,
                'setecientos': 700, 'ochocientos': 800, 'novecientos': 900
            };

            // Convertir a minúsculas y limpiar
            const lowerText = text.toLowerCase().trim();
            
            // Primero intentar buscar números directos (dígitos)
            const directNumbers = lowerText.match(/\d+/g);
            if (directNumbers && directNumbers.length > 0) {
                return directNumbers.map(n => parseInt(n));
            }

            // Buscar palabras de números en el texto
            const foundNumbers = [];
            const words = lowerText.split(/\s+/);
            
            let i = 0;
            while (i < words.length) {
                let currentNumber = 0;
                let hasNumber = false;

                // Intentar construir un número compuesto
                while (i < words.length) {
                    const word = words[i];
                    
                    // Verificar si es una palabra de número simple
                    if (numberWords.hasOwnProperty(word)) {
                        const value = numberWords[word];
                        
                        if (value >= 100) {
                            // Centenas
                            currentNumber += value;
                        } else if (value >= 10 && value < 100) {
                            // Decenas
                            currentNumber += value;
                        } else {
                            // Unidades
                            currentNumber += value;
                        }
                        hasNumber = true;
                        i++;
                        
                        // Verificar si la siguiente palabra es "y" para números compuestos
                        if (i < words.length && words[i] === 'y') {
                            i++; // saltar "y"
                            continue;
                        }
                    } else {
                        break;
                    }
                }

                if (hasNumber) {
                    foundNumbers.push(currentNumber);
                } else {
                    i++;
                }
            }

            return foundNumbers.length > 0 ? foundNumbers : null;
        }

        // Función auxiliar para extraer números (dígitos o palabras) de un comando
        function extractNumbers(command) {
            const lowerCommand = command.toLowerCase().trim();
            
            // Primero intentar extraer números como dígitos
            const digitNumbers = lowerCommand.match(/\d+/g);
            if (digitNumbers && digitNumbers.length > 0) {
                return digitNumbers.map(n => parseInt(n));
            }

            // Si no hay dígitos, intentar extraer números como palabras
            const wordNumbers = wordsToNumber(lowerCommand);
            if (wordNumbers && wordNumbers.length > 0) {
                return wordNumbers;
            }

            return null;
        }
});