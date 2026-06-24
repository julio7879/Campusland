const mensaje = document.querySelector("#mensaje");

const btnTextContent = document.querySelector("#btnTextContent");
const btnInnerHTML = document.querySelector("#btnInnerHTML");
const btnLimpiar = document.querySelector("#btnLimpiar");
const btnAlternar = document.querySelector("#btnAlternar");
const btnVerificar = document.querySelector("#btnVerificar");
const btnReemplazarClase = document.querySelector("#btnReemplazarClase");
const btnLeer = document.querySelector("#btnLeer");
const btnCambiar = document.querySelector("#btnCambiar");
const botonEnviar = document.querySelector("#botonEnviar");
const btnHabilitar = document.querySelector("#btnHabilitar");
const enlace = document.querySelector("#enlace");


function TextContent() {
    mensaje.textContent = "Hola Estudiantes <strong> DOM </strong> con textcontent";
    mensaje.classList.add("resultado-texto");
    mensaje.classList.remove("resultado-html");
    mensaje.classList.remove("resultado-limpio");
}
btnTextContent.addEventListener("click", TextContent);

btnInnerHTML.addEventListener("click", function () {
    mensaje.innerHTML = "Hola Estudiantes <strong> DOM </strong> con innerHTML";
    mensaje.classList.add("resultado-html");
    mensaje.classList.remove("resultado-texto");
    mensaje.classList.remove("resultado-limpio");
});

btnLimpiar.addEventListener("click", function () {
    mensaje.textContent = "";
    mensaje.classList.add("resultado-limpio");
    mensaje.classList.remove("resultado-texto");
    mensaje.classList.remove("resultado-html");
});

function alternanmensaje() {
    mensaje.classList.toggle("oculto");
}
btnAlternar.addEventListener("click", alternanmensaje);

function verificarClase() {
    if (mensaje.classList.contains("resultado-html")) {
        alert("El mensaje tiene estilo de innerHTML");
    } else {
        alert("El mensaje NO tiene estilo de innerHTML");
    }
}
btnVerificar.addEventListener("click", verificarClase);

function reemplazarClase() {
    if (mensaje.classList.contains("resultado-texto")) {
        mensaje.classList.replace("resultado-texto", "resultado-html");
    } else if (mensaje.classList.contains("resultado-html")) {
        mensaje.classList.replace("resultado-html", "resultado-texto");
    } else {
        mensaje.classList.add("resultado-texto");
    }
}
btnReemplazarClase.addEventListener("click", reemplazarClase);

btnLeer.addEventListener("click", function () {
    const valorHref = enlace.getAttribute("href");

    console.log("El href del enlace es:", valorHref);
});
btnCambiar.addEventListener("click", function () {
    enlace.setAttribute("href", "https://www.wikipedia.org");
    enlace.textContent = "Ir a Wikipedia";
    console.log("El enlace fue cambiado");
});

btnHabilitar.addEventListener("click", function () {
    botonEnviar.removeAttribute("disabled");
    console.log("El atributo disabled fue eliminado");
});

botonEnviar.addEventListener("click", function () {
    alert("Botón Enviar Habilitado");
});
