"use strict";
class DAOTasks {
    constructor(pool) {
        this.pool=pool
    }
    getAllTasks(email, callback) {
        
    }
    insertTask(email, task, callback) {
        
    }
    markTaskDone(idTask, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "UPDATE taks SET done = 1 taks WHERE id = ?" ,
                    [idTask],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(new Error("No se ha encontrado la tarea"));
                            } else {
                                callback(null);
                            }
                        }
                    }
                );
            }
        });
        
    }
    cb_DoneTask(err) {
        if (err) {
            console.log(err.message);
        }
    }




    deleteCompleted(email, callback) {
         
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "DELETE * FROM taks WHERE email = ? AND done = 1" ,
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(new Error("No se ha encontrado el usuario/no tiene ninguna tarea completada"));
                            } else {
                                callback(null);
                            }
                        }
                    }
                );
            }
        });
    }
    cb_DeleteTasksDone(err) {
        if (err) {
            console.log(err.message);
        }
    }
    
}
module.exports = DAOTasks;