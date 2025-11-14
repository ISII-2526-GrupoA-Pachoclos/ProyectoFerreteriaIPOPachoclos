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
        // desactivar tritanopia visualmente en el iframe (no estrictamente necesario)
        btnProt.dataset.enabled = enabled ? 'true' : 'false';
        btnProt.textContent = enabled ? 'Desactivar modo protanopia' : 'Activar modo daltonismo (protanopía)';
        // asegurar exclusividad: si activas protanopía desactiva tritanopía
        postToParent({ type: 'toggle-mode', mode: 'protanopia', enabled });
        if (enabled) postToParent({ type: 'toggle-mode', mode: 'tritanopia', enabled: false });
    });

    btnTri?.addEventListener('click', () => {
        const enabled = !(btnTri.dataset.enabled === 'true');
        btnTri.dataset.enabled = enabled ? 'true' : 'false';
        btnTri.textContent = enabled ? 'Desactivar modo tritanopia' : 'Activar modo daltonismo (tritanopía)';
        postToParent({ type: 'toggle-mode', mode: 'tritanopia', enabled });
        if (enabled) postToParent({ type: 'toggle-mode', mode: 'protanopia', enabled: false });
    });

    btnReset?.addEventListener('click', () => {
        // reset UI
        if (btnDislexia) { btnDislexia.dataset.enabled = 'false'; btnDislexia.textContent = 'Activar modo dislexia'; }
        if (btnProt) { btnProt.dataset.enabled = 'false'; btnProt.textContent = 'Activar modo daltonismo (protanopía)'; }
        if (btnTri) { btnTri.dataset.enabled = 'false'; btnTri.textContent = 'Activar modo daltonismo (tritanopía)'; }
        postToParent({ type: 'reset-modes' });
    });

    // Escape: si estamos dentro de iframe, pedir al padre cerrar el overlay
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            postToParent({ type: 'close-help' });
        }
    });
});