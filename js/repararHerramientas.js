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

    // Función para convertir números en palabras a números
    function wordsToNumber(text) {
        const numberWords = {
            'cero': 0, 'uno': 1, 'una': 1, 'dos': 2, 'tres': 3, 'cuatro': 4,
            'cinco': 5, 'seis': 6, 'siete': 7, 'ocho': 8, 'nueve': 9,
            'diez': 10, 'once': 11, 'doce': 12, 'trece': 13, 'catorce': 14,
            'quince': 15, 'dieciséis': 16, 'dieciseis': 16, 'diecisiete': 17,
            'dieciocho': 18, 'diecinueve': 19,
            'veinte': 20, 'veintiuno': 21, 'veintidós': 22, 'veintidos': 22,
            'veintitrés': 23, 'veintitres': 23, 'veinticuatro': 24,
            'veinticinco': 25, 'veintiséis': 26, 'veintiseis': 26,
            'veintisiete': 27, 'veintiocho': 28, 'veintinueve': 29,
            'treinta': 30, 'cuarenta': 40, 'cincuenta': 50,
            'sesenta': 60, 'setenta': 70, 'ochenta': 80, 'noventa': 90,
            'cien': 100, 'ciento': 100
        };

        const lowerText = text.toLowerCase().trim();

        const directNumbers = lowerText.match(/\d+/g);
        if (directNumbers && directNumbers.length > 0) {
            return directNumbers.map(n => parseInt(n));
        }

        const foundNumbers = [];
        const words = lowerText.split(/\s+/);

        let i = 0;
        while (i < words.length) {
            let currentNumber = 0;
            let hasNumber = false;

            while (i < words.length) {
                const word = words[i];

                if (numberWords.hasOwnProperty(word)) {
                    currentNumber += numberWords[word];
                    hasNumber = true;
                    i++;

                    if (i < words.length && words[i] === 'y') {
                        i++;
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

        const digitNumbers = lowerCommand.match(/\d+/g);
        if (digitNumbers && digitNumbers.length > 0) {
            return digitNumbers.map(n => parseInt(n));
        }

        const wordNumbers = wordsToNumber(lowerCommand);
        if (wordNumbers && wordNumbers.length > 0) {
            return wordNumbers;
        }

        return null;
    }

    // Función para procesar comandos de voz en reparación de herramientas
    function processVoiceCommand(command) {
        const lowerCommand = command.toLowerCase().trim();
        console.log('Comando recibido en Reparación:', lowerCommand);

        // Comandos de navegación
        if (lowerCommand.includes('inicio') || lowerCommand.includes('principal') || lowerCommand.includes('home')) {
            speak('Volviendo a la página principal');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 800);
        } else if (lowerCommand.includes('comprar') || lowerCommand.includes('catálogo') || lowerCommand.includes('catalogo')) {
            speak('Navegando a comprar herramientas');
            setTimeout(() => {
                window.location.href = 'catalogoCompras.html';
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
        // Comandos de filtro de precio
        else if (lowerCommand.includes('filtrar precio') || lowerCommand.includes('filtro de precio') || lowerCommand.includes('precio entre')) {
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
                speak('Por favor, especifica un rango de precio. Por ejemplo: filtrar precio entre cinco y quince');
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
                speak('Por favor, especifica un precio máximo');
            }
        } else if (lowerCommand.includes('precio mínimo') || lowerCommand.includes('precio minimo') || lowerCommand.includes('desde')) {
            const numbers = extractNumbers(lowerCommand);
            if (numbers && numbers.length > 0) {
                const min = numbers[0];
                if (priceMinInput) priceMinInput.value = min;

                speak(`Filtrando productos desde ${min} euros`);
                updateProductsView(true);
            } else {
                speak('Por favor, especifica un precio mínimo');
            }
        } else if (lowerCommand.includes('quitar filtro') || lowerCommand.includes('limpiar filtro') || lowerCommand.includes('resetear filtro')) {
            if (priceMinInput) priceMinInput.value = '';
            if (priceMaxInput) priceMaxInput.value = '';
            if (priceSlider) priceSlider.value = 100;
            if (searchNameInput) searchNameInput.value = '';
            if (searchCodeInput) searchCodeInput.value = '';

            speak('Filtros eliminados');
            updateProductsView(true);
        } else if (lowerCommand.includes('reparaciones baratas') || lowerCommand.includes('más baratas') || lowerCommand.includes('mas baratas')) {
            if (priceMinInput) priceMinInput.value = '';
            if (priceMaxInput) priceMaxInput.value = '10';
            if (priceSlider) priceSlider.value = 10;

            speak('Mostrando reparaciones hasta 10 euros');
            updateProductsView(true);
        } else if (lowerCommand.includes('reparaciones caras') || lowerCommand.includes('más caras') || lowerCommand.includes('mas caras')) {
            if (priceMinInput) priceMinInput.value = '12';
            if (priceMaxInput) priceMaxInput.value = '';
            if (priceSlider) priceSlider.value = 100;

            speak('Mostrando reparaciones desde 12 euros');
            updateProductsView(true);
        }
        // Comandos de búsqueda por nombre
        else if (lowerCommand.includes('buscar') && (lowerCommand.includes('martillo') || lowerCommand.includes('destornillador') || lowerCommand.includes('alicate') || lowerCommand.includes('llave') || lowerCommand.includes('cutter') || lowerCommand.includes('allen'))) {
            let searchTerm = '';
            if (lowerCommand.includes('martillo')) searchTerm = 'martillo';
            else if (lowerCommand.includes('destornillador')) searchTerm = 'destornilladores';
            else if (lowerCommand.includes('alicate')) searchTerm = 'alicates';
            else if (lowerCommand.includes('llave inglesa')) searchTerm = 'llave inglesa';
            else if (lowerCommand.includes('llave')) searchTerm = 'llaves';
            else if (lowerCommand.includes('cutter')) searchTerm = 'cutter';
            else if (lowerCommand.includes('allen')) searchTerm = 'allen';

            if (searchNameInput) searchNameInput.value = searchTerm;
            speak(`Buscando ${searchTerm}`);
            updateProductsView(true);
        }
        // Comandos de productos específicos
        else if (lowerCommand.includes('destornillador')) {
            speak('Abriendo información de juego de destornilladores');
            setTimeout(() => {
                window.location.href = 'infoReparacion.html?code=00001';
            }, 800);
        } else if (lowerCommand.includes('martillo')) {
            speak('Abriendo información del martillo');
            setTimeout(() => {
                window.location.href = 'infoReparacion.html?code=00002';
            }, 800);
        } else if (lowerCommand.includes('alicate')) {
            speak('Abriendo información de alicates');
            setTimeout(() => {
                window.location.href = 'infoReparacion.html?code=00003';
            }, 800);
        } else if (lowerCommand.includes('llave inglesa') || lowerCommand.includes('inglesa')) {
            speak('Abriendo información de llave inglesa');
            setTimeout(() => {
                window.location.href = 'infoReparacion.html?code=00004';
            }, 800);
        } else if (lowerCommand.includes('cutter')) {
            speak('Abriendo información del cutter');
            setTimeout(() => {
                window.location.href = 'infoReparacion.html?code=00005';
            }, 800);
        } else if (lowerCommand.includes('llaves allen') || lowerCommand.includes('allen')) {
            speak('Abriendo información de llaves Allen');
            setTimeout(() => {
                window.location.href = 'infoReparacion.html?code=00006';
            }, 800);
        } else if (lowerCommand.includes('comandos') || lowerCommand.includes('qué puedo decir') || lowerCommand.includes('que puedo decir')) {
            speak('Puedes decir: filtrar precio, buscar martillo, reparaciones baratas, o el nombre de un producto');
        } else {
            speak('Comando no reconocido. Intenta con: filtrar precio, buscar martillo, o reparaciones baratas');
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
                console.log('Reconocimiento de voz iniciado en Reparación');
                document.getElementById('voice-text').textContent = '🎤 ¡Habla ahora!';

                recognitionTimeout = setTimeout(() => {
                    if (isListening) {
                        console.log('Timeout alcanzado en Reparación');
                        stopVoiceRecognition();
                        speak('Tiempo de espera agotado');
                    }
                }, 10000);
            } catch (error) {
                console.error('Error al iniciar reconocimiento en Reparación:', error);
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

        console.log('Reconocimiento de voz detenido en Reparación');
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
                console.log('Transcripción en tiempo real (Reparación):', displayText);
                document.getElementById('voice-text').textContent = `🎤 "${displayText}"`;
            }

            if (finalTranscript) {
                console.log('Transcripción final (Reparación):', finalTranscript);

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
            console.error('Error en reconocimiento de voz (Reparación):', event.error);

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
            console.log('Evento onend disparado (Reparación)');
            if (isListening) {
                console.log('Reconocimiento terminó inesperadamente (Reparación)');
                stopVoiceRecognition();
            }
        };

        recognition.onstart = () => {
            console.log('Reconocimiento iniciado exitosamente (Reparación)');
            document.getElementById('voice-text').textContent = '🎤 ¡Habla ahora!';
        };

        recognition.onaudiostart = () => {
            console.log('Audio detectado (Reparación)');
            document.getElementById('voice-text').textContent = '🎤 Escuchando...';
        };

        recognition.onspeechstart = () => {
            console.log('Voz detectada (Reparación)');
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

    // Renderizado inicial (sin popup - primera carga de la página)
    updateProductsView(false);
});