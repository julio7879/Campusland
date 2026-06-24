console.log("A - Inicio");

function Tarea() {
    console.log("B - desarrollo");
}

console.log("B - Proceso");


Tarea();

console.log("C- final tarea");
console.log("----------------_");
console.log("Ejercicio");
console.log("empezamos a trabajar");


setTimeout(function () {
    console.log("pasaron 3 segundos");
}, 3000);

function suma(num1, num2) {
    return num1 + num2;
}

function resta(num1, num2) {
    return num1 - num2;
}

function mul(num1, num2) {
    return num1 * num2;
}

function realizar_operacion(num1, num2, operacionCallback) {

    const resultado = operacionCallback(num1, num2);

    console.log("El resultado es:", resultado);
}


realizar_operacion(2, 4, suma);
realizar_operacion(2, 4, resta);
realizar_operacion(2, 4, mul);

const palabras = ["Hola", "Mundo"];
const mensaje = palabras.reduce((acc, palabra) => acc + " " + palabra, "");
console.log(mensaje); 