// const $cardDetails = document.getElementById('cardDetails')
// console.log($cardDetails);
// const $relatedDiv = document.querySelector('.related')

// imprimirCardDetails(eventoObjeto, $cardDetails)
// let arrayFiltered = filterByRelated(arrayOriginal, eventoObjeto)
// let arrayOneEventPerCategory = selectOneEventPerCategory(arrayOriginal, eventoObjeto)
// printRelated(arrayFiltered, $relatedDiv, arrayOneEventPerCategory)


const { createApp } = Vue

createApp({
     data() {
          return {
               arrayOriginal:[],
               eventoObjeto: {},
               id: ""
          }
     },
     created() {
          const url = "https://mindhub-xj03.onrender.com/api/amazing"
          fetch(url)
               .then(response => response.json())
               .then(data => {
                    const params = new URLSearchParams(location.search);
                    console.log(params);
                    this.id = params.get('id');
                    console.log("id:", this.id);
                    this.arrayOriginal = data.events
                    console.log(this.arrayOriginal);
                    this.eventoObjeto = this.arrayOriginal.find(element => element._id == this.id);
                    console.log(this.eventoObjeto);
               })

     },
     methods: {

     },
     computed: {

     }
}).mount('#app')