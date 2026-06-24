//Objetos y metodo this
const persona = {
    nombre: "Julio Ernesto",
    edad: 27,
    ciudad: "Zipaquira",
    saludar: function () {
        console.log(
            "Hola soy " + this.nombre + " Tengo " + this.edad + " Años y Soy de " + this.ciudad + "!"
        )
    }

}

console.log("------------------")
console.log(persona.nombre)
console.log(persona.edad)
console.log(persona.ciudad)
console.log("------------------")
console.log(persona.saludar());

console.log("------------------")
//JSON metodo stringify y parse
json = JSON.stringify(persona);
console.log("JSON - ", json);
console.log("OBJETO - ", JSON.parse(json));

console.log("------------------")

console.log(Object.keys(persona))
console.log(Object.values(persona))

const a = { x: 1 };
const b = { y: 2 };
const c = { z: 3 };

console.log(a)
console.log(b)
console.log(Object.assign(a, b))
console.log(Object.assign(a, c))

console.log("------------------")

//Desestructurador
const usuario = {
    id: 1,
    nombre: "Lucía",
    apellido: "Caña"
};
console.log(usuario.id)
console.log(usuario.nombre)
const { id: idusuario, nombre } = usuario;
console.log(idusuario)
console.log(nombre)


//spread operator
const system = {
    so: "LINUX",
    soft: "Window",
    ...usuario
};

console.log(system)

console.log("------------------")

//Colecciones y Arreglos
const notas = [3.5, 4.2, 2.8, 5.0];
console.log(notas[0])
console.log(notas[1])
notas.push(4.0,)
console.log(notas)
notas.pop()
console.log(notas)

const precio = [1000, 2000, 30000, 40000, 50000]
const precioConIva = precio.map(precio => precio * 1.19);
console.log(precioConIva)

const mayoresA20000 = precioConIva.filter(precioConIva => precioConIva > 20000);
console.log(mayoresA20000)

const total = mayoresA20000.reduce((acumulador, precio) => acumulador + precio, 0);

console.log("------------------")
// set y map
const litset = new Set([1, 2, 2, 3]);
console.log(litset);

const litmap = new Map();
litmap.set("nombre", "javier")
litmap.set("edad", 18);
console.log(litmap)


