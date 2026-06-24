const btnAppend = document.querySelector("#btnAppend");
const btnPrepend = document.querySelector("#btnPrepend");
const btnBefore = document.querySelector("#btnBefore");
const btnAfter = document.querySelector("#btnAfter");
const btnRemove = document.querySelector("#btnRemove");
const btnReplaceChildren = document.querySelector("#btnReplaceChildren");
const btnReplaceWith = document.querySelector("#btnReplaceWith");
const titulo = document.querySelector("#titulo");
const contenedorProductos = document.querySelector("#contenedor-productos");

btnAppend.addEventListener("click", function () {
    const producto = document.createElement("article");
    producto.textContent = "Producto agregado al final: Mouse";
    producto.classList.add("producto");
    contenedorProductos.append(producto);
});

btnPrepend.addEventListener("click", function () {
    const producto = document.createElement("article");
    producto.textContent = "Producto agregado al inicio: Teclado";
    producto.classList.add("producto");
    contenedorProductos.prepend(producto);
});

btnBefore.addEventListener("click", function () {
    const mensaje = document.createElement("p");
    mensaje.textContent = "Mensaje insertado antes del título";
    mensaje.classList.add("mensaje");
    titulo.before(mensaje);
});

btnAfter.addEventListener("click", function () {
    const mensaje = document.createElement("p");
    mensaje.textContent = "Mensaje insertado después del título";
    mensaje.classList.add("mensaje");
    titulo.after(mensaje);
});

btnRemove.addEventListener("click", function () {
    const primerProducto = contenedorProductos.querySelector(".producto");
    if (primerProducto) {
        primerProducto.remove();

    }
});

btnReplaceChildren.addEventListener("click", function () {
    const nuevoProducto = document.createElement("article");
    const nuevoProducto1 = document.createElement("article");
    nuevoProducto.textContent = "Contenido Reemplazado (replaceChildren)";
    nuevoProducto1.textContent = "Contenido Reemplazado (replaceChildren)2";
    nuevoProducto1.classList.add("producto-destacado");
    nuevoProducto.classList.add("producto-destacado");

    contenedorProductos.replaceChildren(nuevoProducto, nuevoProducto1);
});

btnReplaceWith.addEventListener("click", function () {
    const primerProducto = contenedorProductos.querySelector(".producto");
    if (primerProducto) {
        const nuevoProducto = document.createElement("article");
        nuevoProducto.textContent = "Producto Sustituido (replaceWith)";
        nuevoProducto.classList.add("producto-destacado");
        primerProducto.replaceWith(nuevoProducto);
    }
});
