let listaTareas = [
    {text:"Preparar práctica AW", tags:["AW","practica"]},
     {text: "Mirar fechas congreso", done: true, tags:[]}, 
     {text: "Ir al supermercado", tags: ["personal"]}, 
     {text: "Mudanza", done: false, tags:["personal"]}
     ];

     function getToDoTasks(listaTareas){
        
        return listaT;    
     }
     
      function findByTag(tasks, tag){
         let listaT=listaTareas.filter(n=>n.tags.filter(m=>m===tag));
         return listaT;    
  
         }

     function findByTags(tasks, tags){
        return listaT;    

     }

     function countDone(tasks){
         let listaT=listaTareas.filter(n=>n.done===true);
         var contador=listaT.length
         return contador;
     }

     function createTask(texto){

     }