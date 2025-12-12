// Asistente combinado: Palabras clave + FAQ
const respuestasDisponibles = {
    saludos: {
        palabras: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'hii'],
        respuestas: [
            '👋 ¡Hola! Bienvenido a Ferretería Duviso. ¿En qué puedo ayudarte?',
            '¡Hola! Soy el asistente de Duviso. ¿Qué necesitas?',
            '👋 ¡Bienvenido! ¿Cómo puedo asistirte hoy?'
        ]
    },
    herramientas: {
        palabras: ['herramientas', 'herramienta', 'comprar', 'producto', 'productos', 'catálogo', 'catalogo', 'destornilladores', 'martillo', 'alicates', 'llaves'],
        respuestas: [
            '🔧 Tenemos un amplio catálogo de herramientas. ¿Buscas algo específico como destornilladores, martillos, alicates o llaves?<br><br><a href="file:///C:/Users/jesus/source/repos/ProyectoFerreteriaIPOPachoclos/html/catalogoCompras.html" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #5a5aff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">📖 Ver Catálogo Completo</a>',
            '🛒 Puedes explorar nuestro catálogo de herramientas en la sección "Comprar Herramientas"<br><br><a href="file:///C:/Users/jesus/source/repos/ProyectoFerreteriaIPOPachoclos/html/catalogoCompras.html" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #5a5aff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">📖 Ir al Catálogo</a>',
            '¿Qué tipo de herramienta necesitas? Tenemos desde herramientas básicas hasta profesionales.<br><br><a href="file:///C:/Users/jesus/source/repos/ProyectoFerreteriaIPOPachoclos/html/catalogoCompras.html" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #5a5aff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">🛒 Explorar Productos</a>',
            '📦 Contamos con destornilladores, martillos, alicates, llaves, cutters y mucho más. Todos de excelente calidad.<br><br><a href="file:///C:/Users/jesus/source/repos/ProyectoFerreteriaIPOPachoclos/html/catalogoCompras.html" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #5a5aff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">🛍️ Ver Todos los Productos</a>'
        ],
        tieneEnlace: true
    },
    reparacion: {
        palabras: ['reparación', 'reparar', 'arreglar', 'servicio de reparación', 'dañada', 'roto', 'rotas', 'dañado', 'arreglá'],
        respuestas: [
            '🔧 Ofrecemos servicios de reparación para herramientas dañadas. Visita "Reparar Herramientas" para más detalles.<br><br><a href="file:///C:/Users/jesus/source/repos/ProyectoFerreteriaIPOPachoclos/html/repararHerramientas.html" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #5a5aff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">🔧 Servicio de Reparación</a>',
            '✅ Nuestro servicio de reparación es rápido y confiable. ¿Qué herramienta necesitas reparar?<br><br><a href="file:///C:/Users/jesus/source/repos/ProyectoFerreteriaIPOPachoclos/html/repararHerramientas.html" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #5a5aff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">🔧 Ver Reparaciones</a>',
            'Podemos reparar casi cualquier herramienta: destornilladores, martillos, alicates, llaves y más. ¿Cuál es el problema?<br><br><a href="file:///C:/Users/jesus/source/repos/ProyectoFerreteriaIPOPachoclos/html/repararHerramientas.html" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #5a5aff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">🔧 Solicitar Reparación</a>',
            '🛠️ Realizamos reparaciones profesionales con garantía. Los tiempos varían entre 1-5 días según el tipo de reparación.<br><br><a href="file:///C:/Users/jesus/source/repos/ProyectoFerreteriaIPOPachoclos/html/repararHerramientas.html" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #5a5aff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">📋 Consultar Reparación</a>'
        ],
        tieneEnlace: true
    },
    precios: {
        palabras: ['precio', 'costo', 'vale', 'cuánto cuesta', 'cuanto cuesta', '€', 'presupuesto', 'dinero', 'económico', 'barato'],
        respuestas: [
            '💰 Los precios varían según el producto. Consulta el catálogo para ver los precios exactos.<br><br><a href="file:///C:/Users/jesus/source/repos/ProyectoFerreteriaIPOPachoclos/html/catalogoCompras.html" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #5a5aff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">💰 Ver Precios</a>',
            '📊 Tenemos opciones para todos los presupuestos. ¿Qué herramienta te interesa?<br><br><a href="file:///C:/Users/jesus/source/repos/ProyectoFerreteriaIPOPachoclos/html/catalogoCompras.html" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #5a5aff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">📊 Explorar Opciones</a>',
            'Nuestros precios son muy competitivos. Revisa el catálogo de productos.<br><br><a href="file:///C:/Users/jesus/source/repos/ProyectoFerreteriaIPOPachoclos/html/catalogoCompras.html" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #5a5aff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">💳 Ver Catálogo</a>',
            '🏷️ Encontrarás herramientas desde precios muy económicos hasta opciones profesionales premium. Todos con excelente relación calidad-precio.<br><br><a href="file:///C:/Users/jesus/source/repos/ProyectoFerreteriaIPOPachoclos/html/catalogoCompras.html" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #5a5aff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">🛒 Ver Ofertas</a>'
        ],
        tieneEnlace: true
    },
    envio: {
        palabras: ['envío', 'envio', 'entrega', 'tiempo de entrega', 'cuándo llega', 'cuando llega', 'enviar', 'llegar', 'recibir'],
        respuestas: [
            '📦 Realizamos envíos rápidos. Los tiempos varían según tu ubicación, generalmente entre 1-5 días.',
            '🚚 El envío es rápido y seguro. Puedes ver los detalles en "Envíos y entregas".',
            '✈️ Enviamos a toda la región. Los plazos se confirman al hacer el pedido.',
            '🎁 Realizamos envíos con seguimiento. Recibirás notificaciones sobre el estado de tu paquete en tiempo real.'
        ]
    },
    pago: {
        palabras: ['pago', 'pagar', 'tarjeta', 'efectivo', 'transferencia', 'cómo pagar', 'como pagar', 'forma de pago', 'método de pago'],
        respuestas: [
            '💳 Aceptamos tarjeta de crédito, transferencia bancaria y más. Ver opciones en "Formas de pago".',
            '💰 Tenemos varias opciones de pago seguras y convenientes para ti.',
            '✅ Puedes pagar de forma segura con tarjeta, transferencia o efectivo.',
            '🔒 Todos nuestros pagos están protegidos con encriptación SSL. Tus datos están completamente seguros.'
        ]
    },
    accesibilidad: {
        palabras: ['accesibilidad', 'accesible', 'dislexia', 'daltonismo', 'ajustes', 'fuente', 'tamaño', 'contraste', 'color', 'modo oscuro', 'lectura'],
        respuestas: [
            '♿ <strong>AJUSTES DE ACCESIBILIDAD DISPONIBLES:</strong><br><br>📖 <strong>Modo Dislexia</strong><br>Utiliza la tipografía especial OpenDyslexic diseñada científicamente para personas con dislexia. Aumenta automáticamente el espaciado entre letras y líneas, facilitando la lectura.<br><br>🎨 <strong>Modo Protanopía (Daltonismo Rojo-Verde)</strong><br>Ajusta los colores del sitio para personas que tienen dificultad para distinguir rojo y verde.<br><br>🎨 <strong>Modo Tritanopía (Daltonismo Azul-Amarillo)</strong><br>Ajusta los colores del sitio para personas que tienen dificultad para distinguir azul y amarillo.<br><br><a href="#" onclick="abrirAyuda(); return false;" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: #ff8c42; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">⚙️ Abrir Ventana de Ayuda</a>',
            '🌈 <strong>MEJORA TU EXPERIENCIA DE LECTURA:</strong><br><br>Contamos con ajustes especiales para diferentes necesidades:<br><br>✓ <strong>Dislexia:</strong> Fuente OpenDyslexic + espaciado mejorado para mejor comprensión lectora<br>✓ <strong>Protanopía:</strong> Colores optimizados para daltonismo rojo-verde<br>✓ <strong>Tritanopía:</strong> Colores optimizados para daltonismo azul-amarillo<br>✓ <strong>Alto Contraste:</strong> Mayor claridad visual en todo el sitio<br><br><a href="#" onclick="abrirAyuda(); return false;" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: #ff8c42; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">⚙️ Ir a Ajustes</a>',
            '♿ <strong>¿NECESITAS AJUSTES VISUALES O DE LECTURA?</strong><br><br>Ofrecemos opciones completas de accesibilidad:<br><br>📖 <strong>Modo Dislexia:</strong> Tipografía especial que facilita la lectura a personas con dislexia, TDAH o TEA<br>🎨 <strong>Modo Protanopía:</strong> Para personas con daltonismo rojo-verde<br>🎨 <strong>Modo Tritanopía:</strong> Para personas con daltonismo azul-amarillo<br><br>Todos los ajustes se aplican de inmediato en toda la página.<br><br><a href="#" onclick="abrirAyuda(); return false;" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: #ff8c42; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">⚙️ Abrir Ajustes</a>',
            '♿ <strong>ACCESIBILIDAD COMPLETA PARA TODOS:</strong><br><br><strong>Problemas de lectura (Dislexia/TDAH/TEA):</strong><br>→ Activamos la fuente OpenDyslexic<br>→ Aumentamos espaciado entre líneas<br>→ Mejoramos el contraste<br><br><strong>Problemas de visión (Daltonismo):</strong><br>→ Protanopía: ajustes rojo-verde<br>→ Tritanopía: ajustes azul-amarillo<br><br><a href="#" onclick="abrirAyuda(); return false;" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: #ff8c42; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">⚙️ Configurar Ahora</a>'
        ],
        tieneEnlace: false
    },
    contacto: {
        palabras: ['contacto', 'contactar', 'teléfono', 'email', 'correo', 'cómo contactar', 'como contactar', 'atención al cliente', 'soporte'],
        respuestas: [
            '📞 Puedes contactarnos a través de "Contáctanos" o llamar a nuestro número de atención al cliente.',
            '✉️ Estamos disponibles por email, teléfono y chat. ¡Nos encantaría ayudarte!',
            '📧 Usa el formulario de contacto en nuestro sitio web para comunicarte con nosotros.',
            '💬 Contáctanos por cualquier duda o consulta. Nuestro equipo está disponible para ayudarte.'
        ]
    },
    devoluciones: {
        palabras: ['devolución', 'devolver', 'cambio', 'reembolso', 'garantía', 'no funciona', 'defectuoso', 'producto dañado'],
        respuestas: [
            '🔄 Ofrecemos devoluciones y reembolsos dentro de 30 días. Ver "Devoluciones y reembolso".',
            '✅ Si no estás satisfecho, puedes devolver el producto sin problemas.',
            '🛡️ Tenemos garantía en todos nuestros productos. ¡Tu satisfacción es importante!',
            '📋 <strong>Política de Devolución:</strong><br>• 30 días para devolver productos<br>• Sin costos de reembolso<br>• Reemplazo gratis si el producto es defectuoso<br>• Garantía extendida disponible en algunos productos'
        ]
    },
    gracias: {
        palabras: ['gracias', 'thanks', 'muchas gracias', 'agradezco', 'graciasss', 'excelente', 'perfecto', 'genial'],
        respuestas: [
            '😊 ¡De nada! ¿Hay algo más en lo que pueda ayudarte?',
            '¡Es un placer ayudarte! Si necesitas algo más, no dudes en preguntar.',
            '👍 ¡Para eso estamos! ¿Algo más?',
            '🌟 ¡Nos alegra poder ayudarte! Si tienes más preguntas, aquí estaré.'
        ]
    },
    ayuda: {
        palabras: ['ayuda', 'help', 'no entiendo', 'explicar', 'cómo usar', 'como usar', 'tutorial', 'guía'],
        respuestas: [
            '🆘 Puedo ayudarte con: información de productos, reparaciones, envíos, pagos, contacto y accesibilidad... ¿Qué necesitas?',
            '📚 Pregúntame sobre herramientas, reparaciones, envíos, pagos, accesibilidad o cualquier otra cosa.',
            '❓ Puedo responder preguntas sobre nuestros productos, servicios, ajustes de accesibilidad y más. ¿En qué puedo ayudarte?',
            '📖 <strong>¿En qué puedo asistirte?</strong><br>• Información sobre productos y compras<br>• Servicios de reparación<br>• Envíos y entregas<br>• Formas de pago<br>• Ajustes de accesibilidad<br>• Devoluciones y garantía<br>• Contacto y atención'
        ]
    }
};

