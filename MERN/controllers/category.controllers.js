const mongoose = require("mongoose");
const userModel = require("../models/users.model");
const colivingModel = require("../models/coliving.model");
const activitiesModel = require("../models/activity.model");
const categoryModel = require("../models/category.model");


const category = {

    getCategories: async (req, res) => {
        const categories = await categoryModel.find();
        res.json(categories);
    }

};

module.exports = category;