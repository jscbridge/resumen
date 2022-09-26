const mongoose = require("mongoose");
const activityModel = require("../models/activity.model");
const userModel = require("../models/users.model");

const activity = {

    getActivities: async (req, res) => {
        const activities = await activityModel.find();
        res.json(activities);
    },


    getOneActivity: async (req, res) => {
        const { idActivity } = req.body;
        const oneActivity = await activityModel.findOne({ idActivity });
        res.json(oneActivity)
    },
    getActivitiesUser: async (req, res) => {
        const activities = await activityModel.find();
        const user = await userModel.find({ idUser: req.body.idUser });

        // let datosLimpios = activities.filter((act, i) => act.idActivity === user[0].activities[i].idActivity)
        let arrayPlanes = []
        let actividadesUsuario = user[0].activities

        for (let index = 0; index < activities.length; index++) {
            const element = activities[index];

            for (let index = 0; index < actividadesUsuario.length; index++) {
                const element2 = actividadesUsuario[index];

                if (element.idActivity == element2.idActivity) {

                    let obj1 = {
                        nameAct: element.name,
                        idAct: element.idActivity,
                        banner: element.banner,
                        status: element2.status,
                        session: element2.session,
                        date: element2.date,
                        bannerSelec: element.bannerSelec
                    }
                    arrayPlanes.push(obj1)
                }
            }
        }
        res.json(arrayPlanes);
    }
};

module.exports = activity;
