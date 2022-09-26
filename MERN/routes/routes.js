const router = require("express").Router()
const user = require("../controllers/users.controllers")
const category = require("../controllers/category.controllers")
const activities =require("../controllers/activities.controllers")
const { createProxyMiddleware } = require('http-proxy-middleware');

const verifytoken =require("../verifyToken")

router.post("/checkdata", user.checkData);
router.post("/login", user.login);
router.post("/search", user.search);
router.get("/getusers", user.getUsers);

router.get("/datauser", verifytoken, user.dataUser);
router.post("/getoneuser", user.getOneUser);
router.post("/saveplan",user.savePlan)
router.post("/deleteplan",user.deletePlan)
 
router.get("/getcategory", category.getCategories);
 
router.get("/getactivities", activities.getActivities);
 
router.post("/getactivitiesuser", activities.getActivitiesUser);

router.post("/getoneactivity", activities.getOneActivity);

// router.post("/getReservedUser", activities.getReservedUser);

 



module.exports = router

