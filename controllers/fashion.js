const fs = require("fs");
const path = require("path");

const Mens = require("../fashionModel/mens");
const Women = require("../fashionModel/women");
const kid = require("../fashionModel/kids");
const User = require("../modules/user");

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (error) => console.log(error));
};

//Mens Fashion
exports.postMens = async (req, res, next) => {
  const postMen = new Mens({
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
    const post = await postMen.save();
    const findUser = await User.findById(req.userId);
    await findUser.items.push(postMen);
    await findUser.save();
    res.status(201).json({
      message: `Post save successfully for user ${req.userId}`,
      Post: post,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateMens = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    const error = new Error("No Post Id found");
    error.statusCode = 404;
    throw error;
  }
  const payload = {
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
  };
  if (req.files) {
    images = req.files;
  }
  if (!images) {
    const error = new Error("No file selected");
    error.statusCode = 404;
    throw error;
  }
  try {
    const findPost = await Mens.findById(postId);
    console.log(findPost.user.toString());
    if (findPost.user.toString() !== req.userId) {
      const error = new Error("You're not allow to modify this post");
      error.statusCode = 304;
      throw error;
    }
    const updatePost = await Mens.findByIdAndUpdate(postId, payload);
    if (!updatePost) {
      const error = new Error("Sorry, No Post found with this id");
      error.statusCode = 204;
      throw error;
    }
    if (images !== updatePost.images) {
      updatePost.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res
      .status(201)
      .json({ message: `you're post updated successfully`, Post: updatePost });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteMens = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    const error = new Error("No Post Id found");
    error.statusCode = 404;
    throw error;
  }
  try {
    const findPost = await Mens.findById(postId);
    if (!findPost) {
      const error = new Error("No Post Found");
      error.statusCode = 404;
      throw error;
    }
    if (findPost.user.toString() !== req.userId) {
      const error = new Error("you're not allow to modify this post");
      error.statusCode = 203;
      throw error;
    }
    findPost.images.forEach((obj) => {
      const extract = obj.path.replace("\\", "/");
      clearImage(extract);
    });
    await Mens.findByIdAndRemove(postId);
    const user = await User.findById(req.userId);
    await user.items.pull(postId);
    await user.save();
    res
      .status(201)
      .json({ message: `Post deleted successfully for user ${req.userId}` });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//WOMENS CONTROLLER

exports.postWomen = async (req, res, next) => {
  const postWomen = new Women({
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    user: req.userId,
  });
  if (!req.files) {
    const error = new Error("No file selected");
    error.statusCode = 404;
    throw error;
  }
  try {
    const savePost = await postWomen.save();
    const user = await User.findById(req.userId);
    await user.items.push(postWomen);
    await user.save();

    res.status(201).json({
      message: `Post saved successfully for user ${req.userId}`,
      Post: savePost,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateWomen = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    const error = new Error("No Post Id found");
    error.statusCode = 404;
    throw error;
  }
  const payload = {
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
  };
  if (req.files) {
    images = req.files;
  }
  if (!images) {
    const error = new Error("No file selected");
    error.statusCode = 404;
    throw error;
  }
  try {
    const check = await Women.findById(postId);
    if (check.user.toString() !== req.userId) {
      const error = new Error("You're not allow to modify this Post");
      error.statusCode = 304;
      throw error;
    }
    const updateWomen = await Women.findByIdAndUpdate(postId, payload);
    if (!updateWomen) {
      const error = new Error("No Post Found");
      error.statusCode = 204;
      throw error;
    }
    if (images !== updateWomen.images) {
      updateWomen.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res.status(201).json({
      message: `Post updated successfully for user ${req.userId}`,
      Post: updateWomen,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteWomen = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    const error = new Error("No Post Id found");
    error.statusCode = 404;
    throw error;
  }
  try {
    const findPost = await Women.findById(postId);
    if (findPost.user.toString() !== req.userId) {
      const error = new Error("You're not allow to delete this post");
      error.statusCode = 203;
      throw error;
    }
    findPost.images.forEach((obj) => {
      const extract = obj.path.replace("\\", "/");
      clearImage(extract);
    });
    const deletePost = await Women.findByIdAndRemove(postId);
    if (!deletePost) {
      const error = new Error("No Post Found with this id");
      error.statusCode = 404;
      throw error;
    }
    const user = await User.findById(req.userId);
    await user.items.pull(postId);
    await user.save();
    res
      .status(201)
      .json({ message: `Post deleted successfully for user ${req.userId}` });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//KIDS CONTROLLER

exports.postKid = async (req, res, next) => {
  const postKid = new kid({
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    user: req.userId,
  });
  if (!req.files) {
    const error = new Error("No file selected");
    error.statusCoden = 404;
    throw error;
  }
  try {
    const createPost = await postKid.save();
    const user = await User.findById(req.userId);
    await user.items.push(postKid);
    await user.save();
    res.status(201).json({
      message: `Post saved successfully for user ${req.userId}`,
      Post: createPost,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateKid = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    const error = new Error("No id found");
    error.statusCode = 404;
    throw error;
  }
  const payload = {
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
  };
  if (req.files) {
    images = req.files;
  }
  if (!images) {
    const error = new Error("No file selected");
    error.statusCode = 404;
    throw error;
  }
  try {
    const check = await kid.findById(postId);
    if (check.user.toString() !== req.userId) {
      const error = new Error("You're not allow to modify this post");
      error.statusCode = 304;
      throw error;
    }

    const updatePost = await kid.findByIdAndUpdate(postId, payload);
    if (!updatePost) {
      const error = new Error("No Post Found with this id");
      error.statusCode = 204;
      throw error;
    }
    if (images !== updatePost.images) {
      updatePost.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res
      .status(201)
      .json({ message: `Post updated successfully for user ${req.userId}` });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteKid = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    const error = new Error("No id found");
    error.statusCode = 404;
    throw error;
  }
  try {
    const findPost = await kid.findById(postId);
    if (findPost.user.toString() !== req.userId) {
      const error = new Error("you're not allow to delete this post")
      error.statusCode = 203;
      throw error;
    }

    findPost.images.forEach((obj) => {
      const extract = obj.path.replace("\\", "/");
      clearImage(extract);
    });
    const deletePost = await kid.findByIdAndDelete(postId);
    const user = await User.findById(req.userId);
    await user.items.pull(postId);
    await user.save();
    res
      .status(201)
      .json({ message: `Post deleted successfully for user ${req.userId}` });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
