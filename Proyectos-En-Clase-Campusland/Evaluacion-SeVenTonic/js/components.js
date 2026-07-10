// js/components.js

class EventoCard extends HTMLElement {
    constructor() {
        super();
        // ❌ Eliminado: this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const evento = JSON.parse(this.getAttribute('data-evento'));
        const { nombre, fecha, precio, ciudad, imagen, id } = evento;

        // ✅ Uso de Light DOM: el HTML se inyecta directamente en el componente
        this.innerHTML = `
      <div class="card-evento" data-id="${id}">
        <img src="assets/img/${imagen || 'default.jpg'}" alt="${nombre}" loading="lazy">
        <h3>${nombre}</h3>
        <div class="info">📅 ${new Date(fecha).toLocaleDateString()} - ${ciudad || 'Ciudad'}</div>
        <div class="precio">$${precio.toLocaleString()}</div>
        <button class="btn-carrito" data-id="${id}">Agregar al carrito</button>
      </div>
    `;

        // El evento se maneja igual, pero ahora con querySelector normal
        this.querySelector('.btn-carrito').addEventListener('click', (e) => {
            e.stopPropagation();
            this.dispatchEvent(new CustomEvent('agregar-carrito', {
                detail: { id },
                bubbles: true
            }));
        });
    }
}

customElements.define('evento-card', EventoCard);