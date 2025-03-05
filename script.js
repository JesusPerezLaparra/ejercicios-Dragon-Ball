fetch("https://dragonball-api.com/api/characters?&limit=10")
    .then((response) => response.json())
    .then((data) => {
        botonpaginaAnt.setAttribute("href", data.links.previous);
        botonpaginaSig.setAttribute("href", data.links.next);
        mostrarPersonajes(data.items);
    })
    .catch((error) => {
        console.error("Ha habido un fallo en la solicitud", error);
    });

const listaPersonajes = document.getElementById("dragonBallList");

function nuevoPersonaje(
    nombrePersonaje,
    energiaPersonaje,
    razaPersonaje,
    afiliacionPersonaje,
    generoPersonaje,
    imagenPersonaje,
    descripcionPersonaje, 
    id 
) {
    const fichaPersonaje = document.createElement("div");
    fichaPersonaje.setAttribute("class", "personajeDB");
    fichaPersonaje.addEventListener ("click",()=>informacionadicional(id))
    const FotoPersonaje = document.createElement("img");
    FotoPersonaje.src = imagenPersonaje;
    const NombredelPersonaje = document.createElement("p");
    NombredelPersonaje.innerText = nombrePersonaje;
    const EnergiadelPersonaje = document.createElement("p");
    EnergiadelPersonaje.innerText = energiaPersonaje;
    const RazadelPersonaje = document.createElement("p");
    RazadelPersonaje.innerText = razaPersonaje;
    const AfiliaciondelPersonaje = document.createElement("p");
    AfiliaciondelPersonaje.innerText = afiliacionPersonaje;
    const GenerodelPersonaje = document.createElement("p");
    GenerodelPersonaje.innerText = generoPersonaje;
    const DescripciondelPersonaje = document.createElement("p");
    DescripciondelPersonaje.innerText = descripcionPersonaje;

    fichaPersonaje.append(
        FotoPersonaje,
        NombredelPersonaje,
        EnergiadelPersonaje,
        RazadelPersonaje,
        AfiliaciondelPersonaje,
        GenerodelPersonaje,
        DescripciondelPersonaje
    );
    listaPersonajes.appendChild(fichaPersonaje);
}

const busquedaDB = document.getElementById("busquedaPersonajeDB");
busquedaDB.addEventListener("input", buscarNombrePersonaje);
function buscarNombrePersonaje() {
    let personajeABuscar = document
        .getElementById("busquedaPersonajeDB")
        .value.toLowerCase();
    let searchParam = "";
    if (personajeABuscar) {
        searchParam = "?name=" + personajeABuscar;
    }
    fetch("https://dragonball-api.com/api/characters" + searchParam)
        .then((response) => response.json())
        .then((data) => {
            let personajes = [];
            if (searchParam) {
                personajes = data;
            } else {
                personajes = data.items;
            }
            mostrarPersonajes(personajes);
        })
        .catch((error) => {
            console.error("Ha habido un fallo en la solicitud", error);
        });
}

const botonpaginaAnt = document.getElementById("botonpagAnt");
botonpaginaAnt.addEventListener("click", paginaAnterior);

function paginaAnterior() {
    fetch(botonpaginaAnt.getAttribute("href"))
        .then((response) => response.json())
        .then((data) => {
            if (data.meta.currentPage == 1) {
                botonpaginaAnt.setAttribute("disabled", "true");
            }
            botonpaginaAnt.removeAttribute("disabled");

            botonpaginaAnt.setAttribute("href", data.links.previous);
            botonpaginaSig.setAttribute("href", data.links.next);
            listaPersonajes.innerHTML = "";
            pagAnt = data.links.previous;
            pagSig = data.links.next;
            mostrarPersonajes(data.items);
        });
}

const botonpaginaSig = document.getElementById("botonpagSig");
botonpaginaSig.addEventListener("click", paginaSiguiente);

function paginaSiguiente() {
    fetch(botonpaginaSig.getAttribute("href"))
        .then((response) => response.json())
        .then((data) => {
            if (data.meta.currentPage == 6) {
                botonpaginaSig.setAttribute("disabled", "true");
            }
            botonpaginaSig.removeAttribute("disabled");

            botonpaginaAnt.setAttribute("href", data.links.previous);
            botonpaginaSig.setAttribute("href", data.links.next);
            listaPersonajes.innerHTML = "";
            pagAnt = data.links.previous;
            pagSig = data.links.next;
            mostrarPersonajes(data.items);
        });
}
const eleccionGenero = document.getElementById("selecciongenero");
const eleccionRaza = document.getElementById("seleccionraza");
const eleccionAfiliacion = document.getElementById("seleccionafiliacion");
const botonFiltros = document.getElementById("filtrosbtn");
botonFiltros.addEventListener("click", personajesseleccionados);

function personajesseleccionados() {
    const razaescogida = encodeURIComponent(eleccionRaza.value);
    const afiliacionescogida = encodeURIComponent(eleccionAfiliacion.value);

    fetch(
        "https://dragonball-api.com/api/characters?gender=" +
            eleccionGenero.value +
            "&race=" +
            razaescogida +
            "&affiliation=" +
            afiliacionescogida
    )
        .then((response) => response.json())
        .then((data) => {
            botonpaginaAnt.setAttribute("disabled", "true");
            botonpaginaSig.setAttribute("disabled", "true");

            let personajes = [];
            if (eleccionGenero) {
                personajes = data;
            } else {
                personajes = data.items;
            }
            mostrarPersonajes(personajes);
        })
        .catch((error) => {
            console.error("Ha habido un fallo en la solicitud", error);
        });
}
function mostrarPersonajes(personajes) {
    listaPersonajes.innerHTML = "";
    personajes.forEach((ch) => {
        const nombrePersonaje = ch.name;
        const energiaPersonaje = ch.ki;
        const razaPersonaje = ch.race;
        const afiliacionpersonaje = ch.affiliation;
        const generoPersonaje = ch.gender;
        const imagenPersonaje = ch.image;
        const descripcionPersonaje = ch.description;

        nuevoPersonaje(
            nombrePersonaje,
            energiaPersonaje,
            razaPersonaje,
            afiliacionpersonaje,
            generoPersonaje,
            imagenPersonaje,
            descripcionPersonaje, 
            ch.id 
        );
    });
}

function informacionadicional(id) {
    fetch("https://dragonball-api.com/api/characters/" + id)
        .then((response) => response.json())
        .then((data) => {
            const masinfo = document.getElementById("masinfopersonaje"); 
            const {name, description, image} = data.originPlanet;
            console.log (data)
           masinfo.show()
            masinfo.innerHTML = "<p><b>Personaje: </b>"+data.name.toUpperCase()+"</p><b>Planeta de origen: </b>"+name+"</p><p><b>Descripción: </b>"+description+"</p><p><img src='"+image+"'/></p><button onclick='document.getElementById(`masinfopersonaje`).close()'>Cerrar</button>";
        })
        .catch(error => console.log("Ha habido un fallo en la solicitud", error));
    }