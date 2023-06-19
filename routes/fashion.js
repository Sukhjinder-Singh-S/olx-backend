const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");
const fashionController = require("../controllers/fashion");

//MENS ROUTER
router.post("/postMens", isAuth, fashionController.postMens);
router.patch("/updateMens/:_id", isAuth, fashionController.updateMens);
router.delete("/deleteMens/:_id", isAuth, fashionController.deleteMens);

//WOMENS ROUTER
router.post("/postWomen", isAuth, fashionController.postWomen);
router.patch("/updateWomen/:_id", isAuth, fashionController.updateWomen);
router.delete("/deleteWomen/:_id", isAuth, fashionController.deleteWomen);

//KIDS ROUTER
router.post("/postKid", isAuth, fashionController.postKid);
router.patch("/updateKid/:_id", isAuth, fashionController.updateKid);
router.delete("/deleteKid/:_id", isAuth, fashionController.deleteKid);

module.exports = router;
