let listaTareas = [
    {text:"Preparar práctica AW", tags:["AW","practica"]},
     {text: "Mirar fechas congreso", done: true, tags:[]}, 
     {text: "Ir al supermercado", tags: ["personal"]}, 
     {text: "Mudanza", done: false, tags:["personal"]}
     ];

     function getToDoTasks(listaTareas){
        let listaT=listaTareas.filter(listaTareas.tags.filter(n=="tag")); 
        return listaT;    
     }
     
      function findByTag(tasks, tag){
         let listaT=listaTareas.filter(listaTareas.tags.filter(n=="tag"));   
         return listaT;    
  
         }

     function findByTags(tasks, tags){
        return listaT;    

     }

     function countDone(tasks){
         let listaT=listaTareas.filter(n.done=="true");
         return listaT;
     }

     function createTask(texto){

     }