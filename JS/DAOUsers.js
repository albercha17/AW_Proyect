"use strict";

class DAOUsers {
     constructor(pool) {
        this.pool=pool
    }
     isUserCorrect(email, password, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM user WHERE email = ? AND password = ?",
                    [email, password],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, false); //no está el usuario con el password proporcionado
                            } else {
                                callback(null, true);
                            }
                        }
                    }
                );
            }
        });
    }
    
    cb_isUserCorrect(err, result) {
        if (err) {
            console.log(err.message);
        } else if (result) {
            console.log("Usuario y contraseña correctos");
        } else {
            console.log("Usuario y/o contraseña incorrectos");
        }
    }
    getUserImageName(email, callback) {

    }
}
module.exports = DAOUsers