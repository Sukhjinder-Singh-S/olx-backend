const express = require("express");
const router = express.Router();

const mobileController = require("../controllers/mobile");
const isAuth = require("../middleware/is-auth");

//MOBILE CONTROLLER ROUTES
router.post("/postMobile", isAuth, mobileController.postMobile);

router.patch("/updateMobile/:_id", isAuth, mobileController.updateMobile);

router.delete("/deleteMobile/:_id", isAuth, mobileController.deleteMobilePost);

//ACCESSORIES CONTROLLER ROUTES

router.post("/postAccessories", isAuth, mobileController.postAccessories);

router.patch(
  "/updateAccessories/:_id",
  isAuth,
  mobileController.updateAccessories
);

router.delete(
  "/deleteAccessories/:_id",
  isAuth,
  mobileController.deleteAccessories
);

//TABLETS CONTROLLER ROUTES
router.post("/postTablet", isAuth, mobileController.postTablet);

router.patch("/updateTablet/:_id", isAuth, mobileController.updateTablet);

router.delete("/deleteTablet/:_id", isAuth, mobileController.deleteTablet);

module.exports = router;
