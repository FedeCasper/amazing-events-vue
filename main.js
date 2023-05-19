const {createApp} = Vue

console.log(Vue);

const app = createApp({

     data(){
          return{
               eventsArray: [],
               categoryArrayNoRepeat: [],
               selectedCategories: [],
               checkboxFiltredArray: []
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
          })
          .catch(error => console.error(error))
     },

     methods:{
          filterByCheckbox(){
               this.checkboxFiltredArray = this.eventsArray.filter( e => this.selectedCategories.includes(e.category))
               console.log(this.checkboxFiltredArray);
          }
     }

})

app.mount('#app')






