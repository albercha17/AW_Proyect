"use strict";

class DAOTasks {
    constructor(pool) {
        this.pool = pool
    }
    getAllTasks(email, callback) { // preguntar si puede ser un task sin tag
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT  id, user, text, done, tag, taskid FROM task T, tag a WHERE T.user = ? AND T.id=a.taskid",
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, null); //no está el usuario con el password proporcionado
                            } else {
                                var listaTask = new Array();
                                var i=0;
                                rows.forEach(function(fila) {
                                    var listaTags = new Array();
                                    var task = new Object();
                                    var tag = new Object();
                                    task.id = fila.id;
                                    task.text = fila.text;
                                    task.done = fila.done;
                                    tag.taskId = fila.taskid;
                                    tag.tag = fila.tag;
                                    listaTags.push(tag);
                                    while (i < rows.length - 1 && fila.id === rows[i + 1].id) {
                                        i++;
                                        var tag2 = new Object();
                                        tag2.taskId = fila.taskid;
                                        tag2.tag = fila.tag;
                                        listaTags.push(tag2);
                                    }
                                    task.tag = listaTags;
                                    listaTask.push(task)
                                    i++;
                                });
                                // fin del bucle
                                callback(null, listaTask);
                            }
                        }
                    }
                );
            }
        });
    }
    insertTask(email, task, callback) { // si falla el insert del tag se hace rollback?????
        var error = null;
        var idT = null;
        this.pool.getConnection(function (err, connection) {
            if (err) {
                error = new Error("Error de acceso a la base de datos");
            } else {
                connection.query(
                    "SELECT * FROM task WHERE id = (SELECT MAX(id) FROM task);",
                    function (err, rows) {
                        if (err) {
                            error = new Error("Error de acceso a la base de datos");
                        } else {
                            idT = rows[0].id;
                            idT++;
                            connection.query(
                                "INSERT INTO task (id,user,text,done) VALUES (?, ?, ?, ?)",
                                [1, email, task.text, task.done],
                                function (err, rows) {
                                    if (err) {
                                        error = new Error("Error de acceso a la base de datos");  // aqui tb va si ya existe en la BD
                                    } else {
                                        task.tags.forEach(function(fila) {
                                            connection.query(
                                                "INSERT INTO tag (taskId, tag) VALUES (?, ?)",
                                                [idT, fila],
                                                function (err, rows) {
                                                    if (err) {
                                                        error = new Error("Error de acceso a la base de datos");
                                                    }
                                                }
                                            );
                                            i++;

                                        })
                                    }
                                    callback(error);
                                    connection.release(); // devolver al pool la conexión
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
                    "UPDATE task SET done = 1 WHERE id = ?",
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




    deleteCompleted(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM task WHERE user = ? AND done = ?",
                    [email, 1],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos 2"));
                        } else {
                            var i=0;
                            while(i<rows.length){
                                connection.query(
                                    "DELETE FROM tag WHERE taskId = ?",
                                    [rows[i].id],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos 2"));
                                        } 
                                    }
                                );
                                i++;
                            }
                            connection.query(
                                "DELETE FROM task WHERE user = ? AND done = ?",
                                [email, 1],
                                function (err, rows) {
                                    connection.release(); // devolver al pool la conexión
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos 2"));
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
}
module.exports = DAOTasks;