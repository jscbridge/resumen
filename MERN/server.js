



const express = require("express");
require("dotenv").config()
const app = express();
const cors = require('cors');
// Cyberg (Para dificultar el entendimiento del código, recoger los endpoints de diferentes archivos, carpetas)
const router = require("./routes/routes");
const path = require("path");

require("./database/mongo");

app.use(express.json());
app.use(express.static("public"));
app.use(cors())
app.use("/", router);
 
 
 
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5500;

app.listen(port, console.log("Server ON"));
