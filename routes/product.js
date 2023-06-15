const express = require("express");

const router = express.Router();

const shopController = require("../controllers/product");
const isAuth = require("../middleware/is-auth");

const brand = require("../query/main");

router.get("/products", shopController.getProductsCar);
router.get("/sell", shopController.getAdCategory);
router.post("/carProduct", shopController.postProduct);

// router.post('/postCarForm', brand.postCarForm)
router.get("/getFormData", shopController.getFormData);
router.get("/getUserData", isAuth, shopController.getUserData);

router.put("/updateUser", isAuth, shopController.updateUser);
module.exports = router;
