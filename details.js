const { createApp } = Vue

createApp({
     data() {
          return {
               arrayOriginal:[],
               eventoObjeto: {},
               id: "",
               relatedArray: []
          }
     },
     created() {
          const url = "https://mindhub-xj03.onrender.com/api/amazing"
          fetch(url)
               .then(response => response.json())
               .then(data => {
                    const params = new URLSearchParams(location.search);
                    // console.log(params);
                    this.id = params.get('id');
                    // console.log("id:", this.id);
                    this.arrayOriginal = data.events
                    // console.log(this.arrayOriginal);
                    this.eventoObjeto = this.arrayOriginal.find(element => element._id == this.id);
                    // console.log(this.eventoObjeto);
                    this.relatedArray = (this.arrayOriginal.filter( element => element.category == this.eventoObjeto.category && element._id != this.eventoObjeto._id )).splice(0,5)
                    // console.log(this.relatedArray);
               })

     },
     methods: {

     },
     computed: {

     }
}).mount('#app')