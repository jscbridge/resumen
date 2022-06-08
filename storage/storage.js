//! 1. Añadir al localStorage contenido

localStorage.setItem("Nombre_Clave", "Valor que está 'Stringifycado'");

//! 2. Valor Stringifycado puede ser:

//? 2.1 String, Numeros, booleanos

localStorage.setItem("cadena", "sin variable");
localStorage.setItem("numero", 32.1);
localStorage.setItem("boleano", false);

//? 2.2 Meterlo en variables

var string = JSON.stringify("Hola, lo meto en una variable");
localStorage.setItem("cadenaV", string);

var number = JSON.stringify(32.1 / 4);
localStorage.setItem("numeroV", number);

var boolean = JSON.stringify(true && false);
localStorage.setItem("boleanoV", boolean);

//? 2.3 Meterlo en un Array

let array = ["Jorge", 37, "79", "Madrid", "51234567U", false];
localStorage.setItem("array", array);

//? 2.3 Meterlo en un JSON

localStorage.setItem(
  "jsonSinVariable",
  JSON.stringify({ nombre: "Jorge", dni: "12345678U", admin: true })
);

let jsonCon = {
  nombre: "Coke",
  dni: "12222222U",
  edad: "345",
  admin: false,
};

var jsonString = JSON.stringify(jsonCon);
localStorage.setItem("jsonConVariable", jsonString);

//! 3. Recoger datos del Storage

//? Por el nombre de la key localStorage.getItem("Nombre_Clave") || JSON.parse para "desestringificarlo" y hacerlo Objeto

var info = JSON.parse(localStorage.getItem("jsonConVariable"));
console.log(info);

let user = {
  id: "KGIDM847MJFGU38930",
  name: "raichark",
  games: "435",
  time: "690",
  server: "Golconda",
};

//! Obtención de keys/valores en formato Array

//? // Obtenemos los conjuntos clave/valor
const entries = Object.entries(user);

//? Obtenemos las claves en un array
const keys = Object.keys(user);

//? Obtenemos los valores en un array
const values = Object.values(user);

console.log(entries);
console.log(keys);
console.log(values);
