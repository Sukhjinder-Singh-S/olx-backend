const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");
const { VALIDATOR } = require("../helper/validation");

router.put("/signup", VALIDATOR.USER, authController.signup);
router.post("/verify", isAuth, authController.verify);
router.post("/login", authController.login);

module.exports = router;
