
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
               arrayUpcommingEvents: [],
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
                    this.arrayPastEvents = this.arrayEvents.filter( element => (new Date(element.date) < this.currentDate))
                    // console.log("PAST EVENTS" , this.arrayPastEvents);
                    this.arrayUpcommingEvents =  this.arrayEvents.filter( element => (new Date(element.date) > this.currentDate))
                    // console.log("UPCOMMING EVENTS" , arrayUpcommingEvents);

                    this.eventPercentajeCalculator()
                    this.largerCapacityCalculator()
                    this.past()
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
          past(){
               let x = [...new Set(this.arrayPastEvents.map(event => event.category))]
               console.log(x);
               let y = this.arrayPastEvents.map( evento => {
                    return {
                         name: evento.name,
                         category: evento.category,
                         revenue: evento.assistance ? evento.assistance * evento.price : evento.capacity * evento.price,
                         percentAssistEstimate: evento.assistance ? (evento.assistance * 100) / evento.capacity : (evento.estimate * 100) / evento.capacity
                    }
               })
               console.log(y);
               let result = x.map( category => y.filter(objeto => objeto.category == category))
               console.log(result);

               for(array of result){
                    console.log(array);
                    let x = 0
                    let y = 0
                    let aux = array.reduce( (acc, objetoActual) => { 

                              x += objetoActual.revenue;
                              y += objetoActual.percentAssistEstimate;


                    }, {})
                    console.log( x);
                    console.log( y);
                    // console.log(aux);
                    // let z = array.reduce((acc, valorActual) => acc += valorActual.revenue, 0)
                    // let w = array.reduce((acc, valorActual) => acc += valorActual.percentAssistEstimate / array.length, 0)
               }

               
          }
     },
     computed:{

     }
}).mount('#app')