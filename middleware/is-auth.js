const jwt = require("jsonwebtoken");

const SECRET_KEY = "thisIsASecretKey";

module.exports = async (req, res, next) => {
    console.log("Controle in authentication middleware")
  try {
    if (!req.headers.authorization) {
      return res.status(200).json({ code: 200, message: "Unauthorized ..." });
    }
    const verifytoken = jwt.verify(
      req.headers.authorization.split(" ")[1],
      SECRET_KEY
    );
    console.log(verifytoken);
    req.userId = verifytoken.userId;
    req.contact = verifytoken.phone;
    next();
  } catch (error) {
    return res.status(400).json({ code: 400, message: error.message });
  }
};
