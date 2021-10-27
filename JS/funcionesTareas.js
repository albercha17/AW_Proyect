let listaTareas = [{
          text: "Preparar práctica AW",
          tags: ["AW", "practica"]
     },
     {
          text: "Mirar fechas congreso",
          done: true,
          tags: []
     },
     {
          text: "Ir al supermercado",
          tags: ["personal"]
     },
     {
          text: "Mudanza",
          done: false,
          tags: ["personal"]
     },
     {
          text: "Ir al gym",
          done: true,
          tags: ["personal", "ejercicio"]
     }
];

function getToDoTasks(tasks) {
     var listaT = new Array()
     tasks = tasks.filter(n => n.done != true) // filtro solo los que esten sin acabar
     tasks.map(n => listaT.push(n.text)) // saco solo los strings
     console.log("hola")
     return listaT;
}

function findByTag(tasks, tag) {
     var listaT = tasks.filter(n => n.tags.includes(tag)) // filtro los que contengan el tag
     return listaT;
}

function findByTags(tasks, tags) {
     var listaT = tasks.filter(n => n.tags.some(e => tags.includes(e))) // filtro los que contengan alguno de los tags
     return listaT;

}

function countDone(tasks) {
     var listaT = tasks.filter(n => n.done === true) // cuento los que esten hechos
     var contador = listaT.length
     return contador;
}

function createTask(texto) {
     var partes = texto.split(" ");

     var etiqueta = partes.filter(n => n.startsWith("@") === true) // filtro los que son etiquetas
     etiqueta = etiqueta.map(n => n.slice(1)) // les quito el @

     var nombreTarea = partes.filter(n => n.startsWith("@") === false) // filtro los que NO son etiquetas
     var nombre = nombreTarea.reduce((ac, n) => ac + n + " ", "") // uno todos en un string
     nombre[nombre.length - 1] = nombre[nombre.length - 1].slice(0, nombre[nombre.length - 1].length - 1) // quito el espacio del ultimo

     var tarea = new Object() // los meto en un obejto nuevo
     tarea.text = nombre;
     tarea.tags = etiqueta;
     return tarea;
}