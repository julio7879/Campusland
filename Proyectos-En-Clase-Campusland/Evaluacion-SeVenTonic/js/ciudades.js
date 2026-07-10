// js/ciudades.js

import { getItem, setItem } from './storage.js';

// Estado local (se carga desde localStorage)
let ciudades = [];

// Cargar ciudades desde localStorage
export const cargarCiudades = async () => {
    const data = await getItem('ciudades');
    ciudades = data || [];
    return ciudades;
};

// Obtener el arreglo actual (sin recargar)
export const getCiudades = () => ciudades;

// Renderizar la lista de ciudades en el contenedor
export const renderCiudades = (contenedorId = 'listaCiudades') => {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    if (!ciudades.length) {
        contenedor.innerHTML = '<p>No hay ciudades registradas.</p>';
        return;
    }

    contenedor.innerHTML = ciudades.map(c => `
    <div class="item-admin" data-id="${c.id}">
      <span><strong>${c.nombre}</strong></span>
      <div class="acciones">
        <button class="btn-editar-ciudad" data-id="${c.id}">✏️</button>
        <button class="btn-eliminar-ciudad" data-id="${c.id}">🗑️</button>
      </div>
    </div>
  `).join('');

    // Asignar eventos a los botones (usamos delegación o listeners directos)
    contenedor.querySelectorAll('.btn-editar-ciudad').forEach(btn => {
        btn.addEventListener('click', () => editarCiudad(parseInt(btn.dataset.id)));
    });
    contenedor.querySelectorAll('.btn-eliminar-ciudad').forEach(btn => {
        btn.addEventListener('click', () => eliminarCiudad(parseInt(btn.dataset.id)));
    });
};

// Agregar una nueva ciudad
export const agregarCiudad = async (nombre) => {
    if (!nombre || nombre.trim() === '') return false;
    const nombreTrim = nombre.trim();
    // Validar duplicado (case insensitive)
    if (ciudades.some(c => c.nombre.toLowerCase() === nombreTrim.toLowerCase())) {
        alert('Esta ciudad ya existe.');
        return false;
    }
    const nueva = { id: Date.now(), nombre: nombreTrim };
    ciudades.push(nueva);
    await setItem('ciudades', ciudades);
    renderCiudades();
    return true;
};

// Eliminar una ciudad por ID
export const eliminarCiudad = async (id) => {
    if (!confirm('¿Eliminar esta ciudad?')) return;
    ciudades = ciudades.filter(c => c.id !== id);
    await setItem('ciudades', ciudades);
    renderCiudades();
};

// Editar una ciudad por ID (prompt)
export const editarCiudad = async (id) => {
    const ciudad = ciudades.find(c => c.id === id);
    if (!ciudad) return;
    const nuevoNombre = prompt('Editar ciudad:', ciudad.nombre);
    if (!nuevoNombre || nuevoNombre.trim() === '') return;
    const nombreTrim = nuevoNombre.trim();
    // Validar duplicado excluyendo la misma ciudad
    if (ciudades.some(c => c.id !== id && c.nombre.toLowerCase() === nombreTrim.toLowerCase())) {
        alert('Ya existe una ciudad con ese nombre.');
        return;
    }
    ciudad.nombre = nombreTrim;
    await setItem('ciudades', ciudades);
    renderCiudades();
};

// Actualizar los selectores de ciudad en otros formularios (ej: eventos)
export const actualizarSelectoresCiudad = (selectIds = ['ciudadEvento', 'filtroCiudad']) => {
    selectIds.forEach(id => {
        const select = document.getElementById(id);
        if (!select) return;
        const currentValue = select.value;
        select.innerHTML = '<option value="">-- Selecciona --</option>';
        ciudades.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = c.nombre;
            select.appendChild(opt);
        });
        // Restaurar valor seleccionado si era válido
        if (currentValue && ciudades.some(c => c.id == currentValue)) {
            select.value = currentValue;
        }
    });
};

// Inicializar el módulo (cargar ciudades y renderizar)
export const initCiudades = async (contenedorId = 'listaCiudades', selectIds = ['ciudadEvento', 'filtroCiudad']) => {
    await cargarCiudades();
    renderCiudades(contenedorId);
    actualizarSelectoresCiudad(selectIds);
};