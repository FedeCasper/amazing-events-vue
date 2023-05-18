export function printMostPopular (array, leftList, rightList){
     let eventsSorted = array.sort((a,b) => (a.assistance ? a.assistance : a.estimate) - (b.assistance ? b.assistance : b.estimate))
     let top6 = eventsSorted.slice(-6)
     let top3 = top6.slice(-3)
     let topRest = top6.slice(0,3)

     top3.forEach((elemento, indice) => 
          leftList.innerHTML +=
               `
               <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                         <h5 class="mb-1">${elemento.name}</h5>
                         <small>#${indice+1}</small>
                    </div>
                    <p class="mb-1">${elemento.description.length < 70 ? elemento.description : elemento.description.slice(0, 80) + "..."}  </p>
                    <small class="date">${elemento.date}</small>
               </a>
               `
          )

     topRest.forEach((elemento, indice) => 
          rightList.innerHTML +=
               `
               <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                         <h5 class="mb-1">${elemento.name}</h5>
                         <small>#${indice+4}</small>
                    </div>
                    <p class="mb-1">${elemento.description.length < 70 ? elemento.description : elemento.description.slice(0, 80) + "..."}  </p>
                    <small class="date">${elemento.date}</small>
               </a>
               `
          )
}

export function imprimirNumeroCards (array){
     let div = document.createElement('div')
     let cantidadCards = array.length
     div.innerHTML = `<h6 class="ms-2">Found <span class="accent">${cantidadCards}</span> events.</h6>`
     contadorCards.appendChild(div)
}

export function renderizarCards (array, contenedor){
     contadorCards.innerHTML = ""
     let divAuxiliar = document.createElement('div')
     divAuxiliar.classList.add('d-flex', 'flex-wrap', 'gap-3', 'justify-content-center')
     let fragment = document.createDocumentFragment()
     array.forEach( element => { 
          divAuxiliar.innerHTML += 
          `<div class="card shadow card-container mainCards" style="width: 18rem;">
               <button class="star" style="height: 32px; width:32px;"></button>
               <img src="${element.image}" class="card-img-top image-card" alt="..." style="height: 12rem; object-fit:cover;">
               <div class="card-body d-flex flex-column justify-content-between flex-wrap normal-card">
                    <div class="d-flex flex-column">
                         <h5 class="card-title border-bottom pb-2 fw-bold">${element.name}</h5>
                         <h6 class="card-title category">${element.category}</h6>
                         <p class="card-text fst-italic">${element.description}</p>
                         <p class="card-text fw-bold m-0">${element.assistance ? 
                              `Assistance:  <span class="fw-normal">${element.assistance} pers.</span>` : 
                              `Estimated: <span class="fw-normal">${element.estimate} pers.</span>`}
                         </p>
                         <p class="card-text fw-bold m-0">Place: <span class="fw-normal">${element.place}</span></p>
                         <h6 class="card-text date mt-2"><img class="h-75" src="./assets/date.png"  alt="..."> ${new Date().toDateString(element.date)}</h6>

                    </div>
                    <div class="d-flex mt-3">
                         <a id="btn-goSomewhere" href="./details.html?id=${element._id}" class="btn btn-primary">Go somewhere</a>
                    </div>
               </div>
          </div>`
          fragment.appendChild(divAuxiliar)
     });
     contenedor.appendChild(fragment)
     imprimirNumeroCards(array)
}

export function changeStar(e, element){
     e.target.value == "" ? (e.target.value = "on", element.classList.replace('star', 'starSelected')) : (e.target.value = "" , element.classList.replace('starSelected', 'star'))
     console.log(e.target.value)
}

export function renderizaChechboxs(array, contenedor){
     let arrayCategorias = [...new Set(array.map(elemento => elemento.category))]
     let fragment = document.createDocumentFragment()
     arrayCategorias.forEach(elemento => {
          let divAuxiliar = document.createElement('div')
          divAuxiliar.classList.add('w-25')
          divAuxiliar.innerHTML += 
          `<label>
               <input class="me-3" type="checkbox" name="" id="" value="${elemento}">${elemento}
          </label>`
          fragment.appendChild(divAuxiliar)
     })
     contenedor.appendChild(fragment)
}

export function filtraPorInputText(array, inputText){
     let filtro = array.filter(elemento => elemento.name.toLowerCase().includes(inputText.value.toLowerCase()))
     console.log(filtro);
     // renderizarCards(filtro, contenedorCards)
     return filtro
}

export function filtraPorCheckbox (nodeList, array){
     contenedorCards.innerHTML = ""
     let arrayDeValuesCheckbox = Array.from(nodeList).filter(checkbox => checkbox.checked).map(CheckboxCheked => CheckboxCheked.value)
     console.log(arrayDeValuesCheckbox);
     console.log(array);
     if(arrayDeValuesCheckbox.length === 0){
          renderizarCards(array, contenedorCards)
     }else{
          let arrayObjetosFiltradosPorCheckbox = array.filter(elemento => arrayDeValuesCheckbox.includes(elemento.category))
          console.log(arrayObjetosFiltradosPorCheckbox);
          renderizarCards(arrayObjetosFiltradosPorCheckbox, contenedorCards)
     }
}

export function filtraCruzado (nodeList, array, inputText){
     let filtro = filtraPorInputText(array, inputText)
     console.log(filtro);
     filtraPorCheckbox(nodeList, filtro)
}

// Stats Functions ------------------------//

