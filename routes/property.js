const express = require("express");
const router = express.Router();

const propertyController = require("../controllers/property");
const isAuth = require("../middleware/is-auth");

router.post("/salePost", propertyController.postSale);

router.patch("/update/:_id", propertyController.updateSalePost);

router.delete("/deletePost/:_id", propertyController.deleteSalePost);

router.post("/postRent", propertyController.postRent);

router.patch("/updateRent/:_id", isAuth, propertyController.updateRent);

router.delete("/deleteRent/:_id", propertyController.deleteRent);

router.post("/postPlot", propertyController.postPlots);

router.patch("/updatePlot/:_id", propertyController.updatePlot);

router.delete("/deletePlot/:_id", propertyController.deletePlot);

router.post("/postAdd", propertyController.postAdd);

router.patch(
  "/updateAddOfficeShop/:_id",
  propertyController.UpdateAddShopOffice
);

module.exports = router;
