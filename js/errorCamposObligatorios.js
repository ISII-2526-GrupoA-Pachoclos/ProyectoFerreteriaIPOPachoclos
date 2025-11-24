document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('btn-close-error-campos');
    
    // Recibir mensaje personalizado del padre
    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'set-error-message') {
            const messageElement = document.getElementById('error-message');
            if (messageElement && event.data.message) {
                messageElement.textContent = event.data.message;
            }
        }
    });

    // Cerrar el popup y notificar al padre
    closeBtn.addEventListener('click', () => {
        if (window.parent) {
            window.parent.postMessage({ type: 'close-campos-error' }, '*');
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (window.parent) {
                window.parent.postMessage({ type: 'close-campos-error' }, '*');
            }
        }
    });
});