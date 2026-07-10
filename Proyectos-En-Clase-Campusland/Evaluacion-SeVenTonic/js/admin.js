// ============================================================
// admin.js - Panel de Administración Conciertos Conectados
// Incluye: Login, CRUD Categorías/Eventos/Ciudades,
// Reporte de Ventas (Examen 2) y Sugerencias (Examen 1)
// ============================================================

import { getItem, setItem, getMany } from './storage.js';

// -------------------- DOM refs principales --------------------
const loginOverlay = document.getElementById('loginOverlay');
const adminPanel = document.getElementById('adminPanel');
const formLogin = document.getElementById('formLogin');
const btnCerrarSesion = document.getElementById('btnCerrarSesion');

// Tabs (sidebar)
const tabs = document.querySelectorAll('.sidebar-nav a');
const tabContents = document.querySelectorAll('.tab-content');

// Formularios y listas
const formCategoria = document.getElementById('formCategoria');
const formEvento = document.getElementById('formEvento');
const formCiudad = document.getElementById('formCiudad');
const listaCategorias = document.getElementById('listaCategorias');
const listaEventos = document.getElementById('listaEventos');
const listaCiudades = document.getElementById('listaCiudades');
const listaSugerencias = document.getElementById('listaSugerencias');

// Reporte de ventas (Examen 2)
const selectAnio = document.getElementById('selectAnio');
const selectMes = document.getElementById('selectMes');
const btnGenerarReporte = document.getElementById('btnGenerarReporte');
const tablaVentas = document.getElementById('tablaVentas');
const totalGeneral = document.getElementById('totalGeneral');

// Selectores de eventos (para los formularios)
const selectCategoriaEvento = document.getElementById('categoriaEvento');
const selectCiudadEvento = document.getElementById('ciudadEvento');

// Estadísticas dashboard
const spanTotalEventos = document.getElementById('totalEventos');
const spanTotalCategorias = document.getElementById('totalCategorias');
const spanTotalCiudades = document.getElementById('totalCiudades');
const spanTotalVentas = document.getElementById('totalVentas');

// -------------------- Estado --------------------
let categorias = [];
let eventos = [];
let ciudades = [];
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
// 3. CARGA DE DATOS
// ============================================================
const cargarDatosAdmin = async () => {
    const data = await getMany(['categorias', 'eventos', 'ciudades', 'ventas', 'sugerencias']);
    categorias = data.categorias || [];
    eventos = data.eventos || [];
    ciudades = data.ciudades || [];
    ventas = data.ventas || [];
    sugerencias = data.sugerencias || [];

    renderCategorias();
    renderEventos();
    renderCiudades();
    renderSugerencias();
    renderSelectoresEvento();
    actualizarDashboard();
    initReporteSelects(); // Llena los selectores de año/mes
};

