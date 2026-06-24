console.log("------------------")
//FormData
const form = document.querySelector("#formulario1");
const fd = new FormData(form);
console.log(fd.get("nombre"));
fd.append("id", 1);
console.log(fd.get("id"));
fd.delete("id");
console.log(fd.get("id"));

form.addEventListener("submit", function (event) {
    event.preventDefault()
});

const datos = new FormData(form);
console.log(datos.get("nombre"));
console.log(datos.get("email"));