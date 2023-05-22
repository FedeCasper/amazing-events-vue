const {createApp} = Vue

console.log(Vue);

const app = createApp({

     data(){
          return{
               eventsArray: [],
               categoryArrayNoRepeat: [],
               selectedCategories: [],
               checkboxFiltredArray: [],
               printableArray: []
          }
     },

     created(){
          fetch("https://mindhub-xj03.onrender.com/api/amazing")
          .then(response => response.json())
          .then(data => {
               this.eventsArray = data.events;
               console.log(this.eventsArray);
               this.categoryArrayNoRepeat = [...new Set(this.eventsArray.map(elemento => elemento.category))]
               console.log(this.categoryArrayNoRepeat);
               this.printableArray = this.eventsArray
          })
          .catch(error => console.error(error))
     },

     methods:{
          filterByCheckbox(){
               this.checkboxFiltredArray = this.eventsArray.filter( e => this.selectedCategories.includes(e.category))
               console.log(this.checkboxFiltredArray);
               if(this.checkboxFiltredArray.length != 0){
                    this.printableArray = this.checkboxFiltredArray
               }else{
                    this.printableArray = this.eventsArray
               }
               
          }
     }

})

app.mount('#app')






