// Creación del producto
const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const objetoUserSchema = {
    name: String,
    age: Number,
    address: String,
    population: String,
    avatar:String,
    phone: String,
    idCoHouse: Number,
    role: Number,
    date: String,
    genere: String,
    cp: String,
    activities: Array
};

const userSchema = mongoose.Schema(objetoUserSchema, { versionKey: false })

userSchema.plugin(AutoIncrement, { inc_field: 'idUser' });

const User = mongoose.model("users", userSchema);

// para exportar
module.exports = User;