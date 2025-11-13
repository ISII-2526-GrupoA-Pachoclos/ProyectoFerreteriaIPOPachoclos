document.addEventListener('DOMContentLoaded', () => {
    const btnDislexia = document.getElementById('toggle-dislexia');
    const btnProt = document.getElementById('protanopia');
    const btnTri = document.getElementById('tritanopia');
    const btnReset = document.getElementById('reset');

    function removeModes() {
        document.documentElement.classList.remove('dyslexia', 'protanopia', 'tritanopia');
    }

    btnDislexia?.addEventListener('click', () => {
        const enabled = document.documentElement.classList.toggle('dyslexia');
        btnDislexia.textContent = enabled ? 'Desactivar modo dislexia' : 'Activar modo dislexia';
    });

    btnProt?.addEventListener('click', () => {
        document.documentElement.classList.remove('tritanopia');
        const enabled = document.documentElement.classList.toggle('protanopia');
        btnProt.textContent = enabled ? 'Desactivar modo protanopía' : 'Activar modo daltonismo (protanopía)';
    });

    btnTri?.addEventListener('click', () => {
        document.documentElement.classList.remove('protanopia');
        const enabled = document.documentElement.classList.toggle('tritanopia');
        btnTri.textContent = enabled ? 'Desactivar modo tritanopía' : 'Activar modo daltonismo (tritanopía)';
    });

    btnReset?.addEventListener('click', () => {
        removeModes();
        if (btnDislexia) btnDislexia.textContent = 'Activar modo dislexia';
        if (btnProt) btnProt.textContent = 'Activar modo daltonismo (protanopía)';
        if (btnTri) btnTri.textContent = 'Activar modo daltonismo (tritanopía)';
    });

    // tecla Escape cierra overlay enviando mensaje al padre si estamos en iframe
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            try {
                if (window !== window.parent) {
                    window.parent.postMessage({ type: 'close-help' }, '*');
                }
            } catch (err) {
                // noop
            }
        }
    });
});