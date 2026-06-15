//Productos de sistema del compra para frutas

const Productos = [
    { id: 1, nombre: "Manzana", precio: 2100, },
    { id: 2, nombre: "Pera", precio: 2900, },
    { id: 3, nombre: "Sandia", precio: 1800, },
    { id: 4, nombre: "Banana", precio: 1500, },
    { id: 5, nombre: "Coco", precio: 4500, },
    { id: 6, nombre: "Mango", precio: 3500, }
];
let carrito = [];

function AgregarAlCarrito(IdProducto) {
    let productoEncontrado = Productos.find(fruta => fruta.id === IdProducto)
    if (productoEncontrado) {
        carrito.push(productoEncontrado);
        console.log("Se Agregro " + productoEncontrado + " Al carrito ")
        CalcularPrecio()
        ActualizarInterfaz();
    }
    else {
        console.log("El producto no existe en la tienda!")
    }
}
function CalcularPrecio() {
    let total = 0;
    for (let fruit of carrito) {
        total += fruit.precio;
    }
    document.getElementById("total-compra").innerText = "$" + total;
}

function ActualizarInterfaz() {
    let listaHTML = document.getElementById("lista-carrito");

    listaHTML.innerHTML = "";

    for (let fruit of carrito) {
        listaHTML.innerHTML += "<li>" + fruit.nombre + " - $" + fruit.precio + "</li>";
    }
}

AgregarAlCarrito(2)
AgregarAlCarrito(3)
AgregarAlCarrito(5)
console.log("El contenido de tu carrito: ", carrito)

CalcularPrecio()
