//! IMPORTAMOS EL MODELO

import usuario from "./Mongoose/Modelo";

//! INSERTAR USUARIO  save()

//* 1º FORMA INSERTAR

const createUsuario = new usuario({
  nombre: "Coke",
  edad: "36",
  dni: "51003782T",
  correo: "coke_vader@hotmail.com",
  password: "1q2w3d4f^kgh9",
});

createUsuario.save();

//* 2º FORMA INSERTAR

let coke = {
  nombre: "Coke",
  edad: "36",
  dni: "56083782T",
  correo: "coke_vader@hotmail.com",
  password: "1q2w3d4f^kgh9",
};

let insertCoke = new usuario(coke);

insertCoke.save();

//* 3º FORMA INSERTAR

let parvo = {
  nombre: "parvo",
  edad: "36",
  dni: "51088782T",
  correo: "parvo@hotmail.com",
  password: "1q2w3d4f^kgh9",
};

new usuario(insertCoke).save();

//! BUSCAR UNO  findOne()

//* 1º FORMA DE BUSCAR

const searchDni = await MyModel.findOne({ dni: "51088782T" });

//* 2º FORMA DE BUSCAR

let info = {
  dni: "51088782T",
};

const searchDni2 = await MyModel.findOne(info);


//! BUSCAR  find() == que finOne() 
//? Devuelve todos los documentos que tengan nombre Pablo 

const searchDni3 = await MyModel.find({ nombre: "Pablo" });

//? Devuelve todos los documentos de la tabla usuarios

const searchAll = await MyModel.find();

//! ACTUALIZAR  upadate()




