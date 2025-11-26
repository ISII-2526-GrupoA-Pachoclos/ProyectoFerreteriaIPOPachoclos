# Ferretería Duviso — ProyectoFerreteriaIPOPachoclos

Proyecto de Interacción Persona‑Ordenador (IPO) desarrollado por el Grupo Pachoclos — prototipo front-end (HTML5, CSS3, JavaScript) para una ferretería moderna. El propósito es demostrar buenas prácticas de usabilidad, accesibilidad y diseño centrado en el usuario aplicadas a tres módulos principales: Compra de herramientas, Reparación y Creación de ofertas (panel administrativo).

Última actualización: Noviembre 2025

---

## 📋 Descripción del Proyecto
Suministros Duviso es una plataforma web interactiva diseñada como prototipo para gestionar productos, servicios de reparación y ofertas. Está enfocado en una experiencia intuitiva, accesible y moderna: navegación clara, overlays modales, modos de accesibilidad y prototipo multidioma.

Lenguaje del repositorio (composición):
- JavaScript — 52.2%
- CSS — 26.7%
- HTML — 21.1%

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)]()

---

## ✨ Características Principales
- Interfaz responsive y adaptativa.
- Paleta de colores definida con naranja (#ff8c42) como color principal.
- Navegación intuitiva entre secciones y acciones rápidas desde la landing.
- Overlays modales (Mi Cuenta, Ayuda, Idioma) con cierre por X, Escape y postMessage.
- Módulo de Compras: catálogo, filtros, ordenamiento, detalle de producto.
- Módulo de Reparación: catálogo de servicios, tiempos estimados, precio por servicio.
- Módulo de Ofertas (administrativo): tabla de ofertas con búsqueda, filtrado y ordenamiento.
- Modos de accesibilidad: Dislexia, Protanopía, Tritanopía con persistencia básica.
- Multiidioma (ES/EN) en prototipo con persistencia en localStorage.

---

## 🎨 Interfaz de Usuario y Estética
- Diseño responsive con breakpoints para tablet y mobile.
- Elementos visuales: badges, tarjetas de producto, tablas administrativas y overlays.
- Tipografía principal sugerida: Inter (o Roboto). Modo Dislexia utiliza OpenDyslexic.
- Sugerencia: centralizar variables en css/variables.css para consistencia.

Paleta principal:
- Naranja Principal: #ff8c42 — Header, botones primarios, hover.
- Morado Acento: #5a5aff — Botones activos, enlaces.
- Negro (texto/CTA): #000000
- Gris Claro (fondo): #f5f5f5
- Verde (badge nuevo): #4CAF50
- Rojo (badge descuento): #ff4444

Sugerencia de variables CSS:
```css
:root{
  --color-primary: #ff8c42;
  --color-accent: #5a5aff;
  --color-text: #000000;
  --color-bg: #f5f5f5;
  --color-success: #4CAF50;
  --color-danger: #ff4444;
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}
```

Tipografía (modo dislexia):
```css
@font-face {
  font-family: 'OpenDyslexic';
  src: url('/fonts/OpenDyslexic-Regular.woff2') format('woff2');
}
body.dyslexia { font-family: 'OpenDyslexic', var(--font-sans); letter-spacing: .02em; line-height: 1.6; }
```

---

## 🛍️ Módulo de Compras
- Catálogo de productos con filtros:
  - Por precio (rango min / max)
  - Por categoría (pills)
  - Búsqueda por texto
- Ordenamiento: precio, novedad, valoración (implementado parcialmente)
- Vista detallada de producto:
  - Precios original y con descuento
  - Badge (nuevo / seminuevo)
  - Descripciones y lista de características
  - Control de cantidad y botón "Añadir al carrito" (placeholder)

Productos disponibles (resumen):
| Código | Producto                   | Precio original | Precio oferta | Descuento |
|--------|----------------------------|-----------------|---------------|-----------|
| 00001  | Juego Destornilladores     | 28,95 €         | 26,05 €       | 10%       |
| 00002  | Martillo Bellota           | 12,95 €         | 12,17 €       | 6%        |
| 00003  | Alicates                   | 14,93 €         | 12,39 €       | 17%       |
| 00004  | Llave Inglesa              | 28,95 €         | 23,16 €       | 20%       |
| 00005  | Cutter Profesional         | 3,49 €          | 2,72 €        | 22%       |
| 00006  | Juego de Llaves Allen      | 10,49 €         | 9,12 €        | 13%       |

Datos de ejemplo en JS:
```js
const productsData = {
  '00001': {
    name: 'Juego Destornilladores',
    priceOld: 28.95,
    priceCurrent: 26.05,
    discount: 10,
    badge: 'Producto nuevo',
    description: [
      'Vástago aislado fabricado en cromo-vanadio',
      'Punta plana endurecida, templada y lacada en negro'
    ]
  },
  // ...00002 - 00006
};
```

Nota: Se recomienda mover datos a `js/data/products.json` para facilitar migración a backend.

---

## 🔧 Módulo de Reparación
- Catálogo de servicios de reparación (6 servicios).
- Cada servicio: precio, tiempo estimado (1–3 días / 1–5 días), descripción y recomendaciones.
- Detalle por servicio con selector de cantidad (si aplica) y llamada a acción para solicitar reparación.

---

## 💼 Módulo de Ofertas (Panel Administrativo)
- Tabla de gestión de productos/ofertas.
- Búsqueda por código, nombre y fabricante.
- Filtrado y ordenamiento por descuento.
- Visualización clara de precios originales y con descuento, y porcentajes calculados.
- Funcionalidad de edición pendiente (próximamente).

---

## ♿ Accesibilidad
Modos implementados:
- Modo Dislexia:
  - Fuente OpenDyslexic, mayor espaciado y contraste.
- Modo Daltonismo — Protanopía:
  - Filtro de color rojo-verde.
- Modo Daltonismo — Tritanopía:
  - Filtro de color azul-amarillo.

Controles y persistencia:
- Activación/desactivación mediante overlay Ayuda o comandos JS.
- Persistencia en localStorage (ejemplo):
```js
localStorage.setItem('appLanguage', 'es'); // para idioma
localStorage.setItem('accessibilityModes', JSON.stringify({ dyslexia: true, protanopia: false }));
```

Comunicaciones entre frames / overlays:
- Mensaje postMessage para toggles:
```js
window.parent.postMessage({ type: 'toggle-mode', mode: 'dyslexia', enabled: true }, '*');
```

Buenas prácticas de accesibilidad recomendadas:
- Añadir roles ARIA a elementos interactivos.
- Implementar trapFocus en modales.
- Garantizar foco visible y correcto orden de tabulación.
- Realizar auditoría con axe-core o con usuarios con necesidades reales.

---

## 🌐 Multiidioma (Prototipo)
- Idiomas: Español (es) — predeterminado; Inglés (en) — prototipo.
- Selector de idioma en overlay `idioma.html`.
- Persistencia: clave `appLanguage` en localStorage.
- Ejemplo de traducciones parciales:
```js
const translations = {
  es: { title: 'Idioma', currentLabel: 'Idioma actual:', currentValue: 'Español', buttonText: 'Cambiar a Inglés' },
  en: { title: 'Language', currentLabel: 'Current language:', currentValue: 'English', buttonText: 'Change to Spanish' }
};
```
Nota: Traducciones completas están pendientes; recomendación: centralizar todas las cadenas en `js/i18n/*.json`.

---

## 📁 Estructura del Proyecto
ProyectoFerreteriaIPOPachoclos/
- index.html — Página principal
- html/
  - catalogoCompras.html
  - infoCompras.html
  - repararHerramientas.html
  - infoReparacion.html
  - crearOfertas.html
  - miCuenta.html
  - ayuda.html
  - idioma.html
- css/
  - index.css
  - catalogoCompras.css
  - infoCompras.css
  - repararHerramientas.css
  - infoReparacion.css
  - crearOfertas.css
  - miCuenta.css
  - ayuda.css
  - idioma.css
- js/
  - index.js
  - catalogoCompras.js
  - infoCompras.js
  - repararHerramientas.js
  - infoReparacion.js
  - crearOfertas.js
  - miCuenta.js
  - ayuda.js
  - idioma.js
- images/
  - logo-duviso.jpg, destornilladores.jpg, martillo.jpg, alicates.jpg, llave-inglesa.jpg, cutter.jpg, llaves.jpg, x.png, instagram.png, youtube.png, linkedin.png
- README.md — (este archivo)

---

## 🚀 Funcionalidades Implementadas (Extracto)
- Navegación dinámica entre secciones (index.js):
```js
const actionBtns = document.querySelectorAll('.action-btn');
actionBtns.forEach(btn => {
  const text = btn.textContent.trim().toLowerCase();
  if (text.includes('comprar herramientas')) {
    btn.addEventListener('click', () => { window.location.href = 'html/catalogoCompras.html'; });
  }
  // ... más opciones
});
```

- Productos clickeables en la landing que redirigen a detalle:
```js
productCards.forEach(card => {
  card.addEventListener('click', () => {
    const productCode = card.getAttribute('data-code');
    window.location.href = `html/infoCompras.html?code=${productCode}`;
  });
});
```

- Sistema de Filtrado:
  - Precio (rango mínimo/máximo)
  - Categoría (pills)
  - Búsqueda libre (input)

- Overlays modales:
  - Mi Cuenta, Ayuda/Accesibilidad, Idiomas
  - Cierre: botón X, tecla Escape, postMessage desde iframes

---

## 🗄️ Base de Datos de Productos (cliente)
- Productos de compra y servicios de reparación definidos en objetos JS (`productsData` / `repairData`).
- Recomendación: migrar a archivo JSON (`js/data/*.json`) o a API REST para producción.

Ejemplo productData (completo en /js):
```js
const productsData = {
  '00001': { name: 'Juego Destornilladores', priceOld: 28.95, priceCurrent: 26.05, discount: 10, badge: 'Producto nuevo', description: [...] },
  // ...
};
```

---

## 📱 Responsive Design y Breakpoints
Implementado con media queries:
```css
@media (max-width: 968px) { /* Tablet */ }
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 480px) { /* Small Mobile */ }
```
Recomendación: testear en varios dispositivos y ajustar puntos de quiebre según contenido real.

---

## 🔄 Flujo de Navegación (simplificado)
Index (Landing)
- Comprar Herramientas → Catálogo Compras → Info Producto
- Reparar Herramientas → Catálogo Reparación → Info Reparación
- Crear Ofertas → Panel de Ofertas
- Mi Cuenta → Overlay/Modal
- Ayuda → Overlay/Modal
- Idioma → Overlay/Modal

graph TD
A[Index] --> B[Comprar Herramientas]
A --> C[Reparar Herramientas]
A --> D[Crear Ofertas]
B --> E[Catálogo Compras]
E --> F[Info Producto]
C --> G[Catálogo Reparación]
G --> H[Info Reparación]
A --> I[Mi Cuenta]
A --> J[Ayuda]
A --> K[Idioma]

---

## 🎯 Funcionalidades por Módulo (estado actual)
- Módulo Compras
  - ✅ Catálogo de productos
  - ✅ Filtrado por precio
  - ✅ Ordenamiento básico
  - ✅ Detalle de producto
  - ✅ Control de cantidad
  - ✅ Badges de estado

- Módulo Reparación
  - ✅ Catálogo de servicios
  - ✅ Filtrado y búsqueda
  - ✅ Detalle con tiempos y precios

- Módulo Ofertas
  - ✅ Tabla de gestión y búsqueda
  - ✅ Filtrado por fabricante
  - ✅ Ordenamiento por descuento

- Módulo Ayuda
  - ✅ Modo dislexia
  - ✅ Modo protanopía
  - ✅ Modo tritanopía
  - ✅ Reset y persistencia parcial

- Módulo Idioma
  - ✅ Selector ES/EN
  - ✅ Persistencia en localStorage

- Módulo Mi Cuenta
  - ✅ Formulario de perfil y edición (local)

---

## 🐛 Problemas Conocidos
- Carrito es actualmente un placeholder.
- Traducciones no afectan a todo el contenido (parciales).
- Los modos de accesibilidad a veces se resetean al cambiar de página.
- Falta validación robusta en formularios.
- No hay persistencia de sesión / autenticación real.
- Recomendación: crear un script initAccessibility.js que cargue estado desde localStorage al iniciar cada página.

Ejemplo init:
```js
(function initApp(){
  const lang = localStorage.getItem('appLanguage') || 'es';
  document.documentElement.lang = lang;
  const modes = JSON.parse(localStorage.getItem('accessibilityModes') || '{}');
  if (modes.dyslexia) document.body.classList.add('dyslexia');
  if (modes.protanopia) document.body.classList.add('filter-protanopia');
  if (modes.tritanopia) document.body.classList.add('filter-tritanopia');
})();
```

---

## 💡 Consejos de Uso

- **Para usuarios**: Navega desde el `index.html` principal
- **Para accesibilidad**: Activa los modos desde el botón ⚙️ Ayuda
- **Para idioma**: Usa el botón 🌐 Idioma en el header

---

## 👥 Equipo de Desarrollo
Grupo Pachoclos — ISII-2526-GrupoA  
Proyecto académico de Interacción Persona‑Ordenador.

---

## 📄 Licencia
Proyecto parte de prácticas académicas. Derechos reservados para fines educativos.

---

## 🔗 Enlaces Útiles
- Repositorio GitHub: https://github.com/ISII-2526-GrupoA-Pachoclos/ProyectoFerreteriaIPOPachoclos
- Documentación de IPO (Universidad)
- Principios de Diseño UX/UI (MDN / Material Design)

---

## 📧 Contacto
- adriandaniel.mecinas@alu.uclm.es
- jesus.sotos@alu.uclm.es
- marcos.villalba@alu.uclm.es
