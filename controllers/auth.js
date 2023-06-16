const User = require("../modules/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateOtp, messageOtp } = require("../middleware/mobile-verify");

let newOtp = "";

exports.signup = async (req, res, next) => {
  const phone = req.body.phone;
  const user = new User({
    contact: phone,
  });

  try {
    newOtp = generateOtp();
    await messageOtp(phone, newOtp);
    
    const postUser = await user.save();

    const token = jwt.sign(
      { userId: postUser._id.toString(), phone: postUser.contact },
      "thisIsASecretKey",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Otp send successfully,Please check you're inbox",
      userId: postUser._id.toString(),
      Token: token,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.verify = (req, res, next) => {
  const bodyOtp = req.body.otp;
  console.log(newOtp);
  if (bodyOtp === newOtp) {
    res.status(201).json("Verify successfully");
  } else {
    res.status(500).json("Verification falied");
  }
};

exports.login = async (req, res, next) => {
  const mobile = req.body.phone;
  let loadUser;
  try {
    newOtp = generateOtp();
    await messageOtp(mobile, newOtp);
    const user = await User.findOne({ contact: mobile });

    if (!user) {
      res
        .status(500)
        .json({ message: "No user found with this mobile", user: user });
    }
    loadUser = user;

    const token = jwt.sign(
      { userId: loadUser._id.toString(), email: loadUser.email },
      "thisIsASecretKey",
      { expiresIn: "1h" }
    );
    res.status(201).json({
      Token: token,
      userId: loadUser._id.toString(),
      message: "Please check inbox for otp",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
