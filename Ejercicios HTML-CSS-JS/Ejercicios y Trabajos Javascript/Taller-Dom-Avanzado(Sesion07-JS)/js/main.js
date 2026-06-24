// SESIÓN 1.7 - Manipulación Avanzada del DOM
// Proyecto base para estudiantes

const btnCargar = document.querySelector("#btn-cargar");
const btnAgregarFinal = document.querySelector("#btn-agregar-final");
const btnAgregarInicio = document.querySelector("#btn-agregar-inicio");
const btnAviso = document.querySelector("#btn-aviso");
const btnResumen = document.querySelector("#btn-resumen");
const btnReemplazarPrimera = document.querySelector("#btn-reemplazar-primera");

const resumen = document.querySelector("#resumen");
const panelEquipos = document.querySelector("#panel-equipos");
const listaEquipos = document.querySelector("#lista-equipos");

function crearTarjetaEquipo(equipo) {

  const article = document.createElement("article")

  article.classList.add("card-equipo");

  if (equipo.destacado) {
    article.classList.add("destacado");
  }


  const h3 = document.createElement("h3");
  const pCodigo = document.createElement("p");
  const pGrupo = document.createElement("p");
  const pContinente = document.createElement("p");
  const pConfederacion = document.createElement("p");


  h3.textContent = equipo.nombre;
  pCodigo.textContent = "Código: " + equipo.codigo;
  pGrupo.textContent = "Grupo: " + equipo.grupo;
  pContinente.textContent = "Continente: " + equipo.continente;
  pConfederacion.textContent = "Confederación: " + equipo.confederacion;


  const btnEliminar = document.createElement("button");
  btnEliminar.classList.add("btn-eliminar");
  btnEliminar.textContent = "Eliminar";


  btnEliminar.addEventListener("click", function () {
    const tarjetaPadre = btnEliminar.parentElement;
    if (tarjetaPadre) {
      tarjetaPadre.remove();
      actualizarResumen();
    }
  });

  article.append(h3, pCodigo, pGrupo, pContinente, pConfederacion, btnEliminar);

  return article;
}

async function cargarEquipos() {
  try {
    const respuesta = await fetch("data/equipos.json");

    const datos = await respuesta.json();

    listaEquipos.replaceChildren();

    datos.equipos.forEach(function (equipo) {
      const tarjeta = crearTarjetaEquipo(equipo);

      listaEquipos.append(tarjeta);
    });

    actualizarResumen();
  } catch (error) {
    console.error("Error al cargar equipos:", error);
  }
}

function agregarEquipoAlFinal() {

  const equipoPrueba = {
    nombre: "Equipo Prueba Final",
    codigo: "EPF",
    grupo: "Z",
    continente: "Otros",
    confederacion: "FIFA",
    destacado: false
  };

  const tarjeta = crearTarjetaEquipo(equipoPrueba);
  listaEquipos.append(tarjeta);
  actualizarResumen();
}

function agregarEquipoAlInicio() {

  const equipoPrueba = {
    nombre: "Equipo Prueba Inicio",
    codigo: "EPI",
    grupo: "Y",
    continente: "Otros",
    confederacion: "FIFA",
    destacado: true
  };
  const tarjeta = crearTarjetaEquipo(equipoPrueba);
  listaEquipos.prepend(tarjeta);
  actualizarResumen();
}

function insertarAviso() {

  const aviso = document.createElement("p");

  aviso.classList.add("aviso");
  aviso.textContent = "Aviso: Se actualizó la lista de equipos disponibles.";


  panelEquipos.before(aviso);

}

function actualizarResumen() {

  const totalEquipos = listaEquipos.children.length;

  const mensaje = document.createElement("p");
  mensaje.textContent = "Total de equipos en el panel: " + totalEquipos;

  resumen.replaceChildren(mensaje);
}

function reemplazarPrimeraTarjeta() {

  const primeraTarjeta = listaEquipos.firstElementChild;

  if (primeraTarjeta) {
    const equipoReemplazo = {
      nombre: "Equipo Reemplazado",
      codigo: "REP",
      grupo: "R",
      continente: "Sudamérica",
      confederacion: "CONMEBOL",
      destacado: true
    };
    const nuevaTarjeta = crearTarjetaEquipo(equipoReemplazo);
    primeraTarjeta.replaceWith(nuevaTarjeta);
    actualizarResumen();
  } else {
    alert("No hay tarjetas para reemplazar. Por favor, carga los equipos primero.");
  }
}

btnCargar.addEventListener("click", cargarEquipos);
btnAgregarFinal.addEventListener("click", agregarEquipoAlFinal);
btnAgregarInicio.addEventListener("click", agregarEquipoAlInicio);
btnAviso.addEventListener("click", insertarAviso);
btnResumen.addEventListener("click", actualizarResumen);
btnReemplazarPrimera.addEventListener("click", reemplazarPrimeraTarjeta);
