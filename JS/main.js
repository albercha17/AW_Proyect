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


daoUser.getUserImageName("inmap@ucm.es", cb_getImg);
function cb_getImg(err, result) {
    if (err) {
        console.log(err.message);
    } else if (result) {
        console.log("Nombre del fichero que contiene la imagen: "+result);
    } else {
        console.log("Usuario incorrecto");
    }
}

daoTask.deleteCompleted("albercha17@gmail.es",cb_DeleteTasksDone);
function cb_DeleteTasksDone(err){
    if (err) {
        console.log(err.message);
    }
    else{
        console.log("Tareas borradas");
    }
}

daoTask.markTaskDone(3, cb_DoneTask);
function cb_DoneTask(err) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Tarea marcada a done con exito");
    }
}
