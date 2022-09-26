// Creación del producto
const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const objetoUserSchema = {
    code: Number,
    name: String,
    activity: Array,
    place: String,
    price: Number,
    avatar: String,
    guiatlf: Array,
 
};

const userSchema = mongoose.Schema(objetoUserSchema, { versionKey: false })

userSchema.plugin(AutoIncrement, { inc_field: 'idColiving' });

const Coliving = mongoose.model("colivings", userSchema);

// para exportar
module.exports = Coliving;