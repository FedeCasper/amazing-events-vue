const { createApp } = Vue

const app = createApp({

     data() {
          return {
               eventsArray: [],
               categoryArrayNoRepeat: [],
               selectedCategories: [],
               checkboxFiltredArray: [],
               printableArray: [],
               inputTextValue: "",
               inputTextFilteredArray: [],
               notFoundObject: {},
               todayDate:"",
               favorites: [],
               toast: undefined,
               objectSelected: {},
               livePerfomingEvents: []
          }
     },
     created() {
          fetch("https://mindhub-xj03.onrender.com/api/amazing")
               .then(response => response.json())
               .then(data => {
                    this.eventsArray = data.events;
                    console.log(this.eventsArray);
                    this.categoryArrayNoRepeat = [...new Set(this.eventsArray.map(elemento => elemento.category))]
                    console.log(this.categoryArrayNoRepeat);
                    this.arrayObjectCategoryClass = this.categoryArrayNoRepeat.map(category => {
                         return {
                              name: category,
                              icon: category == "Food" ? "bi bi-cup-hot" :
                              category == "Museum" ? "bi bi-bank" :
                              category == "Concert" ? "bi bi-music-note-beamed" :
                              category == "Race" ? "bi bi-car-front-fill" :
                              category == "Books" ? "bi bi-journal-bookmark" :
                              category == "Cinema" ? "bi bi-film" :
                              category == "Party" ? "bi bi-balloon" : null
                         }
                    })


                    function creatingLivePerfomingArray (array){
                         let aux = []
                         for(let i = 0 ; i < 3 ; i++){
                              let id = Math.ceil(Math.random()*(array.length))
                              console.log("id", id);
                              let randomEvent = array.find(event => event._id == id)
                              console.log("random event", randomEvent);
                              aux.push( randomEvent )
                         }
                         return aux
                    }
                    this.livePerfomingEvents = creatingLivePerfomingArray(this.eventsArray); 
                    console.log(this.livePerfomingEvents);

                    console.log(this.arrayObjectCategoryClass);
                    this.printableArray = this.eventsArray
                    // console.log(this.printableArray);
                    this.todayDate = data.currentDate
                    // console.log(this.todayDate);
                    this.favorites = this.getFavorites() ?? [];
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

     methods: {
          getFavorites(){
               return JSON.parse(localStorage.getItem('favorites'))
          },
          clearFavorites(){
               localStorage.clear('favorites')
               this.favorites = []
               console.log(this.favorites);
          },
          toogleFav(id){
               this.objectSelected = this.eventsArray.find(event => event._id === id)
               if(this.favorites.find(event => event._id === id)){
                    console.log("Lo quita");
                    let aux = this.favorites.filter(event => event._id !== id)
                    this.toast = true
                    this.favorites = aux
                    this.initilizeToast()
               }else{
                    const aux = this.eventsArray.find(event => event._id === id)
                    console.log(aux);
                    this.favorites.push(aux)
                    this.toast = false
                    this.initilizeToast()
               }
               let plainText = JSON.stringify(this.favorites)
               localStorage.setItem('favorites', plainText)
          },
          initilizeToast(){
               const toastBootstrap = bootstrap.Toast.getOrCreateInstance( this.$refs.liveToast)
               console.log(toastBootstrap);
               toastBootstrap.show()
          }
     },

     computed: {
          crossFilter() {
               this.inputTextFilteredArray = this.eventsArray.filter(event => event.name.toLowerCase().includes(this.inputTextValue.toLowerCase()))
               this.checkboxFiltredArray = this.inputTextFilteredArray.filter(e => this.selectedCategories.includes(e.category))
               this.checkboxFiltredArray.length == 0 ? this.printableArray = this.inputTextFilteredArray : this.printableArray = this.checkboxFiltredArray
          }
     }

})

app.mount('#app')






