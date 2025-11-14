// Manejadores para la página de ayuda: dislexia, daltonismo y volver/reset
document.addEventListener('DOMContentLoaded', () => {
  const btnDislexia = document.getElementById('toggle-dislexia');
  const btnProt = document.getElementById('protanopia');
  const btnTri = document.getElementById('tritanopia');
  const btnReset = document.getElementById('reset');
  const btnVolver = document.getElementById('volver');

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
    btnProt.textContent = enabled ? 'Desactivar modo protanopia' : 'Activar modo daltonismo (protanopia)';
  });

  btnTri?.addEventListener('click', () => {
    document.documentElement.classList.remove('protanopia');
    const enabled = document.documentElement.classList.toggle('tritanopia');
    btnTri.textContent = enabled ? 'Desactivar modo tritanopia' : 'Activar modo daltonismo (tritanopia)';
  });

  btnReset?.addEventListener('click', () => {
    removeModes();
    // reset botones texto
    if (btnDislexia) btnDislexia.textContent = 'Activar modo dislexia';
    if (btnProt) btnProt.textContent = 'Activar modo daltonismo (protanopia)';
    if (btnTri) btnTri.textContent = 'Activar modo daltonismo (tritanopia)';
  });

  btnVolver?.addEventListener('click', () => {
    // Si estamos dentro de un iframe (index abre la ayuda en un iframe overlay), mandar mensaje al padre para cerrarlo
    try {
      if (window !== window.parent) {
        window.parent.postMessage({ type: 'close-help' }, '*');
      } else {
        // si la ayuda se abrió en la pestaña actual, volver atrás
        window.history.back();
      }
    } catch (e) {
      // fallback: intentar history.back
      window.history.back();
    }
  });

  // Soporta tecla Escape para reset/volver
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      btnVolver?.click();
    }
  });
});