// Base de datos de preguntas frecuentes (FAQ)
const faqs = [
    {
        preguntas: ['cuáles son los horarios', 'horarios de atención', 'a qué hora abren', 'horario'],
        respuesta: '⏰ Estamos disponibles de lunes a viernes de 8:00 a 18:00. Los sábados de 9:00 a 13:00.'
    },
    {
        preguntas: ['cuál es el tiempo de entrega', 'cuánto tarda la entrega', 'cuanto tarda'],
        respuesta: '📦 Los envíos se realizan en 1-5 días hábiles según tu ubicación.'
    },
    {
        preguntas: ['aceptan devoluciones', 'se puede devolver', 'política de devolución'],
        respuesta: '🔄 Sí, aceptamos devoluciones dentro de 30 días sin costo adicional.'
    },
    {
        preguntas: ['qué métodos de pago', 'formas de pago', 'cómo se paga'],
        respuesta: '💳 Aceptamos tarjeta de crédito, transferencia bancaria y efectivo.'
    },
    {
        preguntas: ['cómo contacto al servicio técnico', 'servicio técnico', 'técnicos'],
        respuesta: '🔧 Puedes contactarnos a través del formulario de contacto o llamar a nuestro número.'
    },
    {
        preguntas: ['hay garantía', 'qué incluye la garantía', 'cuánto dura la garantía'],
        respuesta: '🛡️ Todos nuestros productos incluyen garantía. La duración varía según el producto. Consulta los detalles en cada artículo.'
    },
    {
        preguntas: ['venden online', 'comprar por internet', 'tienda online'],
        respuesta: '🌐 Sí, puedes comprar desde nuestra tienda online las 24 horas del día.<br><br><a href="file:///C:/Users/jesus/source/repos/ProyectoFerreteriaIPOPachoclos/html/catalogoCompras.html" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #5a5aff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">🛍️ Ir a la Tienda</a>'
    },
    {
        preguntas: ['envían a mi zona', 'dónde envían', 'envío internacional'],
        respuesta: '🚚 Realizamos envíos a toda la región. Algunos productos pueden tener restricciones especiales.'
    },
    {
        preguntas: ['qué es el modo dislexia', 'modo dislexia', 'cómo activar dislexia'],
        respuesta: '📖 <strong>Modo Dislexia Explicado:</strong><br><br>El Modo Dislexia es un ajuste especial diseñado para facilitar la lectura a personas con:<br>• Dislexia<br>• TDAH (Trastorno por Déficit de Atención e Hiperactividad)<br>• TEA (Trastorno del Espectro Autista)<br>• Cualquier dificultad en la comprensión lectora<br><br><strong>¿Qué cambia?</strong><br>✓ Fuente OpenDyslexic especialmente diseñada<br>✓ Mayor espaciado entre letras<br>✓ Mayor espaciado entre líneas<br>✓ Mejor contraste visual<br><br>Para activar: Haz clic en "⚙️ Ayuda" en la parte superior y selecciona "Activar modo dislexia".'
    },
    {
        preguntas: ['qué es daltonismo', 'modo daltonismo', 'protanopía', 'tritanopía'],
        respuesta: '🎨 <strong>Modos de Visión para Daltonismo:</strong><br><br><strong>¿Qué es el daltonismo?</strong><br>Es una condición visual donde se tiene dificultad para distinguir ciertos colores. Existen varios tipos.<br><br><strong>Protanopía (Tipo 1 - Rojo-Verde):</strong><br>→ Dificultad para ver rojo y verde<br>→ Nuestro modo ajusta estos colores automáticamente<br>→ Resultado: visualización clara para tu tipo de visión<br><br><strong>Tritanopía (Tipo 2 - Azul-Amarillo):</strong><br>→ Dificultad para ver azul y amarillo<br>→ Nuestro modo optimiza estos colores<br>→ Resultado: navegación sin problemas<br><br>Para activar: Abre la ventana de Ayuda (⚙️) y elige tu modo.'
    },
    {
        preguntas: ['cómo cambiar el tamaño de fuente', 'aumentar fuente', 'letra grande'],
        respuesta: '🔍 <strong>Aumentar el Tamaño de Letra:</strong><br><br><strong>Opción 1: Modo Dislexia</strong><br>El Modo Dislexia ya incluye una fuente más grande automáticamente.<br><br><strong>Opción 2: Zoom del Navegador</strong><br>Puedes aumentar el tamaño de toda la página:<br>• Windows: Ctrl + (el signo más)<br>• Mac: Cmd + (el signo más)<br>• O usa: Ctrl/Cmd y rueda del ratón<br><br><strong>Opción 3: Ajustes de Accesibilidad</strong><br>Tu navegador tiene ajustes de accesibilidad. Consúltalos en la configuración del navegador.'
    },
    {
        preguntas: ['cómo hacer una compra', 'cómo comprar', 'pasos compra'],
        respuesta: '🛒 <strong>Pasos para comprar:</strong><br><br>1. Explora el catálogo de productos<br>2. Selecciona los artículos que deseas<br>3. Añade productos al carrito<br>4. Revisa tu carrito y procede al pago<br>5. Elige tu forma de pago<br>6. Completa tus datos de envío<br>7. ¡Listo! Recibirás confirmación por email<br><br><a href="file:///C:/Users/jesus/source/repos/ProyectoFerreteriaIPOPachoclos/html/catalogoCompras.html" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #5a5aff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">🛍️ Empezar a Comprar</a>'
    },
    {
        preguntas: ['cómo solicitar reparación', 'solicitar reparación', 'pasos reparación'],
        respuesta: '🔧 <strong>Pasos para solicitar reparación:</strong><br><br>1. Ve a "Reparar Herramientas"<br>2. Selecciona la herramienta que deseas reparar<br>3. Indica el problema y tipo de reparación<br>4. Elige cantidad y presupuesto<br>5. Añade al carrito y procede al pago<br>6. Nuestro equipo confirmará los detalles<br>7. La reparación se realizará en 1-5 días<br><br><a href="file:///C:/Users/jesus/source/repos/ProyectoFerreteriaIPOPachoclos/html/repararHerramientas.html" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #5a5aff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">🔧 Solicitar Reparación</a>'
    }
];

