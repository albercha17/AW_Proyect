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

     let etiqueta=partes.filter(n=>n.startsWith("@")===true)
     etiqueta=etiqueta.map(n=>n.slice(1))
     
     let nombreTarea=partes.filter(n=>n.startsWith("@")===false)
     nombreTarea=nombreTarea.map(n=>n+" ") // pongo el espacio
     nombreTarea[nombreTarea.length-1]=nombreTarea[nombreTarea.length-1].slice(0,nombreTarea[nombreTarea.length-1].length-1) // quito el espacio del ultimo
     let nombre=nombreTarea.reduce((ac,n)=>ac+n,"") // uno todos en un string

     let tarea=new Object()
     tarea.tags=etiqueta;
     tarea.text=nombre;
     return tarea;
     }