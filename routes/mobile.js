const express = require('express');
const router = express.Router()

const mobileController = require('../controllers/mobile');
const isAuth = require('../middleware/is-auth');


//MOBILE CONTROLLER ROUTES
router.post('/postMobile', isAuth, mobileController.postMobile);

router.patch('/updateMobile/:_id', isAuth, mobileController.updateMobile);

router.delete('/deleteMobile/:_id', isAuth, mobileController.deleteMobilePost)



module.exports = router