const { createApp } = Vue

createApp({
     data() {
          return {
               arrayOriginal:[],
               eventoObjeto: {},
               id: "",
               relatedArray: [],
               randomNumber: 0,
               noRepeatArray: []
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
                    console.log(this.arrayOriginal);
                    this.eventoObjeto = this.arrayOriginal.find(element => element._id == this.id);
                    // console.log(this.eventoObjeto);

                    
                    this.generateRandomNumber()
                    this.createRelatedArray()
               })

     },
     methods: {
          generateRandomNumber(){
               this.randomNumber = Math.floor(Math.random() * 60)
          },
          createRelatedArray(){
               let categories =  [...new Set(this.arrayOriginal.map(event => event.category))]
               this.relatedArray = (this.arrayOriginal.filter( element => element.category == this.eventoObjeto.category && element._id != this.eventoObjeto._id )).splice(0,5)
               this.noRepeatArray = categories.map(category => this.arrayOriginal.find( objeto => objeto.category == category)).filter(event => event._id != this.id ).splice(0,5)
               this.relatedArray.length == 0 ? this.relatedArray = this.noRepeatArray : ""
          }
     },
     computed: {

     }
}).mount('#app')