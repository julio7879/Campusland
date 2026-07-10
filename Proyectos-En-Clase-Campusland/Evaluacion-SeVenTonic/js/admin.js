// js/admin.js

import { getItem, setItem, getMany } from './storage.js';
import { initCiudades, agregarCiudad, actualizarSelectoresCiudad } from './ciudades.js';

// -------------------- DOM refs principales --------------------
const loginOverlay = document.getElementById('loginOverlay');
const adminPanel = document.getElementById('adminPanel');
const formLogin = document.getElementById('formLogin');
const btnCerrarSesion = document.getElementById('btnCerrarSesion');

// Tabs (sidebar)
const tabs = document.querySelectorAll('.sidebar-nav a');
const tabContents = document.querySelectorAll('.tab-content');

// Formularios y listas (excluyendo ciudades)
const formCategoria = document.getElementById('formCategoria');
const formEvento = document.getElementById('formEvento');
const formCiudad = document.getElementById('formCiudad'); // este formulario usará agregarCiudad
const listaCategorias = document.getElementById('listaCategorias');
const listaEventos = document.getElementById('listaEventos');
const listaSugerencias = document.getElementById('listaSugerencias');

// Reporte de ventas (Examen 2)
const selectAnio = document.getElementById('selectAnio');
const selectMes = document.getElementById('selectMes');
const btnGenerarReporte = document.getElementById('btnGenerarReporte');
const tablaVentas = document.getElementById('tablaVentas');
const totalGeneral = document.getElementById('totalGeneral');

// Selectores de eventos (para los formularios)
const selectCategoriaEvento = document.getElementById('categoriaEvento');
// El selector de ciudad ahora se actualiza desde el módulo de ciudades

// Estadísticas dashboard
const spanTotalEventos = document.getElementById('totalEventos');
const spanTotalCategorias = document.getElementById('totalCategorias');
const spanTotalCiudades = document.getElementById('totalCiudades');
const spanTotalVentas = document.getElementById('totalVentas');

// -------------------- Estado --------------------
let categorias = [];
let eventos = [];
let ventas = [];
let sugerencias = [];

// ============================================================
// 1. NAVEGACIÓN POR PESTAÑAS
// ============================================================
tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `tab-${target}`) {
                content.classList.add('active');
            }
        });
    });
});

// ============================================================
// 2. LOGIN
// ============================================================
formLogin?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    if (email === 'admin@mail.com' && pass === '123456') {
        await setItem('sesionAdmin', true);
        mostrarAdmin(true);
    } else {
        alert('Credenciales incorrectas.');
    }
});

const mostrarAdmin = (logged) => {
    if (logged) {
        loginOverlay.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        cargarDatosAdmin();
    } else {
        loginOverlay.classList.remove('hidden');
        adminPanel.classList.add('hidden');
    }
};

btnCerrarSesion?.addEventListener('click', async () => {
    await setItem('sesionAdmin', false);
    mostrarAdmin(false);
});

// ============================================================
// 3. CARGA DE DATOS (incluye ciudades desde el módulo)
// ============================================================
const cargarDatosAdmin = async () => {
    const data = await getMany(['categorias', 'eventos', 'ventas', 'sugerencias']);
    categorias = data.categorias || [];
    eventos = data.eventos || [];
    ventas = data.ventas || [];
    sugerencias = data.sugerencias || [];

    // Renderizar módulos
    renderCategorias();
    renderEventos();
    renderSugerencias();
    renderSelectoresEvento();
    actualizarDashboard();
    initReporteSelects();

    // Inicializar el módulo de ciudades (carga y renderiza)
    await initCiudades('listaCiudades', ['ciudadEvento', 'filtroCiudad']);
};

// ============================================================
// 4. DASHBOARD
// ============================================================
const actualizarDashboard = async () => {
    // Para el total de ciudades, podemos obtenerlo del módulo o de localStorage
    const ciudades = await getItem('ciudades') || [];
    spanTotalEventos.textContent = eventos.length;
    spanTotalCategorias.textContent = categorias.length;
    spanTotalCiudades.textContent = ciudades.length;
    spanTotalVentas.textContent = ventas.length;
};

// ============================================================
// 5. CRUD CATEGORÍAS
// ============================================================
const renderCategorias = () => {
    if (!categorias.length) {
        listaCategorias.innerHTML = '<p>No hay categorías.</p>';
        return;
    }
    listaCategorias.innerHTML = categorias.map(c => `
    <div class="item-admin" data-id="${c.id}">
      <span><strong>${c.nombre}</strong> - ${c.descripcion || ''}</span>
      <div class="acciones">
        <button class="btn-editar-cat" data-id="${c.id}">✏️</button>
        <button class="btn-eliminar-cat" data-id="${c.id}">🗑️</button>
      </div>
    </div>
  `).join('');

    listaCategorias.querySelectorAll('.btn-editar-cat').forEach(btn => {
        btn.addEventListener('click', () => editarCategoria(parseInt(btn.dataset.id)));
    });
    listaCategorias.querySelectorAll('.btn-eliminar-cat').forEach(btn => {
        btn.addEventListener('click', () => eliminarCategoria(parseInt(btn.dataset.id)));
    });
};

