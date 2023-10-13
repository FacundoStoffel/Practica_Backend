require('rootpath')();
const mysql = require('mysql');
const config = require("config.json");



var user_db = {};

//conexion base de datos
var connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('base de datos conectada')
    }
});



user_db.getByEmail = function (mail, funCallback) {
    param=[mail];
    
    $query = 'SELECT * from usuario WHERE mail=?';

    connection.query($query, param,  function (err, rows) {
        if (err) {
            funCallback(err);
            ;
        }else{
                funCallback(undefined, {
                    message: `Se listo el usuario el usuario ${mail}`,
                    detail: rows
                });
        }
        
    });
};


user_db.getAll = function ( funCallback) {
    
    
    $query = 'SELECT * from usuario';

    connection.query($query, function (err, rows) {
        if (err) {
            funCallback(err);
            return;
        }
        funCallback(rows);
    });
};

user_db.create = function (user, funCallback) {
   
    params = [
        user.mail,
        user.nickname,
        user.password
    ];

    $query = 'INSERT INTO usuario (mail, nickname, password) VALUES (?,?,?)';

    connection.query($query, params, (err, rows) => {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                funCallback({
                    mensaje: 'Este correo ya fue registrado',
                    detail: err
                });
            } else {
                funCallback({
                    mensaje: 'Error del servidor',
                    detail: err
                });
            }
        } else {
            funCallback(undefined, {
                message: `Se creo el usuario ${user.nickname}`,
                detail: rows
            });
        }

    });
};

user_db.edit = function (user, mail , funcallback) {
   

    params = [
        user.mail,
        user.nickname,
        user.password,
        mail
    ];

    $query = 'UPDATE usuario set mail=?, nickname=?, password=? WHERE mail=?';

    connection.query($query, params, (err, rows)=> {
        if (err) {
            funcallback({
                message : "error desconocido",
                detail : err
            });
            
        } else {
            if (rows.affectedRows == 0) {
                funcallback({
                    message: "No se encontro el correo: " + mail,
                    detail : err
                });
            } else {
                funcallback(undefined,{
                    message: `Se modifico el usuario ${user.nickname}`,
                    detail: rows
                });
            }

        }

    });
};

user_db.delete = function (mail, funCallback) {


    $query = 'DELETE from usuario WHERE mail=?';

    connection.query($query, mail, (err, rows) => {
        if (err) {
            funCallback(err);
            return;
        } else {
            if (rows.affectedRows == 0) {
                funCallback({
                    message: "No se encontro usuario: " + mail,
                });
            } else {
                funCallback({
                    message: `Se elimino el usuario ${mail}`,
                    detail: rows
                });
            }

        }
    });
};



module.exports = user_db;