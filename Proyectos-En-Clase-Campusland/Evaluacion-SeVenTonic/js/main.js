// js/main.js

import { getItem, setItem, getMany } from './storage.js';
import './components.js';

// -------------------- DOM refs --------------------
const contenedorEventos = document.getElementById('contenedorEventos');
const buscadorInput = document.getElementById('buscador');
const filtroCiudad = document.getElementById('filtroCiudad');
const filtroCategoria = document.getElementById('filtroCategoria');
const carritoCount = document.getElementById('carritoCount');
const btnVerCarrito = document.getElementById('btnVerCarrito');
const modalCarrito = document.getElementById('modalCarrito');
const listaCarrito = document.getElementById('listaCarrito');
const totalCarrito = document.getElementById('totalCarrito');
const btnComprar = document.getElementById('btnComprar');
const modalCompra = document.getElementById('modalCompra');
const formCompra = document.getElementById('formCompra');
const btnCerrarModal = document.getElementById('btnCerrarModal');
const btnAbrirSugerencia = document.getElementById('btnAbrirSugerencia');
const modalSugerencia = document.getElementById('modalSugerencia');
const formSugerencia = document.getElementById('formSugerencia');
const mensajeExito = document.getElementById('mensajeExito');

// -------------------- Estado --------------------
let eventos = [];
let categorias = [];
let ciudades = [];
let carrito = [];

// -------------------- Funciones de renderizado --------------------
const renderEventos = (filtrados = null) => {
    const lista = filtrados || eventos;
    if (!lista.length) {
        contenedorEventos.innerHTML = '<p>No hay eventos disponibles.</p>';
        return;
    }
    contenedorEventos.innerHTML = '';
    lista.forEach(ev => {
        const card = document.createElement('evento-card');
        const ciudad = ciudades.find(c => c.id === ev.ciudadId)?.nombre || 'Ciudad';
        card.setAttribute('data-evento', JSON.stringify({ ...ev, ciudad }));
        card.addEventListener('agregar-carrito', (e) => agregarAlCarrito(e.detail.id));
        contenedorEventos.appendChild(card);
    });
};

const renderFiltros = () => {
    // Ciudades
    filtroCiudad.innerHTML = '<option value="">Todas las ciudades</option>';
    ciudades.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.nombre;
        filtroCiudad.appendChild(opt);
    });
    // Categorías
    filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>';
    categorias.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.nombre;
        filtroCategoria.appendChild(opt);
    });
};

const actualizarCarritoCount = () => {
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    carritoCount.textContent = total;
};

// -------------------- Filtros y búsqueda --------------------
const filtrarEventos = () => {
    const texto = buscadorInput.value.toLowerCase();
    const ciudadId = parseInt(filtroCiudad.value);
    const categoriaId = parseInt(filtroCategoria.value);

    let result = eventos.filter(ev => {
        const matchTexto = ev.nombre.toLowerCase().includes(texto) ||
            (ev.descripcion && ev.descripcion.toLowerCase().includes(texto));
        const matchCiudad = ciudadId ? ev.ciudadId === ciudadId : true;
        const matchCategoria = categoriaId ? ev.categoriaId === categoriaId : true;
        return matchTexto && matchCiudad && matchCategoria;
    });
    renderEventos(result);
};

// -------------------- Carrito --------------------
const agregarAlCarrito = (idEvento) => {
    const item = carrito.find(i => i.eventoId === idEvento);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ eventoId: idEvento, cantidad: 1 });
    }
    setItem('carrito', carrito);
    actualizarCarritoCount();
};

