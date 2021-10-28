"use strict";
class DAOTasks {
    constructor(pool) {
        this.pool = pool
    }
    getAllTasks(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT (*)task,tag FROM task T,tag ta WHERE T.user = ? AND T.id=ta.taskId",
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, false); //no está el usuario con el password proporcionado
                            } else {
                                id, text, doney tags
                                
                                callback(null, true);
                            }
                        }
                    }
                );
            }
        });
    }
    insertTask(email, task, callback) {  // si falla el insert del tag se hace rollback?????
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "INSERT INTO task (id,user,text,done) VALUES (?, ?, ?, ?)",
                    [task.id, email, task.text, task.done],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            connection.query(
                                "INSERT INTO tag (taskId, tag) VALUES (?, ?), (?, ?), (?, ?)",
                                [],
                                function (err, rows) {
                                    connection.release(); // devolver al pool la conexión
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"));
                                    } else {
                                        callback(null);
                                    }
                                }
                            );

                        }
                    }
                );
            }
        });
    }
    markTaskDone(idTask, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "UPDATE taks SET done = 1 taks WHERE id = ?",
                    [idTask],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            callback(null);
                            
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
                    "DELETE * FROM taks WHERE email = ? AND done = 1",
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                                callback(null);
                        }
                    }
                );
            }
        });
    }
    cb_DeleteTasksDone(err) {
        if(err) {
            console.log(err.message);
        }
    }

}
module.exports = DAOTasks;