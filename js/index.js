document.addEventListener('DOMContentLoaded', () => {
    // Navegación: logo siempre a index.html
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

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

    // Placeholder carrito
    document.querySelector('.cart-icon')?.addEventListener('click', () => {
        window.location.href = 'html/carrito.html';
    });

    // Función para mostrar popup de error de administrador
    let errorAdminOverlay = null;

    function showAdminErrorPopup() {
        if (errorAdminOverlay) return;

        errorAdminOverlay = document.createElement('div');
        Object.assign(errorAdminOverlay.style, {
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        });

        const panel = document.createElement('div');
        Object.assign(panel.style, {
            width: '90%',
            maxWidth: '450px',
            background: '#fff',
            borderRadius: '10px',
            padding: '30px',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
            textAlign: 'center'
        });

        const icon = document.createElement('div');
        icon.innerHTML = '🚫';
        icon.style.fontSize = '60px';
        icon.style.marginBottom = '15px';

        const messageText = document.createElement('p');
        messageText.textContent = 'Error. Usted no está registrado en nuestro sistema como Administrador.';
        Object.assign(messageText.style, {
            fontSize: '16px',
            color: '#333',
            marginBottom: '20px',
            lineHeight: '1.5',
            fontWeight: '500'
        });

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Aceptar';
        Object.assign(closeBtn.style, {
            padding: '10px 30px',
            background: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
        });

        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.background = '#c82333';
        });

        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.background = '#dc3545';
        });

        closeBtn.addEventListener('click', closeAdminErrorPopup);

        panel.appendChild(icon);
        panel.appendChild(messageText);
        panel.appendChild(closeBtn);
        errorAdminOverlay.appendChild(panel);
        document.body.appendChild(errorAdminOverlay);

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function closeAdminErrorPopup() {
        if (!errorAdminOverlay) return;
        errorAdminOverlay.remove();
        errorAdminOverlay = null;
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    // Navegación entre interfaces
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        const text = btn.textContent.trim().toLowerCase();
        if (text.includes('comprar herramientas')) {
            btn.addEventListener('click', () => {
                window.location.href = 'html/catalogoCompras.html';
            });
        } else if (text.includes('reparar herramientas')) {
            btn.addEventListener('click', () => {
                window.location.href = 'html/repararHerramientas.html';
            });
        } else if (text.includes('crear ofertas')) {
            btn.addEventListener('click', () => {
                // 50% de probabilidad de mostrar error de administrador
                const isAdmin = Math.random() < 0.5;

                if (isAdmin) {
                    // Usuario es administrador, puede acceder
                    window.location.href = 'html/crearOfertas.html';
                } else {
                    // Usuario no es administrador, mostrar error
                    showAdminErrorPopup();
                }
            });
        } else {
            btn.addEventListener('click', () => {
                console.log('Acción seleccionada:', text);
            });
        }
    });

    // Hacer clickeables las tarjetas de productos
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        // Agregar cursor pointer
        card.style.cursor = 'pointer';

        // Agregar evento click
        card.addEventListener('click', () => {
            const productCode = card.getAttribute('data-code');
            if (productCode) {
                window.location.href = `html/infoCompras.html?code=${productCode}`;
            }
        });

        // Agregar efecto hover
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Abrir Mi Cuenta en overlay flotante
    const accountButton = document.querySelector('.btn-account');
    let accountOverlay = null;

    function openAccount() {
        if (accountOverlay) return;
        accountOverlay = document.createElement('div');
        accountOverlay.id = 'account-overlay';
        Object.assign(accountOverlay.style, {
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        });

        const panel = document.createElement('div');
        Object.assign(panel.style, {
            width: '94%', maxWidth: '600px', height: 'auto', maxHeight: '90vh', background: '#fff',
            borderRadius: '10px', overflow: 'auto', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        });

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        Object.assign(closeBtn.style, {
            position: 'absolute', top: '12px', right: '12px', zIndex: 2,
            width: '42px', height: '42px', borderRadius: '50%', border: 'none',
            background: 'rgba(0,0,0,0.7)', color: '#fff', cursor: 'pointer', fontSize: '18px'
        });
        closeBtn.addEventListener('click', closeAccount);

        const iframe = document.createElement('iframe');
        iframe.src = 'html/miCuenta.html';
        iframe.title = 'Mi Cuenta Duviso';
        iframe.style.width = '100%';
        iframe.style.height = '600px';
        iframe.style.border = 'none';

        panel.appendChild(closeBtn);
        panel.appendChild(iframe);
        accountOverlay.appendChild(panel);
        document.body.appendChild(accountOverlay);

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function closeAccount() {
        if (!accountOverlay) return;
        accountOverlay.remove();
        accountOverlay = null;
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    accountButton?.addEventListener('click', (e) => { e.preventDefault(); openAccount(); });

    // Abrir ayuda en overlay flotante
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

    // Abrir idioma en overlay flotante
    const languageButton = document.querySelector('.btn-header');
    let languageOverlay = null;

    function openLanguage() {
        if (languageOverlay) return;
        languageOverlay = document.createElement('div');
        languageOverlay.id = 'language-overlay';
        Object.assign(languageOverlay.style, {
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        });

        const panel = document.createElement('div');
        Object.assign(panel.style, {
            width: '94%', maxWidth: '600px', height: 'auto', maxHeight: '90vh', background: '#fff',
            borderRadius: '10px', overflow: 'auto', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        });

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        Object.assign(closeBtn.style, {
            position: 'absolute', top: '12px', right: '12px', zIndex: 2,
            width: '42px', height: '42px', borderRadius: '50%', border: 'none',
            background: 'rgba(0,0,0,0.7)', color: '#fff', cursor: 'pointer', fontSize: '18px'
        });
        closeBtn.addEventListener('click', closeLanguage);

        const iframe = document.createElement('iframe');
        iframe.src = 'html/idioma.html';
        iframe.title = 'Idioma Duviso';
        iframe.style.width = '100%';
        iframe.style.height = '400px';
        iframe.style.border = 'none';

        panel.appendChild(closeBtn);
        panel.appendChild(iframe);
        languageOverlay.appendChild(panel);
        document.body.appendChild(languageOverlay);

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function closeLanguage() {
        if (!languageOverlay) return;
        languageOverlay.remove();
        languageOverlay = null;
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    if (languageButton) {
        languageButton.addEventListener('click', (e) => {
            e.preventDefault();
            openLanguage();
        });
    }

    // ========================================
    // FUNCIONALIDAD DE VOZ (Speech Recognition & Synthesis)
    // ========================================

    // Verificar compatibilidad del navegador
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechSynthesis = window.speechSynthesis;
    let recognition = null;
    let isListening = false;
    let voiceIndicator = null;
    let recognitionTimeout = null;

    // Inicializar reconocimiento de voz
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.continuous = true; // CAMBIADO: Mantener escuchando
        recognition.interimResults = true; // CAMBIADO: Mostrar resultados mientras hablas
        recognition.maxAlternatives = 3; // CAMBIADO: Más alternativas

        // Crear indicador visual de micrófono activo
        voiceIndicator = document.createElement('div');
        voiceIndicator.id = 'voice-indicator';
        Object.assign(voiceIndicator.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.5)',
            zIndex: 10000,
            animation: 'pulse 1.5s ease-in-out infinite'
        });

        const micIcon = document.createElement('div');
        micIcon.innerHTML = '🎤';
        micIcon.style.fontSize = '36px';
        voiceIndicator.appendChild(micIcon);

        const voiceText = document.createElement('div');
        voiceText.id = 'voice-text';
        Object.assign(voiceText.style, {
            position: 'fixed',
            bottom: '120px',
            right: '30px',
            background: 'rgba(0, 0, 0, 0.85)',
            color: '#fff',
            padding: '15px 20px',
            borderRadius: '10px',
            display: 'none',
            maxWidth: '300px',
            fontSize: '14px',
            zIndex: 10000,
            fontWeight: '500',
            textAlign: 'center'
        });
        voiceText.textContent = 'Escuchando...';

        document.body.appendChild(voiceIndicator);
        document.body.appendChild(voiceText);

        // Agregar animación de pulso al CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
                }
                50% {
                    transform: scale(1.1);
                    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Función de síntesis de voz (Text-to-Speech)
    function speak(text) {
        if (!SpeechSynthesis) {
            console.warn('Síntesis de voz no soportada');
            return;
        }

        // Cancelar cualquier síntesis en curso
        SpeechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        SpeechSynthesis.speak(utterance);
    }

    // Función para procesar comandos de voz
    function processVoiceCommand(command) {
        const lowerCommand = command.toLowerCase().trim();
        console.log('Comando recibido:', lowerCommand);

        // Comandos para navegar directamente a productos de COMPRA
        if (lowerCommand.includes('comprar destornillador') || lowerCommand.includes('comprar destornilladores')) {
            speak('Abriendo información de compra de destornilladores');
            setTimeout(() => {
                window.location.href = 'html/infoCompras.html?code=00001';
            }, 1000);
        } else if (lowerCommand.includes('comprar martillo')) {
            speak('Abriendo información de compra de martillo');
            setTimeout(() => {
                window.location.href = 'html/infoCompras.html?code=00002';
            }, 1000);
        } else if (lowerCommand.includes('comprar alicate') || lowerCommand.includes('comprar alicates')) {
            speak('Abriendo información de compra de alicates');
            setTimeout(() => {
                window.location.href = 'html/infoCompras.html?code=00003';
            }, 1000);
        } else if (lowerCommand.includes('comprar llave inglesa') || lowerCommand.includes('comprar inglesa')) {
            speak('Abriendo información de compra de llave inglesa');
            setTimeout(() => {
                window.location.href = 'html/infoCompras.html?code=00004';
            }, 1000);
        } else if (lowerCommand.includes('comprar cutter')) {
            speak('Abriendo información de compra de cutter');
            setTimeout(() => {
                window.location.href = 'html/infoCompras.html?code=00005';
            }, 1000);
        } else if (lowerCommand.includes('comprar llaves allen') || lowerCommand.includes('comprar allen')) {
            speak('Abriendo información de compra de llaves Allen');
            setTimeout(() => {
                window.location.href = 'html/infoCompras.html?code=00006';
            }, 1000);
        }
        // Comandos para navegar directamente a productos de REPARACIÓN
        else if (lowerCommand.includes('reparar destornillador') || lowerCommand.includes('reparar destornilladores')) {
            speak('Abriendo información de reparación de destornilladores');
            setTimeout(() => {
                window.location.href = 'html/infoReparacion.html?code=00001';
            }, 1000);
        } else if (lowerCommand.includes('reparar martillo')) {
            speak('Abriendo información de reparación de martillo');
            setTimeout(() => {
                window.location.href = 'html/infoReparacion.html?code=00002';
            }, 1000);
        } else if (lowerCommand.includes('reparar alicate') || lowerCommand.includes('reparar alicates')) {
            speak('Abriendo información de reparación de alicates');
            setTimeout(() => {
                window.location.href = 'html/infoReparacion.html?code=00003';
            }, 1000);
        } else if (lowerCommand.includes('reparar llave inglesa') || lowerCommand.includes('reparar inglesa')) {
            speak('Abriendo información de reparación de llave inglesa');
            setTimeout(() => {
                window.location.href = 'html/infoReparacion.html?code=00004';
            }, 1000);
        } else if (lowerCommand.includes('reparar cutter')) {
            speak('Abriendo información de reparación de cutter');
            setTimeout(() => {
                window.location.href = 'html/infoReparacion.html?code=00005';
            }, 1000);
        } else if (lowerCommand.includes('reparar llaves allen') || lowerCommand.includes('reparar allen')) {
            speak('Abriendo información de reparación de llaves Allen');
            setTimeout(() => {
                window.location.href = 'html/infoReparacion.html?code=00006';
            }, 1000);
        }
        // Comandos para navegar a diferentes interfaces (sin producto específico)
        else if (lowerCommand.includes('comprar') || lowerCommand.includes('catálogo') || lowerCommand.includes('catalogo') || lowerCommand.includes('compra')) {
            speak('Navegando a comprar herramientas');
            setTimeout(() => {
                window.location.href = 'html/catalogoCompras.html';
            }, 1000);
        } else if (lowerCommand.includes('reparar') || lowerCommand.includes('repara')) {
            speak('Navegando a reparar herramientas');
            setTimeout(() => {
                window.location.href = 'html/repararHerramientas.html';
            }, 1000);
        } else if (lowerCommand.includes('ofertas') || lowerCommand.includes('crear ofertas') || lowerCommand.includes('oferta')) {
            speak('Navegando a crear ofertas');
            setTimeout(() => {
                window.location.href = 'html/crearOfertas.html';
            }, 1000);
        } else if (lowerCommand.includes('carrito') || lowerCommand.includes('carro') || lowerCommand.includes('cesta')) {
            speak('Navegando al carrito de compras');
            setTimeout(() => {
                window.location.href = 'html/carrito.html';
            }, 1000);
        } else if (lowerCommand.includes('cuenta') || lowerCommand.includes('mi cuenta') || lowerCommand.includes('perfil')) {
            speak('Abriendo tu cuenta');
            setTimeout(() => {
                openAccount();
            }, 1000);
        } else if (lowerCommand.includes('ayuda')) {
            speak('Abriendo la ayuda');
            setTimeout(() => {
                openHelp();
            }, 1000);
        } else if (lowerCommand.includes('idioma') || lowerCommand.includes('lengua')) {
            speak('Abriendo configuración de idioma');
            setTimeout(() => {
                openLanguage();
            }, 1000);
        } else if (lowerCommand.includes('inicio') || lowerCommand.includes('principal') || lowerCommand.includes('home')) {
            speak('Navegando a la página principal');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else if (lowerCommand.includes('buscar') || lowerCommand.includes('búsqueda')) {
            speak('Activando búsqueda');
            setTimeout(() => {
                searchInput?.focus();
            }, 500);
        } else {
            speak('Comando no reconocido. Intenta con: comprar martillo, reparar destornillidores, o navegar a catálogo');
        }
    }

    // Función para iniciar reconocimiento de voz
    function startVoiceRecognition() {
        if (!recognition) {
            alert('El reconocimiento de voz no está disponible en tu navegador. Prueba con Chrome, Edge o Safari.');
            return;
        }

        if (isListening) {
            stopVoiceRecognition();
            return;
        }

        isListening = true;
        voiceIndicator.style.display = 'flex';
        document.getElementById('voice-text').style.display = 'block';
        document.getElementById('voice-text').textContent = '🎤 Preparando micrófono...';

        // Limpiar timeout anterior si existe
        if (recognitionTimeout) {
            clearTimeout(recognitionTimeout);
        }

        speak('Te escucho. Dime a dónde quieres ir.');

        setTimeout(() => {
            try {
                recognition.start();
                console.log('Reconocimiento de voz iniciado');
                document.getElementById('voice-text').textContent = '🎤 ¡Habla ahora!';

                // Timeout de seguridad: detener después de 10 segundos
                recognitionTimeout = setTimeout(() => {
                    if (isListening) {
                        console.log('Timeout alcanzado, deteniendo reconocimiento');
                        stopVoiceRecognition();
                        speak('Tiempo de espera agotado');
                    }
                }, 10000);

            } catch (error) {
                console.error('Error al iniciar reconocimiento:', error);
                stopVoiceRecognition();
            }
        }, 2000);
    }

    // Función para detener reconocimiento de voz
    function stopVoiceRecognition() {
        if (recognition && isListening) {
            recognition.stop();
        }
        isListening = false;
        voiceIndicator.style.display = 'none';
        document.getElementById('voice-text').style.display = 'none';

        // Limpiar timeout
        if (recognitionTimeout) {
            clearTimeout(recognitionTimeout);
            recognitionTimeout = null;
        }

        console.log('Reconocimiento de voz detenido');
    }

    // Eventos del reconocimiento de voz
    if (recognition) {
        // NUEVO: Manejar resultados intermedios
        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            // Mostrar transcripción en tiempo real
            const displayText = finalTranscript || interimTranscript;
            if (displayText) {
                console.log('Transcripción en tiempo real:', displayText);
                document.getElementById('voice-text').textContent = `🎤 "${displayText}"`;
            }

            // Procesar comando final
            if (finalTranscript) {
                console.log('Transcripción final:', finalTranscript);

                // Limpiar timeout
                if (recognitionTimeout) {
                    clearTimeout(recognitionTimeout);
                }

                setTimeout(() => {
                    processVoiceCommand(finalTranscript);
                    stopVoiceRecognition();
                }, 300);
            }
        };

        recognition.onerror = (event) => {
            console.error('Error en reconocimiento de voz:', event.error);

            // Limpiar timeout
            if (recognitionTimeout) {
                clearTimeout(recognitionTimeout);
            }

            if (event.error === 'no-speech') {
                document.getElementById('voice-text').textContent = '⚠️ No se detectó voz';
                speak('No se detectó ningún comando. Intenta de nuevo.');
            } else if (event.error === 'not-allowed') {
                alert('Permiso de micrófono denegado. Por favor, permite el acceso al micrófono en la configuración del navegador.');
            } else if (event.error === 'aborted') {
                console.log('Reconocimiento abortado');
            } else {
                document.getElementById('voice-text').textContent = '❌ Error al reconocer';
                speak('Error al reconocer el comando');
            }

            setTimeout(() => {
                stopVoiceRecognition();
            }, 2000);
        };

        recognition.onend = () => {
            console.log('Evento onend disparado');
            if (isListening) {
                console.log('Reconocimiento terminó inesperadamente, limpiando...');
                stopVoiceRecognition();
            }
        };

        // NUEVO: Evento cuando empieza a escuchar
        recognition.onstart = () => {
            console.log('Reconocimiento iniciado exitosamente');
            document.getElementById('voice-text').textContent = '🎤 ¡Habla ahora!';
        };

        // NUEVO: Evento cuando detecta audio
        recognition.onaudiostart = () => {
            console.log('Audio detectado');
            document.getElementById('voice-text').textContent = '🎤 Escuchando...';
        };

        recognition.onaudioend = () => {
            console.log('Audio terminado');
        };

        recognition.onspeechstart = () => {
            console.log('Voz detectada');
            document.getElementById('voice-text').textContent = '🎤 Te escucho...';
        };

        recognition.onspeechend = () => {
            console.log('Voz terminada');
        };
    }

    // Detectar tecla V para activar reconocimiento de voz
    document.addEventListener('keydown', (e) => {
        if (e.key === 'v' || e.key === 'V') {
            // Verificar que no esté escribiendo en un input
            const activeElement = document.activeElement;
            if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                startVoiceRecognition();
            }
        }

        if (e.key === 'Escape') {
            stopVoiceRecognition();
            closeHelp();
            closeAccount();
            closeLanguage();
            closeAdminErrorPopup();
        }
    });

    // ========================================
    // FIN FUNCIONALIDAD DE VOZ
    // ========================================

    window.addEventListener('message', (ev) => {
        if (!ev?.data) return;
        const data = ev.data;
        if (data.type === 'close-help') {
            closeHelp();
            return;
        }
        if (data.type === 'close-account') {
            closeAccount();
            return;
        }
        if (data.type === 'close-language') {
            closeLanguage();
            return;
        }
        if (data.type === 'language-changed') {
            console.log('Idioma cambiado a:', data.language);
            // Aquí puedes agregar lógica adicional cuando cambie el idioma
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
});