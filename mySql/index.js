//! Libreria para conectar con mysql
const mysql = require('mysql');

//! Conecta con mysql

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pmysql'
});

//! Probar la conexión

connection.connect((err) => {
    if (!err) {
        console.log('Conexion Ok');
        //connection.end();
    } else {
        console.log('Conexion Off' + JSON.stringify(err, undefined, 2));
    }
});

//! Consulta simple

let query = 'SELECT * from tabla1';

function simpleQuery() {
    connection.query(query, (err, rows) => {
        if (err) throw err;
        console.log('Datos de tabla1: \n', rows);
        // connection.end();
    });
}

//! Inserción con parámetros:

let insertQuery = 'INSERT INTO ?? (??) VALUES (?)';
let query2 = mysql.format(insertQuery, ["tabla1", "campoTexto", "Añadido desde Node"]);

function insertParams() {
    connection.query(query2, (err, response) => {
        if (err) throw err;
        console.log(response.insertId);
        //connection.end();
    });
}

//! Búsqueda con parámetros:
let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
let query3 = mysql.format(selectQuery, ["tabla1", "campoTexto", "Añadido desde Node"]);

function getParams() {
    connection.query(query3, (err, data) => {
        if (err) throw err;
        console.log(data);
        //connection.end();
    });

}

//! Actualización con parámetros:

let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
let query4 = mysql.format(updateQuery, ["tabla1", "campoTexto", "Cambiado desde Node 2", "id", 1]);

function updateParams() {
    connection.query(query4, (err, response) => {
        if (err) throw err;
        console.log(response);
        console.log(query4);
        //connection.end();
    });
}

//! Borrado con parámetros:

let deleteQuery = "DELETE from ?? where ?? = ?";
let query5 = mysql.format(deleteQuery, ["tabla1", "id", 2]);

function deteleParams() {
    connection.query(query5, (err, response) => {
        if (err) throw err;
        console.log(response);
        console.log(query5);
        //connection.end();
    });
}

//! Llamada a procedimientos y funciones:

function callfunctions() {
    let pQuery = 'CALL ??';
    let pName ="todoTabla1"
    let query6 = mysql.format(pQuery,[pName]);
    connection.query(query6, (err, response) => {
        if(err) throw err;
        console.log(response);
        console.log(query6);
        //connection.end();

    });

    let query7 = 'SELECT primerID()';

    connection.query(query7, (err, response) => {
        if(err) throw err;
        console.log(response);
        console.log(query7);
        connection.end();
    });
}

//? Insertar
// insertParams();
//? Buscar
// getParams();
//? Actualizar
// updateParams();
//? Borrar
// deteleParams();
//? Llamar
// callfunctions();
