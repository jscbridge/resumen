//! conectar con Mongoose

const mongoose = require("mongoose");

//! URL de Mongodb Compass

const url = "mongodb://localhost:27017/way";

//! Conectar con la base de datos

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect DateBase");
  })
  .catch((err) => {
    console.error(err);
  });
