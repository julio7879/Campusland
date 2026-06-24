
let nombreProducto = "  teclado gamer  ";
let precio = 120000;
let cantidad = 2;
let descuento = 10000;
let disponible = true;


let subtotal = precio * cantidad;
let total = subtotal - descuento;


let nombreLimpio = nombreProducto.trim();
let nombreMayus = nombreLimpio.toUpperCase();

let contieneGamer = nombreLimpio.toLowerCase().includes("gamer");


let categorias = ["Electrónica", "Periféricos", "Gaming"];

let primeraCategoria = categorias[0];
let totalCategorias = categorias.length;


let producto = {
    nombre: nombreLimpio,
    precio: precio,
    cantidad: cantidad,
    disponible: disponible,
    categorias: categorias
};

function calcularSubtotal(precio, cantidad) {
    return precio * cantidad;
}

function calcularTotal(subtotal, descuento) {
    return subtotal - descuento;
}


let subCalculado = calcularSubtotal(precio, cantidad);
let totalCalculado = calcularTotal(subCalculado, descuento);


console.log("--- RESUMEN DE COMPRA ---");
console.log("Producto:", nombreMayus);
console.log("Precio unitario:", precio);
console.log("Cantidad:", cantidad);
console.log("Subtotal:", subCalculado);
console.log("Descuento:", descuento);
console.log("Total a pagar:", totalCalculado);
console.log("Producto disponible:", disponible);
console.log("Contiene palabra clave 'gamer':", contieneGamer);
console.log("Primera categoría:", primeraCategoria);
console.log("Total de categorías:", totalCategorias);


if (totalCalculado >= 200000 && disponible === true) {
    console.log(" Aplica envío gratis");
} else {
    console.log("No aplica envío gratis");
}