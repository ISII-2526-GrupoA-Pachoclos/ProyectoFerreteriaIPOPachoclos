# 🛠️ Ferretería Duviso - ProyectoFerreteriaIPOPachoclos

> Proyecto de Interacción Persona-Ordenador (IPO) desarrollado por el **Grupo Pachoclos**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)]()

## 📋 Descripción del Proyecto

**Suministros Duviso** es una plataforma web interactiva diseñada para una ferretería moderna que ofrece tres servicios principales:
- **Compra de herramientas** 🛒
- **Reparación de herramientas** 🔧
- **Creación de ofertas** 💰

El proyecto está enfocado en proporcionar una experiencia de usuario intuitiva, accesible y moderna, aplicando principios de diseño centrado en el usuario.

---

## ✨ Características Principales

### 🎨 Interfaz de Usuario
- **Diseño responsive** adaptable a diferentes dispositivos
- **Paleta de colores coherente** con naranja (#ff8c42) como color principal
- **Navegación intuitiva** entre secciones
- **Overlays modales** para funcionalidades adicionales

### 🛍️ Módulo de Compras
- Catálogo de productos con filtros avanzados
- Sistema de ordenamiento (precio, novedad, valoración)
- Vista detallada de cada producto con:
  - Precios originales y con descuento
  - Badges de estado (nuevo/seminuevo)
  - Descripciones completas
  - Control de cantidad
  - Botón "Añadir al carrito"

### 🔧 Módulo de Reparación
- Catálogo específico de servicios de reparación
- Información detallada sobre cada tipo de reparación
- Tiempos estimados de reparación
- Precios por servicio
- Sistema de selección de cantidad

### 💼 Módulo de Ofertas (Panel Administrativo)
- Tabla de gestión de productos
- Búsqueda por código, nombre y fabricante
- Filtrado y ordenamiento de ofertas
- Visualización de precios originales y con descuento
- Porcentajes de descuento

### ♿ Accesibilidad
- Modos de accesibilidad configurables:
  - **Modo dislexia** - Fuente adaptada
  - **Modo daltonismo** - Protanopía y Tritanopía
- Navegación por teclado
- Atributos ARIA para lectores de pantalla

### 🌐 Multiidioma (Prototipo)
- Sistema de cambio de idioma (Español/English)
- Almacenamiento de preferencia en `localStorage`
- Interfaz bilingüe para el selector de idioma

---

## 📁 Estructura del Proyecto
ProyectoFerreteriaIPOPachoclos/ │ ├── index.html                 # Página principal │ ├── html/                      # Páginas secundarias │   ├── catalogoCompras.html   # Catálogo de productos │   ├── infoCompras.html       # Detalle de producto (compra) │   ├── repararHerramientas.html │   ├── infoReparacion.html    # Detalle de reparación │   ├── crearOfertas.html      # Panel de ofertas │   ├── miCuenta.html          # Gestión de cuenta │   ├── ayuda.html             # Configuración de accesibilidad │   └── idioma.html            # Selector de idioma │ ├── css/                       # Estilos │   ├── index.css │   ├── catalogoCompras.css │   ├── infoCompras.css │   ├── repararHerramientas.css │   ├── infoReparacion.css │   ├── crearOfertas.css │   ├── miCuenta.css │   ├── ayuda.css │   └── idioma.css │ ├── js/                        # Scripts │   ├── index.js │   ├── catalogoCompras.js │   ├── infoCompras.js │   ├── repararHerramientas.js │   ├── infoReparacion.js │   ├── crearOfertas.js │   ├── miCuenta.js │   ├── ayuda.js │   └── idioma.js │ └── images/                    # Recursos gráficos ├── logo-duviso.jpg ├── destornilladores.jpg ├── martillo.jpg ├── alicates.jpg ├── llave-inglesa.jpg ├── cutter.jpg ├── llaves.jpg ├── x.png ├── instagram.png ├── youtube.png └── linkedin.png



---

## 🚀 Funcionalidades Implementadas

### Sistema de 

// Navegación dinámica entre secciones const actionBtns = document.querySelectorAll('.action-btn'); actionBtns.forEach(btn => { const text = btn.textContent.trim().toLowerCase(); if (text.includes('comprar herramientas')) { btn.addEventListener('click', () => { window.location.href = 'html/catalogoCompras.html'; }); } // ... más opciones });



### Productos Clickeables
Los productos del index redirigen automáticamente a sus páginas de detalle:
productCards.forEach(card => { card.addEventListener('click', () => { const productCode = card.getAttribute('data-code'); window.location.href = html/infoCompras.html?code=${productCode}; }); });




### Sistema de Filtrado
- **Por precio**: Rango mínimo y máximo
- **Por categoría**: Pills clickeables
- **Por búsqueda**: Texto libre

### Overlays Modales
Implementados para:
- Mi Cuenta
- Ayuda/Accesibilidad
- Idioma

Todos se cierran con:
- Click en botón X
- Tecla `Escape`
- Mensaje `postMessage` desde iframe

---

## 🗄️ Base de Datos de Productos

### Productos de Compra (6 productos)

const productsData = { '00001': { name: 'Juego Destornilladores', priceOld: 28.95, priceCurrent: 26.05, discount: 10, badge: 'Producto nuevo', description: [ 'Vástago aislado fabricado en cromo-vanadio', 'Punta plana endurecida, templada y lacada en negro', // ... más características ] }, // ... más productos (00002-00006) };



### Productos de Reparación (6 servicios)
Cada producto incluye:
- Precio de reparación
- Tiempo estimado (1-3 días, 1-5 días)
- Descripción detallada del servicio
- Recomendaciones de reparación

---

## 🎯 Características de Accesibilidad

### Modos Implementados
1. **Modo Dislexia**
   - Fuente OpenDyslexic
   - Espaciado aumentado
   - Contraste mejorado

2. **Modo Daltonismo - Protanopía**
   - Filtro de color para deficiencia rojo-verde

3. **Modo Daltonismo - Tritanopía**
   - Filtro de color para deficiencia azul-amarillo

### Controles
// Activar/desactivar modos window.parent.postMessage({ type: 'toggle-mode', mode: 'dyslexia', enabled: true }, '*');




---

## 🌍 Sistema de Idiomas

### Idiomas Soportados
- 🇪🇸 Español (predeterminado)
- 🇬🇧 English

### Almacenamiento
localStorage.setItem('appLanguage', 'es'); // o 'en'




### Traducciones
const translations = { es: { title: 'Idioma', currentLabel: 'Idioma actual:', currentValue: 'Español', buttonText: 'Cambiar a Inglés' }, en: { title: 'Language', currentLabel: 'Current language:', currentValue: 'English', buttonText: 'Change to Spanish' } };



---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Naranja Principal | `#ff8c42` | Header, hover effects |
| Morado Acento | `#5a5aff` | Botones activos, enlaces |
| Negro | `#000` | Botón "Añadir al carrito" |
| Gris Claro | `#f5f5f5` | Footer |
| Verde | `#4CAF50` | Badge "Producto nuevo" |
| Rojo | `#ff4444` | Badge de descuento |

---

## 💻 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos, Grid, Flexbox
- **JavaScript (Vanilla)**: Interactividad sin frameworks
- **LocalStorage**: Persistencia de preferencias
- **PostMessage API**: Comunicación entre iframes

---

## 📱 Responsive Design

Breakpoints implementados:

@media (max-width: 968px) { /* Tablet */ }
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 480px) { /* Small Mobile */ }




---

## 🔄 Flujo de Navegación
graph TD A[Index] --> B[Comprar Herramientas] A --> C[Reparar Herramientas] A --> D[Crear Ofertas] B --> E[Catálogo Compras] E --> F[Info Producto] C --> G[Catálogo Reparación] G --> H[Info Reparación] A --> I[Mi Cuenta] A --> J[Ayuda] A --> K[Idioma]




---

## 🎯 Catálogo de Productos

### Productos Disponibles

| Código | Producto | Precio Original | Precio Oferta | Descuento |
|--------|----------|----------------|---------------|-----------|
| 00001 | Juego Destornilladores | 28,95 € | 26,05 € | 10% |
| 00002 | Martillo Bellota | 12,95 € | 12,17 € | 6% |
| 00003 | Alicates | 14,93 € | 12,39 € | 17% |
| 00004 | Llave Inglesa | 28,95 € | 23,16 € | 20% |
| 00005 | Cutter Profesional | 3,49 € | 2,72 € | 22% |
| 00006 | Juego de Llaves Allen | 10,49 € | 9,12 € | 13% |

---

## 📊 Funcionalidades por Módulo

### 🛒 Módulo Compras
- ✅ Catálogo de productos
- ✅ Filtrado por precio
- ✅ Ordenamiento múltiple
- ✅ Detalle de producto
- ✅ Control de cantidad
- ✅ Badges de estado
- ⏳ Carrito de compras (próximamente)

### 🔧 Módulo Reparación
- ✅ Catálogo de servicios
- ✅ Filtrado por precio
- ✅ Búsqueda por nombre
- ✅ Detalle de reparación
- ✅ Tiempos estimados
- ✅ Precios de servicio

### 💰 Módulo Ofertas
- ✅ Tabla de gestión
- ✅ Búsqueda por código
- ✅ Filtrado por fabricante
- ✅ Ordenamiento por descuento
- ✅ Visualización de precios
- ⏳ Edición de ofertas (próximamente)

### 🎛️ Módulo Ayuda
- ✅ Modo dislexia
- ✅ Modo protanopía
- ✅ Modo tritanopía
- ✅ Reseteo de modos
- ✅ Persistencia de configuración

### 🌐 Módulo Idioma
- ✅ Selector ES/EN
- ✅ Persistencia en localStorage
- ✅ Interfaz bilingüe
- ⏳ Traducciones completas (próximamente)

### 👤 Módulo Mi Cuenta
- ✅ Formulario de perfil
- ✅ Edición de datos
- ✅ Cambio de contraseña
- ⏳ Autenticación real (próximamente)

---

## 🚧 Próximas Implementaciones

- [ ] Sistema de carrito funcional con persistencia
- [ ] Backend con Node.js/Express
- [ ] Base de datos (MongoDB/MySQL)
- [ ] Sistema de autenticación JWT
- [ ] Procesamiento de pagos (Stripe/PayPal)
- [ ] Tracking de pedidos en tiempo real
- [ ] Traducciones completas ES/EN
- [ ] Más modos de accesibilidad (alto contraste)
- [ ] Sistema de valoraciones y reseñas
- [ ] Chat de soporte en vivo
- [ ] Notificaciones push
- [ ] Panel de administración avanzado

---

## 🐛 Problemas Conocidos

- [ ] El carrito es un placeholder (funcionalidad no implementada)
- [ ] Las traducciones de idioma no afectan a todo el contenido
- [ ] Los modos de accesibilidad se resetean al cambiar de página
- [ ] Falta validación en formularios
- [ ] No hay persistencia de sesión

---

## 👥 Equipo de Desarrollo

**Grupo Pachoclos** - ISII-2526-GrupoA

Proyecto académico de Interacción Persona-Ordenador

---

## 📄 Licencia

Este proyecto es parte de las prácticas académicas de Interacción Persona-Ordenador. Todos los derechos reservados para fines educativos.

---

## 🔗 Enlaces Útiles

- [Repositorio GitHub](https://github.com/ISII-2526-GrupoA-Pachoclos/ProyectoFerreteriaIPOPachoclos)
- Documentación de IPO (Universidad)
- Principios de Diseño UX/UI

---

## 📧 Contacto

Para más información sobre el proyecto, contactar a través del repositorio de GitHub.

---

## 🙏 Agradecimientos

- Profesores de IPO por la guía y orientación
- Recursos de diseño de Material Design y Google Fonts
- Comunidad de desarrollo web de MDN y Stack Overflow
- OpenDyslexic por la fuente de accesibilidad

---

## 📖 Guía de Contribución

Si deseas contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 💡 Consejos de Uso

- **Para desarrolladores**: Usa Live Server para desarrollo local
- **Para usuarios**: Navega desde el `index.html` principal
- **Para accesibilidad**: Activa los modos desde el botón ⚙️ Ayuda
- **Para idioma**: Usa el botón 🌐 Idioma en el header

---

## 🎓 Objetivos de Aprendizaje Cumplidos

- ✅ Diseño centrado en el usuario
- ✅ Implementación de accesibilidad web
- ✅ Responsive design
- ✅ JavaScript vanilla sin frameworks
- ✅ Gestión de estado en el cliente
- ✅ Comunicación entre componentes
- ✅ Estructura de proyecto escalable

---

**Última actualización**: Noviembre 2025

⭐ Si te gusta el proyecto, ¡dale una estrella en GitHub!

---

**Hecho con ❤️ por el Grupo Pachoclos**

