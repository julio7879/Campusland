const titulo = document.querySelector("#titulo")
const boton = document.querySelector("#boton")

boton.addEventListener("click", function () {
    titulo.textContent = "!Javascript cambio el contendor!";
});