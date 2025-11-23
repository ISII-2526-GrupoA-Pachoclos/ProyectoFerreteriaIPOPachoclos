document.addEventListener('DOMContentLoaded', () => {
    const panelLogin = document.getElementById('panel-login');
    const panelRegister = document.getElementById('panel-register');
    const confirmationMessage = document.getElementById('confirmation-message');
    const confirmationTitle = document.getElementById('confirmation-title');
    const confirmationText = document.getElementById('confirmation-text');

    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const btnBackToHome = document.getElementById('btn-back-to-home');

    // Cambiar entre paneles de login y registro
    switchToRegister?.addEventListener('click', (e) => {
        e.preventDefault();
        panelLogin.classList.add('hidden');
        panelRegister.classList.remove('hidden');
        confirmationMessage.classList.add('hidden');
    });

    switchToLogin?.addEventListener('click', (e) => {
        e.preventDefault();
        panelRegister.classList.add('hidden');
        panelLogin.classList.remove('hidden');
        confirmationMessage.classList.add('hidden');
    });

    // Botones de limpiar inputs
    document.querySelectorAll('.btn-clear').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            if (input) input.value = '';
            input?.focus();
        });
    });

    // Submit Login
    formLogin?.addEventListener('submit', (e) => {
        e.preventDefault();
        showConfirmation('¡Inicio de sesión exitoso!', 'Has iniciado sesión correctamente en tu cuenta de Ferretería Duviso.');
    });

    // Submit Register
    formRegister?.addEventListener('submit', (e) => {
        e.preventDefault();
        showConfirmation('¡Registro completado!', 'Tu cuenta ha sido creada correctamente. Bienvenido a Ferretería Duviso.');
    });

    function showConfirmation(title, text) {
        panelLogin.classList.add('hidden');
        panelRegister.classList.add('hidden');
        confirmationMessage.classList.remove('hidden');
        confirmationTitle.textContent = title;
        confirmationText.textContent = text;
    }

    // Volver al inicio (cerrar overlay) - Navega a index tritanopia
    btnBackToHome?.addEventListener('click', () => {
        try {
            if (window !== window.parent) {
                window.parent.postMessage({ type: 'close-account-tritanopia' }, '*');
            } else {
                // Navegar a la versión tritanopia del index si existe
                window.location.href = '../htmlDaltonismo/indexTritanopia.html';
            }
        } catch (err) {
            window.location.href = '../htmlDaltonismo/indexTritanopia.html';
        }
    });

    // Escape cierra overlay
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            try {
                if (window !== window.parent) {
                    window.parent.postMessage({ type: 'close-account-tritanopia' }, '*');
                }
            } catch (err) { }
        }
    });
});
