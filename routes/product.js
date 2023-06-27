const express = require("express");

let router = express.Router();

const productController = require("../controllers/product");
const isAuth = require("../middleware/is-auth");
const { VALIDATOR } = require("../helper/validation");

const brand = require("../query/main");

// router.get("/products", productController.getProductsCar);
// router.get("/sell",isAuth, productController.getAdCategory);
router.post(
  "/carProduct",
  isAuth,
  VALIDATOR.POST_CAR,
  productController.postProduct
);
router.patch("/updateCar/:_id", isAuth, productController.updateCar);
router.delete("/deleteCar/:_id", isAuth, productController.deleteProduct);

router.post("/postCategory", productController.postCategory);

// router.post('/postCarForm', brand.postCarForm)
router.get("/getUserData", isAuth, productController.getUserData);
router.patch("/updateUser/:_id", isAuth, productController.updateUser);

router.post(
  "/salePost",
  isAuth,
  VALIDATOR.POST_SELL,
  productController.postSale
);
router.patch("/updateSale/:_id", isAuth, productController.updateSalePost);
router.delete("/deletePost/:_id", isAuth, productController.deleteProduct);

router.post(
  "/postRent",
  isAuth,
  VALIDATOR.POST_RENT,
  productController.postRent
);
router.patch("/updateRent/:_id", isAuth, productController.updateRent);
router.delete("/deleteRent/:_id", isAuth, productController.deleteProduct);

router.post(
  "/postPlot",
  isAuth,
  VALIDATOR.POST_PLOTLAND,
  productController.postPlots
);
router.patch("/updatePlot/:_id", isAuth, productController.updatePlot);
router.delete("/deletePlot/:_id", isAuth, productController.deleteProduct);

router.post(
  "/postAdd",
  isAuth,
  VALIDATOR.POST_RNTOFFSHP,
  productController.postAdd
);
router.patch(
  "/updateAddOfficeShop/:_id",
  isAuth,
  productController.UpdateAddShopOffice
);
router.delete(
  "/deleteAddOfficeShop/:_id",
  isAuth,
  productController.deleteProduct
);

//MOBILE CONTROLLER ROUTES
router.post(
  "/postMobile",
  isAuth,
  VALIDATOR.POST_MOBILE,
  productController.postMobile
);
router.patch("/updateMobile/:_id", isAuth, productController.updateMobile);
router.delete("/deleteMobile/:_id", isAuth, productController.deleteProduct);

//ACCESSORIES CONTROLLER ROUTES

router.post(
  "/postAccessories",
  isAuth,
  VALIDATOR.POST_ACCESSORIES,
  productController.postAccessories
);
router.patch(
  "/updateAccessories/:_id",
  isAuth,
  productController.updateAccessories
);
router.delete(
  "/deleteAccessories/:_id",
  isAuth,
  productController.deleteProduct
);

//TABLETS CONTROLLER ROUTES
router.post(
  "/postTablet",
  isAuth,
  VALIDATOR.POST_TABLET,
  productController.postTablet
);
router.patch("/updateTablet/:_id", isAuth, productController.updateTablet);
router.delete("/deleteTablet/:_id", isAuth, productController.deleteProduct);

//MENS ROUTER
router.post(
  "/postMens",
  isAuth,
  VALIDATOR.POST_MENS,
  productController.postMens
);
router.patch("/updateMens/:_id", isAuth, productController.updateMens);
router.delete("/deleteMens/:_id", isAuth, productController.deleteProduct);

//WOMENS ROUTER
router.post(
  "/postWomen",
  isAuth,
  VALIDATOR.POST_WOMEN,
  productController.postWomen
);
router.patch("/updateWomen/:_id", isAuth, productController.updateWomen);
router.delete("/deleteWomen/:_id", isAuth, productController.deleteProduct);

//KIDS ROUTER
router.post("/postKid", isAuth, VALIDATOR.POST_KID, productController.postKid);
router.patch("/updateKid/:_id", isAuth, productController.updateKid);
router.delete("/deleteKid/:_id", isAuth, productController.deleteProduct);

module.exports = router;
