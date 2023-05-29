
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
               notFoundObject: {},
               todayDate: ""
          }
     },

     created(){
          fetch("https://mindhub-xj03.onrender.com/api/amazing")
          .then(response => response.json())
          .then(data => {
               // console.log(this.eventsArray);
               this.eventsArray = data.events.filter( element => element.date < data.currentDate)
               console.log(this.eventsArray);
               this.categoryArrayNoRepeat = [...new Set(this.eventsArray.map(elemento => elemento.category))]
               // console.log(this.categoryArrayNoRepeat);
               this.printableArray = this.eventsArray
               console.log(this.printableArray);
               this.todayDate = data.currentDate
               console.log(this.todayDate);
          })
          .catch(error => console.error(error))
     },

     beforeUpdate(){
          this.notFoundObject = {
               message1: "Ops!!! we couldn't found a ",
               search: this.inputTextValue,
               image: "./assets/not-found.png",
               message2: "Please try again", 
          }
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


