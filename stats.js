
//           let arrayUpcommingEventValues =  [...new Set((arrayEvents.filter( element => (new Date(element.date) > currentDate))).map( element => element.category))]
//           console.log("UPCOMING VALUES", arrayUpcommingEventValues);

//           let arrayPastEventsValues = [...new Set((arrayEvents.filter( element => (new Date(element.date) < currentDate))).map( element => element.category))]
//           console.log("PAST VALUES",arrayPastEventsValues);

//           let varFiltredAssistanceSort = filterAssistanceSort(arrayEvents)
//           // console.log(varFiltredAssistanceSort);

//           let varFilterPercentageAssistance = filterPercentageAssistance(varFiltredAssistanceSort)
//           // console.log(varFilterPercentageAssistance);

//           let varEventsWithCapacitySorted = filterCapacitySort(arrayEvents)
//           // console.log(varEventsWithCapacitySorted);
          
//           let arraysByPastCategories = filterCreateArrayRevenues (arrayPastEventsValues, arrayPastEvents)
//           // console.log("ARRAY PAST CATEGORIES REVENUES", arraysByPastCategories);

//           let arraysByUpcomingCategories = filterCreateArrayRevenues (arrayUpcommingEventValues, arrayUpcommingEvents)
//           // console.log("ARRAY UPCOMING CATEGORIES REVENUES", arraysByUpcomingCategories);

//           printTable1(varFilterPercentageAssistance, varEventsWithCapacitySorted)
//           printTable2and3(arraysByPastCategories, tbodyPastEvent)
//           printTable2and3(arraysByUpcomingCategories, tbodyUpcomingEvent)

//      })

const {createApp} = Vue

createApp({
     data(){
          return{
               currentDate: {},
          }
     },
     created(){
          const url = "https://mindhub-xj03.onrender.com/api/amazing"
          fetch(url)
               .then(response => response.json())
               .then(data => {
                    this.currentDate = new Date(data.currentDate)
                    // console.log(this.currentDate);
                    let arrayEvents = data.events
                    // console.log(arrayEvents);
                    let arrayUpcommingEvents =  arrayEvents.filter( element => (new Date(element.date) > this.currentDate))
                    console.log("UPCOMMING EVENTS" , arrayUpcommingEvents);
                    let arrayPastEvents =  arrayEvents.filter( element => (new Date(element.date) < this.currentDate))
                    console.log("PAST EVENTS" , arrayPastEvents);
               })
     },
     methods:{

     },
     computed:{

     }
}).mount('#app')