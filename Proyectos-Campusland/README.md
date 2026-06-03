# 🌿 OrganicGo — Compra Consciente, Vive Sostenible

<p align="center">
  <img src="./img/icons/gemini-svg (1).svg" alt="OrganicGo Logo" width="120" />
</p>

<p align="center">
  <strong>Una experiencia digital premium de e-commerce sostenible desarrollada con la pureza y rendimiento del desarrollo web clásico.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/Flexbox-%232D3748.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS Flexbox" />
  <img src="https://img.shields.io/badge/CSS_Grid-%232D3748.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS Grid" />
  <img src="https://img.shields.io/badge/UX/UI-Premium-11CC00?style=for-the-badge" alt="UX/UI Premium" />
  <img src="https://img.shields.io/badge/Licencia-MIT-31B3BA?style=for-the-badge" alt="MIT License" />
  <img src="https://img.shields.io/badge/Estado-Completado-3E6C29?style=for-the-badge" alt="Status Completed" />
</p>

---

## 🎯 Elevator Pitch (Descripción del Proyecto)

**OrganicGo**  es una plataforma boutique de comercio electrónico dedicada a la venta de productos ecológicos, biodegradables y residuo cero (*zero waste*). 

Este proyecto fue concebido y desarrollado con un reto técnico e intelectual muy claro: **demostrar el extraordinario poder del desarrollo frontend puro**, utilizando única y exclusivamente **HTML5 semántico y CSS3 moderno**. Sin JavaScript, sin frameworks pesados, sin dependencias externas. 

El resultado es un sitio web sumamente interactivo, con un rendimiento de carga instantáneo, transiciones ultra-fluidas a 60 FPS, micro-animaciones dinámicas y un diseño visualmente deslumbrante (Wow Factor) que eleva los estándares del diseño UX eco-amigable.

---

## 📸 Capturas de Pantalla (Visuals)

*Próximamente podrás agregar tus propias capturas reemplazando los siguientes enlaces locales:*

| 🖥️ Vista de Escritorio (Desktop) | 📱 Vista Móvil (Mobile) |
| :---: | :---: |
| ![Home Desktop](./screenshots/home-desktop.png) | ![Home Mobile](./screenshots/home-mobile.png) |
| *Vista del Hero principal e interactivo* | *Diseño colapsable Mobile-First* |

---

## 🗺️ Mapa de Vistas (Arquitectura de Información)

El sitio cuenta con 4 vistas estratégicas optimizadas para el flujo de navegación del usuario final (*User Journey*):

| Vista | Ruta / Enlace | Descripción y Enfoque UX |
| :--- | :--- | :--- |
| **🏠 Inicio (Home)** | [`index.html`](./index.html) | La puerta de entrada. Presenta el Hero principal con la mascota interactiva **Nico**, una tarjeta de beneficios ecológicos con efectos hover tridimensionales y una galería preview de productos populares. |
| **🛍️ Catálogo** | [`views/productos.html`](./views/productos.html) | La vitrina comercial. Cuenta con un sidebar interactivo de filtros de categoría y precio, y un grid dinámico de productos responsivos con tags de stock y botones de interacción. |
| **🌱 Sobre Nosotros** | [`views/sobre-nosotros.html`](./views/sobre-nosotros.html) | El alma de la marca. Expone la historia, misión, visión y los valores fundamentales de OrganicGo, acompañado de infografías de impacto ambiental y reforestación. |
| **✉️ Contacto** | [`views/contacto.html`](./views/contacto.html) | El canal de conexión. Contiene un grid balanceado que distribuye información corporativa clave, una caja de Preguntas Frecuentes (FAQs) y un formulario interactivo con validación visual inmediata. |

---

## 🎨 Sistema de Diseño y Paleta de Colores

Se implementó un sistema de diseño sofisticado basado en **Variables CSS** (Custom Properties) que definen una estética coherente, armónica y alineada con la psicología del color para marcas ecológicas:

```css
:root {
    /* Colores Primitivos y Semánticos */
    --verde-bosque:     #01423C; /* Elegancia y profundidad natural (Texto principal) */
    --verde-oliva:      #3E6C29; /* Crecimiento y sostenibilidad (Texto secundario) */
    --turquesa:         #31B3BA; /* Modernidad y frescura (Enlaces y llamadas secundarias) */
    --verde-neon:       #2DFF51; /* Energía limpia (Botones CTA - Call To Action) */
    --verde-vibrante:   #11CC00; /* Éxito y confirmación (Hover dinámico) */
    
    /* Neutros Cálidos */
    --fondo-suave:      #F5F5DC; /* Fondo beige natural relajante para la vista */
    --beigecalido:      #F5F1E8; /* Superficies secundarias de tarjetas */
    --blanco:           #FFFFFF; /* Superficies limpias para lectura premium */
    
    /* Tipografía */
    --fuente-principal: 'Inter', sans-serif; /* Tipografía moderna y legible */
}
```

---

## ✨ Características UX/UI Implementadas (Sin JavaScript)

1. **Interactividad de Mascota**:
   - En el logotipo del encabezado, la mascota de la marca gira sutilmente y se agranda de forma juguetona al pasar el mouse (`.logo:hover .mascota-logo-img`), creando una conexión inmediata con el usuario.
2. **Validación Visual de Formularios**:
   - En el formulario de contacto se implementaron pseudo-clases `:valid` e `:invalid` combinadas con transiciones en los bordes. Los campos muestran retroalimentación visual en tiempo real cuando el usuario escribe correctamente su nombre, asunto y correo electrónico.