formCategoria?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombreCategoria').value.trim();
    const descripcion = document.getElementById('descCategoria').value.trim();
    if (!nombre) return alert('El nombre es obligatorio.');
    const nueva = { id: Date.now(), nombre, descripcion };
    categorias.push(nueva);
    await setItem('categorias', categorias);
    renderCategorias();
    renderSelectoresEvento();
    actualizarDashboard();
    formCategoria.reset();
});

const eliminarCategoria = async (id) => {
    if (!confirm('¿Eliminar esta categoría?')) return;
    categorias = categorias.filter(c => c.id !== id);
    await setItem('categorias', categorias);
    renderCategorias();
    renderSelectoresEvento();
    actualizarDashboard();
};

const editarCategoria = async (id) => {
    const cat = categorias.find(c => c.id === id);
    if (!cat) return;
    const nuevoNombre = prompt('Nuevo nombre:', cat.nombre);
    if (nuevoNombre && nuevoNombre.trim()) cat.nombre = nuevoNombre.trim();
    const nuevaDesc = prompt('Nueva descripción:', cat.descripcion || '');
    if (nuevaDesc !== null) cat.descripcion = nuevaDesc.trim();
    await setItem('categorias', categorias);
    renderCategorias();
    renderSelectoresEvento();
    actualizarDashboard();
};

// ============================================================
// 6. CRUD EVENTOS
// ============================================================
const renderEventos = () => {
    if (!eventos.length) {
        listaEventos.innerHTML = '<p>No hay eventos.</p>';
        return;
    }
    listaEventos.innerHTML = eventos.map(ev => {
        const cat = categorias.find(c => c.id === ev.categoriaId);
        // Obtenemos el nombre de la ciudad desde el estado global del módulo de ciudades (importamos getCiudades)
        // Pero para no complicar, lo dejamos simple o lo obtenemos de localStorage
        // Usamos una función auxiliar asíncrona o lo hacemos síncrono con getItem
        // Como es para mostrar, podemos hacer una llamada rápida, pero mejor lo dejamos con 'Ciudad' por ahora
        // Podríamos obtenerlo del módulo, pero para simplificar usamos un placeholder
        return `<div class="item-admin" data-id="${ev.id}">
      <span><strong>${ev.nombre}</strong> (${ev.codigo}) - $${ev.precio} - ${ev.ciudadId ? 'Ciudad' : ''}</span>
      <div class="acciones">
        <button class="btn-editar-evt" data-id="${ev.id}">✏️</button>
        <button class="btn-eliminar-evt" data-id="${ev.id}">🗑️</button>
      </div>
    </div>`;
    }).join('');

    listaEventos.querySelectorAll('.btn-editar-evt').forEach(btn => {
        btn.addEventListener('click', () => editarEvento(parseInt(btn.dataset.id)));
    });
    listaEventos.querySelectorAll('.btn-eliminar-evt').forEach(btn => {
        btn.addEventListener('click', () => eliminarEvento(parseInt(btn.dataset.id)));
    });
};

const renderSelectoresEvento = () => {
    if (selectCategoriaEvento) renderSelect(selectCategoriaEvento, categorias, 'id', 'nombre');
    // El selector de ciudad se actualiza desde el módulo de ciudades
    actualizarSelectoresCiudad(['ciudadEvento']); // actualiza solo el del formulario de eventos
};

const renderSelect = (select, data, valueKey, labelKey, placeholder = '-- Selecciona --') => {
    select.innerHTML = `<option value="">${placeholder}</option>`;
    data.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item[valueKey];
        opt.textContent = item[labelKey];
        select.appendChild(opt);
    });
};

formEvento?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const codigo = document.getElementById('codigoEvento').value.trim();
    const nombre = document.getElementById('nombreEvento').value.trim();
    const categoriaId = parseInt(document.getElementById('categoriaEvento').value);
    const precio = parseFloat(document.getElementById('precioEvento').value);
    const fecha = document.getElementById('fechaEvento').value;
    const hora = document.getElementById('horaEvento').value;
    const ciudadId = parseInt(document.getElementById('ciudadEvento').value);
    const imagen = document.getElementById('imagenEvento').value.trim() || 'default.jpg';
    const descripcion = document.getElementById('descEvento').value.trim();

    if (!codigo || !nombre || !categoriaId || !precio || !fecha || !hora || !ciudadId) {
        return alert('Completa todos los campos obligatorios.');
    }

    const nuevo = { id: Date.now(), codigo, nombre, categoriaId, precio, fecha, hora, ciudadId, imagen, descripcion };
    eventos.push(nuevo);
    await setItem('eventos', eventos);
    renderEventos();
    actualizarDashboard();
    formEvento.reset();
});