export function filterAssistanceSort(array) {
     let eventsWithAssistance = array.filter(element => element.assistance)
     let eventsWithAssistanceSorted = [...eventsWithAssistance].sort((a, b) => a.assistance - b.assistance)
     return eventsWithAssistanceSorted
}

export function filterPercentageAssistance(array){
     let aux = []
     array.map( element => {
          let arrayElement = {
               event: element.name,
               percentage: ( element.assistance * 100 / element.capacity ).toFixed(2)
          }
     aux.push(arrayElement)
     }) 
     return aux.sort( (a,b) => a.percentage - b.percentage)
}

export function filterCapacitySort(array){
     return array.sort( (a,b) => a.capacity - b.capacity)
}

export function filterCreateArrayRevenues (arrayA, arrayB){
     let arrayObjectRevenues = []
     for( let value of arrayA){

          let aux = arrayB.filter( element => element.category === value)
          console.log(`${value}` , aux);
          let pastRevenuesTotal = aux.reduce( (acc, element) => acc + (element.assistance? element.assistance * element.price : element.estimate * element.price), 0,)
          let percentageTotal = (aux.reduce( (acc, element) => acc + ( (element.assistance? element.assistance * 100 / element.capacity : element.estimate * 100 / element.capacity) ), 0) / aux.length).toFixed(2)

          // console.log(`${value}`, pastRevenuesTotal);
          arrayObjectRevenues.push( {
               name: `${value}`,
               revenue: pastRevenuesTotal,
               assistancePercentage: percentageTotal
          })
     }
     console.log(arrayObjectRevenues);
     return arrayObjectRevenues
}

export function printTable1(arrayA, arrayB) {
     let eventWithLowestPercent = arrayA.shift()
     console.log(eventWithLowestPercent);
     let eventWithHighestPercent = arrayA.pop()
     console.log(eventWithHighestPercent);
     let eventWithHighestCapacity = arrayB.pop()
     // console.log(eventWithLowestPercent);
     table1.innerHTML = `
     <th colspan="3 class="tableHeaders"">Event statistics</th>
     <tr> 
          <td>Events with the highest % of assistance</td>
          <td>Events with the lowest % of assistance</td>
          <td>Event with larger capacity</td>
     </tr>
     <tr>
          <td>${eventWithHighestPercent.event} ${eventWithHighestPercent.percentage}%</td>
          <td>${eventWithLowestPercent.event} ${eventWithLowestPercent.percentage}%</td>
          <td>${eventWithHighestCapacity.name} ${(eventWithHighestCapacity.capacity).toLocaleString()}</td>
     </tr>
     `
}

export function printTable2and3(array,id){
     array.forEach(element => {
          id.innerHTML += `
          <tr>
               <td>${element.name}</td>
               <td>$ ${(element.revenue).toLocaleString()}</td>
               <td>${element.assistancePercentage}%</td>
          </tr>
          `
     });
}

// Details Functions ------------------------//

export function filterByRelated(array, objeto){
     return array.filter( element => element.category == objeto.category && element._id != objeto._id )
}

export function selectOneEventPerCategory (array, object){
     console.log(object._id);
     let noRepeatCategory = [...new Set(array.map(element => element.category))]
     let arrayRelated =  noRepeatCategory.map( categoria => array.find( event => event.category == categoria && event._id != object._id ) ).filter(e =>e)
     return arrayRelated
}

export function imprimirCardDetails(object, $element){
     $element.innerHTML =
     `
     <div class="card mb-3" style="max-width: 940px;">
          <div class="row g-0">
               <div class="col-md-4">
                    <img src="${object.image}" class="rounded-start" alt="${object.name}"  style="max-width: 100%; height: 100%; object-fit:cover;">
               </div>
               <div class="col-md-8">
                    <div class="card-body normal-card">
                         <h3 id="cardTitleH3" class="card-title">${object.name}</h3>
                         <p class="card-text category">${object.category}</p>
                         <p class="card-text fst-italic">${object.description}</p>
                         <h6 class="card-text">Place: ${object.place}</p>
                         <h6 class="card-text">Date: ${object.date}</p>
                         <h6 class="card-text">Capacity: ${object.capacity}</p>
                         <h6 class="card-text">Price: $ ${object.price}</h6>
                         <h6 class="card-text">${object.assistance? `Assistance: ${object.assistance}` : `Estimated: ${object.estimate}`}</h6>
                         <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
               </div>
          </div>
     </div>
     `
}

export function printRelated (array, $element, arrayAuxiliar){
     console.log([$element]);
     if(array.length == 0){
          $element.innerHTML = `<h2 class="text-center mb-3">Check some others interesting events</h2>`
          array = arrayAuxiliar
     }
     let fragment = document.createDocumentFragment()
     let auxDiv = document.createElement('div')
     auxDiv.classList.add('d-flex', 'justify-content-center','gap-3')
     array.forEach(element => {
          auxDiv.innerHTML +=
          `
          <div class="card card-container" style="width: 18rem;">
               <img src="${element.image}" class="card-img-top" alt="..." style="height: 10rem; object-fit: cover">
               <div class="card-body related-card">
                    <h6 class="card-title border-bottom pb-2 fw-bold">${element.name}</h6>
                    <h6 class="card-title category">${element.category}</h6>
                    <p class="card-text fw-bold m-0">Place: <span class="fw-normal">${element.place}</span></p>
                    <h6 class="card-text date mt-2">${new Date().toDateString(element.date)}</h6>
               </div>
          </div>
          `
          fragment.appendChild(auxDiv)
     });
     $element.appendChild(fragment)
}