3. **Micro-interacciones y Efectos Hover**:
   - **Botón CTA Pulsante**: El botón principal del Hero cuenta con una animación infinita de pulso de sombra (`pulse`) que invita a la acción de manera suave pero atractiva.
   - **Tarjetas de Producto 3D**: Elevación suave (`translateY(-8px)`) y expansión de sombras en las tarjetas al pasar el cursor, con zoom interno en las imágenes.
   - **Favoritos (Corazón)**: Transición reactiva con cambio de escala al dar hover sobre el botón de favoritos de cada artículo.
4. **Header Sticky & Footer Modular**:
   - Header flotante que acompaña al usuario durante el scroll, optimizado para no obstaculizar la lectura.
   - Footer responsivo y unificado en todas las vistas con accesos legales y redes sociales animadas.

---

## 📂 Estructura de Carpetas (Project Anatomy)

El proyecto mantiene una arquitectura de archivos estrictamente organizada para facilitar la escalabilidad y mantenibilidad modular:

```bash
Proyecto_EcoMarket_JulioCastaño/
│
├── index.html                   # Vista principal de la aplicación (Home)
├── READMEEcomarket.md           # Este archivo de documentación premium
│
├── css/                         # Hojas de estilo modulares
│   ├── main.css                 # Archivo índice que importa todos los módulos
│   ├── variables.css            # Paleta de colores, tipografías y espaciados globales
│   ├── base.css                 # Estilos globales y reset
│   ├── layout.css               # Contenedores y espaciados generales
│   ├── components.css           # Componentes reutilizables (Botones, Tarjetas, Badges, etc.)
│   ├── animations.css           # Definición de keyframes y transiciones a 60 FPS
│   └── diseñoVistas/            # Estilos específicos de cada vista
│       ├── header.css           # Estructura y animación de la cabecera
│       ├── footer.css           # Estructura del pie de página responsivo
│       ├── home.css             # Estilos de la vista de Inicio
│       ├── catalogo.css         # Estilos específicos del catálogo y filtros
│       ├── sobre-nosotros.css   # Línea de tiempo y tarjetas de impacto
│       └── contacto.css         # Grid, inputs interactivos y FAQs de contacto
│
├── img/                         # Recursos gráficos y multimedia
│   ├── icons/                   # Logos e iconos del proyecto
│   ├── hero/                    # Fondos de pantalla (generados con IA premium) y mascota Nico
│   ├── about/                   # Ilustraciones de "Sobre Nosotros"
│   └── products/                # Fotografías optimizadas de productos
```

---

## 🛠️ Tecnologías y Herramientas Utilizadas

- **Estructura:** HTML5 Semántico (uso correcto de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- **Estilos:** CSS3 Puro (sin preprocesadores ni Tailwind, garantizando compatibilidad nativa y control total de estilos).
- **Layout:** CSS Flexbox (para componentes lineales y alineamientos) y CSS Grid (para las estructuras de catálogos y el formulario).
- **Tipografía:** Google Fonts (Familia *Inter* para legibilidad óptima).
- **Media Queries:** Enfoque adaptativo con breakpoints optimizados (`768px`, `992px`, `1024px`) para portátiles, tablets y móviles.
- **Generación Visual:** Imágenes premium de fondo e ilustración de producto generadas con Inteligencia Artificial avanzada, logrando armonía de color 10/10.

---

## 🚀 Instrucciones de Visualización y Ejecución

Al ser un proyecto estático puro de frontend, **no requiere ningún tipo de instalación, dependencias ni compilación**.

### Método Local
1. **Clona el repositorio** en tu máquina local:
   ```bash
   git clone https://github.com/tu-usuario/organicgo.git
   ```
2. **Navega al directorio del proyecto** y haz doble clic sobre el archivo [`index.html`](./index.html) para abrirlo directamente en tu navegador web preferido (Chrome, Edge, Firefox, Safari).

### Método Recomendado (Live Server)
Si utilizas **Visual Studio Code**, se recomienda enormemente utilizar la extensión **Live Server** para una recarga en tiempo real:
1. Abre la carpeta del proyecto en VS Code.
2. Haz clic derecho sobre el archivo `index.html` y selecciona **"Open with Live Server"**.
3. El proyecto se desplegará localmente en `http://127.0.0.1:5500/index.html`.


## ✍️ Autor y Rol

- **Autor:** Julio Ernesto Castaño Palacios
- **Rol:** Diseñador UX / Desarrollador Frontend
- **Institución:** Campusland
- **Portafolio:** https://julio7879.github.io/Portafolio/
- **LinkedIn:** www.linkedin.com/in/julio-castaño-228267192

---

## 💖 Recursos Gratuitos

-  **Google Fonts** por proveer la hermosa tipografía *Inter*.
-  **Shields.io** por los badges dinámicos del repositorio.
-   **Picsum Photos** y generadores de IA por los recursos gráficos que visten de gala visual el e-commerce.

---

> [!NOTE]
> **Nota de Enfoque Educativo:** Este proyecto fue desarrollado bajo una filosofía de desarrollo web artesanal y de alto rendimiento. La ausencia deliberada de JavaScript y frameworks pone a prueba el dominio profundo de los estándares web nativos, centrándose al 100% en la calidad del maquetado, la accesibilidad, la semántica y la riqueza de las animaciones CSS.
