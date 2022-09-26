const mongoose = require("mongoose");
const userModel = require("../models/users.model");
const colivingModel = require("../models/coliving.model");
const activitiesModel = require("../models/activity.model");
const jwt = require("jsonwebtoken");

const user = {
  checkData: async (req, res) => {
    const { idCoHousing, nameUser, tlfUser, dateUser } = req.body;

    const checkCoHousing = await colivingModel.findOne({
      code: idCoHousing,
    });

    if (!checkCoHousing) {
      res.json({ message: "No existe el co housing" });
    } else {
      let existVeriCohUser = "";
      for (let i = 0; i < checkCoHousing.guiatlf.length; i++) {
        if (tlfUser == checkCoHousing.guiatlf[i]) {
          i == checkCoHousing.guiatlf.length;
          existVeriCohUser = tlfUser;
        }
      }


      //Si está en la whiteList
      if (existVeriCohUser) {
        //  console.log("Cohouse tiene registrado tlf en su guia, puede registrarse el user")
        const checkExistUser = await userModel.findOne({ phone: tlfUser });


        if (checkExistUser) {
          res.json({ message: "Ya estaba registrada " });
        } else {
          const insertUser = new userModel({
            name: nameUser,
            age: dateUser,
            address: "",
            population: "",
            avatar: "https://randomuser.me/api/portraits/thumb/women/64.jpg",
            phone: tlfUser,
            idCoHouse: idCoHousing,
            role: 0,
            date: "",
            genere: "",
            cp: "",
            activities: [
              {
                idActivity: 1,
                status: "process",
                session: 1
              }],
          });
          insertUser.save();
          res.json({ message: "Datos correctos", dataRegisterUser: req.body });
        }
      } else {
        res.json({
          message: "cohouse no te tiene registrado, contacte con un admin ",
        });
      }
    }
  },


  login: async (req, res) => {
    const { phone } = req.body;

    const existUser = await userModel.findOne({ phone });

    try {
      if (existUser != null) {
        payload = {
          id: existUser.idUser,
          location: "madrid",
        };

        const token = jwt.sign(payload, process.env.SECRET);

        res.json({
          message: "Login Correcto",
          token,
          status: true,
        });
      } else {
        res.json({
          message: "El número que has introducido es erróneo",
          status: false,
        });
      }
    } catch (error) { }
  },

  search: async (req, res) => {
    const { population } = req.body;
    const existUser = await userModel.find({ population });
    res.json(existUser);
  },

  getUsers: async (req, res) => {
    // console.log("llega");
    const users = await userModel.find();

    res.json(users);
  },

  dataUser: async (req, res) => {
    const users = await userModel.find({ idUser: req.userId });
    res.json({
      data: users,
      auth: true,
    });
  },
  getOneUser: async (req, res) => {
    const user = await userModel.findOne();
    res.json(user);
  },
  savePlan: async (req, res) => {
    const { idUser, session, idActivity } = req.body;


    let idParser = parseInt(idActivity);
    let sessionParser = parseInt(session)


    const userData = await userModel.find({ idUser });

    /*     console.log(userData[0].activities) */

    let result = userData[0].activities.filter((act) => act.idActivity == idParser)




    if (result[0] != null) {


      const query = { idUser };
      const update = { $set: { 'activities.$[elem].status': 'process', 'activities.$[elem].session': sessionParser } };
      const options = { new: true, arrayFilters: [{ 'elem.idActivity': idParser }] };
      await userModel.findOneAndUpdate(query, update, options);
    } else {


      const query = { idUser };
      const update = { $push: { activities: { status: 'process', session: sessionParser, date: "16/03/2022", idActivity: idParser } } }

      await userModel.findOneAndUpdate(query, update);
    }



    /* 
    const query = { idUser };
    const update = { $set: { 'activities.$[elem].status': 'process' ,'activities.$[elem].session': session} };
    const options = { new: true, arrayFilters: [{ 'elem.idActivity': idParser }]};
    await userModel.findOneAndUpdate(query, update, options);
     */

  },
  deletePlan: async (req, res) => {
    const { idUser, session, idActivity } = req.body;


    let idParser = parseInt(idActivity);
    let sessionParaser = parseInt(session)

    /*  let arrayClean = [];
 
     const userData = await userModel.find({ idUser });
 
     let userClean = userData[0].activities;
 
 
 
     for (let index = 0; index < userClean.length; index++) {
       const element = userClean[index];
 
       if (element.idActivity !== idParser) {
         arrayClean.push(element);
       }
     }
 
     arrayClean.push({
       idActivity: idParser,
       status: "none",
       sessionParaser,
       date: "01/03/2022",
 
     });
   */




    const query = { idUser };
    const update = { $set: { 'activities.$[elem].status': 'none', 'activities.$[elem].session': sessionParaser } };
    const options = { new: true, arrayFilters: [{ 'elem.idActivity': idParser }] };
    await userModel.findOneAndUpdate(query, update, options);


  },
};

module.exports = user;
