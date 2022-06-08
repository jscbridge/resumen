//!  Creación del modelo (ej: usuario)
const mongoose = require("mongoose");

//! PLANTILLA

const usuarioConstructorSchema = {
  nombre: String,
  edad: String,
  dni: String,
  correo: String,
  password: String,
};

const usuarioSchema = mongoose.Schema(usuarioConstructorSchema, {
  versionKey: false,
});

//! Se crea un campo que se autoincrementa

const AutoIncrement = require("mongoose-sequence")(mongoose);
usuarioSchema.plugin(AutoIncrement, { inc_field: "idUsuario" });


const Usuario = mongoose.model("nombre_tabla", usuarioSchema);


module.exports = Usuario;
