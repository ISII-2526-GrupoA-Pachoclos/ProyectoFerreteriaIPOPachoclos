document.addEventListener('DOMContentLoaded', () => {
    // ========== BASE DE DATOS DE PRODUCTOS ==========
    const productosDB = {
        '00001': { code: '00001', name: 'Juego Destornilladores', price: '26,05 €', priceNum: 26.05, image: '../images/destornilladores.jpg', type: 'compra' },
        '00002': { code: '00002', name: 'Martillo Bellota', price: '12,17 €', priceNum: 12.17, image: '../images/martillo.jpg', type: 'compra' },
        '00003': { code: '00003', name: 'Alicates', price: '12,33 €', priceNum: 12.33, image: '../images/alicates.jpg', type: 'compra' },
        '00004': { code: '00004', name: 'Llave Inglesa', price: '23,16 €', priceNum: 23.16, image: '../images/llave-inglesa.jpg', type: 'compra' },
        '00005': { code: '00005', name: 'Cutter Profesional', price: '2,72 €', priceNum: 2.72, image: '../images/cutter.jpg', type: 'compra' },
        '00006': { code: '00006', name: 'Juego de Llaves Allen', price: '9,12 €', priceNum: 9.12, image: '../images/llaves.jpg', type: 'compra' },
        'R0001': { code: 'R0001', name: 'Reparación Destornilladores', price: '5,45 €', priceNum: 5.45, image: '../images/destornilladores.jpg', type: 'reparacion' },
        'R0002': { code: 'R0002', name: 'Reparación Martillo', price: '9,75 €', priceNum: 9.75, image: '../images/martillo.jpg', type: 'reparacion' },
        'R0003': { code: 'R0003', name: 'Reparación Alicates', price: '11,89 €', priceNum: 11.89, image: '../images/alicates.jpg', type: 'reparacion' },
        'R0004': { code: 'R0004', name: 'Reparación Llave Inglesa', price: '14,37 €', priceNum: 14.37, image: '../images/llave-inglesa.jpg', type: 'reparacion' },
        'R0005': { code: 'R0005', name: 'Reparación Cutter', price: '2,95 €', priceNum: 2.95, image: '../images/cutter.jpg', type: 'reparacion' },
        'R0006': { code: 'R0006', name: 'Reparación Llaves Allen', price: '6,65 €', priceNum: 6.65, image: '../images/llaves.jpg', type: 'reparacion' }
    };

    // ========== ELEMENTOS DEL DOM ==========
    const scannerStart = document.getElementById('scanner-start');
    const scannerActive = document.getElementById('scanner-active');
    const manualInput = document.getElementById('manual-input');
    const scanResult = document.getElementById('scan-result');

    const btnStartScanner = document.getElementById('btn-start-scanner');
    const btnCloseScanner = document.getElementById('btn-close-scanner');
    const btnSwitchCamera = document.getElementById('btn-switch-camera');
    const btnManualEntry = document.getElementById('btn-manual-entry');
    const btnCancelManual = document.getElementById('btn-cancel-manual');
    const btnSubmitManual = document.getElementById('btn-submit-manual');
    const manualCodeInput = document.getElementById('manual-code-input');

    const resultProductName = document.getElementById('result-product-name');
    const resultProductCode = document.getElementById('result-product-code');
    const resultProductPrice = document.getElementById('result-product-price');
    const resultProductImage = document.getElementById('result-product-image');
    const btnViewProduct = document.getElementById('btn-view-product');
    const btnAddToCart = document.getElementById('btn-add-to-cart');
    const btnScanAgain = document.getElementById('btn-scan-again');

    const recentScansList = document.getElementById('recent-scans-list');

    let html5QrCode = null;
    let cameras = [];
    let currentCameraIndex = 0;
    let recentScans = JSON.parse(localStorage.getItem('recentScans')) || [];
    let currentScannedProduct = null;

    // ========== NAVEGACIÓN ==========
    const logo = document.getElementById('logo-link');
    if (logo) {
        logo.addEventListener('click', () => window.location.href = '../index.html');
    }

    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => window.location.href = 'carrito.html');
    }

    // ========== OVERLAYS ==========
    let activeOverlay = null;

    function createOverlay(iframeSrc, title, height = '600px') {
        if (activeOverlay) return;
        activeOverlay = document.createElement('div');
        Object.assign(activeOverlay.style, {
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        });

        const panel = document.createElement('div');
        Object.assign(panel.style, {
            width: '94%', maxWidth: '600px', height: 'auto', maxHeight: '90vh',
            background: '#fff', borderRadius: '10px', overflow: 'auto',
            position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        });

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        Object.assign(closeBtn.style, {
            position: 'absolute', top: '12px', right: '12px', zIndex: 2,
            width: '42px', height: '42px', borderRadius: '50%', border: 'none',
            background: 'rgba(0,0,0,0.7)', color: '#fff', cursor: 'pointer', fontSize: '18px'
        });
        closeBtn.addEventListener('click', () => {
            activeOverlay.remove();
            activeOverlay = null;
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        });

        const iframe = document.createElement('iframe');
        iframe.src = iframeSrc;
        iframe.title = title;
        iframe.style.width = '100%';
        iframe.style.height = height;
        iframe.style.border = 'none';

        panel.appendChild(closeBtn);
        panel.appendChild(iframe);
        activeOverlay.appendChild(panel);
        document.body.appendChild(activeOverlay);
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    document.querySelector('.btn-help')?.addEventListener('click', () => createOverlay('ayuda.html', 'Ayuda', '86vh'));
    document.querySelector('.btn-account')?.addEventListener('click', () => createOverlay('miCuenta.html', 'Mi Cuenta', '600px'));
    document.querySelector('.btn-language')?.addEventListener('click', () => createOverlay('idioma.html', 'Idioma', '400px'));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (activeOverlay) {
                activeOverlay.querySelector('button').click();
            } else if (html5QrCode && !scannerActive.classList.contains('hidden')) {
                stopScanner();
            }
        }
    });

    // ========== MOSTRAR ERROR ==========
    function showError(message) {
        const errorOverlay = document.createElement('div');
        Object.assign(errorOverlay.style, {
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
        });

        const errorPanel = document.createElement('div');
        Object.assign(errorPanel.style, {
            background: '#fff',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        });

        errorPanel.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 1rem;">⚠️</div>
            <h3 style="color: #dc3545; margin-bottom: 1rem; font-size: 1.5rem;">Producto No Encontrado</h3>
            <p style="color: #666; margin-bottom: 1.5rem; line-height: 1.6;">${message}</p>
            <button id="btn-try-again" style="
                padding: 12px 32px;
                background: #ff8c42;
                color: white;
                border: none;
                border-radius: 20px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Intentar de Nuevo</button>
        `;

        errorOverlay.appendChild(errorPanel);
        document.body.appendChild(errorOverlay);

        document.getElementById('btn-try-again')?.addEventListener('click', () => {
            errorOverlay.remove();
            scannerStart.classList.add('hidden');
            scanResult.classList.add('hidden');
            manualInput.classList.remove('hidden');
            manualCodeInput.value = '';
            manualCodeInput.focus();
        });
    }

    // ========== MOSTRAR ÉXITO AL AÑADIR AL CARRITO ==========
    function showSuccessMessage(productName, type) {
        const successOverlay = document.createElement('div');
        Object.assign(successOverlay.style, {
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
        });

        const successPanel = document.createElement('div');
        Object.assign(successPanel.style, {
            background: '#fff',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        });

        const typeText = type === 'compra' ? 'producto' : 'servicio de reparación';
        const typeIcon = type === 'compra' ? '🛒' : '🔧';

        successPanel.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 1rem;">✓</div>
            <h3 style="color: #28a745; margin-bottom: 1rem; font-size: 1.5rem;">Añadido al Carrito</h3>
            <p style="color: #666; margin-bottom: 1.5rem; line-height: 1.6;">
                ${typeIcon} <strong>${productName}</strong> ha sido añadido a tu carrito como ${typeText}.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button id="btn-continue-scan" style="
                    padding: 12px 24px;
                    background: #ff8c42;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                ">Seguir Escaneando</button>
                <button id="btn-go-cart" style="
                    padding: 12px 24px;
                    background: #28a745;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                ">Ir al Carrito</button>
            </div>
        `;

        successOverlay.appendChild(successPanel);
        document.body.appendChild(successOverlay);

        document.getElementById('btn-continue-scan')?.addEventListener('click', () => {
            successOverlay.remove();
        });

        document.getElementById('btn-go-cart')?.addEventListener('click', () => {
            window.location.href = 'carrito.html';
        });

        // Auto cerrar después de 3 segundos
        setTimeout(() => {
            if (successOverlay.parentNode) {
                successOverlay.remove();
            }
        }, 3000);
    }

    // ========== FUNCIONES DEL ESCÁNER ==========
    async function startScanner() {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                showCameraError('Tu navegador no soporta acceso a la cámara. Usa Chrome, Firefox o Edge actualizado.');
                return;
            }

            html5QrCode = new Html5Qrcode("reader");

            // Detectar si es móvil
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            try {
                const constraints = isMobile 
                    ? { video: { facingMode: { ideal: "environment" } } }
                    : { video: true };

                await navigator.mediaDevices.getUserMedia(constraints);
            } catch (permissionError) {
                console.error('Error de permisos:', permissionError);
                showCameraError('Se denegó el acceso a la cámara. Por favor, permite el acceso en la configuración de tu navegador.');
                return;
            }

            cameras = await Html5Qrcode.getCameras();

            if (cameras && cameras.length > 0) {
                let cameraId = cameras[currentCameraIndex].id;
                
                if (isMobile && cameras.length > 1) {
                    const rearCamera = cameras.find(camera => 
                        camera.label.toLowerCase().includes('back') || 
                        camera.label.toLowerCase().includes('rear') ||
                        camera.label.toLowerCase().includes('environment')
                    );
                    if (rearCamera) {
                        cameraId = rearCamera.id;
                    }
                }

                const config = {
                    fps: 10,
                    qrbox: isMobile 
                        ? { width: 250, height: 250 } // Marco de escaneo en móviles
                        : { width: 250, height: 250 },
                    aspectRatio: 1.0,
                    // ← AÑADIR ESTO para forzar dimensiones del video
                    videoConstraints: {
                        width: { ideal: isMobile ? 640 : 1280 },
                        height: { ideal: isMobile ? 480 : 720 }
                    }
                };

                await html5QrCode.start(cameraId, config, onScanSuccess, onScanError);

                // ← FORZAR que el contenedor sea visible
                const readerElement = document.getElementById('reader');
                if (readerElement) {
                    readerElement.style.display = 'block';
                    readerElement.style.minHeight = isMobile ? '300px' : '400px';
                }

                scannerStart.classList.add('hidden');
                scannerActive.classList.remove('hidden');

                console.log('Escáner iniciado correctamente en modo:', isMobile ? 'móvil' : 'escritorio');
            } else {
                showCameraError('No se encontraron cámaras disponibles en tu dispositivo.');
            }
        } catch (err) {
            console.error('Error al iniciar escáner:', err);

            let errorMessage = 'Error al iniciar la cámara.';

            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                errorMessage = 'Permiso de cámara denegado. Por favor, permite el acceso a la cámara en tu navegador.';
            } else if (err.name === 'NotFoundError') {
                errorMessage = 'No se encontró ninguna cámara en tu dispositivo.';
            } else if (err.name === 'NotReadableError') {
                errorMessage = 'La cámara está siendo usada por otra aplicación. Cierra otras apps que usen la cámara.';
            } else if (err.name === 'OverconstrainedError') {
                errorMessage = 'No se pudo iniciar la cámara con la configuración solicitada.';
            } else if (err.name === 'NotSupportedError' || err.name === 'SecurityError') {
                errorMessage = '⚠️ HTTPS requerido: Accede a la página con https:// para usar la cámara.';
            }

            showCameraError(errorMessage);
        }
    }

    function showCameraError(message) {
        const errorOverlay = document.createElement('div');
        Object.assign(errorOverlay.style, {
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
        });

        const errorPanel = document.createElement('div');
        Object.assign(errorPanel.style, {
            background: '#fff',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        });

        errorPanel.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 1rem;">📷</div>
            <h3 style="color: #dc3545; margin-bottom: 1rem; font-size: 1.5rem;">Error de Cámara</h3>
            <p style="color: #666; margin-bottom: 1.5rem; line-height: 1.6;">${message}</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button id="btn-use-manual" style="
                    padding: 12px 24px;
                    background: #ff8c42;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                ">Usar Entrada Manual</button>
                <button id="btn-retry-camera" style="
                    padding: 12px 24px;
                    background: #28a745;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                ">Reintentar</button>
            </div>
            <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e0e0e0;">
                <p style="font-size: 0.85rem; color: #999; margin-bottom: 0.5rem;">💡 Consejos:</p>
                <ul style="text-align: left; font-size: 0.85rem; color: #666; padding-left: 2rem;">
                    <li>Permite el acceso a la cámara cuando el navegador lo pida</li>
                    <li>Verifica que ninguna otra app esté usando la cámara</li>
                    <li>Prueba refrescando la página o reiniciando el navegador</li>
                </ul>
            </div>
        `;

        errorOverlay.appendChild(errorPanel);
        document.body.appendChild(errorOverlay);

        document.getElementById('btn-use-manual')?.addEventListener('click', () => {
            errorOverlay.remove();
            scannerStart.classList.add('hidden');
            manualInput.classList.remove('hidden');
            manualCodeInput.focus();
        });

        document.getElementById('btn-retry-camera')?.addEventListener('click', () => {
            errorOverlay.remove();
            startScanner();
        });
    }

    async function stopScanner() {
        if (html5QrCode) {
            try {
                await html5QrCode.stop();
                html5QrCode.clear();
                console.log('Escáner detenido');
            } catch (err) {
                console.error('Error al detener escáner:', err);
            }
        }

        scannerActive.classList.add('hidden');
        scannerStart.classList.remove('hidden');
    }

    function onScanSuccess(decodedText, decodedResult) {
        console.log('Código escaneado:', decodedText);
        stopScanner();
        processScannedCode(decodedText);
    }

    function onScanError(errorMessage) {
        // Ignorar errores comunes de escaneo
    }

    // ========== PROCESAR CÓDIGO ESCANEADO ==========
    function processScannedCode(code) {
        const product = productosDB[code];

        if (!product) {
            showError(`El código "${code}" no existe en nuestra base de datos. Por favor, verifica e intenta de nuevo.`);
            return;
        }

        currentScannedProduct = product;

        resultProductName.textContent = product.name;
        resultProductCode.textContent = product.code;
        resultProductPrice.textContent = product.price;

        const imgElement = resultProductImage.querySelector('img');
        if (imgElement) {
            imgElement.src = product.image;
            imgElement.alt = product.name;
            imgElement.onerror = function () {
                this.src = '../images/placeholder.jpg';
            };
        }

        scanResult.classList.remove('hidden');
        addToRecentScans(product);
    }

    // ========== BOTONES DE ACCIÓN ==========
    btnStartScanner.addEventListener('click', startScanner);
    btnCloseScanner.addEventListener('click', stopScanner);

    btnSwitchCamera.addEventListener('click', async () => {
        if (cameras.length > 1) {
            currentCameraIndex = (currentCameraIndex + 1) % cameras.length;
            await stopScanner();
            await startScanner();
        }
    });

    btnManualEntry.addEventListener('click', () => {
        scannerStart.classList.add('hidden');
        manualInput.classList.remove('hidden');
        manualCodeInput.focus();
    });

    btnCancelManual.addEventListener('click', () => {
        manualInput.classList.add('hidden');
        scannerStart.classList.remove('hidden');
        manualCodeInput.value = '';
    });

    btnSubmitManual.addEventListener('click', () => {
        const code = manualCodeInput.value.trim();
        if (code) {
            manualInput.classList.add('hidden');
            processScannedCode(code);
            manualCodeInput.value = '';
        }
    });

    manualCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnSubmitManual.click();
        }
    });

    // ========== VER PRODUCTO - REDIRIGE SEGÚN EL TIPO ==========
    btnViewProduct.addEventListener('click', () => {
        if (currentScannedProduct) {
            // Para productos de compra
            if (currentScannedProduct.type === 'compra') {
                window.location.href = `infoCompras.html?code=${currentScannedProduct.code}`;
            }
            // Para productos de reparación - usar la misma página pero con parámetro type
            else if (currentScannedProduct.type === 'reparacion') {
                window.location.href = `infoCompras.html?code=${currentScannedProduct.code}&type=reparacion`;
            }
        }
    });

    // ========== AÑADIR AL CARRITO - FUNCIONALIDAD COMPLETA ==========
    btnAddToCart.addEventListener('click', () => {
        if (currentScannedProduct) {
            console.log('🛒 Intentando añadir al carrito:', currentScannedProduct);
            const success = addToCart(currentScannedProduct);
            if (success) {
                showSuccessMessage(currentScannedProduct.name, currentScannedProduct.type);
            } else {
                alert('Error al añadir el producto al carrito');
            }
        }
    });

    btnScanAgain.addEventListener('click', () => {
        scanResult.classList.add('hidden');
        scannerStart.classList.remove('hidden');
        currentScannedProduct = null;
    });

    // ========== CARRITO - MEJORADO Y CORREGIDO ==========
    function addToCart(product) {
        try {
            console.log('📦 Función addToCart iniciada con producto:', product);

            // CAMBIO IMPORTANTE: Usar 'duvisoCart' en lugar de 'cart'
            let cart = [];
            const cartData = localStorage.getItem('duvisoCart'); // ← CAMBIO AQUÍ

            if (cartData) {
                try {
                    cart = JSON.parse(cartData);
                    console.log('🛒 Carrito actual:', cart);
                } catch (e) {
                    console.warn('Error al parsear carrito, creando uno nuevo');
                    cart = [];
                }
            }

            // Buscar si el producto ya existe en el carrito
            const existingItemIndex = cart.findIndex(item => item.code === product.code);

            if (existingItemIndex !== -1) {
                // Si ya existe, incrementar cantidad
                cart[existingItemIndex].quantity += 1;
                console.log('✓ Producto existente, cantidad incrementada:', cart[existingItemIndex]);
            } else {
                // Si no existe, añadir nuevo producto - FORMATO COMPATIBLE CON CARRITO.JS
                const newItem = {
                    code: product.code,
                    name: product.name,
                    price: product.priceNum, // ← Usar priceNum directamente
                    priceOld: product.priceNum, // Para productos escaneados, no hay descuento
                    discount: 0,
                    badge: product.type === 'compra' ? 'Producto nuevo' : 'Servicio de reparación',
                    image: product.image,
                    quantity: 1,
                    type: product.type === 'reparacion' ? 'repair' : 'purchase' // ← IMPORTANTE
                };
                cart.push(newItem);
                console.log('✓ Nuevo producto añadido:', newItem);
            }

            // Guardar en localStorage con la clave correcta
            localStorage.setItem('duvisoCart', JSON.stringify(cart)); // ← CAMBIO AQUÍ
            console.log('💾 Carrito guardado en localStorage:', cart);

            // Verificar que se guardó correctamente
            const verificacion = localStorage.getItem('duvisoCart'); // ← CAMBIO AQUÍ
            console.log('🔍 Verificación de guardado:', verificacion);

            // Actualizar contador del carrito
            updateCartCounter();

            // Disparar evento personalizado para que otras páginas lo detecten
            window.dispatchEvent(new Event('cartUpdated'));

            return true;
        } catch (error) {
            console.error('❌ Error al añadir al carrito:', error);
            return false;
        }
    }

    // ========== ACTUALIZAR CONTADOR DEL CARRITO ==========
    function updateCartCounter() {
        try {
            const cart = JSON.parse(localStorage.getItem('duvisoCart')) || []; // ← CAMBIO AQUÍ
            const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

            console.log('🔢 Total de items en carrito:', totalItems);

            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                const existingCounter = cartIcon.querySelector('.cart-counter');
                if (existingCounter) {
                    existingCounter.remove();
                }

                if (totalItems > 0) {
                    const counter = document.createElement('span');
                    counter.className = 'cart-counter';
                    counter.textContent = totalItems;
                    Object.assign(counter.style, {
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        background: '#dc3545',
                        color: '#fff',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        zIndex: 1
                    });
                    cartIcon.style.position = 'relative';
                    cartIcon.appendChild(counter);
                    console.log('✓ Contador del carrito actualizado:', totalItems);
                }
            }
        } catch (error) {
            console.error('Error al actualizar contador del carrito:', error);
        }
    }

    // ========== HISTORIAL DE ESCANEOS (CON IMÁGENES Y TIPO) ==========
    function addToRecentScans(product) {
        const scanItem = {
            code: product.code,
            name: product.name,
            price: product.price,
            image: product.image,
            type: product.type,
            timestamp: new Date().toISOString()
        };

        recentScans = recentScans.filter(item => item.code !== product.code);
        recentScans.unshift(scanItem);
        recentScans = recentScans.slice(0, 10);

        localStorage.setItem('recentScans', JSON.stringify(recentScans));
        renderRecentScans();
    }

    function renderRecentScans() {
        if (recentScans.length === 0) {
            recentScansList.innerHTML = '<div style="text-align: center; color: #999; padding: 2rem;">No hay escaneos recientes</div>';
            return;
        }

        recentScansList.innerHTML = recentScans.map(item => {
            const date = new Date(item.timestamp);
            const timeStr = date.toLocaleString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });

            const imageSrc = item.image || '../images/placeholder.jpg';
            const typeIcon = item.type === 'compra' ? '🛒' : '🔧';
            const typeBadge = item.type === 'compra'
                ? '<span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.75rem; margin-left: 5px;">Compra</span>'
                : '<span style="background: #17a2b8; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.75rem; margin-left: 5px;">Reparación</span>';

            return `
                <div class="recent-scan-item" data-code="${item.code}">
                    <div class="recent-scan-image">
                        <img src="${imageSrc}" alt="${item.name}" onerror="this.src='../images/placeholder.jpg'">
                    </div>
                    <div class="recent-scan-info">
                        <div class="recent-scan-name">${typeIcon} ${item.name}${typeBadge}</div>
                        <div class="recent-scan-code">Código: ${item.code}</div>
                        <div class="recent-scan-time">${timeStr}</div>
                    </div>
                    <button class="btn-view-scan" data-code="${item.code}" data-type="${item.type}">Ver</button>
                </div>
            `;
        }).join('');

        recentScansList.querySelectorAll('.recent-scan-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('btn-view-scan')) {
                    const code = item.dataset.code;
                    processScannedCode(code);
                }
            });
        });

        recentScansList.querySelectorAll('.btn-view-scan').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const code = e.target.dataset.code;
                const type = e.target.dataset.type;

                if (type === 'compra') {
                    window.location.href = `infoCompras.html?code=${code}`;
                } else if (type === 'reparacion') {
                    window.location.href = `infoCompras.html?code=${code}&type=reparacion`;
                }
            });
        });
    }

    // ========== INICIALIZAR ==========
    renderRecentScans();
    updateCartCounter();

    // Escuchar cambios en el carrito
    window.addEventListener('storage', (e) => {
        if (e.key === 'cart') {
            updateCartCounter();
        }
    });
});