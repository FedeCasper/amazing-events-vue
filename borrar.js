// Sin bucle

// si 1 es menor igual que 5
// if(contador <= numero){
//      console.log(contador);
// }
// contador = contador + 1;

// if(contador <= numero){
//      console.log(contador);
// }
// contador = contador + 1;

// if(contador <= numero){
//      console.log(contador);
// }
// contador = contador + 1;

// if(contador <= numero){
//      console.log(contador);
// }
// contador = contador + 1;

// Con bucle
// for( let contadorBucle = 1 ; contadorBucle <= numero ; contadorBucle = contadorBucle + 1){
//      console.log(contadorBucle);
// }

// function imprimirIntervalo(numeroInicial, numeroFinal){
//      for( let contadorBucle = numeroInicial ; contadorBucle >= numeroFinal ; contadorBucle = contadorBucle - 1){
//           console.log(contadorBucle);
//      }
// }

// imprimirIntervalo(20,5)

// function tabla (parametro){
//      for(let i = 1 ; i <= 10 ; i++){
//           console.table(`${parametro} x ${i} = ${parametro*i}`);
//      }
// }
// tabla(3)



// While (Encontrar un número)

// mientras ( condicion ){
     // quiero que pase esto
// }

// while(contador <= numero){
//      console.log(`en la vuelta ${contador} el valor de contador es ${contador}`);
//      contador++
// }

// while(contador != numero){
//      contador = Math.ceil(Math.random()*10)
//      console.log(contador);
//      if(contador == numero){
//           console.log(`Numero encontado ${contador}`);
//      }
// }

// Do while
let numero = 5;
let contador = 1;

// Haga esto{ 
     // lo que tiene hacer 
// }mientras( condicion )

// do{
//      console.log("antes de incrementar" , contador);
//      contador++
//      console.log("despues de incrementar", contador);
//      console.log(`${contador} <= ${numero} = ${contador<=numero}`);
// }while(contador <= numero)



// For of (recorre elementos iterables)
// let palabra = "Catriel";
// let palabraLarga = "Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu"
// let mentores = ["Fede", "Nico", "Lucre", "Flor", "Kevin", "Sil", "Cami"]

// let arrayObjetosMentores = [
//      {
//           nombre: "fede",
//           tecnologias: "java"
//      },
//      {
//           nombre: "lucre",
//           tecnologias: "mern"
//      },
//      {
//           nombre: "nico",
//           tecnologias: "todas"
//      }
// ]

// for(let objeto of arrayObjetosMentores){
//      if(objeto.tecnologias == "todas"){
//           console.log(objeto);
//      }
// }




// For in
let seleccion = {
     pais: "argentina",
     copasMundiales: 3,
     copasAmerica: 15,
     juegosOlimpicos: 2,
     posicionRankingFifa: 1,
     federacion: "AFA",
     confederacion: "conmebol",
     participacionesMundiales: 18,
     capitan: "Lionel Messi"
}

// console.log(seleccion.capitan);
// console.log(seleccion["capitan"]);

for(let propiedades in seleccion){
     if(seleccion[propiedades] == "AFA"){
          console.log(propiedades);
     }

}