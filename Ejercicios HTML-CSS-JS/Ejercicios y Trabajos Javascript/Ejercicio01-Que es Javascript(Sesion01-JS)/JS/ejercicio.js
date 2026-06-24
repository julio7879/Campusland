const setencia = 1;

let edad = 18;

edad = 30;

const nombre = "Perro"

let menorEdad = true;
menorEdad = false;


let lista = ["HTML", "CSS", "JS"]

let listanombres = { nombre: "Ana", edad: 25 }

console.log(edad)
console.log(setencia)
console.log(typeof (setencia))
console.log(typeof (nombre))
console.log(menorEdad)
console.log(typeof (lista))
console.log(typeof (listanombres))
console.log(saludar)

function saludar() {
    salida = "Te saludo"
    return salida
}


const precio = 50000;
const cantidad = 2;
const subtotal = precio * cantidad;
const aplicaDescuento = subtotal >= 100000;

console.log(subtotal)
console.log(aplicaDescuento);

const precioTexto = "15000";
const total = Number(precioTexto) * 3;
console.log(total);
console.log(Number("hola")); 