const eliminarEvento = async (id) => {
    if (!confirm('¿Eliminar este evento?')) return;
    eventos = eventos.filter(ev => ev.id !== id);
    await setItem('eventos', eventos);
    renderEventos();
    actualizarDashboard();
};

const editarEvento = async (id) => {
    const ev = eventos.find(e => e.id === id);
    if (!ev) return;
    const nombre = prompt('Nuevo nombre:', ev.nombre);
    if (nombre && nombre.trim()) ev.nombre = nombre.trim();
    const precio = prompt('Nuevo precio:', ev.precio);
    if (precio && !isNaN(precio)) ev.precio = parseFloat(precio);
    await setItem('eventos', eventos);
    renderEventos();
    actualizarDashboard();
};

// ============================================================
// 7. CIUDADES (Ahora usando el módulo)
// ============================================================
// El formulario de ciudades usa la función agregarCiudad del módulo
formCiudad?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('inputCiudad');
    const nombre = input.value.trim();
    const agregado = await agregarCiudad(nombre);
    if (agregado) {
        input.value = '';
        // Actualizar selectores y dashboard
        actualizarSelectoresCiudad(['ciudadEvento', 'filtroCiudad']);
        actualizarDashboard();
    }
});

// ============================================================
// 8. REPORTE DE VENTAS (Examen 2)
// ============================================================
const initReporteSelects = () => {
    const añoActual = new Date().getFullYear();
    for (let año = añoActual - 2; año <= añoActual + 1; año++) {
        const opt = document.createElement('option');
        opt.value = año;
        opt.textContent = año;
        selectAnio.appendChild(opt);
    }
    selectAnio.value = añoActual;

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    meses.forEach((mes, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = mes;
        selectMes.appendChild(opt);
    });
    selectMes.value = new Date().getMonth();
};

btnGenerarReporte?.addEventListener('click', generarReporte);

async function generarReporte() {
    const año = parseInt(selectAnio.value);
    const mes = parseInt(selectMes.value);

    const data = await getMany(['ventas', 'eventos']);
    const ventasData = data.ventas || [];
    const eventosData = data.eventos || [];

    if (!ventasData.length) {
        tablaVentas.innerHTML = '<tr><td colspan="3">No hay ventas registradas.</td></tr>';
        totalGeneral.textContent = '$0';
        return;
    }

    const ventasFiltradas = ventasData.filter(v => {
        const fecha = new Date(v.fecha);
        return fecha.getFullYear() === año && fecha.getMonth() === mes;
    });

    if (!ventasFiltradas.length) {
        tablaVentas.innerHTML = '<tr><td colspan="3">No hay ventas en este período.</td></tr>';
        totalGeneral.textContent = '$0';
        return;
    }

    const agrupado = ventasFiltradas.reduce((acc, venta) => {
        const id = venta.eventoId;
        if (!acc[id]) acc[id] = { cantidad: 0, total: 0 };
        acc[id].cantidad += venta.cantidad;
        acc[id].total += venta.cantidad * venta.precioUnitario;
        return acc;
    }, {});

    let html = '';
    let granTotal = 0;

    for (const [idEvento, datos] of Object.entries(agrupado)) {
        const evento = eventosData.find(e => e.id === parseInt(idEvento));
        const nombreEvento = evento ? evento.nombre : 'Evento desconocido';
        html += `
      <tr>
        <td>${nombreEvento}</td>
        <td>${datos.cantidad}</td>
        <td>$${datos.total.toLocaleString()}</td>
      </tr>
    `;
        granTotal += datos.total;
    }

    tablaVentas.innerHTML = html;
    totalGeneral.textContent = `$${granTotal.toLocaleString()}`;
}

// ============================================================
// 9. SUGERENCIAS (Examen 1 - vista admin)
// ============================================================
const renderSugerencias = () => {
    if (!sugerencias.length) {
        listaSugerencias.innerHTML = '<p>No hay sugerencias aún.</p>';
        return;
    }
    const sorted = [...sugerencias].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    listaSugerencias.innerHTML = sorted.map(s => `
    <div class="item-admin">
      <div>
        <strong>${s.correo || 'Anónimo'}</strong>
        <span style="color:#64748b;font-size:0.8rem;margin-left:0.5rem;">${new Date(s.fecha).toLocaleString()}</span>
        <p style="margin-top:0.3rem;">${s.mensaje}</p>
      </div>
    </div>
  `).join('');
};

// ============================================================
// 10. INICIALIZACIÓN
// ============================================================
const initAdmin = async () => {
    const sesion = await getItem('sesionAdmin');
    if (sesion) {
        mostrarAdmin(true);
    } else {
        mostrarAdmin(false);
    }
};

document.addEventListener('DOMContentLoaded', initAdmin);