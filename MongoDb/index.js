const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const mydb = "Empresa";
const coleccion = "Clientes";

const url = "mongodb://localhost:27017/";


//? Creacion de una BD 
// createBD();

//? Creacion de una coleccion dentro de una BD
// createDoc();

//? Insert documento
const myobj = { "nombre": "prueba2", "direccion": "C/ en casa" };
insertDoc();

//? Obtener el primer elemento dentro de una coleccion
// getFirstOne();

//? Ver todos los documentos
// getAll();

//? Query simple
// query();

//? Ordenarlo
// sort();

//? Busquedas paginadas
// limit();

//? Borrar un documento
// deleteOne();

//? Borrar colección
// deleteColletion();

//? Actualizar documento
// updateDoc();




// //! Creacion de una BD 

function createBD(){
    MongoClient.connect(url + mydb, function (err, db) {
        if (err) throw err;
        console.log("Base de datos creada");
        db.close();
    });
}

// //! Creacion de una coleccion dentro de una BD

function createDoc(){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        dbo.createCollection(coleccion, function (err, res) {
            if (err) throw err;
            console.log("Colección creada");
            db.close();
        });
    });
}

//! Insertar dentro de una coleccion de una BD

function insertDoc(){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);

        dbo.collection(coleccion).insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("Documento insertado");
            db.close();
        });
    });
}




//! Obtener datos del primer elemento dentro de una coleccion

function getFirstOne(){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        dbo.collection(coleccion).findOne({}, function (err, result) {
            if (err) throw err;
            console.log(result.nombre);
            db.close();
        });
    });
}

//! Ver todos

function getAll(){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        dbo.collection(coleccion).find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

//! Query simple

function query(){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        var query = { "direccion": "C/Alcalá 1" };
        dbo.collection(coleccion).find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

//! Ordenarlo
function sort(){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        var mysort = { "nombre": 1 };
        dbo.collection(coleccion).find().sort(mysort).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

//! Busquedas paginadas
function limit(){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        dbo.collection(coleccion).find().limit(3).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

//! Borrar

function deleteOne(){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        var myquery = { "direccion": 'C/Alcalá 1' };
        dbo.collection(coleccion).deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("Documento borrado");
            db.close();
        });
    });
}

// //! Borrar coleccion
function deleteColletion(){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        dbo.collection(coleccion).drop(function (err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Coleccion borrada");
            db.close();
        });
    });
}

//! Actualizar documento

function updateDoc(){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        var myquery = { "direccion": "C/Alcalá 1" };
        var newvalues = { $set: { "nombre": "Pedro SL", "direccion": "C/Serrano" } };
        dbo.collection(coleccion).updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("Documento actualizado");
            db.close();
        });
    });
}