const mostrarCarrito = async () => {
    if (!carrito.length) {
        listaCarrito.innerHTML = '<li>Carrito vacío.</li>';
        totalCarrito.textContent = '$0';
    } else {
        // Obtener datos de eventos para mostrar nombres y precios
        const eventosMap = eventos.reduce((acc, ev) => { acc[ev.id] = ev; return acc; }, {});
        let html = '';
        let total = 0;
        for (const item of carrito) {
            const ev = eventosMap[item.eventoId];
            if (!ev) continue;
            const subtotal = ev.precio * item.cantidad;
            total += subtotal;
            html += `<li>${ev.nombre} x ${item.cantidad} = $${subtotal.toLocaleString()}</li>`;
        }
        listaCarrito.innerHTML = html;
        totalCarrito.textContent = `$${total.toLocaleString()}`;
    }
    modalCarrito.classList.remove('hidden');
};

// -------------------- Compra --------------------
const finalizarCompra = async (e) => {
    e.preventDefault();
    const formData = new FormData(formCompra);
    const comprador = formData.get('nombre');
    const email = formData.get('email');
    if (!comprador || !email) {
        alert('Completa todos los campos.');
        return;
    }
    if (!carrito.length) {
        alert('El carrito está vacío.');
        return;
    }

    // Crear registros de venta
    const ventas = await getItem('ventas') || [];
    for (const item of carrito) {
        const evento = eventos.find(ev => ev.id === item.eventoId);
        if (!evento) continue;
        ventas.push({
            id: Date.now() + Math.random(),
            eventoId: evento.id,
            cantidad: item.cantidad,
            precioUnitario: evento.precio,
            comprador,
            email,
            fecha: new Date().toISOString()
        });
    }
    await setItem('ventas', ventas);
    // Vaciar carrito
    carrito = [];
    await setItem('carrito', carrito);
    actualizarCarritoCount();
    alert('¡Compra realizada con éxito!');
    modalCarrito.classList.add('hidden');
    modalCompra.classList.add('hidden');
    formCompra.reset();
};

// -------------------- Sugerencias (Examen 1) --------------------
btnAbrirSugerencia?.addEventListener('click', () => {
    modalSugerencia.classList.remove('hidden');
});

document.getElementById('btnCerrarSugerencia')?.addEventListener('click', () => {
    modalSugerencia.classList.add('hidden');
});

formSugerencia?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const correo = document.getElementById('txtCorreo').value.trim() || 'Anónimo';
    const mensaje = document.getElementById('txtMensaje').value.trim();
    if (!mensaje) return alert('Escribe tu sugerencia.');

    const sugerencias = await getItem('sugerencias') || [];
    sugerencias.push({ id: Date.now(), correo, mensaje, fecha: new Date().toISOString() });
    await setItem('sugerencias', sugerencias);
    mensajeExito.classList.remove('hidden');
    formSugerencia.reset();
    setTimeout(() => {
        modalSugerencia.classList.add('hidden');
        mensajeExito.classList.add('hidden');
    }, 2000);
});

// -------------------- Event Listeners --------------------
buscadorInput.addEventListener('input', filtrarEventos);
filtroCiudad.addEventListener('change', filtrarEventos);
filtroCategoria.addEventListener('change', filtrarEventos);

btnVerCarrito.addEventListener('click', mostrarCarrito);
btnComprar.addEventListener('click', () => {
    modalCarrito.classList.add('hidden');
    modalCompra.classList.remove('hidden');
});
btnCerrarModal.addEventListener('click', () => modalCompra.classList.add('hidden'));
formCompra.addEventListener('submit', finalizarCompra);

// Cerrar modales clic fuera
document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', (e) => {
        if (e.target === m) m.classList.add('hidden');
    });
});

// -------------------- Inicialización --------------------
export const init = async () => {
    // Cargar datos
    const data = await getMany(['eventos', 'categorias', 'ciudades', 'carrito']);
    eventos = data.eventos || [];
    categorias = data.categorias || [];
    ciudades = data.ciudades || [];
    carrito = data.carrito || [];

    renderFiltros();
    renderEventos();
    actualizarCarritoCount();
};

// Auto-ejecutar
document.addEventListener('DOMContentLoaded', init);