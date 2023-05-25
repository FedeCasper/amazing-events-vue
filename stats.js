
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
               arrayEvents: [],
               currentDate: {},
               arrayPastEvents: [],
               eventHighestPercent: {},
               eventLowestPercent: {},
               eventWithLargerCapacity: {}
          }
     },
     created(){
          const url = "https://mindhub-xj03.onrender.com/api/amazing"
          fetch(url)
               .then(response => response.json())
               .then(data => {
                    this.currentDate = new Date(data.currentDate)
                    // console.log(this.currentDate);
                    this.arrayEvents = data.events
                    // console.log(arrayEvents);
                    let arrayUpcommingEvents =  this.arrayEvents.filter( element => (new Date(element.date) > this.currentDate))
                    // console.log("UPCOMMING EVENTS" , arrayUpcommingEvents);
                    this.arrayPastEvents = this.arrayEvents.filter( element => (new Date(element.date) < this.currentDate))
                    // console.log("PAST EVENTS" , this.arrayPastEvents);
                    this.eventPercentajeCalculator()
                    this.largerCapacityCalculator()
                    this.function()
               })
     },
     methods:{
          eventPercentajeCalculator(){
               this.eventPercentageArray =  this.arrayPastEvents.map( evento => {
                    return {
                         name: evento.name,
                         eventAssistancePercentage: ((evento.assistance * 100) / evento.capacity).toFixed(2)
                    };
               } )
               this.eventPercentageArray.sort((a,b) => b.eventAssistancePercentage - a.eventAssistancePercentage)
               this.eventHighestPercent = this.eventPercentageArray.shift();
               this.eventLowestPercent = this.eventPercentageArray.pop();
          },
          largerCapacityCalculator(){
               let eventsSortedByCapacity = Array.from(this.arrayEvents).sort((a,b) => b.capacity - a.capacity)
               this.eventWithLargerCapacity = eventsSortedByCapacity.shift()
               return this.eventWithLargerCapacity
          },
          function(){
               let x = [...new Set(this.arrayEvents.map(event => event.category))]
               console.log(x);
               let y = x.map(category => this.arrayEvents.filter(event => event.category == category))
               console.log(y);
               // let z = y.map(array => array.reduce((acc, actual) => acc += actual.capacity * actual.price)  )
               // console.log(z);
          }
     },
     computed:{

     }
}).mount('#app')