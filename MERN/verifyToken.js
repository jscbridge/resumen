const jwt = require("jsonwebtoken");
const verifytoken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {

     res.json({ auth: false });
  } else {
    const bearerToken = token.split(" ")[1];
    // Verificar  --> jwt.verify(token, secret)
    /*     const decoded = jwt.verify(bearerToken, process.env.SECRET);
     */

    jwt.verify(bearerToken, process.env.SECRET, function (err, decoded) {
      if (err) {
        return res.json({ auth: false });
      } else {
        req.userId = decoded.id;
        req.token = bearerToken;

        next();
      }
    });

    // req.userId = 1
  }
};

module.exports = verifytoken;