import { imprimirNumeroCards, renderizarCards, renderizaChechboxs, filtraPorInputText, filtraPorCheckbox, filtraCruzado, changeStar } from "./module/functions.js";

const url = "https://mindhub-xj03.onrender.com/api/amazing"
let contenedorCards = document.getElementById('contenedorCards');
let contadorCards = document.getElementById('contadorCards')

fetch(url)
.then(response => response.json())
.then(data => {
     let arrayEventos = data.events
     let eventsFilterByDate = arrayEventos.filter( element => element.date < data.currentDate)
     console.log(eventsFilterByDate);
     renderizarCards(eventsFilterByDate, contenedorCards)
     let contenedorCheckboxs = document.getElementById('contenedorCheckboxs');
     renderizaChechboxs(arrayEventos, contenedorCheckboxs )
     let botonBuscar = document.getElementById('botonBuscar')
     let inputText = document.getElementById('inputText')
     let checkboxs = document.querySelectorAll('input[type="checkbox"]')
     let star = document.querySelectorAll('.star')
     botonBuscar.addEventListener('click', () => filtraCruzado(checkboxs, eventsFilterByDate, inputText))
     checkboxs.forEach(checkbox => checkbox.addEventListener('change', () => filtraCruzado(checkboxs, eventsFilterByDate, inputText)))
     star.forEach( element => element.addEventListener( 'click', (e) => changeStar(e, element) ) )
})
.catch(error => console.error(error))
