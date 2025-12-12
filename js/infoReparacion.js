document.addEventListener('DOMContentLoaded', () => {
    // Base de datos de productos para reparación - ACTUALIZADA CON CÓDIGOS R
    const productsData = {
        'R0001': {  // ← Cambiar de '00001' a 'R0001'
            name: 'Reparación Destornilladores',
            image: '../images/destornilladores.jpg',
            price: 5.45,
            days: '1-3 días',
            description: [
                {
                    title: 'Sustitución de la Herramienta (Opción Recomendada):',
                    items: [
                        'Si la punta (plana, Phillips, Torx) está muy redondeada, doblada o mellada, se desecha el destornillador y se reemplaza por uno nuevo.'
                    ]
                }
            ]
        },
        'R0002': {  // ← Cambiar de '00002' a 'R0002'
            name: 'Reparación Martillo',
            image: '../images/martillo.jpg',
            price: 9.75,
            days: '1-5 días',
            description: [
                {
                    title: 'Reparación del Mango:',
                    items: [
                        'Sustitución del mango de madera si está astillado o roto.',
                        'Refuerzo de la unión entre cabeza y mango.'
                    ]
                },
                {
                    title: 'Rectificado de la Cabeza:',
                    items: [
                        'Pulido de la superficie de golpeo si presenta deformaciones o astillas metálicas.'
                    ]
                }
            ]
        },
        'R0003': {  // ← Cambiar de '00003' a 'R0003'
            name: 'Reparación Alicates',
            image: '../images/alicates.jpg',
            price: 11.89,
            days: '1-3 días',
            description: [
                {
                    title: 'Ajuste del Mecanismo:',
                    items: [
                        'Lubricación y ajuste del tornillo central para mejorar el movimiento.',
                        'Alineación de las mordazas si están desalineadas.'
                    ]
                },
                {
                    title: 'Afilado de Filos:',
                    items: [
                        'Reafilado de las cuchillas de corte si están desgastadas.'
                    ]
                }
            ]
        },
        'R0004': {  // ← Cambiar de '00004' a 'R0004'
            name: 'Reparación Llave Inglesa',
            image: '../images/llave-inglesa.jpg',
            price: 14.37,
            days: '1-3 días',
            description: [
                {
                    title: 'Reparación del Mecanismo de Ajuste:',
                    items: [
                        'Limpieza y lubricación del tornillo sin fin.',
                        'Sustitución de piezas desgastadas si es necesario.'
                    ]
                },
                {
                    title: 'Calibración:',
                    items: [
                        'Verificación y ajuste de la mordaza móvil para asegurar un agarre firme.'
                    ]
                }
            ]
        },
        'R0005': {  // ← Cambiar de '00005' a 'R0005'
            name: 'Reparación Cutter',
            image: '../images/cutter.jpg',
            price: 2.95,
            days: '1-3 días',
            description: [
                {
                    title: 'Sustitución de Cuchilla:',
                    items: [
                        'Reemplazo de la cuchilla desafilada o rota por una nueva.',
                        'Ajuste del mecanismo de bloqueo de la cuchilla.'
                    ]
                }
            ]
        },
        'R0006': {  // ← Cambiar de '00006' a 'R0006'
            name: 'Reparación Llaves Allen',
            image: '../images/llaves.jpg',
            price: 6.65,
            days: '1-3 días',
            description: [
                {
                    title: 'Reemplazo de Llaves Dañadas:',
                    items: [
                        'Identificación de llaves con puntas redondeadas o rotas.',
                        'Sustitución individual de las llaves afectadas.'
                    ]
                },
                {
                    title: 'Limpieza y Mantenimiento:',
                    items: [
                        'Eliminación de óxido y suciedad del juego completo.'
                    ]
                }
            ]
        }
    };

    // Obtener el código del producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productCode = urlParams.get('code') || 'R0001';  // ← Cambiar default a 'R0001'

    // Cargar datos del producto
    const product = productsData[productCode] || productsData['R0001'];  // ← Cambiar fallback a 'R0001'

    // Actualizar la interfaz con los datos del producto
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `${product.price.toFixed(2)} €`;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-image').alt = product.name;
    document.getElementById('estimated-time').textContent = `Tiempo de envío (${product.days})`;

    // Renderizar descripción detallada
    const repairDetailsList = document.getElementById('repair-details');
    repairDetailsList.innerHTML = '';

    product.description.forEach(section => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${section.title}</strong>`;

        if (section.items && section.items.length > 0) {
            const subList = document.createElement('ul');
            section.items.forEach(item => {
                const subLi = document.createElement('li');
                subLi.textContent = item;
                subList.appendChild(subLi);
            });
            li.appendChild(subList);
        }

        repairDetailsList.appendChild(li);
    });

    // Agregar el tiempo estimado al final
    const timeLi = document.createElement('li');
    timeLi.innerHTML = `<strong>Tiempo estimado:</strong> <span>Tiempo de envío (${product.days})</span>.`;
    repairDetailsList.appendChild(timeLi);

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

    // Función para mostrar el popup de error de cantidad
    let errorOverlay = null;

    function showQuantityError() {
        if (errorOverlay) return;

        errorOverlay = document.createElement('div');
        errorOverlay.className = 'overlay';

        const errorPanel = document.createElement('div');
        errorPanel.className = 'error-panel';

        const errorIcon = document.createElement('div');
        errorIcon.className = 'error-icon';
        errorIcon.textContent = '⚠️';

        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Por favor, selecciona una cantidad mayor a 0';

        const closeButton = document.createElement('button');
        closeButton.className = 'btn-close';
        closeButton.textContent = 'Aceptar';
        closeButton.addEventListener('click', closeQuantityError);

        errorPanel.appendChild(errorIcon);
        errorPanel.appendChild(errorMessage);
        errorPanel.appendChild(closeButton);
        errorOverlay.appendChild(errorPanel);
        document.body.appendChild(errorOverlay);

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        // Auto-focus en el botón
        closeButton.focus();
    }

    function closeQuantityError() {
        if (!errorOverlay) return;
        errorOverlay.remove();
        errorOverlay = null;
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    // Añadir al carrito
    document.getElementById('btn-add-cart').addEventListener('click', () => {
        if (quantity === 0) {
            showQuantityError();
            return;
        }

        // Cargar carrito existente
        let cart = JSON.parse(localStorage.getItem('duvisoCart')) || [];

        // Buscar si el producto ya existe en el carrito
        const existingItemIndex = cart.findIndex(item =>
            item.code === productCode && item.type === 'repair'
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
                price: product.price,
                quantity: quantity,
                type: 'repair'
            });
        }

        // Guardar en localStorage
        localStorage.setItem('duvisoCart', JSON.stringify(cart));

        // Redirigir al carrito
        window.location.href = 'carrito.html';
    });

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
            btn.addEventListener('click', () => {
                window.location.href = 'repararHerramientas.html';
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
            'treinta': 30, 'cuarenta': 40, 'cincuenta': 50
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

    // Función para procesar comandos de voz en información de reparación
    function processVoiceCommand(command) {
        const lowerCommand = command.toLowerCase().trim();
        console.log('Comando recibido en Info Reparación:', lowerCommand);

        // Comandos de navegación
        if (lowerCommand.includes('inicio') || lowerCommand.includes('principal') || lowerCommand.includes('home')) {
            speak('Volviendo a la página principal');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 800);
        } else if (lowerCommand.includes('catálogo') || lowerCommand.includes('catalogo') || lowerCommand.includes('volver al catálogo') || lowerCommand.includes('volver al catalogo') || lowerCommand.includes('reparaciones')) {
            speak('Volviendo al catálogo de reparaciones');
            setTimeout(() => {
                window.location.href = 'repararHerramientas.html';
            }, 800);
        } else if (lowerCommand.includes('comprar')) {
            speak('Navegando a comprar herramientas');
            setTimeout(() => {
                window.location.href = 'catalogoCompras.html';
            }, 800);
        } else if (lowerCommand.includes('ofertas') || lowerCommand.includes('crear ofertas')) {
            speak('Navegando a crear ofertas');
            setTimeout(() => {
                window.location.href = 'crearOfertas.html';
            }, 800);
        } else if (lowerCommand.includes('ir al carrito') || lowerCommand.includes('ver carrito') || lowerCommand.includes('carrito')) {
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
        // Comandos de control de cantidad
        else if (lowerCommand.includes('establecer cantidad') || lowerCommand.includes('cantidad') || lowerCommand.includes('poner cantidad')) {
            const numbers = extractNumbers(lowerCommand);
            if (numbers && numbers.length > 0) {
                const newQuantity = numbers[0];
                updateQuantity(newQuantity);
                speak(`Cantidad establecida en ${newQuantity}`);
            } else {
                speak('Por favor, especifica una cantidad. Por ejemplo: establecer cantidad tres');
            }
        } else if (lowerCommand.includes('aumentar') || lowerCommand.includes('incrementar') || lowerCommand.includes('más') || lowerCommand.includes('mas') || lowerCommand.includes('añadir') || lowerCommand.includes('agregar')) {
            const numbers = extractNumbers(lowerCommand);
            const increment = numbers && numbers.length > 0 ? numbers[0] : 1;
            updateQuantity(quantity + increment);
            speak(`Cantidad aumentada a ${quantity}`);
        } else if (lowerCommand.includes('disminuir') || lowerCommand.includes('reducir') || lowerCommand.includes('menos') || lowerCommand.includes('quitar')) {
            const numbers = extractNumbers(lowerCommand);
            const decrement = numbers && numbers.length > 0 ? numbers[0] : 1;
            updateQuantity(quantity - decrement);
            speak(`Cantidad reducida a ${quantity}`);
        } else if (lowerCommand.includes('resetear cantidad') || lowerCommand.includes('borrar cantidad') || lowerCommand.includes('cantidad cero')) {
            updateQuantity(0);
            speak('Cantidad establecida en cero');
        }
        // Comando para añadir al carrito
        else if (lowerCommand.includes('añadir al carrito') || lowerCommand.includes('agregar al carrito') || lowerCommand.includes('solicitar reparación') || lowerCommand.includes('reparar') || lowerCommand.includes('añadir') || lowerCommand.includes('agregar')) {
            if (quantity === 0) {
                speak('La cantidad debe ser mayor a cero. Por favor, establece una cantidad primero');
                showQuantityError();
            } else {
                speak(`Añadiendo ${quantity} reparaciones al carrito`);
                setTimeout(() => {
                    document.getElementById('btn-add-cart').click();
                }, 1000);
            }
        }
        // Comando para leer información de reparación
        else if (lowerCommand.includes('leer descripción') || lowerCommand.includes('descripción') || lowerCommand.includes('información') || lowerCommand.includes('informacion') || lowerCommand.includes('detalles') || lowerCommand.includes('reparación')) {
            const firstSection = product.description[0];
            const description = firstSection ? `${firstSection.title}. ${firstSection.items.join('. ')}` : '';
            speak(`Reparación de ${product.name}. ${description}. Tiempo estimado: ${product.days}`);
        } else if (lowerCommand.includes('precio') || lowerCommand.includes('costo') || lowerCommand.includes('cuánto cuesta') || lowerCommand.includes('cuanto cuesta')) {
            speak(`El precio de reparación es ${product.price.toFixed(2)} euros. Tiempo estimado de ${product.days}`);
        } else if (lowerCommand.includes('tiempo') || lowerCommand.includes('días') || lowerCommand.includes('dias') || lowerCommand.includes('cuánto tarda') || lowerCommand.includes('cuanto tarda')) {
            speak(`El tiempo estimado de reparación es de ${product.days}`);
        } else if (lowerCommand.includes('comandos') || lowerCommand.includes('qué puedo decir') || lowerCommand.includes('que puedo decir')) {
            speak('Puedes decir: establecer cantidad tres, aumentar, disminuir, añadir al carrito, leer descripción, precio, tiempo, o volver al catálogo');
        } else {
            speak('Comando no reconocido. Intenta con: establecer cantidad tres, añadir al carrito, leer descripción, o precio');
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
                console.log('Reconocimiento de voz iniciado en Info Reparación');
                document.getElementById('voice-text').textContent = '🎤 ¡Habla ahora!';

                recognitionTimeout = setTimeout(() => {
                    if (isListening) {
                        console.log('Timeout alcanzado en Info Reparación');
                        stopVoiceRecognition();
                        speak('Tiempo de espera agotado');
                    }
                }, 10000);
            } catch (error) {
                console.error('Error al iniciar reconocimiento en Info Reparación:', error);
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

        console.log('Reconocimiento de voz detenido en Info Reparación');
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
                console.log('Transcripción en tiempo real (Info Reparación):', displayText);
                document.getElementById('voice-text').textContent = `🎤 "${displayText}"`;
            }

            if (finalTranscript) {
                console.log('Transcripción final (Info Reparación):', finalTranscript);

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
            console.error('Error en reconocimiento de voz (Info Reparación):', event.error);

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
            console.log('Evento onend disparado (Info Reparación)');
            if (isListening) {
                console.log('Reconocimiento terminó inesperadamente (Info Reparación)');
                stopVoiceRecognition();
            }
        };

        recognition.onstart = () => {
            console.log('Reconocimiento iniciado exitosamente (Info Reparación)');
            document.getElementById('voice-text').textContent = '🎤 ¡Habla ahora!';
        };

        recognition.onaudiostart = () => {
            console.log('Audio detectado (Info Reparación)');
            document.getElementById('voice-text').textContent = '🎤 Escuchando...';
        };

        recognition.onspeechstart = () => {
            console.log('Voz detectada (Info Reparación)');
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
            closeQuantityError();
        }
    });

    // ========================================
    // FIN FUNCIONALIDAD DE VOZ
    // ========================================
});