// js/data-seed.js

// Ya no exportamos SEED_DATA como objeto, sino una función que obtiene los datos
export const fetchSeedData = async () => {
    try {
        const response = await fetch('data.json'); // Ruta relativa a la raíz (index.html o admin.html)
        if (!response.ok) {
            throw new Error(`Error al cargar data.json: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error cargando datos iniciales:', error);
        // Fallback: datos por defecto para que la aplicación no falle
        console.warn('Usando datos de respaldo (fallback).');
        return getFallbackData();
    }
};

// Función de respaldo en caso de que falle el fetch
const getFallbackData = () => ({
    categorias: [
        { id: 1, nombre: 'Rock', descripcion: 'Música rock' },
        { id: 2, nombre: 'Pop', descripcion: 'Pop latino' }
    ],
    ciudades: [
        { id: 1, nombre: 'Bogotá' },
        { id: 2, nombre: 'Medellín' }
    ],
    eventos: [
        { id: 1, codigo: 'ROCK2026', nombre: 'Rock al Parque', categoriaId: 1, precio: 45000, fecha: '2026-08-15', hora: '14:00', ciudadId: 1, imagen: 'default.jpg', descripcion: '' },
        { id: 2, codigo: 'JAZZ26', nombre: 'Festival de Jazz', categoriaId: 2, precio: 60000, fecha: '2026-09-20', hora: '18:00', ciudadId: 2, imagen: 'default.jpg', descripcion: '' }
    ],
    ventas: [],
    sugerencias: []
});