// Función para abrir la ventana de ayuda
function abrirAyuda() {
    // Enviar mensaje al padre para abrir la ventana de ayuda
    if (window !== window.parent) {
        window.parent.postMessage({ type: 'open-help' }, '*');
    }
}

async function enviar() {
    const mensaje = document.getElementById("mensaje").value.trim();
    const mensajeLower = mensaje.toLowerCase();
    const respuestaDiv = document.getElementById("respuesta");
    const statusDiv = document.getElementById("status");
    const btnEnviar = document.getElementById("btnEnviar");

    if (!mensaje) {
        respuestaDiv.innerHTML = '<div class="error">❌ Por favor, escribe un mensaje antes de enviar.</div>';
        return;
    }

    btnEnviar.disabled = true;
    respuestaDiv.textContent = "⏳ Procesando...";
    statusDiv.textContent = "Analizando mensaje...";

    try {
        // Simular pequeño delay para que se vea más natural
        await new Promise(resolve => setTimeout(resolve, 500));

        let respuestaEncontrada = null;
        let categoriaEncontrada = null;
        let tipoBusqueda = null;

        // PASO 1: Buscar en FAQ primero (preguntas específicas)
        for (const faq of faqs) {
            for (const pregunta of faq.preguntas) {
                if (mensajeLower.includes(pregunta)) {
                    respuestaEncontrada = faq.respuesta;
                    categoriaEncontrada = 'FAQ';
                    tipoBusqueda = 'Pregunta frecuente';
                    break;
                }
            }
            if (respuestaEncontrada) break;
        }

        // PASO 2: Si no encontró en FAQ, buscar en palabras clave
        if (!respuestaEncontrada) {
            for (const [categoria, datos] of Object.entries(respuestasDisponibles)) {
                for (const palabra of datos.palabras) {
                    if (mensajeLower.includes(palabra)) {
                        categoriaEncontrada = categoria;
                        tipoBusqueda = 'Palabra clave';
                        // Elegir una respuesta aleatoria
                        respuestaEncontrada = datos.respuestas[
                            Math.floor(Math.random() * datos.respuestas.length)
                        ];
                        break;
                    }
                }
                if (respuestaEncontrada) break;
            }
        }

        // PASO 3: Si no encuentra coincidencia
        if (!respuestaEncontrada) {
            respuestaEncontrada = `No estoy seguro de entender tu pregunta. 🤔\n\nPuedo ayudarte con información sobre:
            
• 🛒 Productos y compras
• 🔧 Servicios de reparación
• 📦 Envíos y entregas
• 💳 Formas de pago
• 📞 Contacto y atención al cliente
• 🔄 Devoluciones y garantía
• ♿ Accesibilidad y ajustes
• ⏰ Horarios de atención

¿Sobre cuál de estos temas necesitas información?`;
            tipoBusqueda = 'No coincidencia';
        }

        // Usar innerHTML si hay HTML en la respuesta (enlaces), textContent si no
        if (respuestaEncontrada.includes('<a href')) {
            respuestaDiv.innerHTML = respuestaEncontrada;
        } else {
            respuestaDiv.textContent = respuestaEncontrada;
        }

        // Mostrar información de depuración
        let statusTexto = '✅ Respuesta enviada';
        if (categoriaEncontrada) {
            statusTexto += ` (${tipoBusqueda}: ${categoriaEncontrada})`;
        }
        statusDiv.textContent = statusTexto;

        document.getElementById("mensaje").value = "";

    } catch (error) {
        console.error("Error:", error);
        respuestaDiv.innerHTML = `<div class="error">❌ Error: ${error.message}</div>`;
        statusDiv.textContent = "❌ Error al procesar";
    } finally {
        btnEnviar.disabled = false;
    }
}

// Event listeners
document.getElementById("mensaje").addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        enviar();
    }
});

window.addEventListener("load", function () {
    const statusDiv = document.getElementById("status");
    statusDiv.innerHTML = `✅ <strong>Asistente Duviso listo</strong><br><small>Puedo responder preguntas sobre productos, compras, reparaciones, envíos, accesibilidad y más.</small>`;
});