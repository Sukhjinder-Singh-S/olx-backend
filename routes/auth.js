const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

router.put("/signup", authController.signup);
router.post("/verify", isAuth, authController.verify);
router.post("/login", authController.login);

module.exports = router;
