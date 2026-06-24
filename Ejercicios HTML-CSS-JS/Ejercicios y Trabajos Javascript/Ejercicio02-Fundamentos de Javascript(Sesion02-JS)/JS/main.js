
const edad = 18;
const edadTexto = "18";
console.log(edad == edadTexto);  // true
console.log(edad === edadTexto); // false

if (true) {
    var mensaje = "Hola";
}
console.log(mensaje); // Hola

//Condicionales: if, else if y else
const nota = 4.5;

if (nota >= 4.5) {
    console.log("Excelente");
} else if (nota >= 3) {
    console.log("Aprobado");
} else {
    console.log("Reprobado");
}

//Comparativos Switch
const metodoPago = "tarjeta";

switch (metodoPago) {
    case "efectivo":
        console.log("Pago en efectivo");
        break;
    case "tarjeta":
        console.log("Pago con tarjeta");
        break;
    default:
        console.log("Método de pago no válido");
}

//Estructuras Repetitivas y Arrays
for (let i = 1; i <= 5; i++) {
    console.log("Número:", i);
}

const productos = ["Mouse", "Teclado", "Monitor"];

for (let i = 0; i < productos.length; i++) {
    console.log(productos[i]);
}
//While y Funciones
let contador = 1;

while (contador <= 5) {
    console.log("Contador:", contador);
    contador++;
}

function calcularTotal(precio, cantidad) {
    return precio * cantidad;
}

const total = calcularTotal(50000, 3);
console.log(total);

function evaluarNota(nota) {
    if (nota >= 3) {
        return "Aprobado";
    } else {
        return "Reprobado";
    }
}

console.log(evaluarNota(4.2));