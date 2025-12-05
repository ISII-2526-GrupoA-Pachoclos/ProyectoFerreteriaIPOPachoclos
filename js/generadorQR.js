document.addEventListener('DOMContentLoaded', () => {
    // ========== BASE DE DATOS DE PRODUCTOS ==========
    const productosCompra = [
        { code: '00001', name: 'Juego Destornilladores', price: '26,05 €', image: '../images/destornilladores.jpg' },
        { code: '00002', name: 'Martillo Bellota', price: '12,17 €', image: '../images/martillo.jpg' },
        { code: '00003', name: 'Alicates', price: '12,33 €', image: '../images/alicates.jpg' },
        { code: '00004', name: 'Llave Inglesa', price: '23,16 €', image: '../images/llave-inglesa.jpg' },
        { code: '00005', name: 'Cutter Profesional', price: '2,72 €', image: '../images/cutter.jpg' },
        { code: '00006', name: 'Juego de Llaves Allen', price: '9,12 €', image: '../images/llaves.jpg' }
    ];

    const productosReparacion = [
        { code: 'R0001', name: 'Reparación Destornilladores', price: '5,45 €', image: '../images/destornilladores.jpg' },
        { code: 'R0002', name: 'Reparación Martillo', price: '9,75 €', image: '../images/martillo.jpg' },
        { code: 'R0003', name: 'Reparación Alicates', price: '11,89 €', image: '../images/alicates.jpg' },
        { code: 'R0004', name: 'Reparación Llave Inglesa', price: '14,37 €', image: '../images/llave-inglesa.jpg' },
        { code: 'R0005', name: 'Reparación Cutter', price: '2,95 €', image: '../images/cutter.jpg' },
        { code: 'R0006', name: 'Reparación Llaves Allen', price: '6,65 €', image: '../images/llaves.jpg' }
    ];

    const productsCompraContainer = document.getElementById('products-compra');
    const productsReparacionContainer = document.getElementById('products-reparacion');
    const btnDownloadAll = document.getElementById('btn-download-all');
    const btnPrintAll = document.getElementById('btn-print-all');

    // Elementos del panel de QR
    const qrDisplayPanel = document.getElementById('qr-display-panel');
    const qrCodeDisplay = document.getElementById('qr-code-display');
    const qrProductName = document.getElementById('qr-product-name');
    const qrProductCode = document.getElementById('qr-product-code');
    const btnDownloadCurrent = document.getElementById('btn-download-current');
    const btnPrintCurrent = document.getElementById('btn-print-current');
    const btnClosePanel = document.getElementById('btn-close-panel');

    let allQRCodes = {};
    let currentQRCode = null;
    let currentProduct = null;

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
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && activeOverlay) activeOverlay.querySelector('button').click(); });

    // ========== CREAR TARJETA DE PRODUCTO ==========
    function createProductCard(product, type) {
        const card = document.createElement('div');
        card.className = 'product-card-qr';
        const badgeText = type === 'compra' ? 'Compra' : 'Reparación';
        const badgeClass = type === 'compra' ? 'badge-compra' : 'badge-reparacion';

        card.innerHTML = `
            <span class="product-badge ${badgeClass}">${badgeText}</span>
            <div class="product-image-qr">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='../images/placeholder.jpg'">
            </div>
            <div class="product-name-qr">${product.name}</div>
            <div class="product-code-qr">Código: ${product.code}</div>
            <div class="product-price-qr">${product.price}</div>
            <button class="btn-generate-qr" data-code="${product.code}">Generar QR</button>
        `;

        return card;
    }

    // ========== GENERAR QR EN PANEL ==========
    function generateQRInPanel(code) {
        const product = [...productosCompra, ...productosReparacion].find(p => p.code === code);
        if (!product) return;

        // Limpiar panel anterior
        qrCodeDisplay.innerHTML = '';

        // Generar nuevo QR
        currentQRCode = new QRCode(qrCodeDisplay, {
            text: code,
            width: 200,
            height: 200,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });

        currentProduct = product;

        // Actualizar información del producto
        qrProductName.textContent = product.name;
        qrProductCode.textContent = product.code;

        // Guardar en colección
        allQRCodes[code] = { qrCode: currentQRCode, product: product };

        // Mostrar panel
        qrDisplayPanel.classList.remove('hidden');

        // Scroll al panel
        setTimeout(() => {
            qrDisplayPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    // ========== RENDERIZAR PRODUCTOS ==========
    productosCompra.forEach(product => {
        const card = createProductCard(product, 'compra');
        productsCompraContainer.appendChild(card);
    });

    productosReparacion.forEach(product => {
        const card = createProductCard(product, 'reparacion');
        productsReparacionContainer.appendChild(card);
    });

    // Event listeners para botones de generar
    document.querySelectorAll('.btn-generate-qr').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const code = e.target.dataset.code;
            generateQRInPanel(code);
        });
    });

    // ========== ACCIONES DEL PANEL QR ==========
    btnDownloadCurrent.addEventListener('click', () => {
        const canvas = qrCodeDisplay.querySelector('canvas');
        if (canvas && currentProduct) {
            const link = document.createElement('a');
            link.download = `QR_${currentProduct.code}_${currentProduct.name}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    });

    btnPrintCurrent.addEventListener('click', () => {
        const canvas = qrCodeDisplay.querySelector('canvas');
        if (canvas && currentProduct) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Imprimir QR - ${currentProduct.name}</title>
                    <style>
                        body { font-family: Arial; text-align: center; padding: 2rem; }
                        h1 { color: #ff8c42; margin-bottom: 1rem; }
                        .info { margin: 1rem 0; color: #666; }
                        img { margin: 2rem 0; border: 2px solid #e0e0e0; padding: 10px; border-radius: 8px; }
                    </style>
                </head>
                <body>
                    <h1>${currentProduct.name}</h1>
                    <div class="info">Código: <strong>${currentProduct.code}</strong></div>
                    <div class="info">Precio: <strong>${currentProduct.price}</strong></div>
                    <img src="${canvas.toDataURL()}" alt="QR Code">
                    <div style="margin-top: 2rem; color: #999;">Suministros Duviso</div>
                </body>
                </html>
            `);
            printWindow.document.close();
            setTimeout(() => printWindow.print(), 250);
        }
    });

    btnClosePanel.addEventListener('click', () => {
        qrDisplayPanel.classList.add('hidden');
    });

    // ========== DESCARGAR TODOS ==========
    btnDownloadAll.addEventListener('click', () => {
        if (Object.keys(allQRCodes).length === 0) {
            alert('Por favor, genera al menos un código QR primero');
            return;
        }

        Object.keys(allQRCodes).forEach((code, index) => {
            setTimeout(() => {
                // Generar temporalmente el QR para descargarlo
                const tempDiv = document.createElement('div');
                tempDiv.style.display = 'none';
                document.body.appendChild(tempDiv);

                const tempQR = new QRCode(tempDiv, {
                    text: code,
                    width: 200,
                    height: 200
                });

                setTimeout(() => {
                    const canvas = tempDiv.querySelector('canvas');
                    if (canvas) {
                        const link = document.createElement('a');
                        link.download = `QR_${code}.png`;
                        link.href = canvas.toDataURL();
                        link.click();
                    }
                    tempDiv.remove();
                }, 100);
            }, index * 200);
        });
    });

    // ========== IMPRIMIR TODOS ==========
    btnPrintAll.addEventListener('click', () => {
        if (Object.keys(allQRCodes).length === 0) {
            alert('Por favor, genera al menos un código QR primero');
            return;
        }

        const printWindow = window.open('', '_blank');
        let html = `<!DOCTYPE html><html><head><title>Códigos QR - Duviso</title><style>
            body{font-family:Arial;padding:2rem;}.qr-item{page-break-after:always;text-align:center;padding:2rem;border:2px solid #ff8c42;margin-bottom:2rem;border-radius:10px;}
            h1{color:#ff8c42;}img{margin:1rem 0;border:2px solid #e0e0e0;padding:10px;border-radius:8px;}
        </style></head><body><h1 style="text-align:center;">Códigos QR - Suministros Duviso</h1>`;

        Object.keys(allQRCodes).forEach(code => {
            const data = allQRCodes[code];
            // Generar QR temporal para imprimir
            const tempDiv = document.createElement('div');
            tempDiv.style.display = 'none';
            document.body.appendChild(tempDiv);

            const tempQR = new QRCode(tempDiv, {
                text: code,
                width: 200,
                height: 200
            });

            setTimeout(() => {
                const canvas = tempDiv.querySelector('canvas');
                if (canvas) {
                    html += `<div class="qr-item"><h2>${data.product.name}</h2><p>Código: ${code}</p><p>Precio: ${data.product.price}</p><img src="${canvas.toDataURL()}" alt="QR ${code}"></div>`;
                }
                tempDiv.remove();
            }, 100);
        });

        setTimeout(() => {
            html += `<p style="text-align:center;color:#999;">Suministros Duviso</p></body></html>`;
            printWindow.document.write(html);
            printWindow.document.close();
            setTimeout(() => printWindow.print(), 500);
        }, Object.keys(allQRCodes).length * 150);
    });
});