document.addEventListener('DOMContentLoaded', () => {
    // Búsqueda básica
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const q = searchInput.value.trim();
            if (!q) { searchInput.focus(); return; }
            alert(`Buscar: ${q}`);
        });
        searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchBtn.click(); });
    }

    // Placeholders
    document.querySelector('.cart-icon')?.addEventListener('click', () => alert('Carrito: funcionalidad no implementada.'));
    document.querySelector('.btn-account')?.addEventListener('click', () => alert('Mi cuenta: funcionalidad no implementada.'));

    // Abrir ayuda en overlay flotante (carga html/ayuda.html)
    const helpButton = document.querySelector('.btn-help');
    let helpOverlay = null;

    function openHelp() {
        if (helpOverlay) return;
        helpOverlay = document.createElement('div');
        helpOverlay.id = 'help-overlay';
        Object.assign(helpOverlay.style, {
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        });

        const panel = document.createElement('div');
        Object.assign(panel.style, {
            width: '94%', maxWidth: '1100px', height: '86vh', background: '#fff',
            borderRadius: '10px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        });

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        Object.assign(closeBtn.style, {
            position: 'absolute', top: '12px', right: '12px', zIndex: 2,
            width: '42px', height: '42px', borderRadius: '50%', border: 'none',
            background: 'rgba(0,0,0,0.7)', color: '#fff', cursor: 'pointer', fontSize: '18px'
        });
        closeBtn.addEventListener('click', closeHelp);

        const iframe = document.createElement('iframe');
        iframe.src = 'html/ayuda.html';
        iframe.title = 'Ayuda Duviso';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.display = 'block';

        panel.appendChild(closeBtn);
        panel.appendChild(iframe);
        helpOverlay.appendChild(panel);
        document.body.appendChild(helpOverlay);

        // bloquear scroll
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

    helpButton?.addEventListener('click', (e) => { e.preventDefault(); openHelp(); });

    // recibir mensajes desde el iframe (ayuda)
    window.addEventListener('message', (ev) => {
        if (!ev?.data) return;
        const data = ev.data;
        if (data.type === 'close-help') {
            closeHelp();
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

    // Escape cierra overlay si existe
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeHelp(); });
});