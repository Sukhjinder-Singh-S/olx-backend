const express = require("express");
const router = express.Router();

const propertyController = require("../controllers/property");
const isAuth = require("../middleware/is-auth");

router.post("/salePost", isAuth, propertyController.postSale);

router.patch("/update/:_id", isAuth, propertyController.updateSalePost);

router.delete("/deletePost/:_id", isAuth, propertyController.deleteSalePost);

router.post("/postRent", isAuth, propertyController.postRent);

router.patch("/updateRent/:_id", isAuth, propertyController.updateRent);

router.delete("/deleteRent/:_id", isAuth, propertyController.deleteRent);

router.post("/postPlot", isAuth, propertyController.postPlots);

router.patch("/updatePlot/:_id", isAuth, propertyController.updatePlot);

router.delete("/deletePlot/:_id", isAuth, propertyController.deletePlot);

router.post("/postAdd", isAuth, propertyController.postAdd);

router.patch(
  "/updateAddOfficeShop/:_id",
  isAuth,
  propertyController.UpdateAddShopOffice
);

module.exports = router;
