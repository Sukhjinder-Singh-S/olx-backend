const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");
const Location = require("../controllers/location")
const { VALIDATOR } = require("../helper/validation");

router.put("/signup", VALIDATOR.USER, authController.signup);
router.post("/verify", isAuth, authController.verify);
router.post("/login", authController.login);
router.get('/location', Location.location);

module.exports = router;
