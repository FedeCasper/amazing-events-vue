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
               eventWithLargerCapacity: {},
               categoriesArrayNoRepeat: [],
               pastObjectArrayWithRevenuePercentage: [],
               upcomingObjectArrayWithRevenuePercentage: [],
               pastSecondThirdTableValues: [],
               upcomingSecondThirdTableValues: [],
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
                    this.categoriesArrayNoRepeat = [...new Set(this.arrayPastEvents.map(event => event.category))]
                    // console.log(this.categoriesArrayNoRepeat);
                    this.eventPercentajeCalculator()
                    this.largerCapacityCalculator()
                    
                    let pastCategoriesArray = this.createNoRepeatCategoriesArray(this.arrayPastEvents)
                    console.log(pastCategoriesArray);
                    let upcomingCategoriesArray = this.createNoRepeatCategoriesArray(this.arrayUpcommingEvents)

                    this.newObjectArrayWithRevenuePercentage = this.objectConvertorToRevenuePercentage(this.arrayPastEvents)
                    console.log(this.newObjectArrayWithRevenuePercentage);
                    this.upcomingObjectArrayWithRevenuePercentage = this.objectConvertorToRevenuePercentage(this.arrayUpcommingEvents)
                    console.log(this.upcomingObjectArrayWithRevenuePercentage);
                    this.pastSecondThirdTableValues = this.createSecondThirdTableValues(this.newObjectArrayWithRevenuePercentage, pastCategoriesArray)
                    console.log(this.pastSecondThirdTableValues);
                    this.upcomingSecondThirdTableValues = this.createSecondThirdTableValues(this.upcomingObjectArrayWithRevenuePercentage, upcomingCategoriesArray)
                    console.log(this.upcomingSecondThirdTableValues);

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

          objectConvertorToRevenuePercentage(array){
               return array.map( evento => {
                    return {
                         category: evento.category,
                         revenue: evento.assistance ? evento.assistance * evento.price : evento.estimate * evento.price,
                         percentage: evento.assistance ? (evento.assistance * 100) / evento.capacity : (evento.estimate * 100) / evento.capacity
                    }
               })
          },

          createNoRepeatCategoriesArray(array){
               return [...new Set(array.map(event => event.category))]
          },

          createSecondThirdTableValues(array, categoriesArray){
               let result = categoriesArray.map( category => array.filter( objeto => objeto.category == category ))
               console.log(result);
               return result.map(array => {
                    let aux1 = 0;
                    let aux2 = 0;
                    return array.reduce((acc, valorActual) => { 
                         return{
                                   category: valorActual.category,
                                   revenue: (aux1 += valorActual.revenue).toLocaleString(),
                                   percentage: (aux2 +=  valorActual.percentage / array.length).toFixed(2)
                              } 
                         },0)
               });
          }
     },
     computed:{

     }
}).mount('#app')