const path = require("path");
const fs = require("fs");


const Mobile = require("../mobile/mobile-phones");
const User = require("../modules/user");

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (error) => console.log(error));
};

exports.postMobile = async (req, res, next) => {
  const postMobile = new Mobile({
    brand: req.body.brand,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    user: req.userId,
  });
  try {
    const mobilePost = await postMobile.save();
    const user = await User.findById(req.userId);
    await user.items.push(postMobile);
    await user.save();
    console.log(user, mobilePost);
    res
      .status(201)
      .json({ message: "Mobile Post Saved Successfully", User: user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateMobile = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    const error = new Error("No Post Id Found");
    error.statusCode = 404;
    throw error;
  }
  const payload = {
    brand: req.body.brand,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    user: req.userId,
  };
  if (req.files) {
    images = req.files;
  }
  if (!images) {
    const error = new Error("No image Found");
    error.statusCode = 404;
    throw error;
  }
  try {
    const check = await Mobile.findById(postId);
    if (check.user.toString() !== req.userId) {
      const error = new Error("You're not allow to modify this post");
      error.statusCode = 304;
      throw error;
    }
    const postUpdate = await Mobile.findByIdAndUpdate(postId, payload);
    if (!postUpdate) {
      const error = new Error("No Post found");
      error.statusCode = 204;
      throw error;
    }

    if (images !== postUpdate.images) {
      postUpdate.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res
      .status(201)
      .json({ message: "Post updated successfully", user: req.userId });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteMobilePost = (req, res, next) => {};
