document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('btn-close-error');
    
    // Cerrar el popup y notificar al padre
    closeBtn.addEventListener('click', () => {
        if (window.parent) {
            window.parent.postMessage({ type: 'close-admin-error' }, '*');
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (window.parent) {
                window.parent.postMessage({ type: 'close-admin-error' }, '*');
            }
        }
    });
});