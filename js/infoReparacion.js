document.addEventListener('DOMContentLoaded', () => {
    // Base de datos de productos para reparación
    const productsData = {
        '00001': {
            name: 'Juego Destornilladores',
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
        '00002': {
            name: 'Martillo Bellota',
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
        '00003': {
            name: 'Alicates',
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
        '00004': {
            name: 'Llave Inglesa',
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
        '00005': {
            name: 'Cutter Profesional',
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
        '00006': {
            name: 'Juego de Llaves Allen',
            image: '../images/llaves.jpg',
            price: 8.69,
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
    const productCode = urlParams.get('code') || '00001';

    // Cargar datos del producto
    const product = productsData[productCode] || productsData['00001'];

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

    // Añadir al carrito
    document.getElementById('btn-add-cart').addEventListener('click', () => {
        if (quantity === 0) {
            alert('Por favor, selecciona una cantidad mayor a 0');
            return;
        }
        alert(`Se ha añadido ${quantity} x ${product.name} al carrito por un total de ${(product.price * quantity).toFixed(2)} €`);
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
        alert('Carrito: funcionalidad no implementada.');
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
        }
    });
});