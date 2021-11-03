"use strict";

class DAOTasks {
    constructor(pool) {
        this.pool = pool
    }
    getAllTasks(email, callback) {   // preguntar si puede ser un task sin tag
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT  ID,USUARIO,TEXT,DONE, TAG, TASKID FROM TASK T, TAG a WHERE T.usuario = ? AND T.id=a.TASKID",
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
                                var i = 0;
                                while (i < rows.length()) {
                                    var listaTags = new Array();
                                    var task, tag;
                                    task.id = rows[i].id;
                                    task.text = rows[i].text;
                                    task.done = rows[i].done;
                                    tag.taskId = rows[i].taskId;
                                    tag.tag = rows[i].tag;
                                    listaTags.push(tag);
                                    while (rows[i].id === rows[i + 1].id && i < rows.length()) {
                                        i++;
                                        tag.taskId = rows[i].taskId;
                                        tag.tag = rows[i].tag;
                                        listaTags.push(tag);
                                    }
                                    tasks.tag = listaTags;
                                    listaTags.push(task)
                                    i++;
                                }
                                // fin del bucle
                                callback(null,listaTask);
                            }
                        }
                    }
                );
            }
        });
    }
    insertTask(email, task, callback) { // si falla el insert del tag se hace rollback?????
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
                    "DELETE FROM task WHERE user = ? AND done = ?",
                    [email,1],
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
        });
    }
}
module.exports = DAOTasks;