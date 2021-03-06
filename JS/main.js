"use strict";
const mysql = require("mysql");
const config = require("./config");
const DAOUsers = require("./DAOUsers");
const DAOTasks = require("./DAOTasks");
// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});
let daoUser = new DAOUsers(pool);
let daoTask = new DAOTasks(pool);
// Definición de las funciones callback
// Uso de los métodos de las clases DAOUsers y DAOTasks

daoUser.isUserCorrect("albercha@ucm.es", "12345", cb_isUserCorrect);
function cb_isUserCorrect(err, result) {
    if (err) {
        console.log(err.message);
    } else if (result) {
        console.log("Usuario y contraseña correctos");
    } else {
        console.log("Usuario y/o contraseña incorrectos");
    }
}


daoUser.getUserImageName("albercha@ucm.es", cb_getImg);
function cb_getImg(err, result) {
    if (err) {
        console.log(err.message);
    } else if (result) {
        console.log("Nombre del fichero que contiene la imagen: "+result);
    } else {
        console.log("Usuario incorrecto");
    }
}

daoTask.deleteCompleted("12345@ucm.es",cb_DeleteTasksDone);
function cb_DeleteTasksDone(err){
    if (err) {
        console.log(err.message);
    }
    else{
        console.log("Tareas hechas borradas");
    }
}

daoTask.markTaskDone(5, cb_DoneTask);
function cb_DoneTask(err) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Tarea marcada a done con exito");
    }
}
daoTask.getAllTasks("albercha@ucm.es",cb_getTasks)
function cb_getTasks(err,lista) {
    if (err) {
        console.log(err.message);
    } else {
        lista.forEach(function(lista1) {
            var hecho, tags="(";
            if(lista1.done==1) hecho= " Tarea completada";
            else  hecho= " Tarea  NO completada";
            lista1.tag.forEach(function(etiqueta) {
                tags=tags+etiqueta.tag+", ";
            });
            tags=tags+")";
            console.log("Tarea "+lista1.id + ": "+lista1.text + ". Tags: "+ tags + " ----> "+hecho);
           
        });
    }
}
let tarea=new Object();
let tags= new Array();
tarea.done=1;
tarea.text="Ir al bar";
tags=["beber","muuuu","qqqqq"];
tarea.tags=tags;
daoTask.insertTask("12345@ucm.es", tarea,cb_insert)
function cb_insert(err) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Se ha creado correctamente la tarea");
    }
}
