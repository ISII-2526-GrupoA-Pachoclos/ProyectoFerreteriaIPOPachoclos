document.addEventListener('DOMContentLoaded', () => {
    const btnDislexia = document.getElementById('toggle-dislexia');
    const btnProt = document.getElementById('protanopia');
    const btnTri = document.getElementById('tritanopia');
    const btnReset = document.getElementById('reset');

    function postToParent(payload) {
        try {
            if (window !== window.parent) window.parent.postMessage(payload, '*');
        } catch (err) { /* noop */ }
    }

    btnDislexia?.addEventListener('click', () => {
        const enabled = !(btnDislexia.dataset.enabled === 'true');
        btnDislexia.dataset.enabled = enabled ? 'true' : 'false';
        btnDislexia.textContent = enabled ? 'Desactivar modo dislexia' : 'Activar modo dislexia';
        postToParent({ type: 'toggle-mode', mode: 'dyslexia', enabled });
    });

    btnProt?.addEventListener('click', () => {
        const enabled = !(btnProt.dataset.enabled === 'true');

        if (enabled) {
            // Al activar protanopía, redirigir a la versión protanopía
            // Usamos "../" para subir un nivel desde html/ayuda.html
            window.top.location.href = '../htmlDaltonismo/indexProtanopia.html';
        } else {
            // Al desactivar, volver a la versión original
            window.top.location.href = '../index.html';
        }
    });

    btnTri?.addEventListener('click', () => {
        const enabled = !(btnTri.dataset.enabled === 'true');
        btnTri.dataset.enabled = enabled ? 'true' : 'false';
        btnTri.textContent = enabled ? 'Desactivar modo tritanopia' : 'Activar modo daltonismo (tritanopía)';
        postToParent({ type: 'toggle-mode', mode: 'tritanopia', enabled });
        if (enabled) postToParent({ type: 'toggle-mode', mode: 'protanopia', enabled: false });
    });

    btnReset?.addEventListener('click', () => {
        // Resetear todos los modos y volver a la versión original del index
        if (btnDislexia) {
            btnDislexia.dataset.enabled = 'false';
            btnDislexia.textContent = 'Activar modo dislexia';
        }
        if (btnProt) {
            btnProt.dataset.enabled = 'false';
            btnProt.textContent = 'Activar modo daltonismo (protanopía)';
        }
        if (btnTri) {
            btnTri.dataset.enabled = 'false';
            btnTri.textContent = 'Activar modo daltonismo (tritanopía)';
        }

        // Enviar mensaje de reset
        postToParent({ type: 'reset-modes' });

        // Redirigir a la versión original del index
        window.top.location.href = '../index.html';
    });

    // Escape: si estamos dentro de iframe, pedir al padre cerrar el overlay
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            postToParent({ type: 'close-help' });
        }
    });
});