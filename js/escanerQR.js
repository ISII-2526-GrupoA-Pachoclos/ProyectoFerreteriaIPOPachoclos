document.addEventListener('DOMContentLoaded', () => {
    // ========== BASE DE DATOS DE PRODUCTOS ==========
    const productosDB = {
        '00001': { code: '00001', name: 'Juego Destornilladores', price: '26,05 €', image: '../images/destornilladores.jpg' },
        '00002': { code: '00002', name: 'Martillo Bellota', price: '12,17 €', image: '../images/martillo.jpg' },
        '00003': { code: '00003', name: 'Alicates', price: '12,33 €', image: '../images/alicates.jpg' },
        '00004': { code: '00004', name: 'Llave Inglesa', price: '23,16 €', image: '../images/llave-inglesa.jpg' },
        '00005': { code: '00005', name: 'Cutter Profesional', price: '2,72 €', image: '../images/cutter.jpg' },
        '00006': { code: '00006', name: 'Juego de Llaves Allen', price: '9,12 €', image: '../images/llaves-allen.jpg' },
        'R0001': { code: 'R0001', name: 'Reparación Destornilladores', price: '5,45 €', image: '../images/destornilladores.jpg' },
        'R0002': { code: 'R0002', name: 'Reparación Martillo', price: '9,75 €', image: '../images/martillo.jpg' },
        'R0003': { code: 'R0003', name: 'Reparación Alicates', price: '11,89 €', image: '../images/alicates.jpg' },
        'R0004': { code: 'R0004', name: 'Reparación Llave Inglesa', price: '14,37 €', image: '../images/llave-inglesa.jpg' },
        'R0005': { code: 'R0005', name: 'Reparación Cutter', price: '2,95 €', image: '../images/cutter.jpg' },
        'R0006': { code: 'R0006', name: 'Reparación Llaves Allen', price: '6,65 €', image: '../images/llaves-allen.jpg' }
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

        document.getElementById('btn-try-again').addEventListener('click', () => {
            errorOverlay.remove();
            scannerStart.classList.add('hidden');
            scanResult.classList.add('hidden');
            manualInput.classList.remove('hidden');
            manualCodeInput.value = '';
            manualCodeInput.focus();
        });
    }

    // ========== FUNCIONES DEL ESCÁNER ==========
    async function startScanner() {
        try {
            // Verificar si el navegador soporta getUserMedia
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                showCameraError('Tu navegador no soporta acceso a la cámara. Usa Chrome, Firefox o Edge actualizado.');
                return;
            }

            html5QrCode = new Html5Qrcode("reader");

            // Pedir permisos de cámara
            try {
                await navigator.mediaDevices.getUserMedia({ video: true });
            } catch (permissionError) {
                console.error('Error de permisos:', permissionError);
                showCameraError('Se denegó el acceso a la cámara. Por favor, permite el acceso en la configuración de tu navegador.');
                return;
            }

            cameras = await Html5Qrcode.getCameras();

            if (cameras && cameras.length > 0) {
                const cameraId = cameras[currentCameraIndex].id;

                const config = {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0
                };

                await html5QrCode.start(cameraId, config, onScanSuccess, onScanError);

                scannerStart.classList.add('hidden');
                scannerActive.classList.remove('hidden');

                console.log('Escáner iniciado correctamente');
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
            }

            showCameraError(errorMessage);
        }
    }

    // Nueva función para mostrar errores de cámara
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

        document.getElementById('btn-use-manual').addEventListener('click', () => {
            errorOverlay.remove();
            scannerStart.classList.add('hidden');
            manualInput.classList.remove('hidden');
            manualCodeInput.focus();
        });

        document.getElementById('btn-retry-camera').addEventListener('click', () => {
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

    btnViewProduct.addEventListener('click', () => {
        if (currentScannedProduct) {
            window.location.href = `infoCompras.html?code=${currentScannedProduct.code}`;
        }
    });

    btnAddToCart.addEventListener('click', () => {
        if (currentScannedProduct) {
            addToCart(currentScannedProduct);
            alert(`✓ ${currentScannedProduct.name} añadido al carrito`);
        }
    });

    btnScanAgain.addEventListener('click', () => {
        scanResult.classList.add('hidden');
        scannerStart.classList.remove('hidden');
        currentScannedProduct = null;
    });

    // ========== CARRITO ==========
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItem = cart.find(item => item.code === product.code);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                code: product.code,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // ========== HISTORIAL DE ESCANEOS (CON IMÁGENES) ==========
    function addToRecentScans(product) {
        const scanItem = {
            code: product.code,
            name: product.name,
            price: product.price,
            image: product.image,
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

            return `
                <div class="recent-scan-item" data-code="${item.code}">
                    <div class="recent-scan-image">
                        <img src="${imageSrc}" alt="${item.name}" onerror="this.src='../images/placeholder.jpg'">
                    </div>
                    <div class="recent-scan-info">
                        <div class="recent-scan-name">${item.name}</div>
                        <div class="recent-scan-code">Código: ${item.code}</div>
                        <div class="recent-scan-time">${timeStr}</div>
                    </div>
                    <button class="btn-view-scan" data-code="${item.code}">Ver</button>
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
                window.location.href = `infoCompras.html?code=${code}`;
            });
        });
    }

    // ========== INICIALIZAR ==========
    renderRecentScans();
});