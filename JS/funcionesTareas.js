let listaTareas = [
     {text:"Preparar práctica AW", tags:["AW","practica"]},
     {text: "Mirar fechas congreso", done: true, tags:[]}, 
     {text: "Ir al supermercado", tags: ["personal"]}, 
     {text: "Mudanza", done: false, tags:["personal"]},
     {text: "Ir al gym", done: true, tags:["personal","ejercicio"]}
     ];

function getToDoTasks(tasks){
     var listaT=new Array()
     for (var i = 0; i < tasks.length; i++){
          listaT.push(tasks[i].text)
     }
     return listaT
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
     let partes = texto.split(" ");
     let tarea=new Object();
     tarea.text="";
     tarea.tags= new Array();
            for (var i = 0; i < partes.length; i++) {
                if(partes[i].startsWith("@")){
                     tarea.tags.push(partes[i].slice(1))
                }
                else{
                     if(tarea.text===""){
                         tarea.text=tarea.text+partes[i]
                     }else{
                         tarea.text=tarea.text+" "+partes[i]
                     }
                }
            }
            return tarea;
     }