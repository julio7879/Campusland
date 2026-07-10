// js/storage.js

// Obtener datos de localStorage (simula async)
export const getItem = (key) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = localStorage.getItem(key);
            resolve(data ? JSON.parse(data) : null);
        }, 30);
    });
};

// Guardar datos en localStorage
export const setItem = (key, value) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem(key, JSON.stringify(value));
            resolve();
        }, 30);
    });
};

// Inicializar con datos semilla
export const seedData = async (seed) => {
    const keys = Object.keys(seed);
    for (const key of keys) {
        const exists = await getItem(key);
        if (!exists) {
            await setItem(key, seed[key]);
        }
    }
};

// Obtener múltiples claves a la vez
export const getMany = async (keys) => {
    const results = {};
    for (const key of keys) {
        results[key] = await getItem(key);
    }
    return results;
};