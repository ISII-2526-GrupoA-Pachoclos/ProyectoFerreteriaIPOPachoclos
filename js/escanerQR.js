document.addEventListener('DOMContentLoaded', () => {
    // ========== VERIFICACIÓN INICIAL ==========
    console.log('🚀 Iniciando escáner QR...');
    console.log('📍 Protocolo:', window.location.protocol);
    console.log('📍 URL:', window.location.href);
    console.log('📷 MediaDevices disponible:', !!navigator.mediaDevices);
    console.log('📚 Html5Qrcode disponible:', typeof Html5Qrcode !== 'undefined');

    // Verificar si la librería está cargada
    if (typeof Html5Qrcode === 'undefined') {
        console.error('❌ La librería Html5Qrcode no se ha cargado. Verifica el script en el HTML.');
        alert('Error: La librería del escáner QR no se ha cargado correctamente. Por favor, recarga la página.');
        return;
    }

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
        console.log('📷 Intentando iniciar escáner...');
        
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                console.error('❌ getUserMedia no soportado');
                showCameraError('Tu navegador no soporta acceso a la cámara. Usa Chrome, Firefox o Safari actualizado.');
                return;
            }

            console.log('🔧 Creando instancia Html5Qrcode...');
            html5QrCode = new Html5Qrcode("reader");
            console.log('✅ Instancia creada');

            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            console.log('📱 Dispositivo móvil:', isMobile);

            // ========== MEJORADO: FORZAR CÁMARA TRASERA EN MÓVILES ==========
            console.log('🎥 Solicitando permisos de cámara...');
            
            // Constraints específicos para móviles
            const constraints = isMobile 
                ? { 
                    video: { 
                        facingMode: { exact: "environment" }, // ← EXACT en lugar de IDEAL
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    } 
                } 
                : { 
                    video: { 
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    } 
                };

            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                console.log('✅ Permisos concedidos, stream obtenido:', stream);
                console.log('📹 Cámara activa:', stream.getVideoTracks()[0].label);
                stream.getTracks().forEach(track => track.stop());
            } catch (permissionError) {
                console.error('❌ Error de permisos:', permissionError);
                
                // Si falla con "exact", intentar con "ideal"
                if (permissionError.name === 'OverconstrainedError' && isMobile) {
                    console.warn('⚠️ No se pudo forzar cámara trasera, intentando con ideal...');
                    try {
                        const fallbackConstraints = { 
                            video: { 
                                facingMode: { ideal: "environment" }
                            } 
                        };
                        const stream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
                        console.log('✅ Cámara iniciada con modo fallback');
                        stream.getTracks().forEach(track => track.stop());
                    } catch (fallbackError) {
                        console.error('❌ Error en fallback:', fallbackError);
                        showCameraError('Se denegó el acceso a la cámara. Por favor, permite el acceso en la configuración de tu navegador.');
                        return;
                    }
                } else {
                    showCameraError('Se denegó el acceso a la cámara. Por favor, permite el acceso en la configuración de tu navegador.');
                    return;
                }
            }

            console.log('📹 Obteniendo lista de cámaras...');
            cameras = await Html5Qrcode.getCameras();
            console.log('📹 Cámaras encontradas:', cameras.length, cameras);

            if (cameras && cameras.length > 0) {
                let cameraId = cameras[currentCameraIndex].id;
                
                // MEJORADO: Búsqueda más agresiva de cámara trasera
                if (isMobile && cameras.length > 1) {
                    console.log('🔍 Buscando cámara trasera...');
                    
                    // Intentar múltiples criterios
                    const rearCamera = cameras.find(camera => {
                        const label = camera.label.toLowerCase();
                        return label.includes('back') || 
                               label.includes('rear') ||
                               label.includes('environment') ||
                               label.includes('trasera') ||
                               label.includes('principal') ||
                               label.match(/camera.*0/i); // Típicamente cámara 0 es trasera
                    });
                    
                    if (rearCamera) {
                        cameraId = rearCamera.id;
                        console.log('✅ Cámara trasera seleccionada:', rearCamera.label);
                    } else {
                        // Si no encuentra por nombre, usar la última cámara (suele ser trasera)
                        if (cameras.length > 1) {
                            cameraId = cameras[cameras.length - 1].id;
                            console.log('⚠️ Usando última cámara como trasera:', cameras[cameras.length - 1].label);
                        }
                    }
                }

                console.log('🎯 Usando cámara ID:', cameraId);

                // Configuración optimizada para QR
                const config = {
                    fps: 10,
                    qrbox: { width: 250, height: 250 }, // Cuadrado para QR
                    aspectRatio: 1.0,
                    disableFlip: false, // Permitir flip si es necesario
                    videoConstraints: {
                        facingMode: isMobile ? "environment" : "user",
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
                };

                console.log('⚙️ Configuración:', config);
                console.log('🚀 Iniciando escáner con html5QrCode.start()...');

                await html5QrCode.start(cameraId, config, onScanSuccess, onScanError);

                console.log('✅ Escáner iniciado exitosamente');

                // Forzar visibilidad y dimensiones del reader
                const readerElement = document.getElementById('reader');
                if (readerElement) {
                    readerElement.style.display = 'block';
                    readerElement.style.minHeight = isMobile ? '280px' : '350px';
                    readerElement.style.maxWidth = isMobile ? '280px' : '350px';
                    readerElement.style.margin = '0 auto';
                    console.log('✅ Elemento #reader configurado');
                }

                scannerStart.classList.add('hidden');
                scannerActive.classList.remove('hidden');

                console.log('🎉 Escáner activo y visible con línea de escaneo');
            } else {
                console.error('❌ No se encontraron cámaras');
                showCameraError('No se encontraron cámaras disponibles en tu dispositivo.');
            }
        } catch (err) {
            console.error('❌ Error general al iniciar escáner:', err);
            console.error('Nombre del error:', err.name);
            console.error('Mensaje del error:', err.message);
            console.error('Stack trace:', err.stack);

            let errorMessage = 'Error al iniciar la cámara.';

            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                errorMessage = 'Permiso de cámara denegado. Por favor, permite el acceso a la cámara en tu navegador.';
            } else if (err.name === 'NotFoundError') {
                errorMessage = 'No se encontró ninguna cámara en tu dispositivo.';
            } else if (err.name === 'NotReadableError') {
                errorMessage = 'La cámara está siendo usada por otra aplicación. Cierra otras apps que usen la cámara.';
            } else if (err.name === 'OverconstrainedError') {
                errorMessage = 'No se pudo iniciar la cámara con la configuración solicitada. Intentando modo alternativo...';
            } else if (err.name === 'NotSupportedError' || err.name === 'SecurityError') {
                errorMessage = '⚠️ HTTPS requerido: Accede a la página con https:// para usar la cámara.';
            }

            showCameraError(errorMessage);
        }
    }

    function showCameraError(message) {
        console.error('🚨 Mostrando error de cámara:', message);
        
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
                    <li>Asegúrate de usar HTTPS (https://...)</li>
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
        console.log('⏹️ Deteniendo escáner...');
        if (html5QrCode) {
            try {
                await html5QrCode.stop();
                html5QrCode.clear();
                console.log('✅ Escáner detenido');
            } catch (err) {
                console.error('❌ Error al detener escáner:', err);
            }
        }

        scannerActive.classList.add('hidden');
        scannerStart.classList.remove('hidden');
    }

    function onScanSuccess(decodedText, decodedResult) {
        console.log('✅ Código QR escaneado exitosamente:', decodedText);
        console.log('📊 Resultado completo:', decodedResult);
        stopScanner();
        processScannedCode(decodedText);
    }

    function onScanError(errorMessage) {
        // Ignorar errores comunes de escaneo (cuando no detecta QR)
        // console.log('⚠️ Error de escaneo (normal si no hay QR):', errorMessage);
    }

    // ========== PROCESAR CÓDIGO ESCANEADO ==========
    function processScannedCode(code) {
        console.log('🔍 Procesando código:', code);
        const product = productosDB[code];

        if (!product) {
            console.warn('⚠️ Producto no encontrado:', code);
            showError(`El código "${code}" no existe en nuestra base de datos. Por favor, verifica e intenta de nuevo.`);
            return;
        }

        console.log('✅ Producto encontrado:', product);
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
    btnStartScanner.addEventListener('click', () => {
        console.log('🖱️ Botón "Iniciar Escáner" clickeado');
        startScanner();
    });
    
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

    btnViewProduct.addEventListener('click', () => {
        if (currentScannedProduct) {
            if (currentScannedProduct.type === 'compra') {
                window.location.href = `infoCompras.html?code=${currentScannedProduct.code}`;
            } else if (currentScannedProduct.type === 'reparacion') {
                window.location.href = `infoCompras.html?code=${currentScannedProduct.code}&type=reparacion`;
            }
        }
    });

    btnAddToCart.addEventListener('click', () => {
        if (currentScannedProduct) {
            console.log('🛒 Añadiendo al carrito:', currentScannedProduct);
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

    // ========== CARRITO ==========
    function addToCart(product) {
        try {
            let cart = [];
            const cartData = localStorage.getItem('duvisoCart');

            if (cartData) {
                try {
                    cart = JSON.parse(cartData);
                } catch (e) {
                    console.warn('Error al parsear carrito');
                    cart = [];
                }
            }

            const existingItemIndex = cart.findIndex(item => item.code === product.code);

            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                const newItem = {
                    code: product.code,
                    name: product.name,
                    price: product.priceNum,
                    priceOld: product.priceNum,
                    discount: 0,
                    badge: product.type === 'compra' ? 'Producto nuevo' : 'Servicio de reparación',
                    image: product.image,
                    quantity: 1,
                    type: product.type === 'reparacion' ? 'repair' : 'purchase'
                };
                cart.push(newItem);
            }

            localStorage.setItem('duvisoCart', JSON.stringify(cart));
            updateCartCounter();
            window.dispatchEvent(new Event('cartUpdated'));

            return true;
        } catch (error) {
            console.error('❌ Error al añadir al carrito:', error);
            return false;
        }
    }

    function updateCartCounter() {
        try {
            const cart = JSON.parse(localStorage.getItem('duvisoCart')) || [];
            const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

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
                }
            }
        } catch (error) {
            console.error('Error al actualizar contador:', error);
        }
    }

    // ========== HISTORIAL DE ESCANEOS ==========
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
    console.log('✅ Inicialización completa');
    renderRecentScans();
    updateCartCounter();

    // Escuchar cambios en el carrito
    window.addEventListener('storage', (e) => {
        if (e.key === 'cart') {
            updateCartCounter();
        }
    });
});