import { filterByRelated, selectOneEventPerCategory, imprimirCardDetails, printRelated } from "./module/functions.js";

const url = "https://mindhub-xj03.onrender.com/api/amazing"
const params = new URLSearchParams(location.search);
console.log(params);
let id = params.get('id');
console.log(id);
const $cardDetails = document.getElementById('cardDetails')
console.log($cardDetails);
const $relatedDiv = document.querySelector('.related')


fetch(url)
.then(response => response.json())
.then(data => {
     let arrayOriginal = data.events 
     let eventoObjeto = arrayOriginal.find( element => element._id == id);
     imprimirCardDetails(eventoObjeto,$cardDetails)
     let arrayFiltered = filterByRelated(arrayOriginal, eventoObjeto)
     let arrayOneEventPerCategory = selectOneEventPerCategory (arrayOriginal, eventoObjeto)
     printRelated(arrayFiltered, $relatedDiv, arrayOneEventPerCategory)
})
.catch(error => console.error(error))