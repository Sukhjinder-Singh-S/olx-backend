const express = require("express");
const router = express.Router();

const productController = require("../controllers/getProduct");

router.get("/allProduct", productController.getProducts);
router.get("/carProduct/:refId", productController.getCar);
router.get("/rentProduct/:refId", productController.getRent);
router.get("/sellProduct/:refId", productController.getSell);
router.get("/areaProduct/:refId", productController.getLandAndPlots);
router.get("/officeProduct/:refId", productController.getOfficeShopsRent);

module.exports = router;
