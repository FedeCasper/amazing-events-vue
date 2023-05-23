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
               inputTextFilteredArray: []
          }
     },

     created(){
          fetch("https://mindhub-xj03.onrender.com/api/amazing")
          .then(response => response.json())
          .then(data => {
               this.eventsArray = data.events;
               // console.log(this.eventsArray);
               this.categoryArrayNoRepeat = [...new Set(this.eventsArray.map(elemento => elemento.category))]
               // console.log(this.categoryArrayNoRepeat);
               this.printableArray = this.eventsArray
               console.log(this.printableArray);
          })
          .catch(error => console.error(error))
     },

     methods:{
          // filterByCheckbox(){
          //      this.checkboxFiltredArray = this.eventsArray.filter( e => this.selectedCategories.includes(e.category))
          //      console.log(this.checkboxFiltredArray);
          //      if(this.checkboxFiltredArray.length != 0){
          //           this.printableArray = this.checkboxFiltredArray
          //      }else{
          //           this.printableArray = this.eventsArray
          //      }
               
          // },
          // filterByInputText(){
          //      this.inputTextFilteredArray = this.eventsArray.filter( event => event.name.toLowerCase().includes(this.inputTextValue.toLowerCase()))
          //      console.log(this.inputTextFilteredArray);
          //      if(this.inputTextFilteredArray.length != 0){
          //           this.printableArray = this.inputTextFilteredArray
          //      }else{
          //           this.printableArray = this.eventsArray
          //      }
          // }
     },

     computed:{
          crossFilter(){
               this.inputTextFilteredArray = this.eventsArray.filter( event => event.name.toLowerCase().includes(this.inputTextValue.toLowerCase()))
               this.checkboxFiltredArray = this.inputTextFilteredArray.filter( e => this.selectedCategories.includes(e.category))
               console.log(this.checkboxFiltredArray);
               
               console.log(this.inputTextFilteredArray);
               this.checkboxFiltredArray.length == 0 ?
          }
     }

})

app.mount('#app')






