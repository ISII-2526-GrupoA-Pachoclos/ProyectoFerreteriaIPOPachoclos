# 🛠️ Ferretería Duviso - ProyectoFerreteriaIPOPachoclos

Proyecto de Interacción Persona-Ordenador (IPO) desarrollado por el **Grupo Pachoclos**

![HTML5](https://img.shields.io/badge/HTML5-18.4%25-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-23.3%25-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-58.3%25-F7DF1E?style=flat&logo=javascript&logoColor=black)

Última actualización: **Diciembre 2025**

---

## 📋 Descripción del Proyecto

**Suministros Duviso** es una plataforma web interactiva diseñada para una ferretería moderna que ofrece servicios avanzados de compra, reparación y gestión de productos. El proyecto está enfocado en proporcionar una experiencia de usuario intuitiva, accesible y moderna, aplicando principios de diseño centrado en el usuario y tecnologías emergentes.

**Composición del Repositorio:**
- **JavaScript:** 58.3%
- **CSS:** 23.3%
- **HTML:** 18.4%

---

## ✨ Características Principales

### 🎨 Interfaz de Usuario
- ✅ Diseño responsive adaptable a diferentes dispositivos
- ✅ Paleta de colores coherente con naranja (#ff8c42) como color principal
- ✅ Navegación intuitiva entre secciones
- ✅ Overlays modales para funcionalidades adicionales
- ✅ Tipografía:  Sistema sans moderna (Inter/Roboto) + OpenDyslexic para modo dislexia

### 🛍️ Módulo de Compras
- ✅ Catálogo de productos con filtros avanzados
- ✅ Sistema de ordenamiento (precio, novedad, valoración)
- ✅ Vista detallada de cada producto con: 
  - Precios originales y con descuento
  - Badges de estado (nuevo/seminuevo)
  - Descripciones completas
  - Control de cantidad
- ✅ **Carrito funcional con persistencia** (implementado)
- ✅ Sistema de finalización de compra

### 🔧 Módulo de Reparación
- ✅ Catálogo específico de servicios de reparación
- ✅ Información detallada sobre cada tipo de reparación
- ✅ Tiempos estimados de reparación (1-3 días, 1-5 días)
- ✅ Precios por servicio
- ✅ Sistema de selección de cantidad
- ✅ Códigos únicos para reparaciones (R0001-R0006)

### 💼 Módulo de Ofertas (Panel Administrativo)
- ✅ Tabla de gestión de productos
- ✅ Búsqueda por código, nombre y fabricante
- ✅ Filtrado y ordenamiento de ofertas
- ✅ Visualización de precios originales y con descuento
- ✅ Porcentajes de descuento
- ✅ Control de acceso administrativo

### 🤖 **NUEVO:  Asistente Virtual (IA)**
- ✅ Chatbot inteligente con respuestas contextuales
- ✅ Sistema de palabras clave + FAQ
- ✅ Respuestas sobre productos, reparaciones, horarios y envíos
- ✅ Enlaces directos a catálogos desde el chat
- ✅ Overlay flotante integrado en todas las páginas
- ✅ Interfaz limpia y moderna

### 📦 **NUEVO: Sistema de Códigos QR**

#### Generador QR
- ✅ Generación de códigos QR para todos los productos
- ✅ Generación individual y masiva
- ✅ Descarga de QR individual o todos a la vez
- ✅ Impresión directa de códigos QR
- ✅ Separación por categorías (Compra / Reparación)
- ✅ Panel visual con información del producto
- ✅ Utiliza librería QRCode.js

#### Escáner QR
- ✅ Escaneo en tiempo real con cámara del dispositivo
- ✅ Entrada manual de código alternativa
- ✅ Cambio entre cámaras (frontal/trasera)
- ✅ Reconocimiento instantáneo de productos
- ✅ Historial de productos escaneados
- ✅ Acciones rápidas: Ver producto / Añadir al carrito
- ✅ Compatible con móviles y tablets
- ✅ Utiliza librería html5-qrcode

### 🎤 **NUEVO: Modo Voz (Speech Recognition)**
- ✅ Reconocimiento de voz en español (es-ES)
- ✅ Activación con tecla **V**
- ✅ Indicador visual de micrófono activo
- ✅ Comandos de navegación por voz: 
  - "Comprar herramientas" → Catálogo de compras
  - "Reparar herramientas" → Servicios de reparación
  - "Crear ofertas" → Panel administrativo
  - "Ver carrito" / "Mi carrito"
  - "Volver" / "Atrás"
- ✅ Síntesis de voz (Text-to-Speech) para confirmaciones
- ✅ Implementado en todas las páginas principales

### 🦯 **NUEVO: Modo Ceguera (Accesibilidad Avanzada)**
- ✅ Activación con tecla **C**
- ✅ Reconocimiento de voz automático al activar
- ✅ Descripción por voz de elementos al pasar el cursor
- ✅ Interacción simplificada:  responder "Sí" o "No"
- ✅ Indicador visual del modo activo
- ✅ Anuncio de botones, productos y acciones disponibles
- ✅ Integración completa con navegación por voz
- ✅ Funciona en: 
  - Página principal (index)
  - Catálogo de compras
  - Detalle de productos
  - Catálogo de reparación
  - Detalle de reparaciones

### ♿ Accesibilidad (Modos Previos)
- ✅ **Modo Dislexia:** Fuente OpenDyslexic, mayor espaciado y contraste
- ✅ **Modo Daltonismo - Protanopía:** Filtro rojo-verde
- ✅ **Modo Daltonismo - Tritanopía:** Filtro azul-amarillo
- ✅ Navegación por teclado
- ✅ Atributos ARIA para lectores de pantalla
- ✅ Persistencia de preferencias en localStorage

### 🌐 Multiidioma (Prototipo)
- ✅ Sistema de cambio de idioma (Español/English)
- ✅ Almacenamiento de preferencia en localStorage
- ✅ Interfaz bilingüe para selector de idioma
- ✅ Páginas en inglés (indexen. html)

---

## 📁 Estructura del Proyecto

```
ProyectoFerreteriaIPOPachoclos/
│
├── index.html                          # Página principal
│
├── html/                               # Páginas secundarias
│   ├── catalogoCompras.html
│   ├── infoCompras.html
│   ├── repararHerramientas.html
│   ├── infoReparacion.html
│   ├── crearOfertas.html
│   ├── carrito.html                    # ✨ Carrito funcional
│   ├── finalizarCompra.html            # ✨ Checkout
│   ├── generadorQR.html                # ✨ NUEVO: Generador QR
│   ├── escanerQR.html                  # ✨ NUEVO:  Escáner QR
│   ├── iA.html                         # ✨ NUEVO:  Asistente Virtual
│   ├── miCuenta.html
│   ├── ayuda.html
│   ├── idioma.html
│   ├── indexen.html                    # Versión en inglés
│   ├── errorAdmin.html
│   └── errorCamposObligatorios.html
│
├── css/                                # Estilos
│   ├── index.css
│   ├── catalogoCompras.css
│   ├── infoCompras.css
│   ├── repararHerramientas. css
│   ├── infoReparacion.css
│   ├── crearOfertas.css
│   ├── carrito.css
│   ├── finalizarCompra.css
│   ├── generadorQR.css                 # ✨ NUEVO
│   ├── escanerQR.css                   # ✨ NUEVO
│   ├── miCuenta.css
│   ├── ayuda.css
│   └── idioma.css
│
├── js/                                 # Scripts
│   ├── index. js                        # ✨ Con modo voz y ceguera
│   ├── catalogoCompras.js              # ✨ Con modo voz y ceguera
│   ├── infoCompras.js                  # ✨ Con modo voz y ceguera
│   ├── repararHerramientas.js          # ✨ Con modo voz y ceguera
│   ├── infoReparacion.js               # ✨ Con modo voz y ceguera
│   ├── crearOfertas. js
│   ├── carrito. js
│   ├── finalizarCompra.js
│   ├── generadorQR.js                  # ✨ NUEVO
│   ├── escanerQR.js                    # ✨ NUEVO
│   ├── iA.js                           # ✨ NUEVO:  Lógica del chatbot
│   ├── miCuenta.js
│   ├── ayuda.js
│   ├── idioma.js
│   ├── indexen.js
│   └── errorAdmin. js
│
├── cssDaltonismo/                      # Estilos para daltonismo
├── htmlDaltonismo/                     # HTML alternativo daltonismo
├── jsDaltonismo/                       # Scripts daltonismo
├── images/                             # Recursos gráficos
│   ├── logo-duviso.jpg
│   ├── destornilladores.jpg
│   ├── martillo.jpg
│   ├── alicates.jpg
│   ├── llave-inglesa.jpg
│   ├── cutter.jpg
│   ├── llaves. jpg
│   └── [redes sociales].png
│
└── README.md                           # Este archivo
```

---

## 🚀 Funcionalidades Implementadas (Extracto de Código)

### Navegación Dinámica
```javascript
const actionBtns = document.querySelectorAll('.action-btn');
actionBtns.forEach(btn => {
  const text = btn.textContent. trim().toLowerCase();
  if (text.includes('comprar herramientas')) {
    btn.addEventListener('click', () => {
      window.location.href = 'html/catalogoCompras.html';
    });
  }
  // ...  más opciones
});
```

### Productos Clickeables
```javascript
productCards.forEach(card => {
  card.addEventListener('click', () => {
    const productCode = card.getAttribute('data-code');
    window.location.href = `html/infoCompras.html?code=${productCode}`;
  });
});
```

### Sistema de Filtrado
- **Por precio:** Rango mínimo y máximo
- **Por categoría:** Pills clickeables
- **Por búsqueda:** Texto libre

### Overlays Modales
Todos se cierran con: 
- Click en botón X
- Tecla **Escape**
- Mensaje `postMessage` desde iframe

### **NUEVO: Reconocimiento de Voz**
```javascript
// Activar con tecla V
if (e.key === 'v' || e.key === 'V') {
  startVoiceRecognition();
}

// Síntesis de voz
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  SpeechSynthesis.speak(utterance);
}
```

### **NUEVO: Modo Ceguera**
```javascript
// Activar con tecla C
if (e.key === 'c' || e.key === 'C') {
  toggleBlindnessMode();
}

// Al pasar el cursor sobre un botón
function handleButtonHover(e) {
  if (blindnessMode && isInteractiveElement(e.target)) {
    currentHoveredButton = e.target;
    announceButton(e.target);
  }
}
```

### **NUEVO: Generador QR**
```javascript
// Generar QR con QRCode.js
const qr = new QRCode(container, {
  text: productCode,
  width: 256,
  height: 256
});

// Descargar QR como imagen
function downloadQR(qrElement, filename) {
  const canvas = qrElement.querySelector('canvas');
  const url = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = url;
  link.click();
}
```

### **NUEVO: Escáner QR**
```javascript
// Inicializar escáner con html5-qrcode
const html5QrCode = new Html5Qrcode("reader");

html5QrCode.start(
  { facingMode: "environment" },
  { fps: 10, qrbox: 250 },
  onScanSuccess,
  onScanError
);

function onScanSuccess(decodedText) {
  const product = productosDB[decodedText];
  if (product) {
    displayProduct(product);
  }
}
```

### **NUEVO: Asistente Virtual**
```javascript
const respuestasDisponibles = {
  saludos: {
    palabras: ['hola', 'buenos días', 'buenas tardes'],
    respuestas: [
      '👋 ¡Hola!  Bienvenido a Ferretería Duviso. ¿En qué puedo ayudarte? '
    ]
  },
  herramientas: {
    palabras: ['herramientas', 'comprar', 'catálogo'],
    respuestas: [
      '🔧 Tenemos un amplio catálogo de herramientas.. .'
    ],
    tieneEnlace: true
  }
  // ... más categorías
};
```

---

## 🗄️ Base de Datos de Productos

### Productos de Compra (6 productos)

| Código | Producto                   | Precio Original | Precio Oferta | Descuento |
|--------|----------------------------|-----------------|---------------|-----------|
| 00001  | Juego Destornilladores     | 28,95 €         | 26,05 €       | 10%       |
| 00002  | Martillo Bellota           | 12,95 €         | 12,17 €       | 6%        |
| 00003  | Alicates                   | 14,93 €         | 12,39 €       | 17%       |
| 00004  | Llave Inglesa              | 28,95 €         | 23,16 €       | 20%       |
| 00005  | Cutter Profesional         | 3,49 €          | 2,72 €        | 22%       |
| 00006  | Juego de Llaves Allen      | 10,49 €         | 9,12 €        | 13%       |

### Productos de Reparación (6 servicios)

| Código | Servicio                      | Precio    | Tiempo Estimado |
|--------|-------------------------------|-----------|-----------------|
| R0001  | Reparación Destornilladores   | 5,45 €    | 1-3 días        |
| R0002  | Reparación Martillo           | 9,75 €    | 1-5 días        |
| R0003  | Reparación Alicates           | 11,89 €   | 1-3 días        |
| R0004  | Reparación Llave Inglesa      | 14,37 €   | 1-3 días        |
| R0005  | Reparación Cutter             | 2,95 €    | 1-3 días        |
| R0006  | Reparación Llaves Allen       | 6,65 €    | 1-3 días        |

Cada producto incluye:
- Precio
- Descripción detallada del servicio
- Recomendaciones de reparación
- Imagen del producto

---

## 🎨 Paleta de Colores

Recomendación: centralizar en `css/variables.css`

```css
:root {
  --color-primary: #ff8c42;      /* Naranja principal */
  --color-accent: #5a5aff;       /* Morado acento */
  --color-text: #000000;         /* Negro texto */
  --color-bg: #f5f5f5;           /* Gris claro fondo */
  --color-success: #4CAF50;      /* Verde badge nuevo */
  --color-danger: #ff4444;       /* Rojo badge descuento */
}
```

| Color              | Hex      | Uso                              |
|--------------------|----------|----------------------------------|
| Naranja Principal  | #ff8c42  | Header, hover effects, botones   |
| Morado Acento      | #5a5aff  | Botones activos, enlaces         |
| Negro              | #000     | Texto, botón "Añadir al carrito" |
| Gris Claro         | #f5f5f5  | Footer, fondos de cards          |
| Verde              | #4CAF50  | Badge "Producto nuevo"           |
| Rojo               | #ff4444  | Badge de descuento               |

---

## 🔤 Tipografía

### Sistema General
```css
body {
  font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}
```

### Modo Dislexia
```css
@font-face {
  font-family: 'OpenDyslexic';
  src: url('/fonts/OpenDyslexic-Regular.woff2') format('woff2');
}

body. dyslexia {
  font-family: 'OpenDyslexic', var(--font-sans);
  letter-spacing: . 02em;
  line-height: 1.6;
}
```

---

## ⌨️ Atajos de Teclado

| Tecla      | Acción                                      |
|------------|---------------------------------------------|
| **V**      | Activar/desactivar reconocimiento de voz    |
| **C**      | Activar/desactivar modo ceguera             |
| **Escape** | Cerrar overlays y detener reconocimiento    |
| **Enter**  | Buscar (en barra de búsqueda)               |
| **Tab**    | Navegación por teclado                      |

---

## 🎯 Funcionalidades por Módulo (Estado Actual)

### 🛒 Módulo Compras
- ✅ Catálogo de productos
- ✅ Filtrado por precio
- ✅ Ordenamiento múltiple
- ✅ Detalle de producto
- ✅ Control de cantidad
- ✅ Badges de estado
- ✅ **Carrito funcional con persistencia**
- ✅ **Finalización de compra**
- ✅ **Modo voz y ceguera**

### 🔧 Módulo Reparación
- ✅ Catálogo de servicios
- ✅ Filtrado por precio
- ✅ Búsqueda por nombre
- ✅ Detalle de reparación
- ✅ Tiempos estimados
- ✅ Precios de servicio
- ✅ **Modo voz y ceguera**

### 💰 Módulo Ofertas
- ✅ Tabla de gestión
- ✅ Búsqueda por código
- ✅ Filtrado por fabricante
- ✅ Ordenamiento por descuento
- ✅ Visualización de precios
- ✅ **Control de acceso administrativo**

### 🤖 Módulo IA (Asistente Virtual)
- ✅ Chat inteligente con FAQ
- ✅ Sistema de palabras clave
- ✅ Enlaces a catálogos
- ✅ Overlay integrado
- ✅ Respuestas contextuales

### 📦 Módulo QR
- ✅ Generador de códigos QR
- ✅ Escáner en tiempo real
- ✅ Historial de escaneos
- ✅ Descarga e impresión
- ✅ Compatible con móviles

### 🎤 Módulo Voz
- ✅ Reconocimiento de voz (ES)
- ✅ Síntesis de voz (TTS)
- ✅ Comandos de navegación
- ✅ Integrado en todas las páginas

### 🦯 Módulo Ceguera
- ✅ Reconocimiento automático
- ✅ Descripción por voz
- ✅ Interacción simplificada
- ✅ Indicador visual
- ✅ Integración con navegación

### ♿ Módulo Ayuda
- ✅ Modo dislexia
- ✅ Modo protanopía
- ✅ Modo tritanopía
- ✅ Reset y persistencia

### 🌐 Módulo Idioma
- ✅ Selector ES/EN
- ✅ Persistencia en localStorage
- ⏳ Traducciones completas (en progreso)

### 👤 Módulo Mi Cuenta
- ✅ Formulario de perfil
- ✅ Edición de datos
- ✅ Sistema de login/registro
- ✅ Validación de campos

---

## 💻 Tecnologías Utilizadas

### Core
- **HTML5:** Estructura semántica
- **CSS3:** Estilos modernos, Grid, Flexbox, animaciones
- **JavaScript (Vanilla ES6+):** Interactividad sin frameworks

### APIs y Librerías
- **LocalStorage:** Persistencia de preferencias y carrito
- **PostMessage API:** Comunicación entre iframes
- **Web Speech API:**
  - SpeechRecognition (reconocimiento de voz)
  - SpeechSynthesis (síntesis de voz)
- **html5-qrcode (v2.3.8):** Escáner QR en tiempo real
- **QRCode.js (v1.0.0):** Generación de códigos QR
- **MediaDevices API:** Acceso a cámara para escáner

---

## 📱 Responsive Design

### Breakpoints Implementados
```css
@media (max-width: 968px) {
  /* Tablet */
}

@media (max-width:  768px) {
  /* Mobile */
}

@media (max-width: 480px) {
  /* Small Mobile */
}
```

---

## 🔄 Flujo de Navegación

```
Index (Landing)
├── 🛒 Comprar Herramientas → Catálogo Compras → Info Producto → Carrito → Finalizar Compra
├── 🔧 Reparar Herramientas → Catálogo Reparación → Info Reparación
├── 💰 Crear Ofertas → Panel de Ofertas (Admin)
├── 📦 Generar QR → Generador QR
├── 📷 Escanear QR → Escáner QR → Info Producto
├── 🤖 Chatbot → Overlay IA
├── 👤 Mi Cuenta → Overlay Login/Registro
├── ⚙️ Ayuda → Overlay Accesibilidad
└── 🌐 Idioma → Overlay Selector
```

---

## 🚧 Próximas Implementaciones (Roadmap)

### Prioridad Alta
- [ ] Backend con Node.js/Express
- [ ] Base de datos (MongoDB/MySQL) para productos y usuarios
- [ ] Autenticación JWT real
- [ ] Traducciones completas ES/EN
- [ ] Mejorar IA con más contexto y NLP

### Prioridad Media
- [ ] Procesamiento de pagos (Stripe/PayPal)
- [ ] Tracking de pedidos en tiempo real
- [ ] Sistema de valoraciones y reseñas
- [ ] Chat de soporte en vivo
- [ ] Notificaciones push
- [ ] Panel de administración avanzado

### Mejoras de Calidad
- [ ] Tests automatizados (Jest, Cypress)
- [ ] CI/CD con GitHub Actions
- [ ] Linters:  ESLint y Stylelint
- [ ] Auditoría de accesibilidad (axe-core)
- [ ] Optimización de rendimiento (Lighthouse)
- [ ] PWA (Progressive Web App)

---

## 🐛 Problemas Conocidos

- ⚠️ Traducciones no afectan a todo el contenido (parciales)
- ⚠️ Algunos modos de accesibilidad pueden resetearse al cambiar de página
- ⚠️ Falta validación robusta en algunos formularios
- ⚠️ No hay persistencia de sesión / autenticación real (simulada)
- ⚠️ Reconocimiento de voz depende del navegador (Chrome/Edge recomendados)
- ⚠️ Escáner QR requiere HTTPS en producción para acceso a cámara

### Solución Recomendada (Persistencia de Accesibilidad)
```javascript
// Crear initAccessibility. js y cargar en todas las páginas
(function initApp(){
  const lang = localStorage.getItem('appLanguage') || 'es';
  document.documentElement.lang = lang;
  
  const modes = JSON.parse(localStorage.getItem('accessibilityModes') || '{}');
  if (modes. dyslexia) document.body.classList.add('dyslexia');
  if (modes.protanopia) document.body.classList.add('filter-protanopia');
  if (modes.tritanopia) document.body.classList.add('filter-tritanopia');
})();
```

---

### Notas Importantes
- Para **escáner QR** en móvil: usar HTTPS o localhost
- Para **reconocimiento de voz**: Chrome o Edge recomendados
- **Modo ceguera**: activar con tecla **C**
- **Modo voz**: activar con tecla **V**

---

## 💡 Guía de Uso Rápida

### Para Usuarios
1. **Buscar productos:** Usa la barra de búsqueda o navega por catálogos
2. **Filtrar:** Aplica filtros de precio, categoría o búsqueda
3. **Ver detalle:** Click en cualquier producto
4. **Añadir al carrito:** Selecciona cantidad y añade
5. **Finalizar compra:** Accede al carrito y completa el formulario
6. **Escanear QR:** Usa tu móvil para escanear códigos de productos
7. **Chat IA:** Haz clic en 🤖 Chatbot para ayuda instantánea

### Para Desarrolladores
- Usa **Live Server** para desarrollo con recarga automática
- Datos de productos en objetos JS (migrar a JSON recomendado)
- LocalStorage keys: `appLanguage`, `accessibilityModes`, `cart`
- Overlays:  cerrar con Escape o postMessage

### Para Accesibilidad
- **Dislexia:** Activa desde ⚙️ Ayuda
- **Daltonismo:** Selecciona Protanopía o Tritanopía
- **Voz:** Presiona **V** y di comandos
- **Ceguera:** Presiona **C** para navegación asistida
- **Idioma:** Usa 🌐 Idioma para cambiar a inglés

---

## 🎓 Objetivos de Aprendizaje Cumplidos

- ✅ Diseño centrado en el usuario
- ✅ Implementación de accesibilidad web avanzada
- ✅ Responsive design con mobile-first
- ✅ JavaScript vanilla sin frameworks (modular y escalable)
- ✅ Gestión de estado en el cliente (localStorage)
- ✅ Comunicación entre componentes (postMessage)
- ✅ Integración de APIs web modernas (Speech, MediaDevices)
- ✅ Generación y lectura de códigos QR
- ✅ Asistente virtual con IA básica
- ✅ Estructura de proyecto escalable y mantenible

---

## 👥 Equipo de Desarrollo

**Grupo Pachoclos — ISII-2526-GrupoA**

Proyecto académico de Interacción Persona-Ordenador. 

---

## 📄 Licencia

Este proyecto es parte de las prácticas académicas de Interacción Persona-Ordenador.  Todos los derechos reservados para fines educativos.

---

## 📊 Estadísticas del Proyecto

- **Total de Páginas HTML:** 18+
- **Total de Archivos CSS:** 15+
- **Total de Archivos JS:** 15+
- **Productos en Catálogo:** 12 (6 compra + 6 reparación)
- **Modos de Accesibilidad:** 6 (Dislexia, Protanopía, Tritanopía, Voz, Ceguera, Navegación por teclado)
- **Idiomas Soportados:** 2 (ES, EN - parcial)
- **APIs Web Integradas:** 4 (Speech Recognition, Speech Synthesis, MediaDevices, LocalStorage)

---

**Hecho con ❤️ por el Grupo Pachoclos**

---

*Última actualización del README:  Diciembre 2025*
