const path = require("path");
const fs = require("fs");

const Mobile = require("../mobile/mobile-phones");
const Accessories = require("../mobile/accessories");
const Tablets = require("../mobile/tablets");
const User = require("../modules/user");

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (error) => console.log(error));
};
//  MOBILE CONTROLLER
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
    // const user = await User.findById(req.userId);
    // await user.items.push(postMobile);
    // await user.save();
    // console.log(user, mobilePost);
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

exports.deleteMobilePost = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    const error = new Error("No Id Found");
    error.statusCode = 404;
    throw error;
  }
  try {
    const findPost = await Mobile.findById(postId);
    if (!findPost) {
      const error = new Error("No Post found");
      error.statusCode = 404;
      throw error;
    }
    if (findPost.user.toString() !== req.userId) {
      const error = new Error("You're not allow to delet this post");
      error.statusCode = 203;
      throw error;
    }
    findPost.images.forEach((obj) => {
      const extract = obj.path.replace("\\", "/");
      clearImage(extract);
    });
    await Mobile.findByIdAndDelete(postId);
    // const user = await User.findById(req.userId);
    // await user.items.pull(postId);
    // await user.save();
    res
      .status(201)
      .json({ message: `Post Delete successfully for User ${req.userId}` });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// ACCESSORIES CONTROLLER
exports.postAccessories = async (req, res, next) => {
  const postAd = new Accessories({
    type: req.body.type,
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
    const savePost = await postAd.save();
    // const user = await User.findById(req.userId);
    // await user.items.push(postAd);
    // await user.save();

    res
      .status(201)
      .json({ message: `Post saved successfull for user ${req.userId}` });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateAccessories = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    const error = new Error("Please Provide a Post Id");
    error.statusCode = 404;
    throw error;
  }
  const payload = {
    type: req.body.type,
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
    const error = new Error("No files provided");
    error.statusCode = 404;
    throw error;
  }

  try {
    const check = await Accessories.findById(postId);
    if (check.user.toString() !== req.userId) {
      const error = new Error("You're not allow to modify this Post");
      error.statusCode = 304;
      throw error;
    }
    const findPost = await Accessories.findByIdAndUpdate(postId, payload);
    if (!findPost) {
      const error = new Error("No Post Found");
      error.statusCode = 404;
      throw error;
    }
    if (images !== findPost.images) {
      findPost.images.forEach((obj) => {
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

exports.deleteAccessories = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    const error = new Error("Please Provide Id");
    error.statusCode = 404;
    throw error;
  }

  try {
    const findPost = await Accessories.findById(postId);
    if (!findPost) {
      const error = new Error("No post found");
      error.statusCode = 404;
      throw error;
    }
    if (findPost.user.toString() !== req.userId) {
      const error = new Error("You're not allow to delete this post");
      error.statusCode = 203;
      throw error;
    }
    findPost.images.forEach((obj) => {
      const extract = obj.path.replace("\\", "/");
      clearImage(extract);
    });
    const deletePost = await Accessories.findByIdAndRemove(postId);
    // const user = await User.findById(req.userId);
    // await user.items.pull(postId);
    // await user.save();
    res.status(201).json({
      message: `${deletePost}        
        deleted successfully for user
         ${req.userId} `,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// TABLETS CONTROLLER

exports.postTablet = async (req, res, next) => {
  const post = new Tablets({
    types: req.body.types,
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
    const savePost = await post.save();
    // const user = await User.findById(req.userId);
    // await user.items.push(post);
    // await user.save();
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

exports.updateTablet = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    const error = new Error("Please provide a Id");
    error.statusCode = 404;
    throw error;
  }
  const payload = {
    types: req.body.types,
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
    const error = new Error("Please Provide Images");
    error.statusCode = 404;
    throw error;
  }
  try {
    const check = await Tablets.findById(postId);
    if (check.user.toString() !== req.userId) {
      const error = new Error("You're not allow to modify this post");
      error.statusCode = 304;
      throw error;
    }
    const updatePost = await Tablets.findByIdAndUpdate(postId, payload);
    if (!updatePost) {
      const error = new Error("No Post found with this id");
      error.statusCode = 204;
      throw error;
    }
    if (images !== updatePost.images) {
      updatePost.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res.status(201).json({
      message: `Post updated successfully for user ${req.userId}`,
      Post: updatePost,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteTablet = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    const error = new Error("No Id found");
    error.statusCode = 404;
    throw error;
  }
  try {
    const findPost = await Tablets.findById(postId);
    if (!findPost) {
      const error = new Error("No Post Found");
      error.statusCode = 404;
    }
    if (findPost.user.toString() !== req.userId) {
      const error = new Error("You're not allow to delete this post");
      error.statusCode = 203;
      throw error;
    }
    findPost.images.forEach((image) => {
      const extract = image.path.replace("\\", "/");
      clearImage(extract);
    });
    const deletePost = await Tablets.findByIdAndRemove(postId);
    // const findUser = await User.findById(req.userId);
    // await findUser.items.pull(postId);
    // await findUser.save();
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
