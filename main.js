const {createApp} = Vue

const app = createApp({

     data(){
          return{
               eventsArray: [],
               categoryArrayNoRepeat: [],
               selectedCategories: [],
               checkboxFiltredArray: [],
               printableArray: [],
               inputTextValue: "",
               inputTextFilteredArray: [],
               loader: true
          }
     },
     created(){
          fetch("https://mindhub-xj03.onrender.com/api/amazing")
          .then(response => response.json())
          .then(data => {
               this.eventsArray = data.events;
               console.log(this.eventsArray);
               this.categoryArrayNoRepeat = [...new Set(this.eventsArray.map(elemento => elemento.category))]
               // console.log(this.categoryArrayNoRepeat);
               this.printableArray = this.eventsArray
               console.log(this.printableArray);
               this.loader = false;
          })
          .catch(error => console.error(error))
     },

     methods:{

     },

     computed:{
          crossFilter(){
               this.inputTextFilteredArray = this.eventsArray.filter( event => event.name.toLowerCase().includes(this.inputTextValue.toLowerCase()))
               this.checkboxFiltredArray = this.inputTextFilteredArray.filter( e => this.selectedCategories.includes(e.category))
               this.checkboxFiltredArray.length == 0 ? this.printableArray = this.inputTextFilteredArray : this.printableArray = this.checkboxFiltredArray
          }
     }

})

app.mount('#app')