// ============================================================
// 4. DASHBOARD
// ============================================================
const actualizarDashboard = () => {
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
        const ciudad = ciudades.find(c => c.id === ev.ciudadId);
        return `<div class="item-admin" data-id="${ev.id}">
      <span><strong>${ev.nombre}</strong> (${ev.codigo}) - $${ev.precio} - ${ciudad?.nombre || ''}</span>
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
    if (selectCiudadEvento) renderSelect(selectCiudadEvento, ciudades, 'id', 'nombre');
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
// 7. CRUD CIUDADES (Examen 3)
// ============================================================
const renderCiudades = () => {
    if (!ciudades.length) {
        listaCiudades.innerHTML = '<p>No hay ciudades.</p>';
        return;
    }
    listaCiudades.innerHTML = ciudades.map(c => `
    <div class="item-admin" data-id="${c.id}">
      <span><strong>${c.nombre}</strong></span>
      <div class="acciones">
        <button class="btn-editar-ciudad" data-id="${c.id}">✏️</button>
        <button class="btn-eliminar-ciudad" data-id="${c.id}">🗑️</button>
      </div>
    </div>
  `).join('');

    listaCiudades.querySelectorAll('.btn-editar-ciudad').forEach(btn => {
        btn.addEventListener('click', () => editarCiudad(parseInt(btn.dataset.id)));
    });
    listaCiudades.querySelectorAll('.btn-eliminar-ciudad').forEach(btn => {
        btn.addEventListener('click', () => eliminarCiudad(parseInt(btn.dataset.id)));
    });
};

formCiudad?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('inputCiudad').value.trim();
    if (!nombre) return;
    if (ciudades.some(c => c.nombre.toLowerCase() === nombre.toLowerCase())) {
        alert('Esta ciudad ya existe.');
        return;
    }
    const nueva = { id: Date.now(), nombre };
    ciudades.push(nueva);
    await setItem('ciudades', ciudades);
    renderCiudades();
    renderSelectoresEvento();
    actualizarDashboard();
    document.getElementById('inputCiudad').value = '';
});

const eliminarCiudad = async (id) => {
    if (!confirm('¿Eliminar esta ciudad?')) return;
    ciudades = ciudades.filter(c => c.id !== id);
    await setItem('ciudades', ciudades);
    renderCiudades();
    renderSelectoresEvento();
    actualizarDashboard();
};

const editarCiudad = async (id) => {
    const ciudad = ciudades.find(c => c.id === id);
    if (!ciudad) return;
    const nuevoNombre = prompt('Editar ciudad:', ciudad.nombre);
    if (!nuevoNombre || nuevoNombre.trim() === '') return;
    if (ciudades.some(c => c.id !== id && c.nombre.toLowerCase() === nuevoNombre.trim().toLowerCase())) {
        alert('Ya existe una ciudad con ese nombre.');
        return;
    }
    ciudad.nombre = nuevoNombre.trim();
    await setItem('ciudades', ciudades);
    renderCiudades();
    renderSelectoresEvento();
    actualizarDashboard();
};

// ============================================================
// 8. REPORTE DE VENTAS (Examen 2) - CON FILTRO AÑO/MES
// ============================================================

// Inicializar selectores de año y mes
const initReporteSelects = () => {
    // Años: desde 2020 hasta el año actual + 1
    const añoActual = new Date().getFullYear();
    for (let año = añoActual - 2; año <= añoActual + 1; año++) {
        const opt = document.createElement('option');
        opt.value = año;
        opt.textContent = año;
        selectAnio.appendChild(opt);
    }
    selectAnio.value = añoActual;

    // Meses
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    meses.forEach((mes, idx) => {
        const opt = document.createElement('option');
        opt.value = idx; // 0 = Enero
        opt.textContent = mes;
        selectMes.appendChild(opt);
    });
    selectMes.value = new Date().getMonth(); // Mes actual
};

// Generar reporte al hacer clic
btnGenerarReporte?.addEventListener('click', generarReporte);

async function generarReporte() {
    const año = parseInt(selectAnio.value);
    const mes = parseInt(selectMes.value);

    // Obtener ventas y eventos (ya están en el estado, pero los refrescamos por si cambiaron)
    const data = await getMany(['ventas', 'eventos']);
    const ventasData = data.ventas || [];
    const eventosData = data.eventos || [];

    if (!ventasData.length) {
        tablaVentas.innerHTML = '<tr><td colspan="3">No hay ventas registradas.</td></tr>';
        totalGeneral.textContent = '$0';
        return;
    }

    // 1. Filtrar por año y mes (¡cuidado: getMonth() devuelve 0-11!)
    const ventasFiltradas = ventasData.filter(v => {
        const fecha = new Date(v.fecha);
        return fecha.getFullYear() === año && fecha.getMonth() === mes;
    });

    if (!ventasFiltradas.length) {
        tablaVentas.innerHTML = '<tr><td colspan="3">No hay ventas en este período.</td></tr>';
        totalGeneral.textContent = '$0';
        return;
    }

    // 2. Agrupar por evento usando reduce
    const agrupado = ventasFiltradas.reduce((acc, venta) => {
        const id = venta.eventoId;
        if (!acc[id]) {
            acc[id] = { cantidad: 0, total: 0 };
        }
        acc[id].cantidad += venta.cantidad;
        acc[id].total += venta.cantidad * venta.precioUnitario;
        return acc;
    }, {});

    // 3. Construir filas de la tabla
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
// En admin.js, reemplaza initAdmin por esto:
const initAdmin = async () => {
    // Siempre mostrar login al cargar la página
    mostrarAdmin(false);
    // Si quieres mantener sesión, comenta la línea de arriba y usa la siguiente:
    // const sesion = await getItem('sesionAdmin');
    // if (sesion) { mostrarAdmin(true); } else { mostrarAdmin(false); }
};

document.addEventListener('DOMContentLoaded', initAdmin);