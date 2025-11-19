document.addEventListener('DOMContentLoaded', () => {
    // Estado actual del idioma (guardado en localStorage)
    let currentLanguage = localStorage.getItem('appLanguage') || 'es';

    const currentLangDisplay = document.getElementById('current-lang');
    const btnChangeLanguage = document.getElementById('btn-change-language');
    const languageTitle = document.getElementById('language-title');

    // Traducciones
    const translations = {
        es: {
            title: 'Idioma',
            currentLabel: 'Idioma actual:',
            currentValue: 'Español',
            buttonText: 'Cambiar a Inglés'
        },
        en: {
            title: 'Language',
            currentLabel: 'Current language:',
            currentValue: 'English',
            buttonText: 'Change to Spanish'
        }
    };

    // Función para actualizar la interfaz según el idioma
    function updateUI() {
        const lang = translations[currentLanguage];
        
        languageTitle.textContent = lang.title;
        currentLangDisplay.textContent = lang.currentValue;
        btnChangeLanguage.textContent = lang.buttonText;

        // Actualizar el label "Idioma actual:" o "Current language:"
        const labelElement = document.querySelector('.current-language .label');
        if (labelElement) {
            labelElement.textContent = lang.currentLabel;
        }
    }

    // Inicializar la interfaz
    updateUI();

    // Cambiar idioma al hacer clic en el botón
    btnChangeLanguage.addEventListener('click', () => {
        // Alternar entre español e inglés
        currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
        
        // Guardar en localStorage
        localStorage.setItem('appLanguage', currentLanguage);
        
        // Actualizar la interfaz
        updateUI();

        // Notificar a la ventana padre si está en iframe
        try {
            if (window !== window.parent) {
                window.parent.postMessage({ 
                    type: 'language-changed', 
                    language: currentLanguage 
                }, '*');
            }
        } catch (err) {
            console.log('No se pudo notificar al padre:', err);
        }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            try {
                if (window !== window.parent) {
                    window.parent.postMessage({ type: 'close-language' }, '*');
                }
            } catch (err) {
                console.log('Error al cerrar:', err);
            }
        }
    });
});