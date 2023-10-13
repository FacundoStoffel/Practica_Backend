require('rootpath')();
const mysql = require('mysql');
const config = require("config.json");



var persona_db = {};

//conexion base de datos
var connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('base de datos conectada')
    }
});



persona_db.getByApellido = function (apellido, funCallback) {
    param=[apellido];
    
    $query = 'SELECT * from persona WHERE apellido=?';

    connection.query($query, param,  function (err, rows) {
        if (err) {
            funCallback(err);
            ;
        }else{
                funCallback(undefined, {
                    message: `Se listo el usuario el usuario ${apellido}`,
                    detail: rows
                });
        }
        
    });
};


persona_db.getAll = function ( funCallback) {
    
    
    $query = 'SELECT * from persona';

    connection.query($query, function (err, rows) {
        if (err) {
            funCallback(err);
            return;
        }
        funCallback(rows);
    });
};

persona_db.create = function (persona, funCallback) {
   
    params = [
        persona.dni,
        persona.nombre,
        persona.apellido
    ];

    $query = 'INSERT INTO persona (dni, nombre, apellido) VALUES (?,?,?)';

    connection.query($query, params, (err, rows) => {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                funCallback({
                    mensaje: 'Esta persona ya fue registrada',
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
                message: `Se creo la persona ${persona.nombre}`,
                detail: rows
            });
        }

    });
};

persona_db.edit = function (persona, dni , funcallback) {
   

    params = [
        persona.dni,
        persona.nombre,
        persona.apellido,
        dni
    ];

    $query = 'UPDATE persona set dni=?, nombre=?, apellido=? WHERE dni=?';

    connection.query($query, params, (err, rows)=> {
        if (err) {
            funcallback({
                message : "error desconocido",
                detail : err
            });
            
        } else {
            if (rows.affectedRows == 0) {
                funcallback({
                    message: "No se encontro la persona: " + dni,
                    detail : err
                });
            } else {
                funcallback(undefined,{
                    message: `Se modifico la persona ${persona.nombre}`,
                    detail: rows
                });
            }

        }

    });
};

persona_db.delete = function (dni, funCallback) {


    $query = 'DELETE from persona WHERE dni=?';

    connection.query($query, dni, (err, rows) => {
        if (err) {
            funCallback(err);
            return;
        } else {
            if (rows.affectedRows == 0) {
                funCallback({
                    message: "No se encontro la persona: " + dni,
                });
            } else {
                funCallback({
                    message: `Se elimino la persona ${dni}`,
                    detail: rows
                });
            }

        }
    });
};



module.exports = persona_db;