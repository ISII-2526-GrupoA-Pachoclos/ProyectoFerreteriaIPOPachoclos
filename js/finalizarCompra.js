document.addEventListener('DOMContentLoaded', () => {
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

    // Carrito
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

    // Sistema de popup de error para campos obligatorios
    let errorCamposOverlay = null;

    function showErrorCamposPopup(message) {
        if (errorCamposOverlay) return;

        errorCamposOverlay = document.createElement('div');
        Object.assign(errorCamposOverlay.style, {
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 10000
        });

        const panel = document.createElement('div');
        Object.assign(panel.style, {
            width: '90%', maxWidth: '450px', background: '#fff',
            borderRadius: '12px', padding: '40px 32px', position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)', textAlign: 'center',
            animation: 'slideIn 0.3s ease-out'
        });

        const icon = document.createElement('div');
        icon.innerHTML = '⚠️';
        icon.style.fontSize = '64px';
        icon.style.marginBottom = '20px';

        const messageText = document.createElement('p');
        messageText.textContent = message;
        Object.assign(messageText.style, {
            fontSize: '18px', color: '#333', marginBottom: '28px',
            lineHeight: '1.5', fontWeight: '500'
        });

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Aceptar';
        Object.assign(closeBtn.style, {
            padding: '12px 32px', background: '#ff4444', color: '#fff',
            border: 'none', borderRadius: '25px', fontSize: '16px',
            fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(255, 68, 68, 0.3)'
        });

        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.background = '#ff2222';
            closeBtn.style.transform = 'translateY(-2px)';
            closeBtn.style.boxShadow = '0 6px 16px rgba(255, 68, 68, 0.4)';
        });

        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.background = '#ff4444';
            closeBtn.style.transform = 'translateY(0)';
            closeBtn.style.boxShadow = '0 4px 12px rgba(255, 68, 68, 0.3)';
        });

        closeBtn.addEventListener('click', closeErrorCamposPopup);

        panel.appendChild(icon);
        panel.appendChild(messageText);
        panel.appendChild(closeBtn);
        errorCamposOverlay.appendChild(panel);
        document.body.appendChild(errorCamposOverlay);

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function closeErrorCamposPopup() {
        if (!errorCamposOverlay) return;
        errorCamposOverlay.remove();
        errorCamposOverlay = null;
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    // Sistema de popup de confirmación de pedido
    let confirmacionPedidoOverlay = null;

    function showConfirmacionPedidoPopup() {
        if (confirmacionPedidoOverlay) return;

        confirmacionPedidoOverlay = document.createElement('div');
        Object.assign(confirmacionPedidoOverlay.style, {
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
        icon.innerHTML = '❤︎';
        Object.assign(icon.style, {
            width: '72px', height: '72px', background: '#4caf50', color: '#fff',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '42px', fontWeight: '700', margin: '0 auto 20px'
        });

        const messageText = document.createElement('p');
        messageText.textContent = '¡Pedido confirmado! Y como nos gusta decir....Suministros Duviso - Donde tus ideas se ponen manos a la obra.';
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

        closeBtn.addEventListener('click', () => {
            closeConfirmacionPedidoPopup();
            // Limpiar carrito
            localStorage.removeItem('duvisoCart');
            // Redirigir al catálogo
            window.location.href = 'catalogoCompras.html';
        });

        panel.appendChild(icon);
        panel.appendChild(messageText);
        panel.appendChild(closeBtn);
        confirmacionPedidoOverlay.appendChild(panel);
        document.body.appendChild(confirmacionPedidoOverlay);

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        // Auto cerrar después de 3 segundos y redirigir
        setTimeout(() => {
            closeConfirmacionPedidoPopup();
            localStorage.removeItem('duvisoCart');
            window.location.href = 'catalogoCompras.html';
        }, 3000);
    }

    function closeConfirmacionPedidoPopup() {
        if (!confirmacionPedidoOverlay) return;
        confirmacionPedidoOverlay.remove();
        confirmacionPedidoOverlay = null;
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

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
        if (data.type === 'close-campos-error') {
            closeErrorCamposPopup();
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
            closeErrorCamposPopup();
            closeConfirmacionPedidoPopup();
        }
    });

    // Funcionalidad de métodos de pago
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('card-details');
    const paypalDetails = document.getElementById('paypal-details');

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            // Ocultar todos los detalles
            cardDetails?.classList.add('hidden');
            paypalDetails?.classList.add('hidden');

            // Mostrar el detalle correspondiente
            if (radio.value === 'card') {
                cardDetails?.classList.remove('hidden');
            } else if (radio.value === 'paypal') {
                paypalDetails?.classList.remove('hidden');
            }
        });
    });

    // Funcionalidad de dirección de envío
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    const otherAddress = document.getElementById('other-address');
    const lockerDetails = document.getElementById('locker-details');

    shippingRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            // Ocultar todos los detalles
            otherAddress?.classList.add('hidden');
            lockerDetails?.classList.add('hidden');

            // Mostrar el detalle correspondiente
            if (radio.value === 'other') {
                otherAddress?.classList.remove('hidden');
            } else if (radio.value === 'locker') {
                lockerDetails?.classList.remove('hidden');
            }
        });
    });

    // Botones clear en inputs
    document.querySelectorAll('.btn-clear').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            if (input && input.tagName === 'INPUT') {
                input.value = '';
                input.focus();
            }
        });
    });

    // Formateo automático de número de tarjeta
    const cardNumberInput = document.querySelector('input[placeholder*="XXXX XXXX"]');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // Formateo automático de fecha de caducidad
    const expiryInput = document.querySelector('input[placeholder="MM/AA"]');
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    // Botón confirmar datos con validación mejorada y popup de confirmación
    document.getElementById('btn-confirm')?.addEventListener('click', () => {
        const selectedPayment = document.querySelector('input[name="payment"]:checked')?.value;
        const selectedShipping = document.querySelector('input[name="shipping"]:checked')?.value;

        // Validar selección de método de pago y envío
        if (!selectedPayment || !selectedShipping) {
            showErrorCamposPopup('Por favor, selecciona un método de pago y una dirección de envío.');
            return;
        }

        // Validar campos según el método de pago seleccionado
        if (selectedPayment === 'card') {
            const cardNumber = document.querySelector('input[placeholder*="XXXX XXXX"]')?.value.trim();
            const expiry = document.querySelector('input[placeholder="MM/AA"]')?.value.trim();
            const cvv = document.querySelector('input[placeholder="XXX"]')?.value.trim();

            if (!cardNumber || !expiry || !cvv) {
                showErrorCamposPopup('Por favor, completa todos los datos de la tarjeta: número, fecha de caducidad y CVV.');
                return;
            }

            // Validar formato del número de tarjeta (16 dígitos)
            const cardNumberDigits = cardNumber.replace(/\s/g, '');
            if (cardNumberDigits.length !== 16) {
                showErrorCamposPopup('El número de tarjeta debe contener 16 dígitos.');
                return;
            }

            // Validar formato de fecha (MM/AA)
            if (expiry.length !== 5 || !expiry.includes('/')) {
                showErrorCamposPopup('La fecha de caducidad debe tener el formato MM/AA.');
                return;
            }

            // Validar CVV (3 dígitos)
            if (cvv.length !== 3 || !/^\d{3}$/.test(cvv)) {
                showErrorCamposPopup('El CVV debe contener 3 dígitos.');
                return;
            }
        } else if (selectedPayment === 'paypal') {
            const email = document.querySelector('#paypal-details input[type="email"]')?.value.trim();
            
            if (!email) {
                showErrorCamposPopup('Por favor, introduce tu correo electrónico de PayPal.');
                return;
            }

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showErrorCamposPopup('Por favor, introduce un correo electrónico válido.');
                return;
            }
        }

        // Validar campos según la dirección de envío seleccionada
        if (selectedShipping === 'other') {
            const address = document.querySelector('#other-address input')?.value.trim();
            
            if (!address) {
                showErrorCamposPopup('Por favor, introduce la dirección de envío completa.');
                return;
            }

            if (address.length < 10) {
                showErrorCamposPopup('Por favor, introduce una dirección de envío válida con todos los detalles.');
                return;
            }
        } else if (selectedShipping === 'locker') {
            const locker = document.querySelector('#locker-details input')?.value.trim();
            
            if (!locker) {
                showErrorCamposPopup('Por favor, selecciona un punto de recogida (Locker).');
                return;
            }
        }

        // Si todo está correcto, mostrar popup de confirmación
        showConfirmacionPedidoPopup();
    });
});