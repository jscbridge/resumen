// Creación de la category
const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const objetoUserSchema = {
    name: String,
    idActivities: Array,
    avatar: String,
};

const userSchema = mongoose.Schema(objetoUserSchema, { versionKey: false })

userSchema.plugin(AutoIncrement, { inc_field: 'idCategories' });

const Category = mongoose.model("categories", userSchema);


// para exportar
module.exports = Category;