document.addEventListener('DOMContentLoaded', () => {
    const btnDislexia = document.getElementById('toggle-dislexia');
    const btnTri = document.getElementById('tritanopia');
    const btnReset = document.getElementById('reset');

    function postToParent(payload) {
        try {
            if (window !== window.parent) window.parent.postMessage(payload, '*');
        } catch (err) { 
            console.error('Error sending message to parent:', err);
        }
    }

    // Modo dislexia (solo afecta el estilo de texto)
    btnDislexia?.addEventListener('click', () => {
        const enabled = !(btnDislexia.dataset.enabled === 'true');
        btnDislexia.dataset.enabled = enabled ? 'true' : 'false';
        btnDislexia.textContent = enabled ? 'Desactivar modo dislexia' : 'Activar modo dislexia';
        
        // Enviar mensaje al padre para activar/desactivar dislexia
        postToParent({ type: 'toggle-mode', mode: 'dyslexia', enabled });
        
        console.log('Modo dislexia:', enabled ? 'activado' : 'desactivado');
    });

    // Cambiar a modo tritanopía
    btnTri?.addEventListener('click', () => {
        console.log('Cambiando a modo tritanopía...');
        // Redirigir a la versión tritanopía (cuando la crees)
        window.top.location.href = '../htmlDaltonismo/indexTritanopia.html';
    });

    // Volver a la configuración original
    btnReset?.addEventListener('click', () => {
        console.log('Volviendo a configuración original...');
        // Resetear UI local
        if (btnDislexia) { 
            btnDislexia.dataset.enabled = 'false'; 
            btnDislexia.textContent = 'Activar modo dislexia'; 
        }
        
        // Enviar mensaje de reset al padre
        postToParent({ type: 'reset-modes' });
        
        // Redirigir al index original
        setTimeout(() => {
            window.top.location.href = '../index.html';
        }, 100);
    });

    // Escape: cerrar el overlay de ayuda
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            console.log('Cerrando overlay de ayuda...');
            postToParent({ type: 'close-help' });
        }
    });

    // Log inicial
    console.log('Ayuda Protanopía cargada correctamente');
});