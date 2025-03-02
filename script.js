fetch("https://dragonball-api.com/api/characters?&limit=10")
    .then((response) => response.json())
    .then((data) => {
        botonpaginaAnt.setAttribute("href", data.links.previous);
        botonpaginaSig.setAttribute("href", data.links.next);
        data.items.forEach((ch) => {
            const nombrePersonaje = ch.name;
            const energiaPersonaje = ch.ki;
            const razaPersonaje = ch.race;
            const generoPersonaje = ch.gender;
            const imagenPersonaje = ch.image;
            const descripcionPersonaje = ch.description;

            nuevoPersonaje(
                nombrePersonaje,
                energiaPersonaje,
                razaPersonaje,
                generoPersonaje,
                imagenPersonaje,
                descripcionPersonaje
            );
        });
    })
    .catch((error) => {
        console.error("Ha habido un fallo en la solicitud", error);
    });

const listaPersonajes = document.getElementById("dragonBallList");

function nuevoPersonaje(
    nombrePersonaje,
    energiaPersonaje,
    razaPersonaje,
    generoPersonaje,
    imagenPersonaje,
    descripcionPersonaje
) {
    const fichaPersonaje = document.createElement("div");
    fichaPersonaje.setAttribute("class", "personajeDB");

    const FotoPersonaje = document.createElement("img");
    FotoPersonaje.src = imagenPersonaje;
    const NombredelPersonaje = document.createElement("p");
    NombredelPersonaje.innerText = nombrePersonaje;
    const EnergiadelPersonaje = document.createElement("p");
    EnergiadelPersonaje.innerText = energiaPersonaje;
    const RazadelPersonaje = document.createElement("p");
    RazadelPersonaje.innerText = razaPersonaje;
    const GenerodelPersonaje = document.createElement("p");
    GenerodelPersonaje.innerText = generoPersonaje;
    const DescripciondelPersonaje = document.createElement("p");
    DescripciondelPersonaje.innerText = descripcionPersonaje;

    fichaPersonaje.append(
        FotoPersonaje,
        NombredelPersonaje,
        EnergiadelPersonaje,
        RazadelPersonaje,
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
            listaPersonajes.innerHTML = "";
            personajes.forEach((ch) => {
                const nombrePersonaje = ch.name;
                const energiaPersonaje = ch.ki;
                const razaPersonaje = ch.race;
                const generoPersonaje = ch.gender;
                const imagenPersonaje = ch.image;
                const descripcionPersonaje = ch.description;

                nuevoPersonaje(
                    nombrePersonaje,
                    energiaPersonaje,
                    razaPersonaje,
                    generoPersonaje,
                    imagenPersonaje,
                    descripcionPersonaje
                );
            });
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
            if (data.meta.currentPage ==1) {
                botonpaginaAnt.setAttribute("disabled", "true");
            }
            botonpaginaAnt.removeAttribute("disabled");

            botonpaginaAnt.setAttribute("href", data.links.previous);
            botonpaginaSig.setAttribute("href", data.links.next);
            listaPersonajes.innerHTML = "";
            pagAnt = data.links.previous;
            pagSig = data.links.next;
            data.items.forEach((ch) => {
                const nombrePersonaje = ch.name;
                const energiaPersonaje = ch.ki;
                const razaPersonaje = ch.race;
                const generoPersonaje = ch.gender;
                const imagenPersonaje = ch.image;
                const descripcionPersonaje = ch.description;

                nuevoPersonaje(
                    nombrePersonaje,
                    energiaPersonaje,
                    razaPersonaje,
                    generoPersonaje,
                    imagenPersonaje,
                    descripcionPersonaje
                );
            });
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
            data.items.forEach((ch) => {
                const nombrePersonaje = ch.name;
                const energiaPersonaje = ch.ki;
                const razaPersonaje = ch.race;
                const generoPersonaje = ch.gender;
                const imagenPersonaje = ch.image;
                const descripcionPersonaje = ch.description;

                nuevoPersonaje(
                    nombrePersonaje,
                    energiaPersonaje,
                    razaPersonaje,
                    generoPersonaje,
                    imagenPersonaje,
                    descripcionPersonaje
                );
            });
        });
}
const eleccionGenero = document.getElementById ("selecciongenero");
const eleccionRaza = document.getElementById ("seleccionraza");
const botonFiltros = document.getElementById ("filtrosbtn");
botonFiltros.addEventListener ("click", personajesseleccionados)
function personajesseleccionados () {
        const razaescogida = encodeURIComponent(eleccionRaza.value);
    
        fetch("https://dragonball-api.com/api/characters?gender="+eleccionGenero.value+"&race="+razaescogida)
        .then((response) => response.json())
        .then((data) => {
            let personajes = [];
            if (eleccionGenero) {
                personajes = data;
            } else {
                personajes = data.items;
            }
            listaPersonajes.innerHTML = "";
            personajes.forEach((ch) => {
                const nombrePersonaje = ch.name;
                const energiaPersonaje = ch.ki;
                const razaPersonaje = ch.race;
                const generoPersonaje = ch.gender;
                const imagenPersonaje = ch.image;
                const descripcionPersonaje = ch.description;

                nuevoPersonaje(
                    nombrePersonaje,
                    energiaPersonaje,
                    razaPersonaje,
                    generoPersonaje,
                    imagenPersonaje,
                    descripcionPersonaje
                );
            });
        })
        .catch((error) => {
            console.error("Ha habido un fallo en la solicitud", error);
        });

    }