//Asyncronismo
console.log("Inicio");

setTimeout(() => {
    console.log("Tarea asíncrona terminada");
}, 1000);

console.log("Fin");

// Promesa
const miPromesa1 = new Promise((resolve, reject) => {
    console.log("Creando mi promesa1");
});

const miPromesa2 = new Promise(
    (resolve, reject) => {
        console.log("Creando mi promesa2");
        const exito = false;
        if (exito) {
            resolve("Operacion exitosa")
        } else {
            reject("Operacion fallida")
        }
    });

const miPromesa3 = new Promise(
    (resolve, reject) => {
        console.log("Creando mi promesa3");

        fetch("data/equipos.json").then(r => r.json()).then(data => {
            console.log(typeof data);
            console.log(data);
            console.table(data.grupos)
        });
        const exito = false;
        if (exito) {
            resolve("Operacion exitosa")
        } else {
            reject("Operacion fallida")
        }
    });


console.log(typeof miPromesa);
console.log(miPromesa)

miPromesa
    .then((resultado) => {
        console.log("Éxito:", resultado);
    })
    .catch((error) => {
        console.error("Error:", error);
    })
    .finally(() => {
        console.log("Proceso finalizado");
    });

async function cargarequipos() {
    const respuesta = await fetch("data/equipos.json");
    const datos = await respuesta.json();
    console.log(typeof datos);
    console.log(datos);
    console.table(datos.grupos);
}

cargarequipos();