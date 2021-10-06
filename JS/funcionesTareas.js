let listaTareas = [
     {text:"Preparar práctica AW", tags:["AW","practica"]},
     {text: "Mirar fechas congreso", done: true, tags:[]}, 
     {text: "Ir al supermercado", tags: ["personal"]}, 
     {text: "Mudanza", done: false, tags:["personal"]}
     ];

function getToDoTasks(tasks){
        let listaT=listaTareas
        return listaT;
     }

function findByTag(tasks, tag){
         let listaT=tasks.filter(n=>n.tags.includes(tag))
         return listaT; 
         }

function findByTags(tasks, tags){
        let listaT=tasks.filter(n=>n.tags.some(e => tags.includes(e)))
        return listaT;    

     }

function countDone(tasks){
         let listaT=tasks.filter(n=>n.done===true)
         var contador=listaT.length
         return contador;
     }

function createTask(texto){

     }