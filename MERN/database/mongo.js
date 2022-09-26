
// para conectar la base de datos
const mongoose = require("mongoose");

// url del mongo
const url = `mongodb+srv://cohouse:KZpjq7Ccxx2ZfL1V@cluster0.ylggb.mongodb.net/tripulaciones`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connect DateBase");
    })
    .catch((err) => {
        console.error(err);
    });

